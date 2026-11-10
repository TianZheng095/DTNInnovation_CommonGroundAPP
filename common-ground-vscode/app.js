const STORAGE_KEY = 'common-ground-mvp-v1';
const DEFAULT_LANGUAGE = 'en';

const LANGUAGES = {
  en: 'English',
  et: 'Eesti',
  de: 'Deutsch',
  zh: '中文'
};

const I18N = {
  en: {
    nav_explore: 'Explore',
    nav_share: 'Share',
    nav_commute: 'Commute',
    nav_updates: 'My updates',
    nav_profile: 'Profile',
    nav_plans: 'City plans',
    profile: 'Profile',
    language: 'Language',
    commute_title: 'Today’s commute trail',
    commute_summary: 'Track your route and flag issues on the live journey.',
    issue_tracking: 'Issue tracking',
    report_this_segment: 'Report this section',
    selected_segment: 'Selected segment',
    today_activity: 'Today’s activity',
    no_reports: 'No reports yet',
    total_issues: 'Total issues',
    high_priority: 'High priority',
    under_review: 'Under review',
    received: 'Received',
    planned: 'Planned',
    overview: 'Overview',
    resident_voices: 'Resident voices',
    compare_options: 'Compare options',
    decisions_updates: 'Decisions & updates',
    status_under_review: 'Under review',
    status_received: 'Received',
    status_planned: 'Planned',
    status_implemented: 'Implemented',
    status_completed: 'Completed',
    status_tracked: 'Tracked',
    priority_high: 'High',
    priority_medium: 'Medium',
    priority_low: 'Low',
    issue_summary: 'Issue summary',
    resident_issue_summary: 'Resident issue summary',
    all_issues: 'All issues',
    share_experience: 'Share an experience',
    commute_route: 'Today’s route summary',
    select_commute_segment: 'Select a route segment',
    back_to_commute: 'Back to route',
    back_to_previous: 'Back',
    resident_app: 'Resident app',
    city_workspace: 'City workspace',
    footer_brand: 'Common Ground · Giving mobility planning a human perspective.',
    footer_meta: 'Interactive MVP · Demo data · Saved in this browser',
    city_of_tartu: 'CITY OF TARTU',
    planning_workspace: 'Planning workspace',
    human_layer: 'The human layer',
    human_layer_copy: 'Combine lived experience with evidence. Keep people involved before deciding.',
    tab_overview: 'Overview',
    tab_feedback: 'Resident voices',
    tab_scenarios: 'Compare options',
    tab_decisions: 'Decisions & updates',
    export_feedback: '↓ Export feedback',
    shared_experiences: 'Shared experiences',
    need_review: 'Need review',
    safety_concerns: 'Safety concerns',
    resident_responses: 'Resident responses',
    all_perspectives: 'All perspectives',
    waiting_for_response: 'Waiting for a first response',
    lived_experience_signals: 'Lived experience signals',
    current_proposal: 'On the current proposal',
    experience_layer: 'The experience layer',
    voices: 'voices',
    recent_experiences: 'Recent experiences',
    view_all: 'View all →',
    from_experience_to_action: 'FROM EXPERIENCE TO ACTION',
    safer_crossing: 'What could a safer Riia crossing look like?',
    explore_options: 'Explore three illustrative options, then invite residents to respond.',
    compare_options_cta: 'Compare options →',
    search_feedback: 'Search location, comment or perspective…',
    resident_experiences: 'resident experiences',
    no_matching_experiences: 'No matching experiences. Try another search or filter.',
    select_experience: 'Select an experience to respond',
    consultation_open: 'Consultation open',
    no_proposal: 'No proposal published',
    review_options: 'Review options',
    compare_options_btn: 'Compare options →',
    resident_response: 'Resident response',
    no_responses_yet: 'No responses yet. Switch to Resident app → City plans to participate.',
    resident_hero_title: 'The city starts with your everyday',
    resident_hero_h1: 'Small moments. Better ways to move.',
    resident_intro: 'Try the resident app, then switch to the City workspace to see how your input moves forward.',
    resident_browse_title: 'Your everyday. Our common ground.',
    resident_browse_sub: 'How does moving around your neighbourhood feel?',
    share_heading: 'SHARE AN EXPERIENCE',
    share_step_title: 'Every perspective belongs here.',
    share_step_copy: 'How were you travelling? Choose one or more perspectives.',
    share_terms_title: 'Share on your terms.',
    share_terms_copy: 'No full name or precise home address needed. Please avoid personal details in your comment.',
    choose_place: 'Choose a place →',
    place_label: 'Location or landmark *',
    what_happened: 'What happened?',
    submit_experience: 'Submit experience →',
    choose_route: 'Select a route segment',
    initial_commute_summary: 'Today’s route summary',
    segments: 'segments',
    live_reports: 'live reports',
    travel_time: 'travel time',
    record_again: 'Record again',
    start_tracking: 'Start tracking',
    your_experience_matters: 'YOUR EXPERIENCE MATTERS',
    human_perspective_title: 'A human perspective<br>on every journey.',
    human_perspective_copy: 'A difficult crossing. A missed connection.<br>A route that works. Help your city see<br>what the numbers alone can’t tell.',
    step_share_moment: 'Share a moment',
    step_share_sub: 'A place, a feeling, your perspective.',
    step_shape_possibilities: 'Shape the possibilities',
    step_shape_sub: 'Respond to proposed improvements.',
    step_see_next: 'See what happens next',
    step_see_sub: 'Follow your input all the way through.',
    designed_for_busy_days: 'Designed for busy days. No meeting required.',
    little_input_big_picture: 'A LITTLE INPUT. A BIGGER PICTURE.',
    not_the_only_one: 'You’re not the only<br>one who noticed.',
    every_shared_experience: 'Every shared experience helps planners understand the journeys behind the data.',
    shared_experiences_metric: 'shared experiences',
    being_acted_on: 'being acted on',
    feedback_loop: 'THE FEEDBACK LOOP',
    feedback_loop_copy: 'People → City → Possibilities → People<br><strong style="color:var(--green)">You stay part of the decision.</strong>',
    good_morning: 'Good morning,',
    more_routes_for_adventures: 'Better routes for little adventures',
    route_adventure_copy: 'Help shape safer journeys to school and sport.',
    track_experience: 'Track my experience →',
    my_updates: 'My updates',
    my_updates_sub: 'Your experiences, and what happened next.',
    city_response: 'City response',
    received_by_city: 'Received by the city. No response yet.',
    view_timeline: 'View timeline →',
    share_first_experience: 'Share your first experience',
    help_shape_next: 'HELP SHAPE WHAT’S NEXT',
    neighbourhood_plans: 'Neighbourhood plans',
    see_trade_offs: 'See the trade-offs. Tell the city what works for you.',
    in_preparation: 'In preparation',
    safer_school_sport: 'Safer school & sport journeys',
    city_is_exploring: 'The city is exploring options around Riia crossing. A proposal will appear here once the city publishes it.',
    estimates_note: 'Estimates and proposals in this MVP are illustrative, not approved city projects.',
    part_of_picture: 'You’re part of the picture.',
    your_experience_received: 'Your experience has been received. City planners can now see it in their workspace.',
    shared_map: 'Your experience is on the shared map.',
    reviewed_by_city: 'Reviewed by the city',
    planners_assess: 'Planners assess the need and possible measures.',
    follow_outcome: 'Follow the outcome',
    see_response: 'See the response in My updates.',
    valuable_input: 'Your next small observation could make a difference.',
    route_focus_label: 'Selected route',
    home_route_demo: 'e.g. Riia crossing',
    place_context: 'A place. A feeling.<br>A little context.',
    selected_option: 'Selected',
    select_option: 'Select option',
    open_for_feedback: 'Open for feedback',
    your_perspective: 'Your perspective',
    works_for_me: 'Works for me',
    i_have_concerns: 'I have concerns',
    mention_location: 'Add a location or landmark.',
    choose_feeling: 'Choose how this place felt.',
    choose_perspective: 'Choose at least one perspective.',
    update_progress: 'Update progress',
    save_update: 'Save update & notify resident',
    response_visible: 'Response visible to the resident *',
    prefer_mode_text: 'Preferred travel mode and place history are saved locally in this app. You can switch language at the top right.',
    set_local_pref: 'Set a local preference for labels and guidance in the resident app.',
    route_summary_profile: 'Today’s route summary',
    live_issue_overview: 'Live issue overview',
    accessible_label: 'No full name or precise home address needed. Please avoid personal details in your comment.',
    add_context_placeholder: 'What would make this journey work better?',
    route_profile_timeline: 'Today’s route summary',
    narrative_title: 'A place. A feeling.<br>A little context.',
    response_update_saved: 'Update saved. The resident can see it in My updates.',
    your_experience: 'Your experience',
    community_experience: 'Community experience',
    no_additional_comment: 'No additional comment.',
    awaiting_city_response: 'Awaiting a city response.',
    feedback_follow_through: 'Feedback follow-through',
    start_with_proposal: 'Start with a proposal',
    compare_tradeoffs: 'Compare options and explain the trade-offs to invite informed feedback.',
    resident_demo_profile: 'Resident demo profile · Kadri',
    city_workspace_visible: 'Your response is now visible in the City workspace.',
    proposal_publish_prompt: 'Add a plain-language explanation for residents.',
    proposal_published: 'Proposal published to the resident app.',
    feeling_unsafe: 'Unsafe',
    feeling_uncomfortable: 'Uncomfortable',
    feeling_good_experience: 'Good experience',
    role_cyclist: 'Cyclist',
    role_pedestrian: 'Pedestrian',
    role_public_transport: 'Public transport',
    role_car_driver: 'Car driver',
    role_accessibility_needs: 'Accessibility needs',
    role_parent_child: 'Parent / child',
    filter_all_experiences: 'All experiences',
    filter_unsafe: 'Unsafe',
    filter_uncomfortable: 'Uncomfortable',
    filter_good_experience: 'Good experience',
    illustrative_map: 'Illustrative map',
    tap_to_place_pin: 'Tap to place your pin',
    select_pin_to_read_experience: 'Select a pin to read an experience',
    feel_unsafe: 'Feel unsafe',
    feel_uncomfortable: 'Uncomfortable',
    good_experiences: 'Good experiences',
    the_loop_comes_back_to_you: 'The loop comes back to you',
    how_journey_affected: 'How would this affect your journey?',
    your_response: 'Your response',
    vote_support: 'Support',
    vote_neutral: 'Neutral',
    vote_oppose: 'Oppose',
    proposal_benefits: 'Benefits',
    proposal_tradeoffs: 'Trade-offs',
    public_vote_results: 'Public vote results',
    voting_closed: 'Voting is open',
    proposal_summary: 'City proposals for neighborhood travel'
  },
  et: {
    nav_explore: 'Uurimine',
    nav_share: 'Jaga',
    nav_commute: 'Lähetus',
    nav_updates: 'Minu uuendused',
    nav_profile: 'Profiil',
    nav_plans: 'Linna plaanid',
    profile: 'Profiil',
    language: 'Keel',
    commute_title: 'Täna liikumine',
    commute_summary: 'Jälgi oma teekonda ja teata probleemidest reaalajas.',
    issue_tracking: 'Probleemide jälgimine',
    report_this_segment: 'Teata sellest lõigust',
    selected_segment: 'Valitud lõik',
    today_activity: 'Täna tegevus',
    no_reports: 'Puuduvad teated',
    total_issues: 'Kokku probleemid',
    high_priority: 'Kõrge prioriteet',
    under_review: 'Arvamuse all',
    received: 'Vastu võetud',
    planned: 'Planeeritud',
    overview: 'Ülevaade',
    resident_voices: 'Elanike hääled',
    compare_options: 'Võrdle valikuid',
    decisions_updates: 'Otsused ja uuendused',
    status_under_review: 'Arvamuse all',
    status_received: 'Vastu võetud',
    status_planned: 'Planeeritud',
    status_implemented: 'Rakendatud',
    status_completed: 'Lõpetatud',
    status_tracked: 'Jälgitakse',
    priority_high: 'Kõrge',
    priority_medium: 'Keskmine',
    priority_low: 'Madal',
    issue_summary: 'Probleemide kokkuvõte',
    resident_issue_summary: 'Elanike probleemide kokkuvõte',
    all_issues: 'Kõik probleemid',
    share_experience: 'Jaga kogemust',
    commute_route: 'Täna reisi kokkuvõte',
    select_commute_segment: 'Vali marsruudi lõik',
    back_to_commute: 'Tagasi marsruudile',
    back_to_previous: 'Tagasi',
    resident_app: 'Elaniku rakendus',
    city_workspace: 'Linna töölaud',
    footer_brand: 'Common Ground · Teeb liikuvuse planeerimise inimlikuks.',
    footer_meta: 'Interaktiivne MVP · Demo andmed · Salvestatud selles brauseris',
    city_of_tartu: 'TARTU LINN',
    planning_workspace: 'Planeerimisruum',
    human_layer: 'Inimlik kiht',
    human_layer_copy: 'Ühenda elamuste ja tõenditega kogemused. Hoia inimesed otsustamisega kaasas.',
    tab_overview: 'Ülevaade',
    tab_feedback: 'Elanike hääled',
    tab_scenarios: 'Võrdle valikuid',
    tab_decisions: 'Otsused ja uuendused',
    export_feedback: '↓ Eksporti tagasiside',
    shared_experiences: 'Jagatud kogemused',
    need_review: 'Vajab ülevaatust',
    safety_concerns: 'Ohutusalased mured',
    resident_responses: 'Elanike vastused',
    all_perspectives: 'Kõik vaatenurgad',
    waiting_for_response: 'Esimese vastuse ootel',
    lived_experience_signals: 'Elukogemuse signaalid',
    current_proposal: 'Praeguse ettepaneku kohta',
    experience_layer: 'Kogemuste kiht',
    voices: 'häält',
    recent_experiences: 'Hiljutised kogemused',
    view_all: 'Vaata kõiki →',
    from_experience_to_action: 'KOGEMUSTEST TEGEVUSELE',
    safer_crossing: 'Milline võiks olla turvalisem Riia ristmik?',
    explore_options: 'Uuri kolme illustreerivat varianti ja kutsu elanikke vastama.',
    compare_options_cta: 'Võrdle valikuid →',
    search_feedback: 'Otsi asukohta, kommentaari või vaatenurka…',
    resident_experiences: 'elaniku kogemust',
    no_matching_experiences: 'Ühtki vasteid ei leitud. Proovi teist otsingut või filtrit.',
    select_experience: 'Vali vastusena kogemus',
    consultation_open: 'Konsultatsioon avatud',
    no_proposal: 'Ettepanekut ei avaldatud',
    review_options: 'Vaata valikuid',
    compare_options_btn: 'Võrdle valikuid →',
    resident_response: 'Elanike vastus',
    no_responses_yet: 'Vastuseid veel ei ole. Liigu elanikurakendusse → Linnaplaanid, et osaleda.',
    resident_hero_title: 'Linn algab sinu igapäevasest teekonnast',
    resident_hero_h1: 'Väikesed hetked. Paremad liikumisviisid.',
    resident_intro: 'Proovi elaniku rakendust ja vaata, kuidas sinu tagasiside linnas edasi liigub.',
    resident_browse_title: 'Sinu igapäev. Meie ühine alus.',
    resident_browse_sub: 'Kuidas tundub sinu ümbruskonna liikumine?',
    share_heading: 'JAGA KOGEMUST',
    share_step_title: 'Iga vaatenurk on oluline.',
    share_step_copy: 'Kuidas sa liikusid? Vali üks või mitu vaatenurka.',
    share_terms_title: 'Jaga oma tingimustega.',
    share_terms_copy: 'Täisnimi ega täpne elukoht pole vajalik. Väldi isiklikku teavet kommentaaris.',
    choose_place: 'Vali koht →',
    place_label: 'Asukoht või maamärk *',
    what_happened: 'Mis juhtus?',
    submit_experience: 'Esita kogemus →',
    choose_route: 'Vali marsruudi lõik',
    initial_commute_summary: 'Täna reisi kokkuvõte',
    segments: 'lõiku',
    live_reports: 'reaalajas teated',
    travel_time: 'reisi aeg',
    record_again: 'Salvesta uuesti',
    start_tracking: 'Alusta jälgimist'
  },
  de: {
    nav_explore: 'Entdecken',
    nav_share: 'Teilen',
    nav_commute: 'Pendeln',
    nav_updates: 'Meine Updates',
    nav_profile: 'Profil',
    nav_plans: 'Stadtpläne',
    profile: 'Profil',
    language: 'Sprache',
    commute_title: 'Heutiger Pendelweg',
    commute_summary: 'Verfolgen Sie Ihre Route und melden Sie Probleme direkt auf der Strecke.',
    issue_tracking: 'Issue-Verfolgung',
    report_this_segment: 'Diesen Abschnitt melden',
    selected_segment: 'Ausgewählter Abschnitt',
    today_activity: 'Heutige Aktivität',
    no_reports: 'Noch keine Meldungen',
    total_issues: 'Gesamtprobleme',
    high_priority: 'Hohe Priorität',
    under_review: 'In Prüfung',
    received: 'Erhalten',
    planned: 'Geplant',
    overview: 'Übersicht',
    resident_voices: 'Bewohnerstimmen',
    compare_options: 'Optionen vergleichen',
    decisions_updates: 'Entscheidungen & Updates',
    status_under_review: 'In Prüfung',
    status_received: 'Erhalten',
    status_planned: 'Geplant',
    status_implemented: 'Umgesetzt',
    status_completed: 'Abgeschlossen',
    status_tracked: 'Verfolgt',
    priority_high: 'Hoch',
    priority_medium: 'Mittel',
    priority_low: 'Niedrig',
    issue_summary: 'Problemübersicht',
    resident_issue_summary: 'Übersicht der Bürgerprobleme',
    all_issues: 'Alle Probleme',
    share_experience: 'Erfahrung teilen',
    commute_route: 'Zusammenfassung der heutigen Route',
    select_commute_segment: 'Routenabschnitt auswählen',
    back_to_commute: 'Zurück zur Route',
    back_to_previous: 'Zurück',
    resident_app: 'Bewohner-App',
    city_workspace: 'Stadt-Workspace',
    footer_brand: 'Common Ground · Macht die Mobilitätsplanung menschlich.',
    footer_meta: 'Interaktives MVP · Demodaten · In diesem Browser gespeichert',
    city_of_tartu: 'STADT TARTU',
    planning_workspace: 'Planungs-Workspace',
    human_layer: 'Die menschliche Ebene',
    human_layer_copy: 'Vereinen Sie Erfahrungswerte mit Evidenz. Halten Sie Menschen vor Entscheidungen eingebunden.',
    tab_overview: 'Übersicht',
    tab_feedback: 'Bewohnerstimmen',
    tab_scenarios: 'Optionen vergleichen',
    tab_decisions: 'Entscheidungen & Updates',
    export_feedback: '↓ Feedback exportieren',
    shared_experiences: 'Geteilte Erfahrungen',
    need_review: 'Zur Prüfung',
    safety_concerns: 'Sicherheitsbedenken',
    resident_responses: 'Bewohnerantworten',
    all_perspectives: 'Alle Perspektiven',
    waiting_for_response: 'Wartet auf erste Antwort',
    lived_experience_signals: 'Lebensweltliche Signale',
    current_proposal: 'Zum aktuellen Vorschlag',
    experience_layer: 'Erfahrungsebene',
    voices: 'Stimmen',
    recent_experiences: 'Aktuelle Erfahrungen',
    view_all: 'Alle anzeigen →',
    from_experience_to_action: 'VON ERFAHRUNG ZU HANDLUNG',
    safer_crossing: 'Wie könnte eine sicherere Riia-Kreuzung aussehen?',
    explore_options: 'Erkunden Sie drei illustrative Optionen und laden Sie die Bewohner zur Rückmeldung ein.',
    compare_options_cta: 'Optionen vergleichen →',
    search_feedback: 'Standort, Kommentar oder Perspektive suchen…',
    resident_experiences: 'Bewohnererfahrungen',
    no_matching_experiences: 'Keine passenden Erfahrungen gefunden. Versuchen Sie eine andere Suche oder einen anderen Filter.',
    select_experience: 'Erfahrung auswählen, um zu antworten',
    consultation_open: 'Beratung offen',
    no_proposal: 'Kein Vorschlag veröffentlicht',
    review_options: 'Optionen prüfen',
    compare_options_btn: 'Optionen vergleichen →',
    resident_response: 'Bewohnerantwort',
    no_responses_yet: 'Noch keine Antworten. Wechseln Sie zur Bewohner-App → Stadtpläne, um teilzunehmen.',
    resident_hero_title: 'Die Stadt beginnt mit deinem Alltag',
    resident_hero_h1: 'Kleine Momente. Bessere Wege.',
    resident_intro: 'Probieren Sie die Bewohner-App aus und sehen Sie, wie Ihre Rückmeldung in der Stadt weitergeht.',
    resident_browse_title: 'Dein Alltag. Unser gemeinsamer Boden.',
    resident_browse_sub: 'Wie fühlt sich das Bewegen in deiner Nachbarschaft an?',
    share_heading: 'ERFAHRUNG TEILEN',
    share_step_title: 'Jede Perspektive zählt.',
    share_step_copy: 'Wie bist du gereist? Wähle eine oder mehrere Perspektiven.',
    share_terms_title: 'Teilen Sie auf Ihre Weise.',
    share_terms_copy: 'Vollständiger Name oder genaue Adresse sind nicht nötig. Bitte vermeiden Sie persönliche Details im Kommentar.',
    choose_place: 'Ort wählen →',
    place_label: 'Ort oder Landmarke *',
    what_happened: 'Was ist passiert?',
    submit_experience: 'Erfahrung senden →',
    choose_route: 'Routenabschnitt auswählen',
    initial_commute_summary: 'Zusammenfassung der heutigen Route',
    segments: 'Abschnitte',
    live_reports: 'Live-Meldungen',
    travel_time: 'Reisezeit',
    record_again: 'Erneut aufzeichnen',
    start_tracking: 'Tracking starten',
    your_experience_matters: 'DEINE ERFAHRUNG ZÄHLT',
    human_perspective_title: 'Eine menschliche Perspektive<br>auf jede Reise.',
    human_perspective_copy: 'Eine schwierige Kreuzung. Eine verpasste Verbindung.<br>Eine gute Route. Helfen Sie Ihrer Stadt zu sehen,<br>was die Zahlen allein nicht sagen können.',
    step_share_moment: 'Teilen Sie einen Moment',
    step_share_sub: 'Ein Ort, ein Gefühl, Ihre Perspektive.',
    step_shape_possibilities: 'Gestalten Sie die Möglichkeiten',
    step_shape_sub: 'Reagieren Sie auf vorgeschlagene Verbesserungen.',
    step_see_next: 'Sehen Sie, was als Nächstes passiert',
    step_see_sub: 'Verfolgen Sie Ihre Eingabe bis zum Ende.',
    designed_for_busy_days: 'Entwickelt für einen vollen Tag. Kein Treffen erforderlich.',
    little_input_big_picture: 'EIN KLEINER HINWEIS. EIN GRÖSSERER BLICK.',
    not_the_only_one: 'Sie sind nicht der Einzige,<br>der es bemerkt hat.',
    every_shared_experience: 'Jede geteilte Erfahrung hilft Planern, die Reisen hinter den Zahlen zu verstehen.',
    shared_experiences_metric: 'geteilte Erfahrungen',
    being_acted_on: 'in Bearbeitung',
    feedback_loop: 'DER FEEDBACK-KREISLAUF',
    feedback_loop_copy: 'Menschen → Stadt → Möglichkeiten → Menschen<br><strong style="color:var(--green)">Sie bleiben Teil der Entscheidung.</strong>',
    good_morning: 'Guten Morgen,',
    more_routes_for_adventures: 'Bessere Wege für kleine Abenteuer',
    route_adventure_copy: 'Helfen Sie dabei, sicherere Wege zur Schule und zum Sport zu gestalten.',
    track_experience: 'Meine Erfahrung verfolgen →',
    my_updates: 'Meine Updates',
    my_updates_sub: 'Ihre Erfahrungen und was als Nächstes geschah.',
    city_response: 'Stadtantwort',
    received_by_city: 'Von der Stadt erhalten. Noch keine Antwort.',
    view_timeline: 'Zeitleiste ansehen →',
    share_first_experience: 'Teilen Sie Ihre erste Erfahrung',
    help_shape_next: 'GESTALTEN SIE DAS NÄCHSTE',
    neighbourhood_plans: 'Nachbarschaftspläne',
    see_trade_offs: 'Sehen Sie die Abwägungen. Sagen Sie der Stadt, was für Sie funktioniert.',
    in_preparation: 'In Vorbereitung',
    safer_school_sport: 'Sicherere Schul- und Sportwege',
    city_is_exploring: 'Die Stadt prüft Optionen rund um die Riia-Kreuzung. Ein Vorschlag erscheint hier, sobald die Stadt ihn veröffentlicht.',
    estimates_note: 'Schätzungen und Vorschläge in diesem MVP sind illustrativ und keine genehmigten Stadtprojekte.',
    part_of_picture: 'Sie sind Teil des Bildes.',
    your_experience_received: 'Ihre Erfahrung wurde erhalten. Stadtplaner können sie jetzt in ihrem Workspace sehen.',
    shared_map: 'Ihre Erfahrung ist auf der gemeinsamen Karte.',
    reviewed_by_city: 'Von der Stadt geprüft',
    planners_assess: 'Planer bewerten Bedarf und mögliche Maßnahmen.',
    follow_outcome: 'Verfolgen Sie das Ergebnis',
    see_response: 'Sehen Sie die Antwort in Meine Updates.',
    valuable_input: 'Ihre nächste kleine Beobachtung könnte einen Unterschied machen.',
    route_focus_label: 'Ausgewählte Route',
    home_route_demo: 'z. B. Riia-Kreuzung',
    place_context: 'Ein Ort. Ein Gefühl.<br>Ein wenig Kontext.',
    selected_option: 'Ausgewählt',
    select_option: 'Option auswählen',
    open_for_feedback: 'Für Feedback offen',
    your_perspective: 'Ihre Perspektive',
    works_for_me: 'Passt für mich',
    i_have_concerns: 'Ich habe Bedenken',
    mention_location: 'Ort oder Landmarke hinzufügen.',
    choose_feeling: 'Wählen Sie, wie sich dieser Ort anfühlte.',
    choose_perspective: 'Wählen Sie mindestens eine Perspektive.',
    update_progress: 'Fortschritt aktualisieren',
    save_update: 'Update speichern & Bewohner benachrichtigen',
    response_visible: 'Antwort für den Bewohner sichtbar *',
    prefer_mode_text: 'Bevorzugte Verkehrsmittel und Ortsverlauf werden lokal in dieser App gespeichert. Sie können oben rechts die Sprache wechseln.',
    set_local_pref: 'Legen Sie eine lokale Einstellung für Beschriftungen und Hinweise in der Bewohner-App fest.',
    route_summary_profile: 'Zusammenfassung der heutigen Route',
    live_issue_overview: 'Live-Problemübersicht',
    accessible_label: 'Vollständiger Name oder genaue Adresse sind nicht nötig. Bitte vermeiden Sie persönliche Details im Kommentar.',
    add_context_placeholder: 'Was würde diese Reise besser machen?',
    route_profile_timeline: 'Zusammenfassung der heutigen Route',
    narrative_title: 'Ein Ort. Ein Gefühl.<br>Ein wenig Kontext.',
    response_update_saved: 'Update gespeichert. Der Bewohner kann es in Meine Updates sehen.',
    your_experience: 'Ihre Erfahrung',
    community_experience: 'Gemeinschaftserfahrung',
    no_additional_comment: 'Kein zusätzlicher Kommentar.',
    awaiting_city_response: 'Wartet auf eine Stadtantwort.',
    feedback_follow_through: 'Feedback-Fortsetzung',
    start_with_proposal: 'Beginnen Sie mit einem Vorschlag',
    compare_tradeoffs: 'Vergleichen Sie Optionen und erklären Sie die Abwägungen, um ein informiertes Feedback zu erhalten.',
    resident_demo_profile: 'Demo-Profil des Bewohners · Kadri',
    city_workspace_visible: 'Ihre Antwort ist nun im Stadt-Workspace sichtbar.',
    proposal_publish_prompt: 'Fügen Sie eine verständliche Erklärung für die Bewohner hinzu.',
    proposal_published: 'Vorschlag für die Bewohner-App veröffentlicht.',
    feeling_unsafe: 'Unsicher',
    feeling_uncomfortable: 'Unwohl',
    feeling_good_experience: 'Gute Erfahrung',
    role_cyclist: 'Radfahrer',
    role_pedestrian: 'Fußgänger',
    role_public_transport: 'ÖPNV',
    role_car_driver: 'Autofahrer',
    role_accessibility_needs: 'Barrierefreiheit',
    role_parent_child: 'Eltern / Kind',
    filter_all_experiences: 'Alle Erfahrungen',
    filter_unsafe: 'Unsicher',
    filter_uncomfortable: 'Unwohl',
    filter_good_experience: 'Gute Erfahrung',
    illustrative_map: 'Illustrative Karte',
    tap_to_place_pin: 'Tippen Sie, um Ihren Pin zu setzen',
    select_pin_to_read_experience: 'Wählen Sie einen Pin, um eine Erfahrung zu lesen',
    feel_unsafe: 'Gefühl unsicher',
    feel_uncomfortable: 'Unwohl',
    good_experiences: 'Gute Erfahrungen',
    the_loop_comes_back_to_you: 'Der Kreis kommt zu Ihnen zurück',
    how_journey_affected: 'Wie würde dies Ihre Reise beeinflussen?',
    your_response: 'Ihre Antwort',
    vote_support: 'Unterstützen',
    vote_neutral: 'Neutral',
    vote_oppose: 'Ablehnen',
    proposal_benefits: 'Vorteile',
    proposal_tradeoffs: 'Abwägungen',
    public_vote_results: 'Öffentliche Abstimmungsergebnisse',
    voting_closed: 'Abstimmung läuft',
    proposal_summary: 'Stadtvorschläge für den Nachbarschaftsverkehr'
  },
  zh: {
    nav_explore: '探索',
    nav_share: '提交',
    nav_commute: '通勤',
    nav_updates: '我的更新',
    nav_profile: '个人资料',
    nav_plans: '城市方案',
    profile: '个人资料',
    language: '语言',
    commute_title: '今日通勤轨迹',
    commute_summary: '跟踪您的路线并在路途中标记问题。',
    issue_tracking: '问题追踪',
    report_this_segment: '汇报此路段',
    selected_segment: '已选路段',
    today_activity: '今日活动',
    no_reports: '暂无报告',
    total_issues: '全部问题',
    high_priority: '高优先级',
    under_review: '审核中',
    received: '已收到',
    planned: '已规划',
    overview: '概览',
    resident_voices: '居民反馈',
    compare_options: '比较方案',
    decisions_updates: '决策与更新',
    status_under_review: '审核中',
    status_received: '已收到',
    status_planned: '已规划',
    status_implemented: '已实施',
    status_completed: '已完成',
    status_tracked: '已跟踪',
    priority_high: '高',
    priority_medium: '中',
    priority_low: '低',
    issue_summary: '问题汇总',
    resident_issue_summary: '居民问题汇总',
    all_issues: '全部问题',
    share_experience: '分享经历',
    commute_route: '今日路线概览',
    select_commute_segment: '选择通勤路段',
    back_to_commute: '返回路线',
    back_to_previous: '返回',
    resident_app: '居民应用',
    city_workspace: '城市工作台',
    footer_brand: 'Common Ground · 让出行规划更有温度。',
    footer_meta: '交互式 MVP · 演示数据 · 保存在此浏览器中',
    city_of_tartu: '塔尔图市',
    planning_workspace: '规划工作台',
    human_layer: '人文层',
    human_layer_copy: '把真实生活经验和证据结合起来，在决策前持续让居民参与。',
    tab_overview: '概览',
    tab_feedback: '居民反馈',
    tab_scenarios: '比较方案',
    tab_decisions: '决策与更新',
    export_feedback: '↓ 导出反馈',
    shared_experiences: '已共享体验',
    need_review: '待审核',
    safety_concerns: '安全问题',
    resident_responses: '居民回应',
    all_perspectives: '全部视角',
    waiting_for_response: '等待首次回应',
    lived_experience_signals: '生活经验信号',
    current_proposal: '当前提案统计',
    experience_layer: '体验层',
    voices: '条反馈',
    recent_experiences: '最近的经历',
    view_all: '查看全部 →',
    from_experience_to_action: '从体验到行动',
    safer_crossing: '更安全的 Riia 交叉口会是什么样？',
    explore_options: '探索三个示例方案，并邀请居民提供回应。',
    compare_options_cta: '比较方案 →',
    search_feedback: '搜索地点、评论或视角…',
    resident_experiences: '居民体验',
    no_matching_experiences: '没有匹配的体验。请尝试其他搜索或筛选条件。',
    select_experience: '选择一条体验来回应',
    consultation_open: '咨询中',
    no_proposal: '暂无发布提案',
    review_options: '查看方案',
    compare_options_btn: '比较方案 →',
    resident_response: '居民回应',
    no_responses_yet: '尚无回应。切换到居民端 → 城市方案即可参与。',
    resident_hero_title: '城市从你的日常开始',
    resident_hero_h1: '小瞬间。更好的出行方式。',
    resident_intro: '试试居民应用，然后看看你的反馈如何推动城市决策。',
    resident_browse_title: '你的日常。我们的共同基础。',
    resident_browse_sub: '你附近的出行体验感觉如何？',
    share_heading: '分享经历',
    share_step_title: '每种视角都重要。',
    share_step_copy: '你是如何出行的？选择一个或多个视角。',
    share_terms_title: '按你的方式分享。',
    share_terms_copy: '不需要完整姓名和精确住址。请避免在评论中透露个人信息。',
    choose_place: '选择地点 →',
    place_label: '地点或地标 *',
    what_happened: '发生了什么？',
    submit_experience: '提交经历 →',
    choose_route: '选择通勤路段',
    initial_commute_summary: '今日路线概览',
    segments: '段',
    live_reports: '实时反馈',
    travel_time: '旅行时间',
    record_again: '重新记录',
    start_tracking: '开始追踪',
    your_experience_matters: '你的经历很重要',
    human_perspective_title: '每一次出行都带来<br>人文视角。',
    human_perspective_copy: '一次艰难的过街。一次错过的连接。<br>一条顺畅的路线。帮助城市看见<br>仅靠数据无法传达的真实感受。',
    step_share_moment: '分享一个瞬间',
    step_share_sub: '地点、感受和你的视角。',
    step_shape_possibilities: '塑造可能性',
    step_shape_sub: '回应正在考虑的改进方案。',
    step_see_next: '看看接下来会发生什么',
    step_see_sub: '一路跟踪你的反馈。',
    designed_for_busy_days: '为忙碌日程设计。无需参加会议。',
    little_input_big_picture: '一点点输入。更大的视野。',
    not_the_only_one: '你并不孤单<br>很多人也注意到了。',
    every_shared_experience: '每一个共享经历都有助于规划者理解背后的人们如何出行。',
    shared_experiences_metric: '条共享体验',
    being_acted_on: '正在处理',
    feedback_loop: '反馈循环',
    feedback_loop_copy: '居民 → 城市 → 方案 → 居民<br><strong style="color:var(--green)">你始终参与决策。</strong>',
    good_morning: '早上好，',
    more_routes_for_adventures: '更适合小冒险的路线',
    route_adventure_copy: '帮助塑造更安全的上下学和运动出行。',
    track_experience: '跟踪我的经历 →',
    my_updates: '我的更新',
    my_updates_sub: '你的经历，以及接下来发生了什么。',
    city_response: '城市回应',
    received_by_city: '已被城市收到。暂时还没有回应。',
    view_timeline: '查看时间线 →',
    share_first_experience: '分享你的第一条经历',
    help_shape_next: '帮助塑造下一步',
    neighbourhood_plans: '社区规划',
    see_trade_offs: '看看取舍，告诉城市什么对你更有效。',
    in_preparation: '筹备中',
    safer_school_sport: '更安全的校园与运动路线',
    city_is_exploring: '城市正在围绕 Riia 路口探索方案。待城市发布提案后，方案会出现在这里。',
    estimates_note: '此 MVP 中的估算和方案仅为说明性示例，不代表已批准的城市项目。',
    part_of_picture: '你也是画面的一部分。',
    your_experience_received: '你的经历已收到。城市规划者现在可以在工作台中看到它。',
    shared_map: '你的经历已在共享地图上显示。',
    reviewed_by_city: '已由城市审核',
    planners_assess: '规划者正在评估需求和可行措施。',
    follow_outcome: '跟进结果',
    see_response: '可在我的更新中查看回应。',
    valuable_input: '你的下一条小观察可能会产生很大影响。',
    route_focus_label: '已选路线',
    home_route_demo: '例如 Riia 路口',
    place_context: '一个地点。一个感受。<br>再加一点背景。',
    selected_option: '已选择',
    select_option: '选择方案',
    open_for_feedback: '开放反馈中',
    your_perspective: '你的视角',
    works_for_me: '我支持',
    i_have_concerns: '我有顾虑',
    mention_location: '添加地点或地标。',
    choose_feeling: '请选择这个地点给你的感受。',
    choose_perspective: '至少选择一个视角。',
    update_progress: '更新进度',
    save_update: '保存更新并通知居民',
    response_visible: '对居民可见的回应 *',
    prefer_mode_text: '偏好的出行方式和地点历史会保存在本地，您可以在右上角切换语言。',
    set_local_pref: '为居民应用中的标签和说明设置本地偏好。',
    route_summary_profile: '今日路线概览',
    live_issue_overview: '实时问题概览',
    accessible_label: '不需要完整姓名或精确住址。请避免在评论中写出个人信息。',
    add_context_placeholder: '什么会让这段旅程更方便？',
    route_profile_timeline: '今日路线概览',
    narrative_title: '一个地点。一个感受。<br>再加一点背景。',
    response_update_saved: '更新已保存。居民可以在“我的更新”中查看。',
    your_experience: '你的经历',
    community_experience: '社区经验',
    no_additional_comment: '没有额外评论。',
    awaiting_city_response: '等待城市回应。',
    feedback_follow_through: '反馈跟进',
    start_with_proposal: '先提出一个方案',
    compare_tradeoffs: '比较选项并解释取舍，以获得更充分的反馈。',
    resident_demo_profile: '居民示例档案 · Kadri',
    city_workspace_visible: '你的回应现在已在城市工作台中可见。',
    proposal_publish_prompt: '为居民添加通俗易懂的说明。',
    proposal_published: '方案已发布到居民应用。',
    resident_app: '居民应用',
    city_workspace: '城市工作台',
    footer_brand: 'Common Ground · 让出行规划更有温度。',
    footer_meta: '交互式 MVP · 演示数据 · 保存在此浏览器中',
    city_of_tartu: '塔尔图市',
    planning_workspace: '规划工作台',
    human_layer: '人文层',
    human_layer_copy: '把真实生活经验和证据结合起来，在决策前持续让居民参与。',
    tab_overview: '概览',
    tab_feedback: '居民反馈',
    tab_scenarios: '比较方案',
    tab_decisions: '决策与更新',
    export_feedback: '↓ 导出反馈',
    shared_experiences: '已共享体验',
    need_review: '待审核',
    safety_concerns: '安全问题',
    resident_responses: '居民回应',
    all_perspectives: '全部视角',
    waiting_for_response: '等待首次回应',
    lived_experience_signals: '生活经验信号',
    current_proposal: '当前提案统计',
    experience_layer: '体验层',
    voices: '条反馈',
    recent_experiences: '最近的经历',
    view_all: '查看全部 →',
    from_experience_to_action: '从体验到行动',
    safer_crossing: '更安全的 Riia 交叉口会是什么样？',
    explore_options: '探索三个示例方案，并邀请居民提供回应。',
    compare_options_cta: '比较方案 →',
    search_feedback: '搜索地点、评论或视角…',
    resident_experiences: '居民体验',
    no_matching_experiences: '没有匹配的体验。请尝试其他搜索或筛选条件。',
    select_experience: '选择一条体验来回应',
    consultation_open: '咨询中',
    no_proposal: '暂无发布提案',
    review_options: '查看方案',
    compare_options_btn: '比较方案 →',
    resident_response: '居民回应',
    no_responses_yet: '尚无回应。切换到居民端 → 城市方案即可参与。',
    feeling_unsafe: '不安全',
    feeling_uncomfortable: '不舒服',
    feeling_good_experience: '良好体验',
    role_cyclist: '骑行者',
    role_pedestrian: '步行者',
    role_public_transport: '公共交通',
    role_car_driver: '驾车者',
    role_accessibility_needs: '无障碍需求',
    role_parent_child: '家长 / 孩子',
    filter_all_experiences: '全部体验',
    filter_unsafe: '不安全',
    filter_uncomfortable: '不舒服',
    filter_good_experience: '良好体验',
    illustrative_map: '示意地图',
    tap_to_place_pin: '点击放置你的标记',
    select_pin_to_read_experience: '选择一个标记来查看体验',
    feel_unsafe: '不安全',
    feel_uncomfortable: '不舒服',
    good_experiences: '良好体验',
    the_loop_comes_back_to_you: '反馈循环回到你身边',
    how_journey_affected: '这会如何影响你的旅程？',
    your_response: '你的回应',
    vote_support: '支持',
    vote_neutral: '中立',
    vote_oppose: '反对',
    proposal_benefits: '优点',
    proposal_tradeoffs: '利弊',
    public_vote_results: '公开投票结果',
    voting_closed: '投票进行中',
    proposal_summary: '城市关于社区出行的提议'
  }
};

const ROLE_OPTIONS = [
  { symbol: '♧', label: 'Cyclist' },
  { symbol: '♙', label: 'Pedestrian' },
  { symbol: '▣', label: 'Public transport' },
  { symbol: '▰', label: 'Car driver' },
  { symbol: '♿', label: 'Accessibility needs' },
  { symbol: '♧', label: 'Parent / child' }
];

const FEELING_OPTIONS = [
  { symbol: '☹', label: 'Unsafe' },
  { symbol: '−', label: 'Uncomfortable' },
  { symbol: '☺', label: 'Good experience' }
];

function translateFeeling(value) {
  const map = {
    Unsafe: getText('feeling_unsafe'),
    Uncomfortable: getText('feeling_uncomfortable'),
    'Good experience': getText('feeling_good_experience')
  };
  return map[value] || value;
}

function translateRole(value) {
  const map = {
    Cyclist: getText('role_cyclist'),
    Pedestrian: getText('role_pedestrian'),
    'Public transport': getText('role_public_transport'),
    'Car driver': getText('role_car_driver'),
    'Accessibility needs': getText('role_accessibility_needs'),
    'Parent / child': getText('role_parent_child')
  };
  return map[value] || value;
}

const CITY_TABS = {
  overview: { en: 'A city seen through its people.', et: 'Linn, mida näeb iga inimene.', de: 'Eine Stadt, gesehen durch ihre Menschen.', zh: '从居民视角看城市。' },
  feedback: { en: 'Listen to the everyday.', et: 'Kuula igapäevaelu.', de: 'Höre auf den Alltag.', zh: '倾听日常体验。' },
  scenarios: { en: 'Explore the possibilities.', et: 'Uuri võimalusi.', de: 'Erkunde die Möglichkeiten.', zh: '探索可能性。' },
  decisions: { en: 'Close the feedback loop.', et: 'Sulge tagasiside ahel.', de: 'Schließe den Feedback-Kreislauf.', zh: '闭合反馈循环。' }
};

const CITY_SUMMARY = {
  overview: { en: 'Turn everyday experiences into better-informed mobility decisions.', et: 'Muuda igapäevased kogemused paremini informeeritud liikuvusotsusteks.', de: 'Machen Sie aus alltäglichen Erfahrungen besser informierte Mobilitätsentscheidungen.', zh: '将日常体验转化为更明智的出行决策。' },
  feedback: { en: 'Understand the context behind every pin. Review, respond and follow through.', et: 'Määra iga punkti taga olev kontekst. Vaata üle, vasta ja jaga edasi.', de: 'Verstehen Sie den Kontext hinter jedem Pin. Prüfen, reagieren und weiterführen.', zh: '了解每个标记背后的背景：查看、回复并持续跟进。' },
  scenarios: { en: 'Compare benefits and trade-offs before bringing a proposal back to residents.', et: 'Võrdle eeliseid ja kompromisse enne ettepaneku elanikele tagasi toomist.', de: 'Vergleichen Sie Nutzen und Abwägungen, bevor Sie einen Vorschlag an die Bewohner zurückgeben.', zh: '在把方案提交给居民前，先比较收益和取舍。' },
  decisions: { en: 'Make the next step visible to the people who helped shape it.', et: 'Tee järgmine samm nähtavaks inimestele, kes seda vormistasid.', de: 'Machen Sie den nächsten Schritt für die Menschen sichtbar, die ihn mitgestaltet haben.', zh: '让帮助形成方案的人们看到下一步。' }
};

function getCityTabText(key) {
  return CITY_TABS[key]?.[state.language] || CITY_TABS[key]?.en || key;
}

function getCitySummaryText(key) {
  return CITY_SUMMARY[key]?.[state.language] || CITY_SUMMARY[key]?.en || key;
}

const PLANS = [
  {
    name: 'Protected cycle lane',
    cost: '€180k',
    safety: '+28%',
    car: '+40 sec',
    bus: '+15 sec',
    desc: 'Separate cycling from traffic along the school and sport corridor.',
    trade: 'Removes 18 parking spaces. Requires a construction period.'
  },
  {
    name: '30 km/h zone',
    cost: '€45k',
    safety: '+16%',
    car: '+20 sec',
    bus: '+25 sec',
    desc: 'Reduce vehicle speeds and add clearer crossing priority.',
    trade: 'Lower cost, but cycling remains mixed with vehicle traffic.'
  },
  {
    name: 'Improved bus connection',
    cost: '€95k / yr',
    safety: '+4%',
    car: 'No change',
    bus: '−8 min',
    desc: 'Add an earlier service and improve the connection to the hospital.',
    trade: 'Ongoing operating cost. Limited direct improvement to the crossing.'
  }
];

const PROPOSAL_OPTIONS = [
  {
    id: 'cycle-lane',
    title: 'Protected cycle lane',
    summary: 'A dedicated cycle lane creates a safer route for school and sport trips along the crossing.',
    pros: ['Lower stress for cyclists and families', 'Better separation from fast-moving cars'],
    cons: ['Parking loss near the school entrance', 'Short construction disruption']
  },
  {
    id: 'slow-zone',
    title: '30 km/h zone',
    summary: 'A lower-speed neighbourhood ring makes the crossing calmer and easier to walk across.',
    pros: ['Lower vehicle speeds and clearer priority', 'Lower visual noise near homes and schools'],
    cons: ['Some traffic delay during peak hours', 'Cyclists still share the road in parts']
  },
  {
    id: 'bus-link',
    title: 'Improved bus connection',
    summary: 'A more frequent bus service can reduce the pressure on the crossing during school peak times.',
    pros: ['Faster access to the hospital and station', 'Good option for residents without a bike'],
    cons: ['Higher annual operating cost', 'Does not directly improve the crossing itself']
  }
];

const DEFAULT_PROPOSAL_RESULTS = {
  'cycle-lane': { support: 58, neutral: 22, oppose: 10 },
  'slow-zone': { support: 46, neutral: 27, oppose: 14 },
  'bus-link': { support: 39, neutral: 32, oppose: 18 }
};

const seed = {
  reports: [
    {
      id: 'CG-1042',
      place: 'Riia crossing',
      feeling: 'Unsafe',
      roles: ['Cyclist', 'Parent / child'],
      comment: 'Cars pass too close when Oskar and I cycle to football. The crossing is especially difficult after school.',
      status: 'Under review',
      reply: 'We are reviewing this crossing as part of the school-route pilot.',
      mine: false,
      x: 42,
      y: 48
    },
    {
      id: 'CG-1041',
      place: 'Maarjamõisa hospital',
      feeling: 'Uncomfortable',
      roles: ['Public transport'],
      comment: 'My early shift starts at 06:00, before the first useful bus connection.',
      status: 'Received',
      reply: '',
      mine: false,
      x: 24,
      y: 68
    },
    {
      id: 'CG-1040',
      place: 'Emajõgi riverside',
      feeling: 'Good experience',
      roles: ['Pedestrian'],
      comment: 'The riverside path feels calm and comfortable with children.',
      status: 'Planned',
      reply: 'This feedback will inform the connected riverside path proposal.',
      mine: false,
      x: 66,
      y: 27
    }
  ],
  proposal: null,
  vote: null,
  proposalOptions: deepClone(PROPOSAL_OPTIONS),
  proposalResults: deepClone(DEFAULT_PROPOSAL_RESULTS),
  profile: {
    name: 'Kadri',
    home: 'Tammelinn',
    work: 'City centre',
    preferredMode: 'Bike',
    language: DEFAULT_LANGUAGE
  },
  commuteSegments: [
    {
      id: 'segment-home-ria',
      name: 'Home → Riia crossing',
      start: 'Tammelinn',
      end: 'Riia crossing',
      mode: 'Bike',
      time: '07:12',
      risk: 'High',
      status: 'Tracked',
      summary: 'The school route is mostly calm, but the crossing feels tight during peak traffic.'
    },
    {
      id: 'segment-ria-station',
      name: 'Riia crossing → station',
      start: 'Riia crossing',
      end: 'Tartu station',
      mode: 'Bike',
      time: '07:26',
      risk: 'Medium',
      status: 'Tracked',
      summary: 'A shared cycling corridor with some speed concerns near the intersection.'
    },
    {
      id: 'segment-station-campus',
      name: 'Station → campus',
      start: 'Tartu station',
      end: 'University area',
      mode: 'Public transport',
      time: '07:43',
      risk: 'Low',
      status: 'Completed',
      summary: 'This section was comfortable and predictable.'
    }
  ],
  issueLog: [
    { id: 'ISS-102', title: 'School crossing near Riia', segment: 'Riia crossing', status: 'Under review', priority: 'High', createdAt: 'Today 08:10' },
    { id: 'ISS-103', title: 'Morning bus gap', segment: 'Maarjamõisa route', status: 'Received', priority: 'Medium', createdAt: 'Today 06:35' }
  ]
};

const state = {
  mode: 'resident',
  tab: 'explore',
  cityTab: 'overview',
  step: 1,
  roles: [],
  feeling: '',
  place: '',
  comment: '',
  shareEntry: 'share',
  backTarget: null,
  pin: { x: 48, y: 45 },
  filter: 'All experiences',
  query: '',
  selectedPlan: 'Protected cycle lane',
  language: DEFAULT_LANGUAGE,
  selectedSegmentId: 'segment-home-ria',
  routeFocusSegment: null
};

let data = loadData();

function deepClone(value) {
  if (typeof structuredClone === 'function') {
    return structuredClone(value);
  }
  return JSON.parse(JSON.stringify(value));
}

function normalizeData(source) {
  const merged = { ...seed, ...source };
  merged.profile = { ...seed.profile, ...(source.profile || {}) };
  merged.commuteSegments = (source.commuteSegments && source.commuteSegments.length ? source.commuteSegments : deepClone(seed.commuteSegments));
  merged.issueLog = (source.issueLog && source.issueLog.length ? source.issueLog : deepClone(seed.issueLog));
  merged.proposalOptions = (source.proposalOptions && source.proposalOptions.length ? source.proposalOptions : deepClone(PROPOSAL_OPTIONS));
  merged.proposalResults = { ...deepClone(DEFAULT_PROPOSAL_RESULTS), ...(source.proposalResults || {}) };
  return merged;
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return deepClone(seed);
    return normalizeData(JSON.parse(saved));
  } catch (error) {
    return deepClone(seed);
  }
}

function saveData() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    toast('Storage unavailable. Changes will last for this session only.');
  }
}

function getText(key) {
  const locale = I18N[state.language] ? state.language : DEFAULT_LANGUAGE;
  return I18N[locale][key] || I18N[DEFAULT_LANGUAGE][key] || key;
}

function translateStatus(status) {
  const map = {
    Received: getText('status_received'),
    'Under review': getText('status_under_review'),
    Planned: getText('status_planned'),
    Implemented: getText('status_implemented'),
    Completed: getText('status_completed'),
    Tracked: getText('status_tracked')
  };
  return map[status] || status;
}

function translatePriority(priority) {
  const map = {
    High: getText('priority_high'),
    Medium: getText('priority_medium'),
    Low: getText('priority_low')
  };
  return map[priority] || priority;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function toast(message) {
  const target = document.getElementById('toast');
  if (!target) return;

  target.innerHTML = `<div class="toast">${escapeHtml(message)}</div>`;
  window.clearTimeout(toast.timeoutId);
  toast.timeoutId = window.setTimeout(() => {
    target.innerHTML = '';
  }, 3500);
}

function setMode(mode) {
  state.mode = mode;
  render();
}

function nav(tabKey) {
  if (tabKey === 'share') {
    state.shareEntry = state.tab === 'commute' ? 'commute' : 'share';
    state.step = 1;
  }
  if (tabKey !== 'share') {
    state.backTarget = null;
  }
  state.tab = tabKey;
  render();
}

function cnav(tabKey) {
  state.cityTab = tabKey;
  render();
}

function setLanguage(language) {
  if (!LANGUAGES[language]) return;
  state.language = language;
  data.profile.language = language;
  saveData();
  render();
}

function syncLanguageControl() {
  const selector = document.getElementById('languageSelect');
  if (selector) {
    selector.innerHTML = Object.entries(LANGUAGES).map(([code, label]) => `
      <option value="${code}" ${state.language === code ? 'selected' : ''}>${label}</option>
    `).join('');
    selector.value = state.language;
  }
  document.documentElement.lang = state.language;

  const languageLabel = document.querySelector('.language-wrap > span');
  const profileButton = document.getElementById('profileButton');
  const resBtn = document.getElementById('resbtn');
  const cityBtn = document.getElementById('citybtn');
  const footerSpans = document.querySelectorAll('footer span');

  if (languageLabel) languageLabel.textContent = getText('language');
  if (profileButton) profileButton.textContent = getText('nav_profile');
  if (resBtn) resBtn.innerHTML = `◉ &nbsp; ${getText('resident_app')}`;
  if (cityBtn) cityBtn.innerHTML = `▦ &nbsp; ${getText('city_workspace')}`;
  if (footerSpans[0]) footerSpans[0].textContent = getText('footer_brand');
  if (footerSpans[1]) footerSpans[1].textContent = getText('footer_meta');
}

function getSelectedSegment() {
  return data.commuteSegments.find((segment) => segment.id === state.selectedSegmentId) || data.commuteSegments[0];
}

function map(interactive = false) {
  const pins = interactive
    ? `<span class="pin" style="left:${state.pin.x}%;top:${state.pin.y}%"><span>+</span></span>`
    : data.reports.map((report, index) => `
        <button
          class="pin"
          aria-label="Open feedback at ${escapeHtml(report.place)}"
          style="left:${report.x}%;top:${report.y}%;background:${report.feeling === 'Good experience' ? '#67947b' : report.feeling === 'Unsafe' ? '#dc744e' : '#c8a654'}"
          onclick="showReport(${index})"
        >
          <span>${index + 1}</span>
        </button>
      `).join('');

  return `
    <div class="map" ${interactive ? 'onclick="pick(event)"' : ''}>
      <svg viewBox="0 0 600 400" preserveAspectRatio="none" aria-label="${escapeHtml(getText('illustrative_map'))}">
        <rect width="600" height="400" fill="#e9eddf"/>
        <g fill="#d9e4cc">
          <path d="M20 20h110v80H20zM380 20h90v120h-90zM70 270h130v100H70zM450 250h120v130H450z"/>
        </g>
        <path d="M470 -30 Q300 100 395 180 T300 430" fill="none" stroke="#b8d9d9" stroke-width="55"/>
        <g stroke="#fff" stroke-width="13" fill="none">
          <path d="M-10 150L620 260M100 -10L270 410M-10 320L610 70M300 -10L60 410M550 -10L480 410M-10 60L610 350"/>
        </g>
        <g stroke="#d4dbc9" stroke-width="2" fill="none">
          <path d="M-10 150L620 260M100 -10L270 410M-10 320L610 70M300 -10L60 410M550 -10L480 410M-10 60L610 350"/>
        </g>
        <path d="M150 330L250 230L340 195L430 160" stroke="#67947b" stroke-width="6" stroke-dasharray="7 5" fill="none"/>
        <g fill="#73816c" font-size="13" font-family="sans-serif">
          <text x="70" y="120">TAMMELINN</text>
          <text x="345" y="95">KESKLINN</text>
          <text x="415" y="315">KARLOVA</text>
          <text x="275" y="185">Riia</text>
          <text x="45" y="360">Maarjamõisa</text>
        </g>
      </svg>
      <div class="maptitle">⌕ &nbsp; Tartu · Neighbourhood voices</div>
      ${pins}
      <span class="caption">${getText('illustrative_map')} · ${interactive ? getText('tap_to_place_pin') : getText('select_pin_to_read_experience')}</span>
    </div>
  `;
}

function pick(event) {
  if (event.target.closest('.caption, .maptitle')) return;

  const box = event.currentTarget.getBoundingClientRect();
  state.pin = {
    x: Math.min(91, Math.max(3, ((event.clientX - box.left) / box.width) * 100)),
    y: Math.min(82, Math.max(15, ((event.clientY - box.top) / box.height) * 100))
  };

  state.place = document.getElementById('place')?.value || state.place;
  state.comment = document.getElementById('comment')?.value || state.comment;
  render();
}

function render() {
  syncLanguageControl();
  const resBtn = document.getElementById('resbtn');
  const cityBtn = document.getElementById('citybtn');
  const app = document.getElementById('app');

  if (resBtn) resBtn.className = state.mode === 'resident' ? 'active' : '';
  if (cityBtn) cityBtn.className = state.mode === 'city' ? 'active' : '';
  if (app) app.innerHTML = state.mode === 'resident' ? residentView() : cityView();
}

function residentView() {
  const navItems = [
    ['explore', '⌖', getText('nav_explore')],
    ['share', '＋', getText('nav_share')],
    ['commute', '↗', getText('nav_commute')],
    ['updates', '◷', getText('nav_updates')],
    ['profile', '☰', getText('nav_profile')]
  ];

  return `
    <div class="intro">
      <div>
        <span class="eyebrow">${getText('resident_hero_title')}</span>
        <h1>${getText('resident_hero_h1').replace('.', '.<br>')}</h1>
      </div>
      <div class="demo">
        <span class="tag">● &nbsp; Tartu neighbourhood pilot</span>
        <p>${getText('resident_intro')}</p>
      </div>
    </div>
    <div class="resident">
      <aside class="story">
        <span class="eyebrow">${getText('your_experience_matters')}</span>
        <h2>${getText('human_perspective_title')}</h2>
        <p>${getText('human_perspective_copy')}</p>
        <div class="steps">
          <div class="step"><b>1</b><div>${getText('step_share_moment')}<br><span>${getText('step_share_sub')}</span></div></div>
          <div class="step"><b>2</b><div>${getText('step_shape_possibilities')}<br><span>${getText('step_shape_sub')}</span></div></div>
          <div class="step"><b>3</b><div>${getText('step_see_next')}<br><span>${getText('step_see_sub')}</span></div></div>
        </div>
        <span class="note">${getText('designed_for_busy_days')}</span>
      </aside>

      <section class="phone">
        <div class="statusbar"><span>9:41</span><span>▮▮▮ &nbsp; ▰</span></div>
        <div class="phonehead"><b>↗ common ground</b><span class="tag">Tartu</span></div>
        <div class="screen">${phoneContent()}</div>
        <nav class="bottomnav">
          ${navItems.map(([tabKey, icon, label]) => `
            <button class="${state.tab === tabKey ? 'active' : ''}" onclick="nav('${tabKey}')">
              <i>${icon}</i>${label}
            </button>
          `).join('')}
        </nav>
      </section>

      <aside class="story right">
        <div class="card soft">
          <span class="eyebrow">${getText('little_input_big_picture')}</span>
          <h2 style="font-size:28px">${getText('not_the_only_one')}</h2>
          <p>${getText('every_shared_experience')}</p>
          <div class="metric">
            <div><b>${data.reports.length}</b><small>${getText('shared_experiences_metric')}</small></div>
            <div><b>${data.reports.filter((report) => report.status !== 'Received').length}</b><small>${getText('being_acted_on')}</small></div>
          </div>
          ${map()}
        </div>
        <div class="card">
          <span class="eyebrow">${getText('feedback_loop')}</span>
          <p style="margin-bottom:0">${getText('feedback_loop_copy')}</p>
        </div>
      </aside>
    </div>
  `;
}

function phoneContent() {
  if (state.tab === 'explore') {
    return `
      <span class="eyebrow">${getText('good_morning')} ${escapeHtml(data.profile.name || 'Kadri')}</span>
      <h2>${getText('resident_browse_title').replace('.', '.<br>')}</h2>
      <p>${getText('resident_browse_sub')}</p>
      ${map()}
      <div class="metric">
        <div><b>${data.reports.filter((report) => report.feeling === 'Unsafe').length}</b><small>${getText('feel_unsafe')}</small></div>
        <div><b>${data.reports.filter((report) => report.feeling === 'Uncomfortable').length}</b><small>${getText('feel_uncomfortable')}</small></div>
        <div><b>${data.reports.filter((report) => report.feeling === 'Good experience').length}</b><small>${getText('good_experiences')}</small></div>
      </div>
      <button class="primary wide" onclick="nav('share')">＋ &nbsp; ${getText('share_experience')}</button>
      <div class="card soft" style="margin-top:16px;padding:14px">
        <b>${getText('more_routes_for_adventures')}</b>
        <p style="margin:7px 0">${getText('route_adventure_copy')}</p>
        <button class="link" onclick="nav('plans')">${getText('resident_hero_title')} →</button>
      </div>
    `;
  }

  if (state.tab === 'plans') {
    return renderProposalList();
  }

  if (state.tab === 'share') {
    return shareForm();
  }

  if (state.tab === 'commute') {
    return renderCommuteView();
  }

  if (state.tab === 'done') {
    const latest = data.reports[0];
    return `
      <div class="success">✓</div>
      <h2>${getText('part_of_picture')}</h2>
      <p>${getText('your_experience_received')}</p>
      <div class="card soft">
        <span class="tag">${escapeHtml(latest.id)}</span>
        <h3>${escapeHtml(latest.place)}</h3>
        <p>${escapeHtml(latest.comment || latest.feeling)}</p>
      </div>
      <div class="timeline">
        <p><b>1 · ${getText('received')}</b><br>${getText('shared_map')}</p>
        <p>2 · ${getText('under_review')}<br>${getText('planners_assess')}</p>
        <p>3 · ${getText('follow_outcome')}<br>${getText('see_response')}</p>
      </div>
      <button class="primary wide" onclick="nav('updates')">${getText('track_experience')}</button>
    `;
  }

  if (state.tab === 'updates') {
    const mine = data.reports.filter((report) => report.mine);

    return `
      <span class="eyebrow">${getText('the_loop_comes_back_to_you')}</span>
      <h2>${getText('my_updates')}</h2>
      <p>${getText('my_updates_sub')}</p>
      ${mine.length
        ? mine.map((report) => `
            <div class="card">
              <div class="row">
                <small>${escapeHtml(report.id)}</small>
                <span class="badge good">${escapeHtml(report.status)}</span>
              </div>
              <h3>${escapeHtml(report.place)}</h3>
              <p>${escapeHtml(report.comment || report.feeling)}</p>
              ${report.reply
                ? `<div class="card soft" style="padding:12px;margin:0"><b>${getText('city_response')}</b><p>${escapeHtml(report.reply)}</p></div>`
                : `<p>${getText('received_by_city')}</p>`}
              <button class="link" onclick="showReport(${data.reports.indexOf(report)})">${getText('view_timeline')}</button>
            </div>
          `).join('')
        : `<div class="empty">${getText('valuable_input')}<br><br><button class="primary" onclick="nav('share')">${getText('share_first_experience')}</button></div>`}
    `;
  }

  if (state.tab === 'profile') {
    return profileView();
  }

  return `
    <span class="eyebrow">${getText('help_shape_next')}</span>
    <h2>${getText('neighbourhood_plans')}</h2>
    <p>${getText('see_trade_offs')}</p>
    ${data.proposal
      ? `
        <div class="card soft">
          <span class="tag">${getText('open_for_feedback')}</span>
          <h3>${escapeHtml(data.proposal.name)}</h3>
          <p>${escapeHtml(data.proposal.message)}</p>
          ${map()}
          <label>${getText('your_perspective')}</label>
          <textarea id="voteComment" placeholder="${getText('how_journey_affected')}" maxlength="500"></textarea>
          <div class="row" style="margin-top:12px">
            <button class="secondary" onclick="castVote('Concerned')">${getText('i_have_concerns')}</button>
            <button class="primary" onclick="castVote('Support')">${getText('works_for_me')}</button>
          </div>
          ${data.vote ? `<p>${getText('your_response')}: <b>${escapeHtml(data.vote.value)}</b><br>${escapeHtml(data.vote.comment)}</p>` : ''}
        </div>
      `
      : `
        <div class="card soft">
          <span class="tag">${getText('in_preparation')}</span>
          <h3>${getText('safer_school_sport')}</h3>
          <p>${getText('city_is_exploring')}</p>
          <button class="link" onclick="setMode('city'); cnav('scenarios')">Demo: explore options as the city →</button>
        </div>
      `}
    <p class="note">${getText('estimates_note')}</p>
  `;
}

function renderCommuteView() {
  const segment = getSelectedSegment();
  const activeReports = data.issueLog || [];

  return `
    <span class="eyebrow">${getText('commute_title')}</span>
    <h2>${getText('commute_route')}</h2>
    <p>${getText('commute_summary')}</p>
    <div class="metric">
      <div><b>3</b><small>${getText('segments')}</small></div>
      <div><b>${activeReports.length}</b><small>${getText('live_reports')}</small></div>
      <div><b>18 min</b><small>${getText('travel_time')}</small></div>
    </div>
    <div class="segment-list">
      ${data.commuteSegments.map((item) => `
        <button class="segment-card ${item.id === segment.id ? 'selected' : ''}" onclick="state.selectedSegmentId='${item.id}'; render();">
          <div>
            <strong>${escapeHtml(item.name)}</strong>
            <span>${escapeHtml(item.start)} → ${escapeHtml(item.end)} · ${escapeHtml(item.time)}</span>
          </div>
          <div class="segment-meta">
            <span class="status-flag ${item.risk === 'High' ? 'urgent' : item.risk === 'Low' ? 'safe' : ''}">${escapeHtml(item.risk)}</span>
          </div>
        </button>
      `).join('')}
    </div>
    <div class="card soft">
      <b>${escapeHtml(segment.name)}</b>
      <p>${escapeHtml(segment.summary)}</p>
      <div class="row" style="margin-top:12px">
        <button class="secondary" onclick="toggleCommuteTracking('${segment.id}')">${segment.status === 'Tracked' ? getText('record_again') : getText('start_tracking')}</button>
        <button class="primary" onclick="openIssueFromSegment('${segment.id}')">${getText('report_this_segment')}</button>
      </div>
    </div>
  `;
}

function issueSummaryPanel() {
  const total = data.issueLog.length;
  const high = data.issueLog.filter((issue) => issue.priority === 'High').length;
  const underReview = data.issueLog.filter((issue) => issue.status === 'Under review').length;
  const received = data.issueLog.filter((issue) => issue.status === 'Received').length;

  return `
    <div class="issue-summary-panel">
      <div class="issue-summary-head">
        <h3>${getText('resident_issue_summary')}</h3>
      </div>
      <div class="issue-summary-grid">
        <div class="issue-stat-card">
          <span>${getText('total_issues')}</span>
          <strong>${total}</strong>
        </div>
        <div class="issue-stat-card warning">
          <span>${getText('high_priority')}</span>
          <strong>${high}</strong>
        </div>
        <div class="issue-stat-card review">
          <span>${getText('under_review')}</span>
          <strong>${underReview}</strong>
        </div>
        <div class="issue-stat-card neutral">
          <span>${getText('received')}</span>
          <strong>${received}</strong>
        </div>
      </div>
    </div>
  `;
}

function profileView() {
  const issueList = (data.issueLog || []).slice(0, 3);

  return `
    <div class="profile-grid">
      <div class="profile-card">
        <span class="eyebrow">${getText('profile')}</span>
        <h2>${escapeHtml(data.profile.name || 'Kadri')}</h2>
        <div class="pill-row">
          <span class="pill">${escapeHtml(data.profile.home || 'Tammelinn')}</span>
          <span class="pill">${escapeHtml(data.profile.work || 'City centre')}</span>
          <span class="pill">${escapeHtml(data.profile.preferredMode || 'Bike')}</span>
        </div>
        <p>${getText('prefer_mode_text')}</p>
      </div>
      <div class="profile-card">
        <span class="eyebrow">${getText('language')}</span>
        <h2>${escapeHtml(LANGUAGES[state.language])}</h2>
        <p>${getText('set_local_pref')}</p>
        <select id="profileLanguage" onchange="setLanguage(this.value)">
          ${Object.entries(LANGUAGES).map(([code, label]) => `<option value="${code}" ${state.language === code ? 'selected' : ''}>${label}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="route-grid" style="margin-top:16px">
      <div class="route-card">
        <span class="eyebrow">${getText('today_activity')}</span>
        <h3>${getText('route_summary_profile')}</h3>
        ${data.commuteSegments.map((segment, index) => `
          <div class="report">
            <div class="row">
              <b>${index + 1}. ${escapeHtml(segment.name)}</b>
              <span class="status-flag ${segment.risk === 'High' ? 'urgent' : segment.risk === 'Low' ? 'safe' : ''}">${escapeHtml(segment.risk)}</span>
            </div>
            <p>${escapeHtml(segment.summary)}</p>
            <small>${escapeHtml(segment.time)} · ${escapeHtml(segment.mode)}</small>
          </div>
        `).join('')}
      </div>
      <div class="route-card">
        <span class="eyebrow">${getText('issue_tracking')}</span>
        <h3>${getText('live_issue_overview')}</h3>
        <div class="issue-list">
          ${issueList.length ? issueList.map((issue) => `
            <div class="issue-item">
              <div class="row">
                <strong>${escapeHtml(issue.title)}</strong>
                <span class="status-flag ${issue.priority === 'High' ? 'urgent' : 'safe'}">${escapeHtml(translatePriority(issue.priority))}</span>
              </div>
              <p>${escapeHtml(issue.segment)} · ${escapeHtml(translateStatus(issue.status))}</p>
              <small>${escapeHtml(issue.createdAt)}</small>
            </div>
          `).join('') : `<div class="empty">${getText('no_reports')}</div>`}
        </div>
      </div>
    </div>
  `;
}

function shareForm() {
  return `
    <div class="row">
      <span class="eyebrow">${getText('share_heading')}</span>
      <small>${state.step} / 2</small>
    </div>
    <div class="progress">
      <span class="on"></span>
      <span class="${state.step === 2 ? 'on' : ''}"></span>
    </div>
    ${state.step === 1
      ? `
        <h2>${getText('share_step_title').replace(' ', '<br>')}</h2>
        <p>${getText('share_step_copy')}</p>
        <div class="roles">
          ${ROLE_OPTIONS.map(({ symbol, label }) => `
            <button class="choice ${state.roles.includes(label) ? 'selected' : ''}" aria-pressed="${state.roles.includes(label)}" onclick="toggleRole('${label}')">
              <i>${symbol}</i>${translateRole(label)}
            </button>
          `).join('')}
        </div>
        <div class="card soft">
          <h3>${getText('share_terms_title')}</h3>
          <p>${getText('share_terms_copy')}</p>
        </div>
        <div class="row" style="margin-top:12px">
          ${state.shareEntry === 'commute' ? `<button class="secondary" onclick="goBackFromShare()">← ${getText('back_to_commute')}</button>` : ''}
        </div>
        <button class="primary wide" onclick="nextStep()">${getText('choose_place')}</button>
      `
      : `
        <h2>${getText('narrative_title')}</h2>
        ${state.routeFocusSegment ? `<div class="card soft"><strong>${getText('selected_segment')}</strong><p>${escapeHtml(state.routeFocusSegment)}</p></div>` : ''}
        ${map(true)}
        <label for="place">${getText('place_label')}</label>
        <input id="place" value="${escapeHtml(state.place)}" oninput="state.place=this.value" maxlength="100" placeholder="${getText('home_route_demo')}">
        <div class="feelings">
          ${FEELING_OPTIONS.map(({ symbol, label }) => `
            <button class="choice ${state.feeling === label ? 'selected' : ''}" aria-pressed="${state.feeling === label}" onclick="state.feeling='${label}'; render()">
              <i>${symbol}</i>${translateFeeling(label)}
            </button>
          `).join('')}
        </div>
        <label for="comment">${getText('what_happened')} <small>(optional)</small></label>
        <textarea id="comment" oninput="state.comment=this.value" maxlength="500" placeholder="${getText('add_context_placeholder')}">${escapeHtml(state.comment)}</textarea>
        <div class="row" style="margin-top:13px">
          <button class="secondary" onclick="goBackFromShare()">← ${state.routeFocusSegment || state.backTarget === 'commute' ? getText('back_to_commute') : getText('back_to_previous')}</button>
          <button class="primary" onclick="submitReport()">${getText('submit_experience')}</button>
        </div>
      `
    }
  `;
}

function toggleRole(roleName) {
  if (state.roles.includes(roleName)) {
    state.roles = state.roles.filter((item) => item !== roleName);
  } else {
    state.roles = [...state.roles, roleName];
  }
  render();
}

function nextStep() {
  if (!state.roles.length) {
    toast(getText('choose_perspective'));
    return;
  }

  state.step = 2;
  render();
}

function goBackFromShare() {
  if (state.step > 1) {
    state.step = 1;
    render();
    return;
  }

  if (state.shareEntry === 'commute') {
    state.tab = 'commute';
    state.routeFocusSegment = null;
  } else {
    state.tab = 'explore';
  }
  state.place = '';
  state.comment = '';
  state.feeling = '';
  state.roles = [];
  state.backTarget = null;
  state.shareEntry = 'share';
  render();
}

function openIssueFromSegment(segmentId) {
  const segment = data.commuteSegments.find((item) => item.id === segmentId);
  if (!segment) return;

  state.routeFocusSegment = segment.name;
  state.shareEntry = 'commute';
  state.tab = 'share';
  state.step = 2;
  state.place = segment.name;
  state.comment = `On my commute from ${segment.start} to ${segment.end}, I noticed a problem in this section.`;
  state.feeling = 'Uncomfortable';
  state.roles = [segment.mode === 'Public transport' ? 'Public transport' : 'Cyclist'];
  render();
}

function toggleCommuteTracking(segmentId) {
  const segment = data.commuteSegments.find((item) => item.id === segmentId);
  if (!segment) return;
  segment.status = segment.status === 'Tracked' ? 'Completed' : 'Tracked';
  saveData();
  render();
}

function submitReport() {
  if (!state.place.trim()) {
    toast(getText('mention_location'));
    return;
  }

  if (!state.feeling) {
    toast(getText('choose_feeling'));
    return;
  }

  data.reports.unshift({
    id: 'CG-' + Date.now().toString().slice(-7),
    place: state.place.trim(),
    feeling: state.feeling,
    roles: [...state.roles],
    comment: state.comment.trim(),
    status: 'Received',
    reply: '',
    mine: true,
    ...state.pin
  });

  if (state.routeFocusSegment) {
    data.issueLog.unshift({
      id: 'ISS-' + Date.now().toString().slice(-4),
      title: 'Commute segment report',
      segment: state.routeFocusSegment,
      status: 'Received',
      priority: state.feeling === 'Unsafe' ? 'High' : 'Medium',
      createdAt: 'Today ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  }

  saveData();
  state.tab = 'done';
  state.step = 1;
  state.place = '';
  state.comment = '';
  state.feeling = '';
  state.roles = [];
  state.routeFocusSegment = null;
  state.backTarget = null;
  state.shareEntry = 'share';

  render();
  toast('Experience shared. Thank you for adding your perspective.');
}

function cityView() {
  return `
    <div class="city">
      <aside class="side">
        <span class="eyebrow">CITY OF TARTU</span>
        <h3>Planning workspace</h3>
        ${['overview', 'feedback', 'scenarios', 'decisions']
          .map((tabKey) => {
            const labels = {
              overview: ['▦', getText('tab_overview')],
              feedback: ['◉', getText('tab_feedback')],
              scenarios: ['⇄', getText('tab_scenarios')],
              decisions: ['✓', getText('tab_decisions')]
            };
            const [icon, label] = labels[tabKey];
            return `<button class="${state.cityTab === tabKey ? 'active' : ''}" onclick="cnav('${tabKey}')">${icon} &nbsp; ${label}</button>`;
          }).join('')}
        <div class="card soft" style="margin-top:80px;padding:15px">
          <h3>${getText('human_layer')}</h3>
          <p class="note">${getText('human_layer_copy')}</p>
        </div>
      </aside>

      <section>
        <div class="cityhead">
          <div>
            <span class="eyebrow">${getText('city_of_tartu')}</span>
            <h1>${getCityTabText(state.cityTab)}</h1>
          </div>
          <button class="secondary" onclick="exportData()">${getText('export_feedback')}</button>
        </div>
        <p style="margin-top:0">${getCitySummaryText(state.cityTab)}</p>
        ${state.cityTab === 'overview' ? renderOverview() : state.cityTab === 'feedback' ? renderFeedback() : state.cityTab === 'scenarios' ? renderScenarios() : renderDecisions()}
      </section>
    </div>
  `;
}

function renderOverview() {
  return `
    <div class="stats">
      ${[
        [getText('shared_experiences'), data.reports.length, getText('all_perspectives')],
        [getText('need_review'), data.reports.filter((report) => report.status === 'Received').length, getText('waiting_for_response')],
        [getText('safety_concerns'), data.reports.filter((report) => report.feeling === 'Unsafe').length, getText('lived_experience_signals')],
        [getText('resident_responses'), data.vote ? 1 : 0, getText('current_proposal')]
      ].map(([label, count, subtitle]) => `
        <div class="card">
          <small>${label}</small>
          <b>${count}</b>
          <small>${subtitle}</small>
        </div>
      `).join('')}
    </div>

    ${issueSummaryPanel()}

    <div class="citygrid">
      <div class="card">
        <div class="row">
          <h3>${getText('experience_layer')}</h3>
          <span class="tag">● ${data.reports.length} ${getText('voices')}</span>
        </div>
        ${map()}
        <div class="row" style="margin-top:14px">
          <small>● ${getText('feeling_unsafe')} &nbsp; ● ${getText('feeling_uncomfortable')} &nbsp; ● ${getText('feeling_good_experience')}</small>
          <span class="note">${getText('illustrative_map')}</span>
        </div>
      </div>

      <div class="card">
        <div class="row">
          <h3>${getText('recent_experiences')}</h3>
          <button class="link" onclick="cnav('feedback')">${getText('view_all')}</button>
        </div>
        ${data.reports.slice(0, 3).map((report, index) => reportRow(report, index)).join('')}
      </div>
    </div>

    <div class="card dark row">
      <div>
        <span class="eyebrow" style="color:#ddec9f">${getText('from_experience_to_action')}</span>
        <h2>${getText('safer_crossing')}</h2>
        <p>${getText('explore_options')}</p>
      </div>
      <button class="secondary" onclick="cnav('scenarios')">${getText('compare_options_cta')}</button>
    </div>
  `;
}

function renderFeedback() {
  return `
    <div class="toolbar">
      <input aria-label="Search feedback" placeholder="${getText('search_feedback')}" value="${escapeHtml(state.query)}" oninput="state.query=this.value; updateResults()">
      <select aria-label="Filter by experience" onchange="state.filter=this.value; updateResults()">
        ${[
          getText('filter_all_experiences'),
          getText('filter_unsafe'),
          getText('filter_uncomfortable'),
          getText('filter_good_experience')
        ].map((item) => `<option ${state.filter === item ? 'selected' : ''}>${item}</option>`).join('')}
      </select>
    </div>
    <div class="card" id="results">${resultsList()}</div>
  `;
}

function updateResults() {
  const node = document.getElementById('results');
  if (node) node.innerHTML = resultsList();
}

function resultsList() {
  const list = data.reports.filter((report) => {
    const matchesFilter = state.filter === 'All experiences' || report.feeling === state.filter;
    const haystack = `${report.place} ${report.comment} ${report.roles.join(' ')}`.toLowerCase();
    return matchesFilter && haystack.includes(state.query.toLowerCase());
  });

  return `
    <div class="row">
      <h3>${list.length} ${getText('resident_experiences')}</h3>
      <small>${getText('select_experience')}</small>
    </div>
    ${list.map((report, index) => reportRow(report, index)).join('') || `<div class="empty">${getText('no_matching_experiences')}</div>`}
  `;
}

function reportRow(report, index) {
  return `
    <div class="report" role="button" tabindex="0" onclick="showReport(${index})" onkeydown="if(event.key==='Enter')showReport(${index})">
      <div class="row">
        <b>${escapeHtml(report.place)}</b>
        <span class="badge ${report.feeling === 'Good experience' ? 'good' : ''}">${escapeHtml(report.feeling)}</span>
      </div>
      <p>${escapeHtml(report.comment || getText('no_additional_comment'))}</p>
  `;
}

function renderScenarios() {
  return `
    <div class="card soft">
      <b>Illustrative scenario comparison</b>
      <p style="margin:6px 0">These are fixed demo assumptions, not outputs from an AI model or digital twin. Safety values illustrate a perceived-safety indicator. Validate with real evidence before making decisions.</p>
    </div>

    <div class="plans">
      ${PLANS.map((plan, index) => `
        <div class="card ${state.selectedPlan === plan.name ? 'chosen' : ''}">
          <span class="tag">OPTION ${String.fromCharCode(65 + index)}</span>
          <h2>${plan.name}</h2>
          <p>${plan.desc}</p>
          <div class="line"></div>
          <small>Indicative budget</small>
          <h2>${plan.cost}</h2>
          <p class="note">${plan.trade}</p>
          <button class="${state.selectedPlan === plan.name ? 'primary' : 'secondary'} wide" onclick="state.selectedPlan='${plan.name}'; render()">
            ${state.selectedPlan === plan.name ? '✓ Selected' : 'Select option'}
          </button>
        </div>
      `).join('')}
    </div>

    <div class="card tablewrap">
      <h3>Make the trade-offs visible</h3>
      <table>
        <thead>
          <tr>
            <th>Illustrative impact</th>
            ${PLANS.map((plan) => `<th>${plan.name}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${[['Perceived safety', 'safety'], ['Car journey time', 'car'], ['Bus journey time', 'bus']]
            .map(([label, key]) => `
              <tr>
                <td>${label}</td>
                ${PLANS.map((plan) => `<td>${plan[key]}</td>`).join('')}
              </tr>
            `).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="row">
        <div>
          <h3>Bring the proposal back to residents</h3>
          <p>Selected: <b>${state.selectedPlan}</b>. Publishing opens feedback in the resident app.</p>
        </div>
      </div>
      <label for="proposalMessage">Explain why this option is worth exploring *</label>
      <textarea id="proposalMessage" maxlength="1000" placeholder="Describe the expected benefit and the trade-offs residents should consider."></textarea>
      <button class="primary" style="margin-top:15px" onclick="publishProposal()">Publish proposal for feedback →</button>
    </div>
  `;
}

function publishProposal() {
  const message = document.getElementById('proposalMessage').value.trim();

  if (!message) {
    toast('Add a plain-language explanation for residents.');
    return;
  }

  if (data.proposal && data.proposal.name !== state.selectedPlan) {
    data.vote = null;
  }

  data.proposal = {
    name: state.selectedPlan,
    message
  };

  saveData();
  toast('Proposal published to the resident app.');
  cnav('decisions');
}

function renderDecisions() {
  const proposalRows = data.proposalOptions.map((proposal) => {
    const counts = data.proposalResults?.[proposal.id] || { support: 0, neutral: 0, oppose: 0 };
    const total = counts.support + counts.neutral + counts.oppose || 1;
    const supportPct = Math.round((counts.support / total) * 100);
    const neutralPct = Math.round((counts.neutral / total) * 100);
    const opposePct = Math.round((counts.oppose / total) * 100);

    return `
      <div class="card soft">
        <div class="row">
          <h3>${proposal.title}</h3>
          <span class="tag">${supportPct}% support</span>
        </div>
        <div class="progress" style="margin:10px 0 12px">
          <span class="on" style="width:${supportPct}%"></span>
        </div>
        <div class="row" style="font-size:12px; color:var(--muted)">
          <span>${getText('vote_support')}: ${counts.support}</span>
          <span>${getText('vote_neutral')}: ${counts.neutral}</span>
          <span>${getText('vote_oppose')}: ${counts.oppose}</span>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="card">
      <span class="tag">${data.proposal ? getText('consultation_open') : getText('no_proposal')}</span>
      <h2>${data.proposal ? escapeHtml(data.proposal.name) : 'Start with a proposal'}</h2>
      <p>${data.proposal ? escapeHtml(data.proposal.message) : 'Compare options and explain the trade-offs to invite informed feedback.'}</p>
      <button class="secondary" onclick="cnav('scenarios')">${data.proposal ? getText('review_options') : getText('compare_options_btn')}</button>
    </div>

    ${data.proposal ? `
      <div class="card">
        <h3>${getText('resident_response')}</h3>
        ${data.vote ? `
          <span class="badge good">${escapeHtml(data.vote.value)}</span>
          <p>${escapeHtml(data.vote.comment || getText('no_additional_comment'))}</p>
          <small>${getText('resident_demo_profile')}</small>
        ` : `<p>${getText('no_responses_yet')}</p>`}
      </div>
    ` : ''}

    <div class="card">
      <h3>${getText('public_vote_results')}</h3>
      ${proposalRows}
    </div>

    <div class="card">
      <h3>${getText('feedback_follow_through')}</h3>
      ${data.reports.map((report, index) => reportRow(report, index)).join('')}
    </div>
  `;
}

function voteOnProposal(proposalId, choice) {
  const result = data.proposalResults[proposalId] || { support: 0, neutral: 0, oppose: 0 };
  result[choice] = (result[choice] || 0) + 1;
  data.proposalResults[proposalId] = result;
  saveData();
  render();
}

function renderProposalList() {
  return `
    <div class="card soft">
      <span class="eyebrow">${getText('proposal_summary')}</span>
      <h2>${getText('neighbourhood_plans')}</h2>
      <p>${getText('see_trade_offs')}</p>
    </div>
    ${data.proposalOptions.map((proposal) => {
      const counts = data.proposalResults[proposal.id] || { support: 0, neutral: 0, oppose: 0 };
      const total = counts.support + counts.neutral + counts.oppose || 1;
      const supportPct = Math.round((counts.support / total) * 100);
      const neutralPct = Math.round((counts.neutral / total) * 100);
      const opposePct = Math.round((counts.oppose / total) * 100);

      return `
        <div class="card">
          <div class="row">
            <h3>${proposal.title}</h3>
            <span class="tag">${getText('voting_closed')}</span>
          </div>
          <p>${proposal.summary}</p>
          <div class="row">
            <div style="flex:1">
              <b>${getText('proposal_benefits')}</b>
              <ul>
                ${proposal.pros.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
            <div style="flex:1">
              <b>${getText('proposal_tradeoffs')}</b>
              <ul>
                ${proposal.cons.map((item) => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="row" style="margin-top:12px">
            <button class="secondary" onclick="voteOnProposal('${proposal.id}', 'support')">${getText('vote_support')}</button>
            <button class="secondary" onclick="voteOnProposal('${proposal.id}', 'neutral')">${getText('vote_neutral')}</button>
            <button class="secondary" onclick="voteOnProposal('${proposal.id}', 'oppose')">${getText('vote_oppose')}</button>
          </div>
          <div class="card soft" style="margin-top:10px; padding:12px">
            <div class="row" style="font-size:12px; color:var(--muted)">
              <span>${getText('vote_support')}: ${counts.support}</span>
              <span>${getText('vote_neutral')}: ${counts.neutral}</span>
              <span>${getText('vote_oppose')}: ${counts.oppose}</span>
            </div>
            <div class="progress" style="margin-top:8px">
              <span class="on" style="width:${supportPct}%"></span>
            </div>
            <small>Support ${supportPct}% · Neutral ${neutralPct}% · Oppose ${opposePct}%</small>
          </div>
        </div>
      `;
    }).join('')}
  `;
}

function castVote(value) {
  data.vote = {
    value,
    comment: document.getElementById('voteComment')?.value.trim() || ''
  };

  saveData();
  render();
  toast(getText('city_workspace_visible'));
}

function showReport(index) {
  const report = data.reports[index];
  const modal = document.getElementById('modal');

  if (!modal) return;

  modal.innerHTML = `
    <div class="overlay" onclick="if(event.target===this) closeModal()">
      <section class="modal" role="dialog" aria-modal="true" aria-labelledby="detailTitle">
        <div class="row">
          <span class="eyebrow">${escapeHtml(report.id)} · ${report.mine ? getText('your_experience') : getText('community_experience')}</span>
          <button class="secondary" onclick="closeModal()" aria-label="Close dialog">✕</button>
        </div>
        <h2 id="detailTitle">${escapeHtml(report.place)}</h2>
        <span class="badge">${escapeHtml(report.feeling)}</span>
        <p>${escapeHtml(report.comment || getText('no_additional_comment'))}</p>
        <small>${escapeHtml(report.roles.join(' · '))}</small>
        <div class="timeline">
          <p><b>✓ ${getText('received')}</b><br>Added to the shared experience layer.</p>
          <p><b>${escapeHtml(report.status)}</b><br>${escapeHtml(report.reply || getText('awaiting_city_response'))}</p>
        </div>
        ${state.mode === 'city'
          ? `
            <label for="reportStatus">${getText('update_progress')}</label>
            <select id="reportStatus">
              ${['Received', 'Under review', 'Planned', 'Implemented']
                .map((option) => `<option ${report.status === option ? 'selected' : ''}>${option}</option>`)
                .join('')}
            </select>
            <label for="reply">${getText('response_visible')}</label>
            <textarea id="reply" maxlength="1000" placeholder="What happens next, and why?">${escapeHtml(report.reply)}</textarea>
            <button class="primary wide" style="margin-top:16px" onclick="respond(${index})">${getText('save_update')}</button>
          `
          : '<p class="note">Updates appear here when the city responds. This demo does not send emails or push notifications.</p>'}
      </section>
    </div>
  `;

  const firstButton = modal.querySelector('button');
  if (firstButton) firstButton.focus();
}

function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) modal.innerHTML = '';
}

function respond(index) {
  const report = data.reports[index];
  const reply = document.getElementById('reply')?.value.trim();

  if (!reply) {
    toast('Add a response so the resident knows what happens next.');
    return;
  }

  report.status = document.getElementById('reportStatus')?.value || report.status;
  report.reply = reply;

  saveData();
  closeModal();
  render();
  toast(getText('response_update_saved'));
}

function exportData() {
  const payload = {
    exportedAt: new Date().toISOString(),
    ...data
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = 'common-ground-feedback.json';
  link.click();

  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('Feedback exported.');
}

function attachEvents() {
  const languageSelect = document.getElementById('languageSelect');
  if (languageSelect) {
    languageSelect.addEventListener('change', (event) => setLanguage(event.target.value));
  }

  const profileButton = document.getElementById('profileButton');
  if (profileButton) {
    profileButton.addEventListener('click', () => {
      setMode('resident');
      nav('profile');
    });
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_KEY && event.newValue) {
    try {
      data = normalizeData(JSON.parse(event.newValue));
      render();
    } catch (error) {
      // ignore malformed storage payloads
    }
  }
});

attachEvents();
render();

