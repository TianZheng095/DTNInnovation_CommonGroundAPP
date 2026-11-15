// Context-preserving reports and a traceable planning case. Presets are scenario fixtures.
const CONTEXT_MODES = ['Walking', 'Cycling', 'Public transport', 'Driving', 'Other'];
const PERSPECTIVES = ['Travelling with children', 'Accessibility needs', 'Commuting', 'Visiting'];
const TIME_WINDOWS = {
  'school-morning': ['School arrival · 07:00–09:00', '上学时段 · 07:00–09:00'],
  'school-afternoon': ['School departure · 15:00–17:00', '放学时段 · 15:00–17:00'],
  'commute-morning': ['Morning commute · 07:00–09:00', '早通勤 · 07:00–09:00'],
  'commute-evening': ['Evening commute · 17:00–19:00', '晚通勤 · 17:00–19:00'],
  other: ['Other recurring situation', '其他重复发生的情境']
};
const REPORT_PRESETS = {
  'CG-1042': { author: 'Kadri', transportMode: 'Cycling', roles: ['Travelling with children'], locationId: 'riia-crossing', time: { kind: 'recurring', window: 'school-afternoon', description: 'Weekdays, cycling with my child after school.' }, score: { safety: 22, comfort: 35, clarity: 48, stress: 84, confidence: 30, satisfaction: 32, happy: 25 } },
  'CG-1041': { transportMode: 'Public transport', roles: ['Commuting'], time: { kind: 'recurring', window: 'other', description: 'Early shifts starting at 06:00.' }, score: { safety: 62, comfort: 30, clarity: 52, stress: 76, confidence: 42, satisfaction: 28, happy: 35 } },
  'CG-1040': { transportMode: 'Walking', roles: ['Travelling with children'], time: { kind: 'recurring', window: 'other', description: 'Weekend afternoon walks with children.' }, score: { safety: 88, comfort: 90, clarity: 82, stress: 15, confidence: 87, satisfaction: 92, happy: 94 } }
};
const CROSSING_FIXTURES = Array.from({ length: 11 }, (_, index) => {
  const perspective = index % 3;
  const transportMode = perspective === 0 ? 'Cycling' : 'Walking';
  const roles = perspective === 0 ? ['Commuting'] : perspective === 1 ? ['Travelling with children'] : ['Accessibility needs'];
  const window = ['school-morning', 'school-afternoon', 'commute-morning', 'commute-evening'][index % 4];
  return { id: `CG-RIIA-${index + 1}`, place: 'Riia crossing', locationId: 'riia-crossing', lat: 58.3731, lng: 26.7162,
    transportMode, roles, time: { kind: 'recurring', window, description: 'Repeated weekday journeys.' },
    score: { safety: 18 + index, comfort: 30 + index, clarity: 44 + index, stress: 80 - index, confidence: 28 + index, satisfaction: 31 + index, happy: 26 + index },
    comment: [ 'Turning vehicles make this crossing feel difficult on my commute.', 'It is difficult to cross comfortably with a child at school time.', 'The crossing does not give me enough confidence to move through at my own pace.' ][perspective],
    status: 'Received', reply: '', mine: false, followed: false, isDemo: true };
});
const REFERENCE_EVIDENCE = { source: 'Scenario reference values — replace with a field survey', period: 'Weekdays, 07:00–09:00 and 15:00–17:00', speed: 43, limit: 30, turns: 116, isReference: true };

function normalizePlanningReports(reports) {
  const normalized = reports.map((report) => {
    const preset = REPORT_PRESETS[report.id];
    if (!preset) return report;
    const upgraded = { ...preset, ...report, score: { ...preset.score, ...validScores(report.score) },
      transportMode: report.transportMode || preset.transportMode, time: report.time || preset.time,
      roles: report.contextVersion === 2 ? report.roles : [...preset.roles], contextVersion: 2 };
    delete upgraded.feeling;
    return upgraded;
  });
  if (normalized.some((report) => report.id === 'CG-1042')) {
    for (const fixture of CROSSING_FIXTURES) if (!normalized.some((report) => report.id === fixture.id)) normalized.push(deepClone(fixture));
  }
  return normalized;
}
function contextModeLabel(mode) {
  return state.language !== 'zh' ? mode : ({Walking:'步行',Cycling:'骑行','Public transport':'公共交通',Driving:'驾车',Other:'其他'}[mode] || mode);
}
function perspectiveLabel(role) {
  return state.language !== 'zh' ? role : ({'Travelling with children':'与儿童同行','Accessibility needs':'无障碍需求',Commuting:'通勤',Visiting:'到访'}[role] || translateRole(role));
}
function contextIntroMarkup() {
  return `<h2>${mText('A journey, in context.', '让体验带上出行情境。')}</h2>
    <p>${mText('Relevant context helps the city understand your experience. No demographic profile is required.', '相关出行情境能帮助城市理解你的体验，不需要提供人口统计档案。')}</p>
    <label for="reportTransport">${mText('Transport mode', '出行方式')} *</label>
    <select id="reportTransport" onchange="state.transportMode=this.value"><option value="">${mText('Choose a mode', '选择出行方式')}</option>${CONTEXT_MODES.map(mode=>`<option value="${mode}" ${state.transportMode===mode?'selected':''}>${contextModeLabel(mode)}</option>`).join('')}</select>
    <label>${mText('Your perspective · optional', '你的出行视角 · 选填')}</label>
    <div class="context-choices">${PERSPECTIVES.map(role=>`<button type="button" class="secondary ${state.roles.includes(role)?'selected':''}" aria-pressed="${state.roles.includes(role)}" onclick="toggleRole('${role}')">${perspectiveLabel(role)}</button>`).join('')}</div>
    <p class="note">${mText('Choose only what matters to this journey. You can leave all perspectives blank; no age, gender, income or diagnosis is needed.', '只选择与这次出行有关的信息，也可以全部留空；不需要年龄、性别、收入或诊断信息。')}</p>`;
}
function timeContextMarkup() {
  return `<label for="reportWhen">${mText('When does this happen?', '何时发生？')}</label>
    <select id="reportWhen" onchange="state.timeKind=this.value; render()">
      ${[['now','Just now','刚刚'],['specific','A specific time','某个具体时间'],['recurring','A recurring situation','反复发生的情境']].map(([key,en,zh])=>`<option value="${key}" ${state.timeKind===key?'selected':''}>${mText(en,zh)}</option>`).join('')}
    </select>
    ${state.timeKind==='specific'?`<label for="observedAt">${mText('Time of the experience', '体验发生时间')} *</label><input id="observedAt" type="datetime-local" value="${escapeHtml(state.observedAt)}" oninput="state.observedAt=this.value">`:''}
    ${state.timeKind==='recurring'?`<label for="timeWindow">${mText('Typical situation', '通常的情境')}</label><select id="timeWindow" onchange="state.timeWindow=this.value">${Object.entries(TIME_WINDOWS).map(([key,label])=>`<option value="${key}" ${state.timeWindow===key?'selected':''}>${categoryText(label)}</option>`).join('')}</select><label for="recurringDetail">${mText('Frequency or context · optional', '频率或背景 · 选填')}</label><input id="recurringDetail" maxlength="200" placeholder="${mText('e.g. every weekday after school', '例如：每个工作日放学后')}" value="${escapeHtml(state.recurringDetail)}" oninput="state.recurringDetail=this.value">`:''}`;
}
function reportTimeLabel(report) {
  const time = report.time;
  if (!time) return mText('Time not provided', '未提供发生时间');
  if (time.kind === 'recurring') return [categoryText(TIME_WINDOWS[time.window] || TIME_WINDOWS.other), time.description].filter(Boolean).join(' · ');
  const date = new Date(time.at);
  return Number.isNaN(date.valueOf()) ? mText('Time not provided', '未提供发生时间') : date.toLocaleString(state.language === 'zh' ? 'zh-CN' : 'en-GB');
}
function reportContextMarkup(report) {
  return `<dl class="report-context"><div><dt>${mText('Perspective','出行视角')}</dt><dd>${escapeHtml((report.roles||[]).map(perspectiveLabel).join(' · ') || mText('Not specified', '未填写'))}</dd></div><div><dt>${mText('Mode','方式')}</dt><dd>${escapeHtml(contextModeLabel(report.transportMode || mText('Not specified','未填写')))}</dd></div><div><dt>${mText('When','时间 / 情境')}</dt><dd>${escapeHtml(reportTimeLabel(report))}</dd></div></dl>`;
}
function resetReportContext() { state.transportMode=''; state.timeKind='now'; state.observedAt=''; state.timeWindow='school-morning'; state.recurringDetail=''; state.photo=null; state.photoLoading=false; state.photoReadToken=(state.photoReadToken||0)+1; }
function safePhoto(value) { return typeof value==='string' && /^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/=]+$/.test(value); }
function photoMarkup(report) { return safePhoto(report.photo) ? `<img class="report-photo" src="${report.photo}" alt="${mText('Photo attached to this experience', '本条反馈附带的照片')}">` : ''; }
async function chooseReportPhoto(input) {
  const file = input.files?.[0];
  if (!file) return;
  if (!['image/jpeg','image/png','image/webp'].includes(file.type) || file.size>1024*1024) { input.value=''; toast(mText('Use a JPG, PNG or WebP image smaller than 1 MB.', '请选择小于 1 MB 的 JPG、PNG 或 WebP 图片。')); return; }
  state.photoLoading=true;
  const token=state.photoReadToken=(state.photoReadToken||0)+1;
  try {
    const value = await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file);});
    if (!safePhoto(value)) throw new Error('Invalid image');
    if(token===state.photoReadToken) state.photo=value;
  } catch { toast(mText('Could not read this image.', '无法读取这张图片。')); }
  finally { if(token===state.photoReadToken){state.photoLoading=false; render();} }
}
function averageExperience(reports) {
  const score={};
  for (const {key} of MOBILITY_CATEGORIES) { const values=reports.map(report=>validScores(report.score)[key]).filter(Number.isFinite); if(values.length)score[key]=Math.round(values.reduce((sum,value)=>sum+value,0)/values.length); }
  return {score};
}
function categoryLayerMarkup() { return `<label>${mText('Experience layer', '体验图层')}<select aria-label="Experience layer" onchange="state.mapCategory=this.value;render()">${MOBILITY_CATEGORIES.map(({key,label})=>`<option value="${key}" ${state.mapCategory===key?'selected':''}>${categoryText(label)}</option>`).join('')}</select></label>`; }
function experienceColor(report) {
  const key=state.mapCategory || 'safety', value=validScores(report.score)[key];
  if(value===undefined)return '#8a9690';
  const positive=key==='stress'?100-value:value;
  return positive<35?'#c65b3b':positive<70?'#a98a3d':'#275e47';
}
function crossingPattern() {
  const reports=data.reports.filter(report=>(report.locationId==='riia-crossing'||report.place?.toLowerCase()==='riia crossing') && Number.isFinite(report.score?.safety) && report.score.safety<35);
  return { reports, parents:reports.filter(r=>r.roles?.some(role=>['Travelling with children','Parent / child'].includes(role))).length,
    cyclists:reports.filter(r=>r.transportMode==='Cycling').length,
    access:reports.filter(r=>r.roles?.includes('Accessibility needs')).length,
    school:reports.filter(r=>r.time?.window?.startsWith('school-')).length,
    commute:reports.filter(r=>r.time?.window?.startsWith('commute-')).length };
}
function planningPromise() { return mText('Common Ground helps planners identify, interpret, and prioritize issues. Humans remain responsible for decisions.', 'Common Ground 帮助规划人员识别、理解问题并确定优先级。决策始终由人负责。'); }
function renderCrossingPattern() {
  const pattern=crossingPattern(), evidence=data.trafficEvidence, investigation=data.investigation;
  return `<section class="card planning-case"><span class="eyebrow">${mText('FROM ONE EXPERIENCE TO A PATTERN','从一条体验到一类问题')}</span><h2>${mText('Riia crossing · closer investigation','Riia 路口 · 深入调查')}</h2>
    <p><strong>${pattern.reports.length} ${mText('reports identify the crossing as unsafe','条反馈指出该路口让人感到不安全')}</strong> · ${mText('Safety scores below 35/100; this describes perceived safety, not measured collision risk.', '依据安全感评分低于 35/100 的记录；描述的是主观安全感，并非测得的碰撞风险。')}</p>
    <div class="planning-columns"><div><h3>${mText('1 · Lived experience','1 · 居民体验')}</h3>
      <p>${mText('Kadri’s school journey is part of this pattern.', 'Kadri 与孩子放学后的出行体验是其中一条记录。')}</p>
      <div class="pill-row"><span class="pill">${pattern.parents} ${mText('parents / with children','家长 / 与儿童同行')}</span><span class="pill">${pattern.cyclists} ${mText('cyclists','骑行者')}</span><span class="pill">${pattern.access} ${mText('accessibility perspectives','无障碍需求视角')}</span></div>
      <p>${pattern.school} ${mText('school-time reports','条集中于上学 / 放学时段')} · ${pattern.commute} ${mText('commute-time reports','条集中于通勤时段')}</p><small>${mText('Perspective groups can overlap; counts are reports, not unique people.', '不同视角可重叠；数量为反馈条数，并非独立人数。')}</small>
      <details id="crossing-voices"><summary>${mText('Inspect the supporting reports','查看支撑这一判断的反馈')}</summary>${pattern.reports.map(r=>reportRow(r,data.reports.indexOf(r))).join('')}</details></div>
    <div><h3>${mText('2 · Compare traffic evidence','2 · 对照交通证据')}</h3>
      <p class="note">${evidence.isReference ? mText('Scenario reference values; no field survey has been connected.', '以下为场景参考值，尚未接入实地测量。') : mText('Manually entered survey values; verify the source before interpreting.', '人工录入的调查值，解读前请核验来源。')}</p>
      <dl class="report-context"><div><dt>${mText('85th-percentile speed','第 85 百分位车速')}</dt><dd>${evidence.speed} km/h</dd></div><div><dt>${mText('Posted speed limit','限速')}</dt><dd>${evidence.limit} km/h</dd></div><div><dt>${mText('Turning movements','转向交通量')}</dt><dd>${evidence.turns} / ${mText('hour','小时')}</dd></div></dl>
      <p>${escapeHtml(evidence.period)}<br><small>${escapeHtml(evidence.source)}</small></p>
      <p>${mText('Check whether turning conflicts and vehicle speeds coincide with the reported school and commute situations. This comparison does not establish causation.', '核对转向冲突与车速是否和居民反馈的上下学、通勤情境重合。这种对照本身不能证明因果关系。')}</p>
      <details><summary>${mText('Replace with survey evidence','替换为实测调查数据')}</summary><form onsubmit="event.preventDefault();saveTrafficEvidence(this)">
      <label>${mText('Survey source / reference','调查来源 / 引用')}<input name="source" required maxlength="200"></label><label>${mText('Survey date and time window','调查日期与时段')}<input name="period" required maxlength="200"></label>
      <label>P85 (km/h)<input name="speed" type="number" min="0" max="200" step="0.1" required></label><label>${mText('Speed limit (km/h)','限速（km/h）')}<input name="limit" type="number" min="1" max="200" required></label><label>${mText('Turning movements per hour','每小时转向车辆数')}<input name="turns" type="number" min="0" max="20000" required></label><button class="secondary" type="submit">${mText('Save evidence','保存证据')}</button></form></details></div></div>
    <div class="card soft"><h3>${mText('3 · Planner assessment','3 · 规划人员判断')}</h3><span class="tag">${escapeHtml(investigation.status==='investigate'?mText('Requires closer investigation','需要深入调查'):mText('Awaiting planner review','待规划人员审阅'))}</span><p>${escapeHtml(investigation.note)}</p>
      <label for="investigationNote">${mText('Planner rationale','规划人员判断依据')}</label><textarea id="investigationNote" maxlength="600">${escapeHtml(investigation.note)}</textarea>
      <button class="secondary" type="button" onclick="saveInvestigation()">${mText('Flag for closer investigation','标记为需要深入调查')}</button>
      <p>${mText('Next: observe crossings at school and commute times, validate traffic evidence and accessibility conditions, then assess options. No intervention has been selected.', '下一步：在上下学和通勤时段现场观察，核验交通证据与无障碍条件，再评估方案。当前尚未选择具体措施。')}</p>
    </div><p class="planning-promise">${planningPromise()}</p></section>`;
}
function saveTrafficEvidence(form) {
  const fields=form.elements, speed=Number(fields.speed.value), limit=Number(fields.limit.value), turns=Number(fields.turns.value);
  if(!fields.source.value.trim()||!fields.period.value.trim()||!fields.speed.value||!fields.limit.value||!fields.turns.value||!Number.isFinite(speed)||speed<0||speed>200||!Number.isFinite(limit)||limit<=0||limit>200||!Number.isInteger(turns)||turns<0||turns>20000)return;
  data.trafficEvidence={source:fields.source.value.trim(),period:fields.period.value.trim(),speed,limit,turns,isReference:false};saveData();render();
}
function saveInvestigation() {
  const note=document.getElementById('investigationNote')?.value.trim();
  if(!note){toast(mText('Add the reason for further investigation.', '请填写需要进一步调查的原因。'));return;}
  data.investigation={status:'investigate',note,updatedAt:new Date().toISOString()};saveData();render();
}
