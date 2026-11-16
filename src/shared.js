/* Shared by all three pages: page furniture, the dock, theme toggle,
 reveal animations, the pencil trail and the project data. */
var root = document.documentElement;
root.classList.remove('no-js');
root.classList.add('js');
export var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var base = import.meta.env.BASE_URL;

// The theme is not stored anywhere. A manual choice rides along on links
// between the pages as ?theme=, so it survives going to a project and back.
var query = new URLSearchParams(window.location.search);
var theme = query.get('theme') === 'dark' || query.get('theme') === 'light' ? query.get('theme') : '';
if (theme) root.setAttribute('data-theme', theme);

function withTheme(target) {
  if (!theme) return target;
  var hash = '';
  var i = target.indexOf('#');
  if (i > -1) { hash = target.slice(i); target = target.slice(0, i); }
  var parts = target.split('?');
  var p = new URLSearchParams(parts[1] || '');
  p.set('theme', theme);
  return parts[0] + '?' + p.toString() + hash;
}
function syncLinks() {
  [].forEach.call(document.querySelectorAll('a[data-nb]'), function (a) {
    a.setAttribute('href', withTheme(a.getAttribute('data-nb')));
  });
  if (!theme) return;
  var p = new URLSearchParams(window.location.search);
  p.set('theme', theme);
  window.history.replaceState(null, '', window.location.pathname + '?' + p.toString() + window.location.hash);
}

// ---------- project data: one place, used by all three pages ----------
var gh = 'https://github.com/Muhit-1/';
var doodles = {
  app: '<rect class="fc" x="6" y="10" width="52" height="42" rx="3"/><path d="M6 21h52"/><circle class="so" cx="13" cy="15.5" r="1.3"/><circle class="sb" cx="19" cy="15.5" r="1.3"/><rect class="hb sb" x="12" y="27" width="19" height="19" rx="1.5"/><circle class="so" cx="45" cy="36.5" r="8"/><path class="so" d="M45 31.5v5l3.5 2.5"/>',
  farm: '<path d="M32 57V30"/><path class="hb sb" d="M32 36C19 36 13 27 12 16c12 0 20 7 20 20z"/><path class="ho so" d="M32 29c0-11 7-17 19-18 0 12-7 18-19 18z"/><path d="M16 57h32"/>',
  bus: '<rect class="fc" x="5" y="13" width="54" height="34" rx="7"/><rect class="hb ns" x="6" y="31" width="52" height="15"/><rect x="5" y="13" width="54" height="34" rx="7"/><path d="M5 31h54M24 13v18M42 13v18"/><circle class="fc" cx="19" cy="48" r="5.5"/><circle class="fc" cx="45" cy="48" r="5.5"/><path class="so" d="M49 39h5"/>',
  ledger: '<path class="fc" d="M13 6h29l9 9v43H13z"/><path d="M42 6v9h9"/><path class="sb" d="M20 25h23M20 33h23M20 41h11"/><circle class="fc" cx="45" cy="47" r="9"/><circle class="ho so" cx="45" cy="47" r="9"/>',
  globe: '<circle class="fc" cx="29" cy="35" r="22"/><ellipse class="sb" cx="29" cy="35" rx="9" ry="22"/><path class="sb" d="M7 35h44M11 23h36M11 47h36"/><path class="fc" d="M48 5c-5 0-9 4-9 9 0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9z"/><path class="ho so" d="M48 5c-5 0-9 4-9 9 0 6 9 15 9 15s9-9 9-15c0-5-4-9-9-9z"/>',
  keys: '<rect class="fc" x="4" y="14" width="17" height="17" rx="3.5"/><rect class="hb sb" x="24" y="14" width="17" height="17" rx="3.5"/><rect class="fc" x="44" y="14" width="17" height="17" rx="3.5"/><rect class="ho so" x="12" y="36" width="40" height="14" rx="3.5"/><path d="M9 22.5h7M49 22.5h7M52.5 19v7"/>'
};
export function doodle(icon) {
  return '<svg class="doodle" viewBox="0 0 64 64" aria-hidden="true">' + doodles[icon] + '</svg>';
}
export function checkSvg() {
  return '<svg viewBox="0 0 30 30" aria-hidden="true"><rect class="box" x="3" y="6" width="20" height="20" rx="2.5"/><path class="tick" pathLength="1" d="M8 16 l5 6 L27 3"/></svg>';
}

// `media` is empty for now: set it to { type: 'video' | 'image', src: 'media/…' } (a file under public/) to fill the taped frame.
// `goal: []` shows a pencilled reminder on the project page instead of text.
export var projects = [
  {
    id: 'workstationx', name: 'WorkStationX', kind: 'desktop app', cat: 'desktop', icon: 'app',
    desc: 'Windows desktop app that opens your whole work context in one click, with a countdown task timer and screen tools behind a global shortcut.',
    summary: 'A Windows app that opens your working context in one click, times tasks against your own estimates, and keeps screen tools one keypress away.',
    tags: ['C#', 'WPF', '.NET', 'SQLite'],
    status: 'Released, with an installer', platform: 'Windows desktop',
    repo: gh + 'WorkStationX', live: '', media: null,
    goal: [
      'Three small frustrations, one app. <mark class="hl">Starting work takes too long</mark>: every task means opening the editor, the right browser profile, the docs and a terminal before anything real happens. A workspace opens all of that in one click and closes it again when you are done.',
      'Time estimates are guesses nobody checks. The timer counts down from your estimate instead of up from zero, so a task running long is impossible to miss, and finished tasks stay in the list as a record.',
      'Screen tools live in five different apps. Here the colour picker, ruler and screenshot annotator sit behind a global shortcut and work even when the app is not on screen.',
      'It is also a portfolio piece: proof that I can take a real Windows application from an empty folder to a release, with a designed interface, a normalised database with migrations, dependency injection, background services, Win32 interop, tests and an installer a stranger can run.'
    ],
    features: [
      ['Workspaces', 'A named set of apps and websites that opens in order, with a delay between items, and closes again together.'],
      ['Chrome profile mapping', 'Pin a site to a Chrome profile so work links open in the work profile.'],
      ['Only closes what it opened', 'Closing a workspace never touches a window you started yourself.'],
      ['Already-running detection', 'If your editor is open, launching the workspace does not open a second copy.'],
      ['Countdown task timer', 'One task at a time, shown as a circular countdown from your own estimate.'],
      ['Screen tools', 'Colour picker, ruler and screenshot annotator, one keypress away.'],
      ['Global shortcuts', 'Ctrl + Shift + 1 to 4 launch your first four workspaces from anywhere in Windows.']
    ],
    stack: [['LANGUAGE', 'C#'], ['INTERFACE', 'WPF on .NET 10'], ['DATA', 'SQLite, one local file, with migrations'], ['SYSTEM', 'Win32 interop for app icons and global hotkeys'], ['PRIVACY', 'No account, no sync, no telemetry']],
    notes: []
  },
  {
    id: 'krishihat', name: 'KrishiHat', kind: 'marketplace', cat: 'web', icon: 'farm',
    desc: 'Agricultural marketplace connecting Bangladeshi farmers with buyers: fixed-price and auction sales, role-based dashboards, bilingual UI.',
    summary: 'A marketplace where farmers in Bangladesh sell straight to buyers, at a fixed price or by auction, in English or Bangla.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'MySQL'],
    status: 'Source on GitHub', platform: 'Web app',
    repo: gh + 'KrishiHat', live: '', media: null,
    goal: [
      'Give farmers in Bangladesh <mark class="hl">a direct way to reach buyers</mark>: list produce at a fixed price or put it up for auction, with a dashboard for each role and an interface that works in both English and Bangla.'
    ],
    features: [
      ['Fixed-price and auction sales', 'Two ways to sell the same produce.'],
      ['Role-based dashboards', 'Each role gets its own area, and routes are protected by role in middleware.'],
      ['Sign-in with JWT', 'Token-based auth with hashed passwords.'],
      ['English and Bangla', 'A custom dictionary system, no i18n library.'],
      ['Image uploads', 'Product and profile photos, stored on the server.'],
      ['Validated forms', 'React Hook Form with Zod schemas.'],
      ['Email', 'Sent over SMTP with Nodemailer.']
    ],
    stack: [['FRAMEWORK', 'Next.js 14 (App Router), React 18, TypeScript'], ['DATA', 'MySQL through Prisma, with the MariaDB adapter'], ['AUTH', 'JSON Web Tokens, bcryptjs'], ['FORMS', 'React Hook Form, Zod'], ['STYLING', 'Tailwind CSS'], ['EMAIL', 'Nodemailer']],
    notes: []
  },
  {
    id: 'dhaka-bus-navigator', name: 'Dhaka Bus Navigator', kind: 'route planner', cat: 'web', icon: 'bus',
    desc: 'Bus route planner for Dhaka with fare and time estimates, interactive maps and an English/Bangla interface.',
    summary: 'A bus-route and fare finder for Dhaka: pick two stops and see which buses connect them and roughly what the trip costs.',
    tags: ['React', 'Vite', 'Leaflet', 'Express', 'MySQL'],
    status: 'Work in progress, runs locally', platform: 'Web app',
    repo: gh + 'dhaka-bus-navigator', live: '', media: { type: 'video', src: base + 'media/dhaka-bus-navigator-promo.mp4' },
    goal: [
      'Make it quicker to work out <mark class="hl">which bus gets you between two stops in Dhaka</mark>, and what the fare should be, without asking around at the stand.'
    ],
    features: [
      ['Route planning', 'Finds direct and one-transfer routes between two stops.'],
      ['Fare estimates', 'Distance-based: ৳2.42 per km, ৳10 minimum, rounded to the nearest ৳5.'],
      ['Interactive map', 'Leaflet with OpenStreetMap tiles.'],
      ['English and Bangla', 'The whole interface switches language.'],
      ['Feedback form', 'Riders can send corrections, saved to the database.'],
      ['Responsive and dark-mode aware', 'Built for a phone at the bus stand.']
    ],
    stack: [['FRONTEND', 'React 18, Vite, Tailwind CSS, Framer Motion, React Router'], ['MAP', 'Leaflet with OpenStreetMap'], ['BACKEND', 'Node and Express API'], ['DATABASE', 'MySQL']],
    notes: [
      'Stop coordinates come from a best-effort OpenStreetMap geocode, so some are approximate.',
      'The route data covers routes B to M only.',
      'Not deployed yet; it runs locally.'
    ]
  },
  {
    id: 'accounting-tool', name: 'Accounting Tool', kind: 'accounting', cat: 'web', icon: 'ledger',
    desc: 'Multi-business accounting and invoicing platform: JWT auth, transaction ledger, PDF invoices and shared access control.',
    summary: 'An accounting and invoicing platform for people who run more than one business, with a ledger, PDF invoices and shared access.',
    tags: ['NestJS', 'Prisma', 'MySQL', 'React'],
    status: 'Source on GitHub', platform: 'Web app and API',
    repo: gh + 'Accounting-Tool-api', live: '', media: null,
    goal: [],
    features: [
      ['Several businesses, one account', 'Keep the books for each business separate.'],
      ['Transaction ledger', 'Every entry in one running record.'],
      ['PDF invoices', 'Generated from the invoice data.'],
      ['Shared access control', 'Invite other people and limit what they can do.'],
      ['Sign-in with JWT', 'Token-based authentication on the API.']
    ],
    stack: [['API', 'NestJS'], ['DATA', 'MySQL through Prisma'], ['FRONTEND', 'React']],
    notes: []
  },
  {
    id: 'crisis-compass', name: 'Crisis Compass', kind: 'live map', cat: 'web', icon: 'globe',
    desc: 'Interactive world map of live weather and natural disasters with a scrubbable seven-day timeline.',
    summary: 'An interactive world map of live weather and natural disasters, with a timeline you can scrub to watch conditions develop.',
    tags: ['Svelte', 'Open data feeds'],
    status: 'Live', platform: 'Web app',
    repo: gh + 'Crisis-Compass', live: 'https://muhit-1.github.io/Crisis-Compass/', media: { type: 'video', src: base + 'media/crisis-compass-promo-v2.mp4' },
    goal: [
      'Put <mark class="hl">forecast weather and live disaster alerts on one map</mark>, and let you move backwards and forwards through time to see how a situation is developing.',
      'Everything it uses is free and needs no API key or account, so anyone can open the link or run it themselves.'
    ],
    features: [
      ['Six weather layers', 'Wind, temperature, rain, clouds, gusts and storm energy, with pressure isobars on top.'],
      ['A timeline you can scrub', 'About seven days of past weather through to the forecast, hour by hour, with a play button.'],
      ['Live hazard feeds', 'Earthquakes from USGS, official alerts from GDACS and natural events from NASA EONET.'],
      ['Point forecasts', 'Click anywhere for an hourly forecast and a temperature and rain chart.'],
      ['Values on the map', 'Zoom in and the active layer labels its values at named cities.'],
      ['Shareable view', 'The whole view is encoded in the URL, so a link shows exactly what you saw.'],
      ['Units and models', 'Switch temperature and wind units, and choose between four forecast models.']
    ],
    stack: [['FRONTEND', 'Svelte'], ['HAZARD DATA', 'USGS, GDACS, NASA EONET'], ['WEATHER', 'Open forecast feeds, no API key'], ['HOSTING', 'GitHub Pages']],
    notes: []
  },
  {
    id: 'keyquest', name: 'KeyQuest', kind: 'browser game', cat: 'game', icon: 'keys',
    desc: 'Typing and riddle game: clear four words, crack the riddle, keep the clock alive. Runs entirely in the browser.',
    summary: 'A typing game where the words are clues: clear four of them, then crack the riddle they were pointing at before the clock runs out.',
    tags: ['React', 'JavaScript'],
    status: 'Live', platform: 'Browser game',
    repo: gh + 'KeyQuest', live: 'https://muhit-1.github.io/KeyQuest', media: { type: 'video', src: base + 'media/keyquest-promo.mp4' },
    goal: [
      'A typing game with a twist: <mark class="hl">the words you type are clues</mark>. Clear a round of four and a riddle appears. Get it right for points and extra seconds; get it wrong and the run ends.',
      'There is no backend at all. No database, no accounts, no keys. Scores stay in your own browser.'
    ],
    features: [
      ['Real and on-screen keyboards', 'Type on your keyboard or tap the keycap deck; both are always live.'],
      ['Next-key hinting', 'The key you need next lifts and glows.'],
      ['Honest feedback', 'A wrong key flashes red but never corrupts the word or skips ahead.'],
      ['Custom run length', '30, 45 or 60 seconds, or anything from 10 to 600.'],
      ['43 riddle sets', 'Each round pulls four random words from a riddle, so runs vary.'],
      ['Local leaderboard', 'Your top ten scores, with a personal-best badge.'],
      ['Sound', 'Tones made with the Web Audio API.']
    ],
    stack: [['FRONTEND', 'React 18, JavaScript'], ['STORAGE', 'localStorage, no backend'], ['SOUND', 'Web Audio API'], ['HOSTING', 'GitHub Pages']],
    notes: []
  }
];

// ---------- menu icons ----------
var icons = {
  home: '<path d="M4 11.5 12 4.5l8 7"/><path d="M6.5 10v9.500h11V10"/>',
  about: '<circle cx="12" cy="8" r="3.4"/><path d="M5 20c0-3.900 3.100-7 7-7s7 3.100 7 7"/>',
  work: '<rect x="3.500" y="7.500" width="17" height="12" rx="1.400"/><path d="M8.500 7.500V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.500"/><path d="M3.500 12.500h17"/>',
  experience: '<path d="M6 4v16l6-3.400 6 3.400V4"/>',
  contact: '<rect x="3.500" y="5.500" width="17" height="13" rx="1.500"/><path d="M4 6.500l8 6 8-6"/>',
  projects: '<rect x="4" y="4" width="6.500" height="6.500" rx="1"/><rect x="13.500" y="4" width="6.500" height="6.500" rx="1"/><rect x="4" y="13.500" width="6.500" height="6.500" rx="1"/><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1"/>'
};
function ico(name) { return '<svg class="nav-ico" viewBox="0 0 24 24" aria-hidden="true">' + icons[name] + '</svg>'; }

function navLink(item, cls, inner) {
  var attrs = item.to
    ? ' href="' + item.to + '" data-nb="' + item.to + '"'
    : ' href="#' + item.section + '"';
  return '<a class="' + cls + (item.active ? ' active' : '') + '"' + attrs +
    (item.section ? ' data-section="' + item.section + '"' : '') + '>' + inner + '</a>';
}

// ---------- page furniture, top bar and the three menus ----------
function buildChrome(nav, homeHref) {
  var defs =
    '<svg class="svg-defs" aria-hidden="true"><defs>' +
    [['rough-1', 4], ['rough-2', 17], ['rough-3', 31]].map(function (f) {
      return '<filter id="' + f[0] + '" x="-4%" y="-8%" width="108%" height="116%"><feTurbulence type="fractalNoise" baseFrequency="0.022" numOctaves="2" seed="' + f[1] + '" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="4.2" xChannelSelector="R" yChannelSelector="G"/></filter>';
    }).join('') +
    '<filter id="rough-s" x="-10%" y="-60%" width="120%" height="220%"><feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="2" seed="9" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="2.2" xChannelSelector="R" yChannelSelector="G"/></filter>' +
    '<pattern id="hatch-b" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="5" style="stroke:var(--blue);stroke-width:1.7"/></pattern>' +
    '<pattern id="hatch-o" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)"><line x1="0" y1="0" x2="0" y2="5" style="stroke:var(--orange);stroke-width:1.7"/></pattern>' +
    '</defs></svg>';
  var furniture = '<div class="margin-line" aria-hidden="true"></div><i class="hole" aria-hidden="true"></i><i class="hole" aria-hidden="true"></i><i class="hole" aria-hidden="true"></i>';

  var logoAttrs = homeHref.charAt(0) === '#' ? ' href="' + homeHref + '"' : ' href="' + homeHref + '" data-nb="' + homeHref + '"';
  var top =
    '<div class="top" id="topbar">' +
      '<a class="logo"' + logoAttrs + '>Muhit Kayeem<b>.</b></a>' +
      '<div class="top-right">' +
        '<button class="lswitch" id="theme-toggle" type="button" role="switch" aria-checked="true">' +
          '<span class="lswitch-label" id="lswitch-label">lights on</span>' +
          '<span class="lswitch-plate" aria-hidden="true"><span class="lswitch-slot"><span class="lswitch-lever"></span></span></span>' +
        '</button>' +
      '</div>' +
    '</div>';
  var dock =
    '<nav class="dock" id="dock" aria-label="Sections"><span class="dock-ind" id="dock-ind" aria-hidden="true"></span>' +
    nav.map(function (n) {
      return (n.sep ? '<span class="dock-sep" aria-hidden="true"></span>' : '') +
        navLink(n, 'dock-item', ico(n.icon) + '<span class="dock-label">' + n.label + '</span>');
    }).join('') +
    '</nav>';

  document.body.insertAdjacentHTML('afterbegin', defs + furniture + top);
  document.body.insertAdjacentHTML('beforeend', dock);
}

// ---------- dock marker ----------
function moveMarker() {
  var dock = document.getElementById('dock'), ind = document.getElementById('dock-ind');
  if (!dock || !ind) return;
  var a = dock.querySelector('.dock-item.active');
  if (!a) { ind.style.opacity = 0; return; }
  ind.style.opacity = 1;
  ind.style.setProperty('--t', a.offsetTop + 'px');
  ind.style.setProperty('--h', a.offsetHeight + 'px');
  ind.style.setProperty('--l', a.offsetLeft + 'px');
  ind.style.setProperty('--w', a.offsetWidth + 'px');
}

// ---------- keep the big name inside its column, whichever title font is on ----------
function fitName() {
  [].forEach.call(document.querySelectorAll('.name'), function (el) {
    el.style.fontSize = '';
    var widest = 0;
    [].forEach.call(el.querySelectorAll('.write'), function (w) { widest = Math.max(widest, w.getBoundingClientRect().width); });
    var room = el.clientWidth;
    if (widest > room && room > 0) {
      el.style.fontSize = (parseFloat(getComputedStyle(el).fontSize) * room / widest * 0.98) + 'px';
    }
  });
}
function refit() {
  fitName();
  moveMarker();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fitName(); moveMarker(); });
  window.setTimeout(function () { fitName(); moveMarker(); }, 500);
}

// A light switch: flips the theme with a short mechanical click.
// The click is synthesised (a noise tick plus a low thunk), so there is no audio file to load.
var audioCtx = null;
function switchSound(on) {
  try {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = audioCtx || new AC();
    var ctx = audioCtx, t = ctx.currentTime;
    var len = Math.floor(ctx.sampleRate * 0.035);
    var buf = ctx.createBuffer(1, len, ctx.sampleRate), data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    var tick = ctx.createBufferSource();
    tick.buffer = buf;
    var band = ctx.createBiquadFilter();
    band.type = 'bandpass'; band.frequency.value = on ? 3200 : 2100; band.Q.value = 1.2;
    var tickGain = ctx.createGain();
    tickGain.gain.value = 0.5;
    tick.connect(band); band.connect(tickGain); tickGain.connect(ctx.destination);
    tick.start(t);
    var thunk = ctx.createOscillator(), thunkGain = ctx.createGain();
    thunk.type = 'triangle';
    thunk.frequency.setValueAtTime(on ? 210 : 150, t);
    thunk.frequency.exponentialRampToValueAtTime(on ? 110 : 70, t + 0.07);
    thunkGain.gain.setValueAtTime(0.22, t);
    thunkGain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    thunk.connect(thunkGain); thunkGain.connect(ctx.destination);
    thunk.start(t); thunk.stop(t + 0.1);
  } catch (e) { /* no sound is fine */ }
}
function wireTheme() {
  var btn = document.getElementById('theme-toggle'), label = document.getElementById('lswitch-label');
  var current = theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  function render() {
    var on = current === 'light';
    btn.setAttribute('aria-checked', on ? 'true' : 'false');
    btn.setAttribute('aria-label', 'Lights');
    label.textContent = on ? 'lights on' : 'lights off';
  }
  render();
  btn.addEventListener('click', function () {
    current = current === 'light' ? 'dark' : 'light';
    theme = current;
    root.setAttribute('data-theme', theme);
    switchSound(current === 'light');
    render();
    syncLinks();
  });
}

// the same footer on every page
function fillFooter() {
  [].forEach.call(document.querySelectorAll('.foot'), function (el) {
    el.innerHTML =
      '<div class="foot-id"><span class="logo">Muhit Kayeem<b>.</b></span><span>Backend-focused full-stack developer · Dhaka, Bangladesh</span>' +
        '<span class="foot-copy mono">© 2026 Muhit Rahman · All rights reserved. Code &amp; design may not be reused without written permission.</span></div>' +
      '<nav class="foot-links" aria-label="Elsewhere">' +
        '<a class="pen" href="mailto:senanovi908@gmail.com">Email</a>' +
        '<a class="pen" href="https://github.com/muhit-1" target="_blank" rel="noopener">GitHub <span class="arr arr-out">↗</span></a>' +
        '<a class="pen" href="https://www.linkedin.com/in/muhit-rahman/" target="_blank" rel="noopener">LinkedIn <span class="arr arr-out">↗</span></a>' +
      '</nav>' +
      '<a class="btn btn-sm sk" href="#top">Back to top <span class="arr arr-up">↑</span></a>';
  });
}

function wireScrollspy(nav) {
  var ids = nav.filter(function (n) { return n.section; }).map(function (n) { return n.section; });
  if (!ids.length || !('IntersectionObserver' in window)) return;
  var links = [].slice.call(document.querySelectorAll('[data-section]'));
  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      links.forEach(function (a) { a.classList.toggle('active', a.getAttribute('data-section') === entry.target.id); });
      moveMarker();
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  ids.forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });
}

function wireReveal() {
  [].forEach.call(document.querySelectorAll('[data-stagger]'), function (group) {
    [].forEach.call(group.children, function (child, i) {
      child.setAttribute('data-reveal', '');
      child.style.setProperty('--d', (i * 0.07) + 's');
    });
  });
  var els = [].slice.call(document.querySelectorAll('[data-reveal]'));
  function settle(el) {
    // once revealed, drop the reveal rule so the element's own hover transitions take over
    var delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
    window.setTimeout(function () { el.removeAttribute('data-reveal'); el.classList.remove('in'); }, 1000 + delay * 1000);
  }
  if (reduceMotion || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.removeAttribute('data-reveal'); el.classList.add('seen'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in', 'seen');
      io.unobserve(entry.target);
      settle(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  els.forEach(function (el) { io.observe(el); });
}

function wireTypewriter() {
  var el = document.getElementById('hero-tagline');
  if (!el || reduceMotion) return;
  var text = el.getAttribute('data-text');
  el.setAttribute('aria-label', text);
  el.innerHTML = '<span class="tw-typed" aria-hidden="true"></span><span class="tw-caret" aria-hidden="true"></span><span class="tw-rest" aria-hidden="true">' + text + '</span>';
  var typed = el.querySelector('.tw-typed'), rest = el.querySelector('.tw-rest'), caret = el.querySelector('.tw-caret');
  var i = 0;
  function step() {
    i++;
    typed.textContent = text.slice(0, i);
    rest.textContent = text.slice(i);
    if (i < text.length) window.setTimeout(step, 28 + Math.random() * 30);
    else window.setTimeout(function () { caret.classList.add('done'); }, 2400);
  }
  window.setTimeout(step, 300);
}

// TV: lofi player, starts only on click
function wireTv() {
  var tv = document.getElementById('tv'), set = document.getElementById('tv-set'), cap = document.getElementById('tv-cap');
  if (!tv) return;
  var tracks = [1, 2, 3].map(function (n) { return base + 'audio/lofi-piano-' + n + '.mp3'; });
  var index = 0;
  var audio = new Audio();
  audio.loop = true; audio.preload = 'none'; audio.volume = 0.06; audio.src = tracks[index];
  function render() {
    var playing = !audio.paused;
    tv.classList.toggle('playing', playing);
    set.querySelector('.tv-btn-toggle').setAttribute('aria-pressed', playing ? 'true' : 'false');
    cap.textContent = playing ? 'now playing: track ' + (index + 1) + ' of ' + tracks.length : 'click the TV for lofi piano';
  }
  function stop() { audio.pause(); audio.currentTime = 0; render(); }
  function toggle() { if (audio.paused) audio.play().catch(function () {}); else stop(); }
  function next() {
    var was = !audio.paused;
    index = (index + 1) % tracks.length;
    audio.src = tracks[index];
    if (was) audio.play().catch(function () {});
    render();
  }
  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);
  set.addEventListener('click', function (e) {
    var btn = e.target.closest('.tv-btn');
    if (!btn) return toggle();
    var action = btn.getAttribute('data-action');
    if (action === 'stop') stop(); else if (action === 'next') next(); else toggle();
  });
}

// pencil trail (same as the live site)
function wireTrail() {
  if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  var LIFE = 1500, pts = [], running = false, skipped = false;
  var canvas = document.createElement('canvas');
  canvas.className = 'pencil-trail';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  function resize() { canvas.width = window.innerWidth * dpr; canvas.height = window.innerHeight * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
  resize();
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', function (e) {
    var now = performance.now(), last = pts[pts.length - 1];
    if (e.target && e.target.nodeType === 1 && getComputedStyle(e.target).cursor === 'pointer') { skipped = true; return; }
    if (last) { var dx = e.clientX - last.x, dy = e.clientY - last.y; if (dx * dx + dy * dy < 9) return; }
    pts.push({ x: e.clientX, y: e.clientY, t: now, brk: !last || skipped || now - last.t > 120, jx: (Math.random() - 0.5) * 1.6, jy: (Math.random() - 0.5) * 1.6 });
    skipped = false;
    if (!running) { running = true; requestAnimationFrame(frame); }
  }, { passive: true });
  function frame(now) {
    while (pts.length && now - pts[0].t > LIFE) pts.shift();
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    if (!pts.length) { running = false; return; }
    ctx.strokeStyle = getComputedStyle(root).getPropertyValue('--ink').trim() || '#1E2330';
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i], q = pts[i - 1];
      if (p.brk) continue;
      var life = 1 - (now - p.t) / LIFE;
      if (life <= 0) continue;
      var a = life * life;
      ctx.globalAlpha = a * 0.55; ctx.lineWidth = 1.7;
      ctx.beginPath(); ctx.moveTo(q.x, q.y); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.globalAlpha = a * 0.28; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(q.x + q.jx, q.y + q.jy); ctx.lineTo(p.x + p.jx, p.y + p.jy); ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
}

export function init(options) {
  buildChrome(options.nav, options.home || 'index.html');
  wireTheme();
  fillFooter();
  wireReveal();
  wireScrollspy(options.nav);
  wireTypewriter();
  wireTv();
  wireTrail();
  syncLinks();
  refit();
  window.addEventListener('resize', function () { fitName(); moveMarker(); });
  // timer rather than animation frames, so the page still fills in if it loads in a background tab
  window.setTimeout(function () { root.classList.add('loaded'); }, 60);
}
