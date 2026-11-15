/* Real maps, route planning and experience ratings. No location is persisted by the planner. */
const MAP_CONFIG = window.COMMON_GROUND_MAP_CONFIG;
const MAP_CENTER = [58.3776, 26.729];
const MOBILITY_CATEGORIES = [
  { key: 'safety', icon: '🛡️', label: ['Safety', '安全感'], helper: ['Feeling protected from traffic, collisions or personal harm.', '是否感到免受交通、碰撞或人身伤害的威胁。'], ends: ['Unsafe', 'Safe', '不安全', '安全'] },
  { key: 'comfort', icon: '🪑', label: ['Comfort', '舒适度'], helper: ['Physical comfort: surface quality, space, noise and crowding.', '身体上的舒适程度，包括路面、空间、噪声和拥挤程度。'], ends: ['Uncomfortable', 'Comfortable', '不舒适', '舒适'] },
  { key: 'clarity', icon: '🧭', label: ['Clarity', '清晰度'], helper: ['How easy signs, directions, crossings and right of way are to understand.', '标识、方向、过街方式和路权是否容易理解。'], ends: ['Confusing', 'Clear', '困惑', '清晰'] },
  { key: 'stress', icon: '🫧', label: ['Stress', '压力'], helper: ['Mental tension and pressure during the journey. A higher score means MORE stress.', '途中感受到的精神紧张和压力。分数越高，压力越大。'], ends: ['Calm', 'Very stressed', '放松', '压力很大'] },
  { key: 'confidence', icon: '💪', label: ['Confidence', '信心'], helper: ['Feeling able to navigate independently and handle the situations you encounter.', '是否有信心独立通行，并应对沿途遇到的状况。'], ends: ['Unsure', 'Confident', '没把握', '有信心'] },
  { key: 'satisfaction', icon: '✅', label: ['Satisfaction', '满意度'], helper: ['How well the journey met your expectations overall.', '整体行程是否符合你的预期。'], ends: ['Dissatisfied', 'Satisfied', '不满意', '满意'] },
  { key: 'happy', icon: '✨', label: ['Enjoyment', '愉悦感'], helper: ['Enjoyment, delight or fun along the way, beyond simply reaching your destination.', '除了到达目的地，途中是否感到开心、有趣或愉悦。'], ends: ['Unhappy', 'Joyful', '不开心', '愉悦'] }
];
const TRAVEL_MODES = {
  foot: { icon: '🚶', name: ['Walk', '步行'], role: 'Pedestrian' },
  bike: { icon: '🚲', name: ['Cycle', '骑行'], role: 'Cyclist' },
  car: { icon: '🚗', name: ['Drive', '驾车'], role: 'Car driver' }
};
const liveMaps = new Map();
const geocodeCache = new Map();
// Verified named demo landmarks; keep the presentation independent of fuzzy place ranking.
const DEMO_PLACES = [
  // Photon / OpenStreetMap ways 1313006521 and 30191487, checked 2026-11-15.
  { label: 'Tõrvandi kool', aliases: ['torvandi kool', 'tõrvandi school', 'torvandi school'], lat: 58.3207374, lng: 26.703677 },
  { label: 'Tamme staadion', aliases: ['tamme stadium', 'tamme staadion, tartu'], lat: 58.3666166, lng: 26.7135996 },
  { label: 'Raudteejaam, Tartu', aliases: ['center station', 'central station', 'centre station'], lat: 58.3737237, lng: 26.7071639 },
  { label: 'Tartu Town Hall', aliases: ['town hall'], lat: 58.3799959, lng: 26.7217799 }
];
let mapSequence = 0;
let lastServiceCall = 0;

function mText(en, zh) { return state.language === 'zh' ? zh : en; }
function categoryText(values) { return mText(...values); }
function neutralScores() { return Object.fromEntries(MOBILITY_CATEGORIES.map(({ key }) => [key, 50])); }
function scoreFace(value, key) {
  const positive = key === 'stress' ? 100 - value : value;
  return positive < 35 ? '😢' : positive < 70 ? '😐' : '😊';
}
function validPoint(point) {
  return point && Number.isFinite(point.lat) && Number.isFinite(point.lng) && Math.abs(point.lat) <= 90 && Math.abs(point.lng) <= 180;
}
function validScores(scores) {
  return Object.fromEntries(MOBILITY_CATEGORIES.filter(({ key }) => Number.isFinite(scores?.[key]) && scores[key] >= 0 && scores[key] <= 100).map(({ key }) => [key, scores[key]]));
}
function renderExperienceSliders() {
  return `<p class="note">${mText('Rate the dimensions you experienced. Untouched sliders are not submitted. Stress: higher = more stressed.', '评价你实际感受到的维度，未操作的滑块不会提交。压力：分数越高，压力越大。')}</p>
    <div class="slider-list">${MOBILITY_CATEGORIES.map((category) => {
      const { key, icon } = category;
      const value = state.feedbackScores[key] ?? 50;
      const rated = !!state.feedbackAnswered[key];
      const ends = category.ends.slice(state.language === 'zh' ? 2 : 0);
      return `<div class="slider-item" id="rating-${key}">
        <div class="slider-header"><label for="score-${key}">${icon} ${categoryText(category.label)}</label>
          <button class="info-dot" type="button" aria-label="${escapeHtml(categoryText(category.label))}: ${mText('definition', '定义')}" aria-expanded="false" aria-controls="help-${key}" onclick="toggleCategoryHelp('${key}',this)">?</button></div>
        <p class="category-help" id="help-${key}" hidden>${categoryText(category.helper)}</p>
        <div class="emoji-range" style="--rating-position:calc(${value}% + ${18 - value * .36}px)">
          <input id="score-${key}" type="range" min="0" max="100" step="1" value="${value}" aria-describedby="help-${key} ends-${key}" aria-valuetext="${rated ? value + '/100' : mText('Not rated', '未评分')}" onpointerdown="updateExperienceScore('${key}',this)" oninput="updateExperienceScore('${key}',this)">
          <span class="emoji-thumb" aria-hidden="true">${scoreFace(value, key)}</span>
        </div>
        <div class="slider-ends" id="ends-${key}"><span>0 · ${ends[0]}</span><span>100 · ${ends[1]}</span></div>
        <div class="rating-value"><output for="score-${key}">${rated ? value + ' / 100' : mText('Not rated', '未评分')}</output>
          <button type="button" class="link" onclick="updateExperienceScore('${key}',document.getElementById('score-${key}'))">${mText('Use this value', '使用此分值')}</button></div>
      </div>`;
    }).join('')}</div>`;
}
function toggleCategoryHelp(key, button) {
  const help = document.getElementById(`help-${key}`);
  help.hidden = !help.hidden;
  button.setAttribute('aria-expanded', String(!help.hidden));
}
function updateExperienceScore(key, input) {
  const value = Number(input.value);
  state.feedbackScores[key] = value;
  state.feedbackAnswered[key] = true;
  const item = document.getElementById(`rating-${key}`);
  item.querySelector('.emoji-range').style.setProperty('--rating-position', `calc(${value}% + ${18 - value * .36}px)`);
  item.querySelector('.emoji-thumb').textContent = scoreFace(value, key);
  item.querySelector('output').textContent = `${value} / 100`;
  input.setAttribute('aria-valuetext', `${value}/100`);
}
function reportScoresMarkup(report) {
  return `<div class="rating-summary">${MOBILITY_CATEGORIES.filter(({ key }) => key in validScores(report.score)).map(({ key, label, icon }) => `<span class="score-pill">${icon} ${categoryText(label)} ${report.score[key]}/100 ${scoreFace(report.score[key], key)}</span>`).join('')}</div>`;
}

function realMapMarkup(kind) {
  return `<div class="map-shell"><div class="real-map ${kind === 'reports' ? 'experience-map' : ''}" id="osm-${++mapSequence}" data-map-kind="${kind}" aria-label="OpenStreetMap"></div>
    <p class="map-message" role="status" hidden></p>
    <p class="note map-note">${kind === 'pick' ? mText('Tap the map to pin the exact section.', '点击地图标记具体路段。') : kind === 'reports' ? mText('Select a pin to read feedback.', '点击标记查看反馈。') : mText('Select a route card to compare paths.', '选择路线卡片对比路径。')}
      <a href="https://www.openstreetmap.org/fixthemap" target="_blank" rel="noopener">${mText('Fix the map', '反馈地图错误')}</a></p></div>`;
}
function destroyMaps(container = document) {
  for (const [node, mapInstance] of liveMaps) {
    if (!node.isConnected || container.contains(node)) {
      mapInstance.remove();
      liveMaps.delete(node);
    }
  }
}
function initRealMaps() {
  document.querySelectorAll('.real-map[data-map-kind]').forEach((node) => {
    if (liveMaps.has(node)) return;
    const message = node.parentElement.querySelector('.map-message');
    if (!window.L) {
      node.innerHTML = `<div class="map-unavailable">${mText('The map could not load. Check your connection and reload.', '地图加载失败，请检查网络后刷新。')}<br><a href="https://www.openstreetmap.org/#map=13/58.3776/26.729" target="_blank" rel="noopener">OpenStreetMap ↗</a></div>`;
      return;
    }
    const L = window.L;
    const kind = node.dataset.mapKind;
    const instance = L.map(node, { scrollWheelZoom: false }).setView(MAP_CENTER, 13);
    liveMaps.set(node, instance);
    L.tileLayer(MAP_CONFIG.tiles, {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
    }).on('tileerror', () => {
      message.hidden = false;
      message.textContent = mText('Some map tiles could not load. Check your connection.', '部分地图图块加载失败，请检查网络。');
    }).addTo(instance);
    if (kind === 'pick') {
      let marker;
      if (validPoint(state.pin)) {
        marker = L.marker([state.pin.lat, state.pin.lng]).addTo(instance);
        instance.setView([state.pin.lat, state.pin.lng], 16, { animate: false });
      }
      instance.on('click', ({ latlng }) => {
        state.pin = { lat: latlng.lat, lng: latlng.lng };
        if (marker) marker.setLatLng(latlng);
        else marker = L.marker(latlng).addTo(instance);
        const previousCoordinateLabel = /^-?\d+\.\d+, -?\d+\.\d+$/.test(state.place);
        if (!state.place.trim() || previousCoordinateLabel) state.place = `${latlng.lat.toFixed(5)}, ${latlng.lng.toFixed(5)}`;
        const placeInput = document.getElementById('place');
        if (placeInput) placeInput.value = state.place;
      });
    } else if (kind === 'reports') {
      const points = [];
      const shownPlaces = new Set();
      data.reports.forEach((report, index) => {
        const placeKey = report.locationId || report.place;
        if (shownPlaces.has(placeKey)) return;
        shownPlaces.add(placeKey);
        if (!validPoint(report)) return;
        points.push([report.lat, report.lng]);
        L.circleMarker([report.lat, report.lng], { radius: 9, color: '#fff', weight: 2, fillOpacity: .95,
          fillColor: experienceColor(report) })
          .addTo(instance).bindTooltip(`${escapeHtml(report.place)}`).on('click', () => showReport(index));
      });
      if (points.length) instance.fitBounds(points, { padding: [28, 28], maxZoom: 14, animate: false });
    } else if (kind === 'route') {
      const selected = getSelectedRoute();
      [...state.routes].sort((a, b) => Number(a.id === selected?.id) - Number(b.id === selected?.id)).forEach((route) => {
        const active = route.id === selected?.id;
        L.polyline(route.coords, { color: active ? '#275e47' : '#8b96af', weight: active ? 6 : 4, opacity: active ? .95 : .65 })
          .addTo(instance).on('click', () => selectRoute(route.id));
      });
      if (selected) {
        instance.fitBounds(selected.coords, { padding: [25, 25], animate: false });
        if (state.demoFeedbackEnabled && !routeFeedback(selected.coords).count) {
          (selected.demoReports || []).forEach((report) => {
            L.circleMarker([report.lat, report.lng], { radius: 8, color: '#fff', weight: 2, fillColor: '#986a32', fillOpacity: 1 })
              .addTo(instance).bindPopup(`<strong>${escapeHtml(report.author)}</strong><p>${escapeHtml(categoryText(report.comment))}</p>`);
          });
        }
        const start = state.routeOrigin;
        const end = state.routeEnd;
        [start, end].forEach((point, index) => {
          if (!validPoint(point)) return;
          L.marker([point.lat, point.lng]).addTo(instance).bindTooltip(`${index ? 'B' : 'A'} · ${escapeHtml(point.label)}`);
        });
      }
    }
  });
}

function formatDuration(seconds) {
  const minutes = Math.max(1, Math.round(seconds / 60));
  return minutes < 60 ? `${minutes} ${mText('min', '分钟')}` : `${Math.floor(minutes / 60)} ${mText('h', '小时')} ${minutes % 60} ${mText('min', '分钟')}`;
}
function formatDistance(meters) { return meters < 1000 ? `${Math.round(meters)} m` : `${(meters / 1000).toFixed(1)} km`; }
function routePlannerMarkup() {
  const busy = state.routeBusy;
  return `<span class="eyebrow">${mText('YOUR NEXT JOURNEY', '下一段行程')}</span>
    <h2>${mText('Find your way.', '找到适合你的路线。')}</h2>
    <p>${mText('Compare the journey, not just the arrival time.', '不仅对比到达时间，也了解沿途体验。')}</p>
    <form class="route-planner" onsubmit="event.preventDefault(); findRoutes()">
      <fieldset ${busy ? 'disabled' : ''}>
      <div class="route-input-grid">
        <div><label for="routeStart">A · ${mText('From', '起点')}</label>
          <input id="routeStart" value="${escapeHtml(state.routeStart)}" placeholder="${mText('Current location', '当前位置')}" maxlength="200" oninput="updateRouteField('start',this.value)">
          <button class="link" type="button" onclick="useCurrentOrigin()">⌖ ${mText('Use current location', '使用当前位置')}</button></div>
        <div><label for="routeDestination">B · ${mText('To', '目的地')}</label>
          <input id="routeDestination" value="${escapeHtml(state.routeDestination)}" placeholder="${mText('Place, address or lat, lng', '地点、地址或纬度, 经度')}" maxlength="200" required oninput="updateRouteField('destination',this.value)"></div>
      </div>
      <label for="travelMode">${mText('Travel mode', '出行方式')}</label>
      <select id="travelMode" onchange="state.routeMode=this.value; invalidateRoutes()">${Object.entries(TRAVEL_MODES).map(([key, mode]) => `<option value="${key}" ${state.routeMode === key ? 'selected' : ''}>${mode.icon} ${categoryText(mode.name)}</option>`).join('')}</select></fieldset>
      <button class="primary wide" id="findRoutesButton" type="submit" ${busy ? 'disabled' : ''}>${busy ? mText('Finding routes…', '正在查询路线…') : mText('Find routes →', '查询路线 →')}</button>
      <p class="note">${mText('A single location fix is requested only when you search from your current location. Place searches go to Photon; route endpoints go to FOSSGIS. Estimates exclude live traffic.', '仅在从当前位置查询时请求一次定位。地点查询发送至 Photon；路线端点发送至 FOSSGIS。预计时长不包含实时路况。')}</p>
    </form>
    <div id="routeResults" aria-busy="${busy}">${routeResultsMarkup()}</div>`;
}
function routeResultsMarkup() {
  const choices = state.routeChoices;
  if (choices) return `<div class="place-choices"><h3>${choices.field === 'start' ? mText('Choose your starting point', '选择起点') : mText('Choose your destination', '选择目的地')}</h3>${choices.points.map((point, index) => `<button type="button" class="place-choice" onclick="chooseRoutePlace(${index})">📍 ${escapeHtml(point.label)}</button>`).join('')}</div>`;
  if (state.routeBusy) return `<p role="status" class="route-notice">${mText('Locating places and checking available routes…', '正在定位地点并查询可用路线…')}</p>`;
  if (state.routeError) return `<p role="alert" class="route-notice error">${escapeHtml(state.routeError)}</p>${realMapMarkup('route')}`;
  if (!state.routes.length) return `<p class="route-notice">${mText('Enter a destination to compare available routes. Add a city for a more precise place search.', '输入目的地以对比可用路线；添加城市名称能帮助准确查找。')}</p>${realMapMarkup('route')}`;
  const selected = getSelectedRoute();
  return `<p class="note route-endpoints">A · ${escapeHtml(state.routeOrigin.label)}<br>B · ${escapeHtml(state.routeEnd.label)}</p>
    <p class="note" role="status">${state.routes.length === 1 ? mText('One route returned. No alternative was available for this search.', '本次仅返回一条路线，没有可用的备选路线。') : mText(`${state.routes.length} available routes · select one to compare`, `${state.routes.length} 条可用路线 · 选择以对比`)}
      · <a href="https://routing.openstreetmap.de/about.html" target="_blank" rel="noopener">OSRM / FOSSGIS</a></p>
    <div class="route-option-list">${state.routes.map((route, index) => `<button type="button" class="route-option-card ${route.id === selected.id ? 'selected' : ''}" aria-pressed="${route.id === selected.id}" onclick="selectRoute('${route.id}')">
      <div class="route-top-row"><strong>${TRAVEL_MODES[state.routeMode].icon} ${mText('Route', '路线')} ${index + 1}</strong><span class="tag">${route.id === selected.id ? mText('Selected', '已选') : mText('Compare', '对比')}</span></div>
      <div class="route-meta-row"><span>⏱ ${formatDuration(route.duration)}</span><span>↗ ${formatDistance(route.distance)}</span>${route.duration === Math.min(...state.routes.map((r) => r.duration)) ? `<span>${mText('Shortest estimated time', '预计用时最短')}</span>` : ''}</div>
      ${feedbackSummary(route.coords, route.demoReports)}
    </button>`).join('')}</div>
    ${realMapMarkup('route')}
    <p class="note">${mText(`Feedback within ${MAP_CONFIG.feedbackRadiusMeters} m, from the last ${MAP_CONFIG.feedbackMaxAgeDays} days. Counts mean reports; ratings describe personal experiences and are not a safety guarantee.`, `汇总路线 ${MAP_CONFIG.feedbackRadiusMeters} 米内、近 ${MAP_CONFIG.feedbackMaxAgeDays} 天的反馈。数量为反馈条数；评分描述个人体验，不代表安全保证。`)}</p>
    <details class="route-detail" open><summary>${mText('Along this route', '沿途路段')} · ${selected.segments.length}</summary>
      ${selected.segments.map((segment, index) => `<article class="route-segment"><div class="row"><strong>${index + 1}. ${escapeHtml(segment.name)}</strong><span>⏱ ${formatDuration(segment.duration)}</span></div><small>↗ ${formatDistance(segment.distance)}</small>${feedbackSummary(segment.coords, selected.demoReports)}${simulatedVoicesMarkup(segment.coords, selected.demoReports)}<button type="button" class="link" onclick="reportRouteSegment(${index})">＋ ${mText('Share an experience here', '反馈这段路的体验')}</button></article>`).join('')}
    </details>`;
}
function refreshRouteResults() {
  const target = document.getElementById('routeResults');
  if (!target) return;
  destroyMaps(target);
  target.innerHTML = routeResultsMarkup();
  target.setAttribute('aria-busy', String(state.routeBusy));
  initRealMaps();
}
function invalidateRoutes() {
  state.routes = [];
  state.selectedRouteId = null;
  state.routeChoices = null;
  state.routeError = '';
  refreshRouteResults();
}
function updateRouteField(field, value) {
  if (field === 'start') {
    state.routeStart = value;
    state.routeOrigin = null;
    state.useCurrentLocation = !value.trim();
  } else {
    state.routeDestination = value;
    state.routeEnd = null;
  }
  // Never replace a focused input while typing.
  if (state.routes.length || state.routeChoices || state.routeError) invalidateRoutes();
}
function useCurrentOrigin() {
  state.routeStart = '';
  state.routeOrigin = null;
  state.useCurrentLocation = true;
  const input = document.getElementById('routeStart');
  if (input) input.value = '';
  invalidateRoutes();
}
function selectRoute(id) {
  if (!state.routes.some((route) => route.id === id)) return;
  state.selectedRouteId = id;
  refreshRouteResults();
}
async function serviceJson(url) {
  const delay = Math.max(0, 1100 - (Date.now() - lastServiceCall));
  if (delay) await new Promise((resolve) => setTimeout(resolve, delay));
  lastServiceCall = Date.now();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(mText('The map service is unavailable or busy. Please try again shortly.', '地图服务暂时不可用或繁忙，请稍后重试。'));
    return await response.json();
  } finally { clearTimeout(timeout); }
}
async function searchPlace(query) {
  const coordinateMatch = query.trim().match(/^(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)$/);
  if (coordinateMatch) {
    const point = { lat: Number(coordinateMatch[1]), lng: Number(coordinateMatch[2]), label: query.trim() };
    return validPoint(point) ? [point] : [];
  }
  const key = query.trim().toLowerCase().replace(/\s+/g, ' ');
  const landmark = DEMO_PLACES.find((point) => point.label.toLowerCase() === key || point.aliases.includes(key));
  if (landmark) return [{ ...landmark }];
  if (geocodeCache.has(key)) return geocodeCache.get(key);
  const url = new URL(MAP_CONFIG.geocoder);
  url.searchParams.set('q', query.trim());
  url.searchParams.set('limit', '5');
  const result = await serviceJson(url);
  const points = (result.features || []).map((feature) => {
    const p = feature.properties || {};
    const coordinates = feature.geometry?.coordinates || [];
    return { lat: coordinates[1], lng: coordinates[0], label: [...new Set([p.name, [p.street, p.housenumber].filter(Boolean).join(' '), p.postcode, p.city || p.town || p.village, p.state, p.country].filter(Boolean))].join(', ') };
  }).filter((point) => validPoint(point) && point.label);
  geocodeCache.set(key, points);
  return points;
}
function currentLocation() {
  return new Promise((resolve, reject) => {
    if (!window.isSecureContext || !navigator.geolocation) return reject(new Error(mText('Location needs HTTPS or localhost. Enter a starting address instead.', '定位需要 HTTPS 或 localhost。你也可以手动输入起点。')));
    navigator.geolocation.getCurrentPosition(({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude, label: mText('Current location', '当前位置') }),
      () => reject(new Error(mText('Could not access your location. Allow location access and retry, or enter a starting address.', '无法获取当前位置。请允许定位后重试，或手动输入起点。'))),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 60000 });
  });
}
async function findRoutes() {
  if (state.routeBusy) return;
  if (!state.routeDestination.trim()) {
    state.routeError = mText('Enter a destination first.', '请先输入目的地。');
    refreshRouteResults();
    return;
  }
  state.routeBusy = true;
  state.routeError = '';
  state.routeChoices = null;
  state.routes = [];
  render();
  try {
    if (state.useCurrentLocation && !state.routeOrigin) state.routeOrigin = await currentLocation();
    for (const field of ['start', 'destination']) {
      const pointKey = field === 'start' ? 'routeOrigin' : 'routeEnd';
      if (state[pointKey]) continue;
      const query = field === 'start' ? state.routeStart : state.routeDestination;
      const points = await searchPlace(query);
      if (!points.length) throw new Error(mText(`No place found for “${query}”. Add a city or use latitude, longitude.`, `未找到“${query}”。请添加城市，或输入纬度, 经度。`));
      if (points.length > 1) {
        state.routeChoices = { field, points };
        return;
      }
      state[pointKey] = points[0];
    }
    const { routeOrigin: from, routeEnd: to } = state;
    if (Math.abs(from.lat - to.lat) + Math.abs(from.lng - to.lng) < .00001) throw new Error(mText('Choose a destination different from your starting point.', '请选择与起点不同的目的地。'));
    const url = `${MAP_CONFIG.routing}/routed-${state.routeMode}/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?alternatives=true&steps=true&overview=full&geometries=geojson&radiuses=1000;1000`;
    const result = await serviceJson(url);
    if (result.code !== 'Ok' || !result.routes?.length) throw new Error(mText('No connected route was found for this travel mode. Try another mode or nearby points.', '该出行方式没有找到连通路线。请尝试其他方式或附近的起终点。'));
    state.routes = result.routes.slice(0, 3).map((route, index) => ({
      id: `route-${index}`, duration: route.duration, distance: route.distance,
      coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]),
      segments: buildRouteSegments(route)
    }));
    state.selectedRouteId = state.routes[0].id;
    prepareDemoFeedback();
  } catch (error) {
    state.routeError = error.name === 'AbortError' ? mText('The request timed out. Please try again.', '请求超时，请重试。') : error instanceof TypeError ? mText('Could not connect to the map service. Check your connection and try again.', '无法连接地图服务，请检查网络并重试。') : error.message;
  } finally {
    state.routeBusy = false;
    render();
  }
}
function chooseRoutePlace(index) {
  const choices = state.routeChoices;
  const point = choices?.points[index];
  if (!point) return;
  state[choices.field === 'start' ? 'routeOrigin' : 'routeEnd'] = point;
  state[choices.field === 'start' ? 'routeStart' : 'routeDestination'] = point.label;
  state.routeChoices = null;
  return findRoutes();
}
function buildRouteSegments(route) {
  const steps = (route.legs || []).flatMap((leg) => leg.steps || []).filter((step) => step.distance > 0 && step.geometry?.coordinates?.length);
  if (!steps.length) return [{ name: mText('Full route', '完整路线'), duration: route.duration, distance: route.distance, coords: route.geometry.coordinates.map(([lng, lat]) => [lat, lng]) }];
  const size = Math.ceil(steps.length / 6);
  const segments = [];
  for (let index = 0; index < steps.length; index += size) {
    const group = steps.slice(index, index + size);
    const names = [...new Set(group.map((step) => step.name).filter(Boolean))];
    segments.push({ name: names.slice(0, 2).join(' → ') || mText('Unnamed path', '未命名道路'),
      duration: group.reduce((sum, step) => sum + step.duration, 0), distance: group.reduce((sum, step) => sum + step.distance, 0),
      coords: group.flatMap((step) => step.geometry.coordinates.map(([lng, lat]) => [lat, lng])) });
  }
  return segments;
}
// Local tangent-plane distance to each line segment, in metres (appropriate for the 60 m matching radius).
function distanceToRoute(point, coords) {
  if (!validPoint(point) || !coords?.length) return Infinity;
  const scale = Math.cos(point.lat * Math.PI / 180);
  const project = ([lat, lng]) => {
    const deltaLng = ((lng - point.lng + 540) % 360) - 180;
    return [deltaLng * 111320 * scale, (lat - point.lat) * 111320];
  };
  let best = Infinity;
  for (let index = 0; index < Math.max(coords.length - 1, 1); index++) {
    const a = project(coords[index]);
    const b = project(coords[index + 1] || coords[index]);
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const t = Math.max(0, Math.min(1, -(a[0] * dx + a[1] * dy) / (dx * dx + dy * dy || 1)));
    best = Math.min(best, Math.hypot(a[0] + t * dx, a[1] + t * dy));
  }
  return best;
}
function routeFeedback(coords, reports = data.reports, now = Date.now()) {
  const nearby = reports.filter((report) => {
    const age = now - Date.parse(report.createdAt);
    return !report.isDemo && age >= 0 && age <= MAP_CONFIG.feedbackMaxAgeDays * 86400000 && distanceToRoute(report, coords) <= MAP_CONFIG.feedbackRadiusMeters;
  });
  const scores = Object.fromEntries(MOBILITY_CATEGORIES.map(({ key }) => {
    const values = nearby.map((report) => validScores(report.score)[key]).filter(Number.isFinite);
    return [key, { count: values.length, average: values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : null }];
  }));
  return { count: nearby.length, scores };
}
function feedbackSummary(coords, demoReports = []) {
  const real = routeFeedback(coords);
  const simulated = !real.count && state.demoFeedbackEnabled && demoReports.length;
  const feedback = simulated ? routeFeedback(coords, demoReports.map((report) => ({ ...report, isDemo: false }))) : real;
  if (!feedback.count) return `<p class="no-feedback">👥 ${mText('No recent feedback on this section', '该路段暂无近期反馈')}</p>`;
  return `<p class="feedback-count">👥 ${feedback.count} ${mText('reports', '条反馈')}</p><div class="route-score-row">${MOBILITY_CATEGORIES.filter(({ key }) => feedback.scores[key].count).map(({ key, icon, label }) => {
    const score = feedback.scores[key];
    return `<span class="score-pill" title="${score.count} ${mText('ratings · subjective average', '个评分 · 主观平均值')}">${icon} ${categoryText(label)} ${score.average}/100 ${scoreFace(score.average, key)} <small>n=${score.count}</small></span>`;
  }).join('')}</div>`;
}
function loadDemoJourney() {
  if (state.routeBusy) return;
  state.routeStart = DEMO_PLACES[0].label;
  state.routeDestination = DEMO_PLACES[1].label;
  state.routeOrigin = null;
  state.routeEnd = null;
  state.useCurrentLocation = false;
  state.routeMode = 'foot';
  state.demoFeedbackEnabled = true;
  return findRoutes();
}
function toggleDemoFeedback(enabled) {
  state.demoFeedbackEnabled = enabled;
  prepareDemoFeedback();
  refreshRouteResults();
}
function prepareDemoFeedback() {
  const enjoyableJourney = {
    foot: ['This part felt calm and easy to follow. I enjoyed the walk.', '这一段走起来比较放松，方向也清楚，步行体验很好。'],
    bike: ['This part felt calm and easy to follow. I enjoyed the ride.', '这一段骑起来比较放松，方向也清楚，骑行体验很好。'],
    car: ['This part felt calm and easy to follow. I enjoyed the drive.', '这一段开起来比较轻松，路线也清楚，驾车体验很好。']
  }[state.routeMode] || ['This part felt calm and easy to follow. I enjoyed the journey.', '这一段比较放松，方向也清楚，出行体验很好。'];
  const voices = [
    { name: 'Mari', scores: [45, 42, 65, 76, 48, 46, 38], comment: ['I felt tense here with traffic close by. More space would help.', '这段路车流靠得比较近，让我有些紧张，希望有更多通行空间。'] },
    { name: 'Karl', scores: [86, 83, 82, 22, 87, 85, 80], comment: enjoyableJourney },
    { name: 'Liis', scores: [68, 61, 45, 56, 53, 62, 60], comment: ['The route was okay, but I hesitated about which way to go.', '整体还可以，但在选择前进方向时犹豫了一下。'] },
    { name: 'Andres', scores: [75, 78, 74, 35, 77, 80, 84], comment: ['A pleasant section. I would take this way again.', '这段路很愉快，我愿意再走这条路。'] }
  ];
  state.routes.forEach((route, routeIndex) => {
    // Session-only records, never written into real reports or localStorage.
    route.demoReports = [];
    if (!state.demoFeedbackEnabled || routeFeedback(route.coords).count) return;
    route.segments.forEach((segment, segmentIndex) => {
      const point = segment.coords[Math.floor(segment.coords.length / 2)];
      if (!point) return;
      const voice = voices[(routeIndex + segmentIndex) % voices.length];
      route.demoReports.push({
        id: `SIM-${route.id}-${segmentIndex}`, isDemo: true, mine: false,
        author: voice.name, comment: voice.comment, lat: point[0], lng: point[1],
        createdAt: new Date().toISOString(),
        score: Object.fromEntries(MOBILITY_CATEGORIES.map(({ key }, index) => [key, voice.scores[index]]))
      });
    });
  });
}
function simulatedVoicesMarkup(coords, reports = []) {
  if (!state.demoFeedbackEnabled || routeFeedback(coords).count) return '';
  return reports.filter((report) => distanceToRoute(report, coords) <= MAP_CONFIG.feedbackRadiusMeters).slice(0, 2)
    .map((report) => `<div class="card soft" style="padding:10px;margin:10px 0"><strong>${escapeHtml(report.author)}</strong><p style="margin:5px 0">${escapeHtml(categoryText(report.comment))}</p></div>`).join('');
}

function reportRouteSegment(index) {
  const route = getSelectedRoute();
  const segment = route?.segments[index];
  if (!segment) return;
  const point = segment.coords[Math.floor(segment.coords.length / 2)];
  state.routeFocusSegment = segment.name;
  state.shareEntry = 'commute';
  state.backTarget = 'commute';
  state.tab = 'share';
  state.step = 2;
  resetReportContext();
  state.transportMode = {foot:'Walking',bike:'Cycling',car:'Driving'}[state.routeMode];
  state.roles = [];
  state.place = segment.name;
  state.comment = '';
  state.pin = { lat: point[0], lng: point[1] };
  state.feedbackScores = neutralScores();
  state.feedbackAnswered = {};
  render();
}
