# Common Ground MVP

Open this folder in VS Code. Main files:

- index.html: page structure
- styles.css: layout and visual design
- app.js: interactions and demo data
- mobility.js: real maps, routing, geographic feedback aggregation and seven rating sliders
- planning.js: contextual reports, preset migration, the crossing case and planner evidence/review
- map-config.js: replaceable tile, search and routing endpoints; feedback distance/age settings

## Run it locally

Quickest: use the VS Code Live Server extension, right-click index.html, then choose **Open with Live Server**. Serve over HTTP on localhost or HTTPS; do not open the HTML with `file://` (map services require an HTTP referrer).

You can also serve it from the command line:

```bash
cd "c:\Users\ga53pic\OneDrive - TUM\EIT\Course_EntrepreneurshipInnovationModules\InnovationPitch"
python -m http.server 8000 --bind 127.0.0.1
```

Then open:

- http://127.0.0.1:8000/common-ground-vscode/

Browser location access requires HTTPS or localhost and the user's location permission. Manual starting addresses work when location is unavailable. The planner requests a single position; it does not start continuous tracking or persist the route endpoints.

## Try the new features

### Presentation shortcut

Routes opens with **From: Tõrvandi kool** and **To: Tamme staadion**. Both names resolve directly to verified OpenStreetMap landmarks; no coordinates or place-choice step is needed. **Torvandi kool** and **Tamme stadium** also work. Names are matched without regard to capitalization or extra spaces. Other place names still use normal place search; the earlier station and town hall aliases remain available.

Open **Routes**, choose the travel mode, then click **Find routes** to search from **Tõrvandi kool** to **Tamme staadion**. The endpoint locations were checked against Photon / OpenStreetMap on 2026-11-15. The number of alternatives depends on the live routing service. You can still edit both fields or select **Use current location**.

Simulated feedback is added automatically for presentations; there is no separate shortcut button or feedback toggle in the form. After a successful route search, each route without recent real feedback gets session-only simulated reports along its actual sections. Cards show seven-dimensional ratings; section details show fictional names/comments; brown map pins open simulated comments. These remain synthetic internally and are never saved into real reports or localStorage; the presentation UI omits demo badges. Routes with real feedback are not padded with simulated ratings. The original three sample map pins remain excluded from real aggregates.

1. Open **Routes**. Leave the start empty for current location, or enter a starting address. Enter any destination and select walking, cycling or driving. Use city names to disambiguate places; `latitude, longitude` is also accepted.
2. Click **Find routes**, select a matching place if prompted, then compare returned routes. Times and distances come from the routing service, without live traffic. The service may return only one route; alternatives are never invented.
3. Select a route to highlight it on OpenStreetMap. Expand its sections for estimated duration, distance and nearby ratings. Click **Share an experience here** to rate a section; adjust the map pin to the actual location if needed.
4. In **Share**, choose a transport mode; perspectives are optional. Pin the location and record when it happened (just now, a specific time or a recurring situation). Rate any of Safety, Comfort, Clarity, Stress, Confidence, Satisfaction and Enjoyment. The question mark opens the definition. Untouched sliders are omitted; **Use this value** explicitly submits the current value. Higher stress means a worse experience.
5. Optionally add an explanation or a JPG/PNG/WebP photo up to 1 MB, stored only in this browser. No age, gender, income, diagnosis or other demographic disclosure is required. Submit, then inspect **My updates** or the map pin to see the saved dimension scores. Reopen the route to see its local feedback summary update.

## What is live and what is local

- All experience maps use Leaflet 1.9.4 and real OpenStreetMap tiles. Place search uses Photon; walking/cycling/driving paths use the matching FOSSGIS OSRM profiles.
- There is **no shared backend or authentication**. Reports, city responses and preferences remain in this browser's localStorage. Other devices/users cannot contribute to the same dataset yet. A database/API with appropriate access controls is required for genuine community feedback.
- Real route summaries use non-demo reports with valid coordinates and a timestamp from the last 90 days, within 60 metres of the route geometry. These defaults are configurable. Each category shows its own sample size; missing ratings never count as zero. Counts mean reports, not unique residents. The presentation fallback above uses synthetic feedback; its internal flags remain separate from real reports.
- The three sample map pins are excluded from real route ratings and followed by default, so they also appear in My Updates as Following. Their positions are illustrative. Legacy reports that only contain pixel positions or lack a timestamp are retained in the feedback list, but are not used for geographic route summaries.
- Scenarios and the profile's historic commute records remain demonstration data. No real city submission, continuous GPS recording, live traffic or public-transport timetable is implemented.


## Context and planning case

The original three reports now have seven category scores, a transport mode, optional journey perspectives and recurring time context. Existing comments, responses and valid scores survive migration. `happy` remains the stored key for the renamed Enjoyment category so existing scores are compatible. Three-way feeling labels no longer drive cards, filters or map colors; choose an experience dimension on the map.

The Riia case contains Kadri’s report plus 11 scenario records, each with inspectable scores, perspectives and time windows. The city overview computes the count of 12 from Safety scores below 35/100. Parent/child, cycling and accessibility perspectives can overlap; report counts do not imply unique people or measured collision risk. Added real reports can change this count. The three original places remain the default followed reports; the supporting records are available in the city view.

Traffic values are explicitly marked **scenario reference values**, not real field measurements (P85 43 km/h, reference limit 30 km/h, 116 turning movements/hour). A planner can replace them with survey values, a source and a survey date/time window. A separate planner rationale flags the place for closer investigation. No report submission or pattern threshold selects or publishes a measure. **Common Ground helps planners identify, interpret, and prioritize issues. Humans remain responsible for decisions.**

## City workspace

The city view has compact navigation for **Resident reports, Patterns, Investigation, and Decisions & updates**. Content fills the workspace directly; no presentation graphic, numbered flow or decorative sidebar appears above or beside the working interface. Report cards and maps use two columns on wide screens and stack on narrow screens.

- Personal reports opens Kadri's crossing report, all seven ratings, context, and the existing reply workflow.
- Pattern identification derives its report counts from the shared records, with perspective groups, recurring times, supporting reports and an OpenStreetMap view.
- Investigation retains the traffic-evidence form and the planner's written assessment.
- Decision making retains option comparison, resident consultation and progress updates. Moving between stages does not select or publish an intervention.

`city-workspace.js` contains the city presentation and navigation; `city-workspace.css` scopes its styling to city mode. The resident interface uses its existing styling.

## Public service operation

This is a small, manually operated prototype, not a production routing service. External services can be unavailable or rate limited; the UI shows failures and permits retry/manual origin entry.

- [OSM tile policy](https://operations.osmfoundation.org/policies/tiles/): retain visible linked attribution, browser referrers and normal browser caching. No bulk downloading or offline tile prefetch.
- [Photon service](https://photon.komoot.io/): fair use, throttled under extensive usage, no availability guarantee. Searches run only on submission and are cached in memory; no keystroke autocomplete requests.
- [FOSSGIS routing service](https://routing.openstreetmap.de/about.html): maximum one request per second, attribution and a fix-the-map link. Service calls are serialized and spaced at least 1.1 seconds apart within this page. Multiple visitors/tabs need a shared server-side rate limiter or a production provider; a browser-only limiter cannot enforce the application-wide limit.
- Query text goes to Photon; route endpoint coordinates go to FOSSGIS; map tile requests go to OSM. Providers receive ordinary web request metadata. The app describes these transfers beside the search button.
- Replace endpoints in `map-config.js` when deploying beyond a small demo. Keep API credentials on a backend, never in client JavaScript. The app does not use the public Nominatim endpoint.

## Checks

With Node.js installed:

```bash
cd common-ground-vscode
node tests/mobility.test.cjs
```

The checks cover score direction, missing values, geographic matching, legacy migration, route alternatives, ambiguous places, denied location, network/no-route failures, saving/reloading scores and avoiding full renders during input. They use isolated storage and mocked network responses; they do not modify your browser's reports.

For a browser check, enter the named presentation endpoints, switch alternatives, inspect the automatically added simulated feedback, move a slider continuously, open its definition, submit a test experience, reload and inspect the saved scores. Also check narrow screens and disconnected-network states.

## Publish it publicly

This app is static HTML/CSS/JS, so it is ready for Netlify or similar hosting.

1. Push this project to a GitHub repository.
2. Import the repository into Netlify.
3. Set the publish directory to `common-ground-vscode`.
4. Deploy.

A Netlify config is already included at the project root in `netlify.toml`.

The resident app and City workspace share the same localStorage dataset in this browser. Deployment alone does not add multi-user storage.
