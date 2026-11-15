/* Four stages of human-led planning, backed by the shared report data. */
const CITY_STAGES = [
  { key: 'overview', tabs: ['overview', 'feedback'], title: ['Resident reports', '居民反馈'], color: 'violet' },
  { key: 'patterns', tabs: ['patterns'], title: ['Patterns', '共同问题'], color: 'coral' },
  { key: 'investigation', tabs: ['investigation'], title: ['Investigation', '调查'], color: 'yellow' },
  { key: 'decisions', tabs: ['decisions', 'scenarios'], title: ['Decisions & updates', '决策与进展'], color: 'teal' }
];

function cityStageIndex() {
  const index = CITY_STAGES.findIndex(stage => stage.tabs.includes(state.cityTab));
  return index < 0 ? 0 : index;
}

function renderCityOverview() {
  const report = data.reports.find(item => item.id === 'CG-1042') || data.reports[0];
  return `<div class="stage-intro"><span class="city-kicker">${mText('RESIDENT FEEDBACK', '居民反馈')}</span><h2>${mText('Resident reports', '居民反馈')}</h2><p>${mText('Review experiences by place, time and perspective, and respond to residents.', '按地点、时间和出行视角查看体验，并向居民回复。')}</p></div><div class="city-report-grid">
    ${report ? `<article class="card featured-experience"><div class="row"><span class="tag">${escapeHtml(report.author || mText('Resident experience', '居民体验'))}</span><span class="report-reference">${escapeHtml(report.id)}</span></div><h3>${escapeHtml(report.place)}</h3>${reportContextMarkup(report)}${reportScoresMarkup(report)}<blockquote>${escapeHtml(report.comment || getText('no_additional_comment'))}</blockquote><button class="secondary" onclick="showReport(${data.reports.indexOf(report)})">${mText('Open report & respond', '查看反馈并回复')} ↗</button></article>` : `<div class="card"><p>${mText('New resident reports will appear here.', '新增的居民反馈将显示在这里。')}</p></div>`}
    <section class="card recent-city-reports"><div class="row"><h3>${mText('Recent reports', '近期反馈')}</h3><button class="link" onclick="cnav('feedback')">${mText('View all', '查看全部')} ↗</button></div>${data.reports.slice(0,3).map(item=>reportRow(item,data.reports.indexOf(item))).join('')}</section></div><div class="stage-actions"><button class="secondary" onclick="cnav('feedback')">${mText('All resident reports', '全部居民反馈')} <span>${data.reports.length}</span></button><button class="primary" onclick="openCityStage(1)">${mText('Find the pattern', '查看共同问题')} →</button></div>
    <p class="context-principle">${mText('Relevant context, not personal profiling. Perspectives are optional.', '关注相关出行情境，不建立个人画像。出行视角为选填信息。')}</p>`;
}

function renderCityPatterns() {
  const pattern = crossingPattern();
  return `<div class="stage-intro"><span class="city-kicker">${mText('FROM ONE REPORT TO A PATTERN', '从一条反馈到一类问题')}</span><h2>${mText('The same crossing. Shared concerns.', '同一个路口，共同的担忧。')}</h2><p>${mText('Read the experiences together while keeping their context.', '把相似体验放在一起看，同时保留各自的情境。')}</p></div>
    <article class="card pattern-evidence"><div class="pattern-count"><b>${pattern.reports.length}</b><div><h3>${mText('reports identify the crossing as unsafe', '条反馈指出该路口让人感到不安全')}</h3><span>${mText('Riia crossing · Safety below 35 / 100', 'Riia 路口 · 安全感评分低于 35 / 100')}</span></div></div>
      <div class="perspective-counts"><div><b>${pattern.parents}</b><span>${mText('Parents / with children', '家长 / 与儿童同行')}</span></div><div><b>${pattern.cyclists}</b><span>${mText('Cyclists', '骑行者')}</span></div><div><b>${pattern.access}</b><span>${mText('Accessibility needs', '无障碍需求')}</span></div></div>
      <div class="pattern-times"><span>${mText('WHEN IT HAPPENS', '发生情境')}</span><p><b>${pattern.school}</b> ${mText('school-time reports', '条上下学时段反馈')}<br><b>${pattern.commute}</b> ${mText('commute-time reports', '条通勤时段反馈')}</p></div>
      <p class="note">${mText('Counts refer to reports, not unique people. Perspectives may overlap. Ratings describe perceived safety.', '数量为反馈条数，并非独立人数。视角可能重叠，评分描述主观安全感。')}</p>
      <details class="supporting-voices"><summary>${mText('Read the supporting experiences', '查看相关体验')}</summary>${pattern.reports.map(report => reportRow(report, data.reports.indexOf(report))).join('')}</details>
    </article>
    <div class="card city-map-card"><div class="row"><h3>${mText('See the place in context', '查看地点及周边情境')}</h3><span class="tag">OpenStreetMap</span></div>${map()}</div>
    <div class="stage-actions"><button class="secondary" onclick="openCityStage(0)">← ${mText('Personal reports', '个人反馈')}</button><button class="primary" onclick="openCityStage(2)">${mText('Investigate this pattern', '调查这个问题')} →</button></div>`;
}

function renderCityInvestigation() {
  return `<div class="stage-intro"><span class="city-kicker">${mText('CONTEXT + EXISTING DATA', '出行情境 + 已有数据')}</span><h2>${mText('Investigate before deciding.', '先调查，再做判断。')}</h2><p>${mText('Compare lived experiences with traffic evidence and record the planner’s assessment.', '将居民体验与交通证据对照，并记录规划人员的判断依据。')}</p></div>${renderCrossingPattern()}<div class="stage-actions"><button class="secondary" onclick="openCityStage(1)">← ${mText('View the pattern', '查看共同问题')}</button><button class="primary" onclick="openCityStage(3)">${mText('Decision workspace', '进入决策工作区')} →</button></div>`;
}

function renderCityDecisionStage() {
  return `<div class="stage-intro"><span class="city-kicker">${mText('EVIDENCE FOR A HUMAN DECISION', '为人的决策提供证据')}</span><h2>${mText('People remain responsible for decisions.', '决策始终由人负责。')}</h2><p>${mText('Bring experiences, survey evidence and trade-offs together. Explain the next step to residents.', '综合居民体验、调查证据和方案取舍，并向居民解释下一步。')}</p></div><div class="decision-review"><span>${mText('INVESTIGATION STATUS', '调查状态')}</span><strong>${data.investigation.status === 'investigate' ? mText('Requires closer investigation', '需要深入调查') : mText('Awaiting planner review', '待规划人员审阅')}</strong>${data.investigation.note ? `<p>${escapeHtml(data.investigation.note)}</p>` : ''}<button class="link" onclick="openCityStage(2)">${mText('Review the evidence', '审阅调查证据')} ↗</button></div>${renderDecisions()}`;
}

function renderCityWorkspace() {
  const active = cityStageIndex();
  const stage = CITY_STAGES[active];
  let content;
  if (state.cityTab === 'feedback') content = `<div class="stage-intro"><span class="city-kicker">${mText('PERSONAL EXPERIENCE REPORTS', '个人体验反馈')}</span><h2>${mText('Resident voices', '居民的声音')}</h2><p>${mText('Search by place or context, filter by experience, then open a report to respond.', '按地点或情境搜索，按体验维度筛选，打开反馈后即可回复。')}</p></div>${renderFeedback()}`;
  else if (state.cityTab === 'patterns') content = renderCityPatterns();
  else if (state.cityTab === 'investigation') content = renderCityInvestigation();
  else if (state.cityTab === 'scenarios') content = `<div class="stage-intro"><span class="city-kicker">${mText('DECISION MAKING', '决策')}</span><h2>${mText('Compare options and trade-offs.', '比较方案与取舍。')}</h2><button class="link" onclick="openCityStage(3)">← ${mText('Decisions & updates', '决策与进展')}</button></div>${renderScenarios()}`;
  else if (state.cityTab === 'decisions') content = renderCityDecisionStage();
  else content = renderCityOverview();

  return `<div class="city city-workspace"><div class="city-workspace-header"><div><h1>${mText('City workspace', '城市工作区')}</h1><span>${mText('Tartu, Estonia', '爱沙尼亚 · 塔尔图')}</span></div><button class="secondary" onclick="exportData()">${getText('export_feedback')} ↗</button></div>
    <nav class="city-tabs" aria-label="${mText('City workspace sections', '城市工作区功能')}">${CITY_STAGES.map((item,index)=>`<button class="${active===index?'active':''}" onclick="openCityStage(${index})" ${active===index?'aria-current="page"':''} aria-controls="city-stage-panel">${categoryText(item.title)}</button>`).join('')}</nav>
    <section id="city-stage-panel" class="city-stage-panel ${stage.color} city-section-${stage.key}" tabindex="-1" aria-label="${categoryText(stage.title)}">${content}</section>
    <p class="city-workspace-principle">${planningPromise()}</p></div>`;
}

function openCityStage(index) {
  if (!Number.isInteger(index) || !CITY_STAGES[index]) return;
  state.cityTab = CITY_STAGES[index].key;
  render();
  const panel = document.getElementById('city-stage-panel');
  if (panel) {
    panel.focus({ preventScroll: true });
    if (window.matchMedia?.('(max-width: 900px)').matches) panel.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
}
