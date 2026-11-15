// Run with: node tests/mobility.test.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const appRoot = path.resolve(__dirname, '..');
const scripts = ['map-config.js', 'mobility.js', 'planning.js', 'city-workspace.js', 'app.js'].map((file) => new vm.Script(fs.readFileSync(path.join(appRoot, file), 'utf8'), { filename: file }));

function app(saved = null) {
  const stored = new Map(saved ? [['common-ground-mvp-v1', JSON.stringify(saved)]] : []);
  const requests = [];
  const replies = [];
  const elements = new Map();
  const context = vm.createContext({
    console, URL, AbortController,
    window: { setTimeout: () => 0, clearTimeout() {}, addEventListener() {}, isSecureContext: true },
    navigator: { geolocation: { getCurrentPosition(_resolve, reject) { reject({ code: 1 }); } } },
    document: { documentElement: {}, getElementById: (id) => elements.get(id) || null, querySelector: () => null, querySelectorAll: () => [], addEventListener() {}, contains: () => false },
    localStorage: { getItem: (key) => stored.get(key) || null, setItem: (key, value) => stored.set(key, value) },
    setTimeout: (callback, ms) => { if (ms <= 1100) Promise.resolve().then(callback); return 0; },
    clearTimeout() {},
    fetch: async (url) => {
      requests.push(String(url));
      const reply = replies.shift();
      if (reply instanceof Error) throw reply;
      if (!reply) throw new Error('Unexpected request: ' + url);
      return { ok: true, json: async () => reply };
    }
  });
  scripts.forEach((script) => script.runInContext(context));
  return { run: (code) => vm.runInContext(code, context), context, stored, requests, replies, elements };
}
const coords = [[26.71, 58.37], [26.72, 58.375], [26.73, 58.38]];
function routeFixture() {
  return { code: 'Ok', routes: [600, 720].map((duration) => ({ duration, distance: 1200, geometry: { coordinates: coords }, legs: [{ steps: [
    { name: 'First street', duration: duration / 2, distance: 600, geometry: { coordinates: coords.slice(0, 2) } },
    { name: 'Second street', duration: duration / 2, distance: 600, geometry: { coordinates: coords.slice(1) } }
  ] }] })) };
}
function setEndpoints(test) {
  test.run("state.routeStart='58.37, 26.71'; state.routeDestination='58.38, 26.73'; state.useCurrentLocation=false;");
}
const tests = [];
function check(name, body) { tests.push({ name, body }); }

check('seven dimensions; stress has the inverse emotional direction', () => {
  const test = app();
  assert.equal(test.run('MOBILITY_CATEGORIES.length'), 7);
  assert.equal(test.run("scoreFace(100, 'stress')"), '😢');
  assert.equal(test.run("scoreFace(0, 'stress')"), '😊');
  assert.equal(test.run("scoreFace(100, 'safety')"), '😊');
});
check('unrated values stay absent; legacy reports and demo coordinates migrate', () => {
  const test = app({ reports: [{ id: 'old', mine: true, x: 30, y: 40, place: 'Old report', score: { safety: 70 } }, { id: 'CG-1042', mine: false }], profile: {} });
  assert.equal(test.run('validPoint(data.reports[0])'), false);
  assert.equal(test.run('data.reports[0].score.safety'), 70);
  assert.equal(test.run('data.reports[1].isDemo'), true);
  assert.equal(test.run('validPoint(data.reports[1])'), true);
  assert.equal(test.run('Object.keys(state.feedbackAnswered).length'), 0);
  assert.equal(test.run('Object.keys(validScores({safety:101, comfort:null, stress:0})).join()'), 'stress');
});
check('feedback matches line segments, excludes demos, old/future reports and missing coordinates', () => {
  const test = app();
  test.run(`var now = Date.now(); var line = [[58,26],[58,26.02]];
    var report = {lat:58,lng:26.01,createdAt:new Date(now).toISOString(),score:{safety:80,stress:20}};
    var summary = routeFeedback(line,[report,{...report,score:{safety:40}}, {...report,isDemo:true}, {...report,lat:59}, {...report,createdAt:'2020-01-01'}, {...report,createdAt:new Date(now+10000).toISOString()}, {createdAt:report.createdAt,score:{safety:100}}],now);`);
  assert.equal(test.run('distanceToRoute(report,line)'), 0);
  assert.equal(test.run('summary.count'), 2);
  assert.equal(test.run('summary.scores.safety.average'), 60);
  assert.equal(test.run('summary.scores.safety.count'), 2);
  assert.equal(test.run('summary.scores.stress.count'), 1);
  assert.equal(test.run('summary.scores.comfort.average'), null);
});
check('coordinate search validates ranges and does not call a geocoder', async () => {
  const test = app();
  assert.equal((await test.run("searchPlace('58.37, 26.71')"))[0].lat, 58.37);
  assert.equal((await test.run("searchPlace('91, 181')")).length, 0);
  assert.equal(test.requests.length, 0);
});
check('real route responses produce selectable alternatives and matching segments', async () => {
  const test = app();
  test.run('state.demoFeedbackEnabled=false');
  setEndpoints(test);
  test.run("state.routeMode='bike'");
  test.replies.push(routeFixture());
  await test.run('findRoutes()');
  assert.match(test.requests[0], /routed-bike/);
  assert.match(test.requests[0], /alternatives=true/);
  assert.equal(test.run('state.routes.length'), 2);
  assert.equal(test.run('state.routes[0].segments.length'), 2);
  assert.equal(test.run('state.routes[0].segments.reduce((sum,s)=>sum+s.duration,0)'), 600);
  test.run("selectRoute('route-1')");
  assert.equal(test.run('getSelectedRoute().duration'), 720);
  assert.match(test.run('routeResultsMarkup()'), /No recent feedback/);
  test.run('reportRouteSegment(0)');
  assert.equal(test.run('validPoint(state.pin)'), true);
  assert.equal(test.run('state.transportMode'), 'Cycling');
  test.run('goBackFromShare()');
  assert.equal(test.run('state.tab'), 'commute');
});
check('ambiguous place choices require selection; HTML is escaped', async () => {
  const test = app();
  setEndpoints(test);
  test.run("state.routeDestination='Station'");
  test.replies.push({ features: [26.72, 26.73].map((lng) => ({ properties: { name: '<Station>', city: 'Tartu' }, geometry: { coordinates: [lng, 58.38] } })) });
  await test.run('findRoutes()');
  assert.equal(test.run('state.routeChoices.points.length'), 2);
  assert.equal(test.run('state.routes.length'), 0);
  assert.match(test.run('routeResultsMarkup()'), /&lt;Station&gt;/);
  test.replies.push(routeFixture());
  await test.run('chooseRoutePlace(1)');
  assert.equal(test.run('state.routes.length'), 2);
  assert.equal(test.requests.length, 2);
});
check('no route and failed network clear results and release loading state', async () => {
  const test = app();
  setEndpoints(test);
  test.replies.push({ code: 'NoRoute' });
  await test.run('findRoutes()');
  assert.match(test.run('state.routeError'), /No connected route/);
  assert.equal(test.run('state.routeBusy'), false);
  assert.equal(test.run('state.routes.length'), 0);
  test.replies.push(new Error('Service offline'));
  await test.run('findRoutes()');
  assert.equal(test.run('state.routeError'), 'Service offline');
  assert.equal(test.run('state.routeBusy'), false);
});
check('denied geolocation gives a manual-address fallback without network calls', async () => {
  const test = app();
  test.run("useCurrentOrigin();state.routeDestination='Tartu station'");
  await test.run('findRoutes()');
  assert.match(test.run('state.routeError'), /enter a starting address/);
  assert.equal(test.requests.length, 0);
});
check('submitting requires a map position and a rating, saves only answered scores by value', () => {
  const test = app();
  const count = test.run('data.reports.length');
  test.run("state.place='Test crossing';state.transportMode='Walking';state.roles=[];submitReport()");
  assert.equal(test.run('data.reports.length'), count);
  test.run('state.pin={lat:58.37,lng:26.71};submitReport()');
  assert.equal(test.run('data.reports.length'), count);
  test.run('state.feedbackScores.safety=20;state.feedbackAnswered.safety=true;submitReport()');
  assert.equal(test.run('data.reports.length'), count + 1);
  assert.equal(test.run('data.reports[0].score.safety'), 20);
  assert.equal(test.run('data.reports[0].transportMode'), 'Walking');
  assert.equal(test.run('data.reports[0].roles.length'), 0);
  assert.equal(test.run('Object.keys(data.reports[0].score).join()'), 'safety');
  test.run('state.feedbackScores.safety=99');
  assert.equal(test.run('data.reports[0].score.safety'), 20);
  const saved = JSON.parse(test.stored.get('common-ground-mvp-v1'));
  assert.equal(saved.reports[0].lat, 58.37);
  assert.ok(saved.reports[0].createdAt);
  assert.equal(app(saved).run('data.reports[0].score.safety'), 20);
});
check('new input invalidates old routes without rerendering inputs', async () => {
  const test = app();
  setEndpoints(test);
  test.replies.push(routeFixture());
  await test.run('findRoutes()');
  test.run("render=()=>{throw new Error('Unexpected full render')};updateRouteField('destination','New destination')");
  assert.equal(test.run('state.routes.length'), 0);
  assert.equal(test.run('state.routeEnd'), null);
  assert.equal(test.run('state.routeDestination'), 'New destination');
});

check('all resident and city views render in English and Chinese', () => {
  const test = app();
  for (const language of ['en', 'zh']) {
    test.run(`state.language='${language}'`);
    for (const tab of ['explore', 'share', 'commute', 'updates', 'profile', 'plans', 'done']) {
      test.run(`state.tab='${tab}'`);
      assert.ok(test.run('residentView().length') > 100);
    }
    test.run("state.tab='share';state.step=2");
    const markup = test.run('shareForm()');
    assert.equal((markup.match(/type="range"/g) || []).length, 7);
    assert.equal((markup.match(/aria-controls="help-/g) || []).length, 7);
    for (const tab of ['overview', 'feedback', 'patterns', 'investigation', 'scenarios', 'decisions']) {
      test.run(`state.cityTab='${tab}'`);
      assert.ok(test.run('cityView().length') > 100);
    }
  }
});
check('slider updates preserve the input node and update the emoji and accessible value', () => {
  const test = app();
  const nodes = { '.emoji-range': { style: { setProperty(key, value) { this[key] = value; } } }, '.emoji-thumb': {}, output: {} };
  test.elements.set('rating-stress', { querySelector: (selector) => nodes[selector] });
  test.context.input = { value: '95', setAttribute(key, value) { this[key] = value; } };
  test.run("render=()=>{throw new Error('Unexpected full render')};updateExperienceScore('stress',input)");
  assert.equal(nodes['.emoji-thumb'].textContent, '😢');
  assert.equal(nodes.output.textContent, '95 / 100');
  assert.equal(test.context.input['aria-valuetext'], '95/100');
  assert.equal(test.run('state.feedbackAnswered.stress'), true);
});

check('named demo trip supplies every empty alternative with simulated segment feedback', async () => {
  const test = app();
  assert.equal(test.run('state.routeStart'), 'Tõrvandi kool');
  assert.equal(test.run('state.routeDestination'), 'Tamme staadion');
  assert.equal(test.run('state.useCurrentLocation'), false);
  test.replies.push(routeFixture());
  await test.run('loadDemoJourney()');
  assert.equal(test.requests.length, 1); // Named landmarks do not need fuzzy geocoding.
  assert.equal(test.run('state.routeStart'), 'Tõrvandi kool');
  assert.equal(test.run('state.routeDestination'), 'Tamme staadion');
  assert.match(test.requests[0], /26\.703677,58\.3207374;26\.7135996,58\.3666166/);
  assert.equal(test.run('state.routes.every(r => r.demoReports.length === r.segments.length)'), true);
  assert.match(test.run('routeResultsMarkup()'), /feedback-count/);
  assert.match(test.run('routeResultsMarkup()'), /Mari/);
  assert.equal(test.run('data.reports.some(r => r.id.startsWith("SIM-"))'), false);
  assert.equal(test.stored.size, 0);
  test.run('toggleDemoFeedback(false)');
  assert.match(test.run('routeResultsMarkup()'), /No recent feedback/);
  assert.equal(test.run('state.routes.every(r => r.demoReports.length === 0)'), true);
  test.run('toggleDemoFeedback(true)');
  assert.equal(test.run('state.routes.every(r => r.demoReports.length > 0)'), true);
  test.run(`var first = state.routes[0].demoReports[0]; data.reports.push({...first, id:'REAL', isDemo:false}); prepareDemoFeedback();`);
  assert.equal(test.run('state.routes[0].demoReports.length'), 0);
});

check('cycling and driving alternatives also display simulated ratings on every section', async () => {
  for (const mode of ['bike', 'car']) {
    const test = app();
    setEndpoints(test);
    test.run(`state.routeMode='${mode}'`);
    test.replies.push(routeFixture());
    await test.run('findRoutes()');
    assert.match(test.requests[0], new RegExp(`routed-${mode}`));
    assert.equal(test.run(`state.routes.every(route => route.segments.every(segment => feedbackSummary(segment.coords, route.demoReports).includes('feedback-count')))`), true);
    assert.equal(test.run('routeResultsMarkup().includes("No recent feedback")'), false);
  }
});

check('My Updates includes the three followed community pins without changing authorship', () => {
  const test = app();
  test.run("state.tab='updates'");
  const html = test.run('phoneContent()');
  for (const place of ['Riia crossing', 'Maarjamõisa hospital', 'Emajõgi riverside']) assert.ok(html.includes(place));
  assert.equal(test.run('data.reports.filter(r => r.followed).every(r => !r.mine)'), true);
  assert.match(html, /Following/);
  const saved = JSON.parse(test.run('JSON.stringify(data)'));
  assert.ok(app(saved).run("data.reports.filter(r => r.mine || r.followed).length") === 3);
  saved.reports.push({id:'unfollowed', mine:false, place:'Unfollowed place'});
  assert.equal(app(saved).run("data.reports.filter(r => r.mine || r.followed).length"), 3);
});

check('all three original reports migrate to seven scores and preserve existing comments and responses', () => {
  const test=app();
  assert.equal(test.run('data.reports.slice(0,3).every(r=>Object.keys(validScores(r.score)).length===7 && r.transportMode && r.time)'),true);
  assert.equal(test.run('data.reports.slice(0,3).some(r=>r.feeling)'),false);
  assert.equal(test.run("MOBILITY_CATEGORIES.find(c=>c.key==='happy').label[0]"),'Enjoyment');
  const saved=JSON.parse(test.run('JSON.stringify(data)'));
  saved.reports[0].reply='Preserve planner reply'; saved.reports[0].score.safety=31;
  const restored=app(saved);
  assert.equal(restored.run('data.reports[0].reply'),'Preserve planner reply');
  assert.equal(restored.run('data.reports[0].score.safety'),31);
  assert.equal(restored.run('data.reports.length'),14);
});
check('twelve crossing reports have inspectable category, perspective and time evidence', () => {
  const test=app();
  assert.equal(test.run('crossingPattern().reports.length'),12);
  assert.ok(test.run('crossingPattern().parents')>0);
  assert.ok(test.run('crossingPattern().cyclists')>0);
  assert.ok(test.run('crossingPattern().access')>0);
  assert.equal(test.run('crossingPattern().school + crossingPattern().commute'),12);
  assert.match(test.run('renderCrossingPattern()'),/Scenario reference values/);
  assert.match(test.run('renderCrossingPattern()'),/Humans remain responsible/);
  assert.equal(test.run('data.proposal'),null);
});
check('perspectives are optional and a recurring context survives submission and reload', () => {
  const test=app();
  test.run("state.transportMode='Walking';state.roles=[];nextStep()");
  assert.equal(test.run('state.step'),2);
  test.run("state.place='Riia crossing';state.pin={lat:58.3731,lng:26.7162};state.timeKind='recurring';state.timeWindow='commute-morning';state.recurringDetail='Every Monday';state.feedbackScores.safety=25;state.feedbackAnswered.safety=true;submitReport()");
  assert.equal(test.run('data.reports[0].roles.length'),0);
  assert.equal(test.run('data.reports[0].time.description'),'Every Monday');
  assert.equal(test.run('crossingPattern().reports.length'),13);
  assert.equal(test.run('data.proposal'),null);
  const restored=app(JSON.parse(test.stored.get('common-ground-mvp-v1')));
  assert.equal(restored.run('data.reports[0].time.window'),'commute-morning');
  assert.equal(restored.run('state.transportMode'),'');
});
check('specific-time reports require a valid time and photos remain optional', () => {
  const test=app(); const count=test.run('data.reports.length');
  test.run("state.transportMode='Cycling';state.place='Test';state.pin={lat:58,lng:26};state.feedbackAnswered.comfort=true;state.timeKind='specific';submitReport()");
  assert.equal(test.run('data.reports.length'),count);
  test.run("state.observedAt='2026-11-13T08:00';state.photo='data:image/png;base64,YQ==';submitReport()");
  assert.equal(test.run('data.reports.length'),count+1);
  assert.equal(test.run('data.reports[0].time.kind'),'specific');
  assert.equal(test.run('data.reports[0].photo'),'data:image/png;base64,YQ==');
  assert.equal(test.run("safePhoto('data:image/svg+xml;base64,YQ==')"),false);
  assert.equal(test.run('state.photo'),null);
});
check('filtered feedback opens the correct report and supports category filters', () => {
  const test=app();test.run("state.query='hospital';state.filter='comfort'");
  const html=test.run('resultsList()');
  assert.match(html,/showReport\(1\)/);
  assert.doesNotMatch(html,/showReport\(0\)/);
});
check('survey replacement and planner review persist without choosing an intervention', () => {
  const test=app();
  test.context.form={elements:Object.fromEntries(Object.entries({source:'Survey A',period:'2026-11-13 07:00–09:00',speed:'37',limit:'30',turns:'91'}).map(([key,value])=>[key,{value}]))};
  test.run('saveTrafficEvidence(form)');
  assert.equal(test.run('data.trafficEvidence.speed'),37);
  assert.equal(test.run('data.trafficEvidence.isReference'),false);
  test.elements.set('investigationNote',{value:'Observe turning conflicts during school departure.'});
  test.run('saveInvestigation()');
  assert.equal(test.run('data.investigation.status'),'investigate');
  assert.equal(test.run('data.proposal'),null);
  assert.equal(app(JSON.parse(test.stored.get('common-ground-mvp-v1'))).run('data.trafficEvidence.turns'),91);
});

check('city stages navigate without changing reports or making decisions', () => {
  const test=app();
  const original=test.run('JSON.stringify(data)');
  for (const [index,tab] of ['overview','patterns','investigation','decisions'].entries()) {
    test.run(`openCityStage(${index})`);
    assert.equal(test.run('state.cityTab'),tab);
    assert.equal(test.run('cityStageIndex()'),index);
    assert.equal((test.run('cityView()').match(/aria-current="page"/g)||[]).length,1);
  }
  test.run('openCityStage(99)');
  assert.equal(test.run('state.cityTab'),'decisions');
  assert.equal(test.run('JSON.stringify(data)'),original);
  test.run("cnav('scenarios')");
  assert.equal(test.run('cityStageIndex()'),3);
  test.run("cnav('feedback')");
  assert.equal(test.run('cityStageIndex()'),0);
});
check('city featured report resolves by identity and patterns reflect the shared reports', () => {
  const test=app();
  test.run("data.reports.unshift({id:'new',place:'New place',score:{},roles:[]})");
  assert.match(test.run('renderCityOverview()'),/showReport\(1\)/);
  assert.match(test.run('renderCityPatterns()'),/<b>12<\/b>/);
  test.run("data.reports.find(r=>r.id==='CG-1042').score.safety=80");
  assert.match(test.run('renderCityPatterns()'),/<b>11<\/b>/);
  assert.equal(test.run('data.proposal'),null);
});

module.exports = (async () => {
  for (const { name, body } of tests) {
    await body();
    console.log('PASS ' + name);
  }
  console.log(`${tests.length} mobility checks passed.`);
})();
