import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

(function () {
  var base = import.meta.env.BASE_URL;
  var gh = 'https://github.com/Muhit-1/';
  var projects = [
    { id: 'DWG-01', name: 'WorkStationX', desc: 'Windows desktop app that opens your whole work context in one click, with a countdown task timer and screen tools behind a global shortcut.', stack: 'C# · WPF · .NET · SQLite', repo: gh + 'WorkStationX' },
    { id: 'DWG-02', name: 'KrishiHat', desc: 'Agricultural marketplace connecting Bangladeshi farmers with buyers: fixed-price and auction sales, role-based dashboards, bilingual UI.', stack: 'Next.js · TypeScript · Prisma · MariaDB', repo: gh + 'KrishiHat' },
    { id: 'DWG-03', name: 'Dhaka Bus Navigator', desc: 'Bus route planner for Dhaka with fare and time estimates, interactive maps and an English/Bangla interface.', stack: 'React · Vite · Leaflet · Supabase', repo: gh + 'dhaka-bus-navigator' },
    { id: 'DWG-04', name: 'Accounting Tool', desc: 'Multi-business accounting and invoicing platform: JWT auth, transaction ledger, PDF invoices and shared access control.', stack: 'NestJS · Prisma · MySQL · React', repo: gh + 'Accounting-Tool-api' },
    { id: 'DWG-05', name: 'Crisis Compass', desc: 'Interactive world map of live weather and natural disasters with a scrubbable seven-day timeline.', stack: 'Svelte · Open data feeds', repo: gh + 'Crisis-Compass', live: 'https://muhit-1.github.io/Crisis-Compass/' },
    { id: 'DWG-06', name: 'KeyQuest', desc: 'Typing and riddle game: clear four words, crack the riddle, keep the clock alive. Runs entirely in the browser.', stack: 'React · JavaScript', repo: gh + 'KeyQuest', live: 'https://muhit-1.github.io/KeyQuest' }
  ];
  var rotates = [-1.6, 1.2, -0.8, 1.5, -1.1, 0.9];
  var grid = document.getElementById('work-grid');
  projects.forEach(function (p, i) {
    var el = document.createElement('div');
    el.className = 'pin-card';
    var deg = rotates[i % rotates.length];
    el.style.setProperty('--rot', deg + 'deg');
    var links =
      '<a class="mono" href="' + p.repo + '" target="_blank" rel="noopener">GITHUB ↗</a>' +
      (p.live ? '<a class="mono" href="' + p.live + '" target="_blank" rel="noopener">LIVE DEMO ↗</a>' : '');
    el.innerHTML =
      '<div class="behind-a"></div>' +
      '<div class="behind-b"></div>' +
      '<img class="pin" src="' + base + 'img/just-pin.png" alt="">' +
      '<div class="card">' +
        '<div class="mono id">' + p.id + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<p class="desc">' + p.desc + '</p>' +
        '<div class="mono stack">' + p.stack + '</div>' +
        '<div class="card-links">' + links + '</div>' +
      '</div>';
    grid.appendChild(el);
  });

  var timeline = [
    { yr: 'FEB 2026 — NOW', ttl: 'Freelance Full-Stack / Backend Developer', org: 'SAMTrek — Remote (IT services agency, Germany)', note: 'Shipped Vaaii, a cross-border delivery PWA on Google Play; building Medilog24 with self-hosted CI/CD; delivered shopnojhuri.com and sam-trek.com; NestJS + Prisma accounting backend.' },
    { yr: '2022 — 2026', ttl: 'BSc in Computer Science &amp; Engineering', org: 'Bangladesh University of Business and Technology (BUBT)', note: 'Graduated 2026.' },
    { yr: 'CORE STACK', ttl: 'Backend · Frontend · DevOps', org: 'Languages: JS/TS, Python, Java, Kotlin, C#, PHP, SQL', note: 'Node.js, NestJS, React, Next.js, PostgreSQL, MySQL, Prisma, Docker, Coolify, Nginx, GitHub Actions.' },
    { yr: 'LANGUAGES', ttl: 'English &amp; Bengali', org: 'Spoken', note: 'English — full professional proficiency. Bengali — native.' }
  ];
  var log = document.getElementById('logbook');
  timeline.forEach(function (t) {
    var row = document.createElement('div');
    row.className = 'log-row';
    row.innerHTML =
      '<div class="mono yr">' + t.yr + '</div>' +
      '<div><div class="ttl">' + t.ttl + '</div><div class="org">' + t.org + '</div></div>' +
      '<div class="note">' + t.note + '</div>';
    log.appendChild(row);
  });

  // about TV: lofi piano player
  (function () {
    var tv = document.getElementById('about-tv');
    if (!tv) return;

    var trackSrcs = [
      base + 'audio/lofi-piano-1.mp3',
      base + 'audio/lofi-piano-2.mp3',
      base + 'audio/lofi-piano-3.mp3'
    ];
    var trackIndex = 0;
    var audio = new Audio();
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.16;
    audio.src = trackSrcs[trackIndex];

    function render() {
      var playing = !audio.paused;
      tv.classList.toggle('playing', playing);
      var toggleBtn = tv.querySelector('.tv-btn-toggle');
      if (toggleBtn) toggleBtn.setAttribute('aria-pressed', playing ? 'true' : 'false');
    }

    function play() { audio.play().catch(function () {}); }
    function stopPlayback() { audio.pause(); audio.currentTime = 0; render(); }
    function togglePlay() { if (audio.paused) play(); else stopPlayback(); }
    function nextTrack() {
      var wasPlaying = !audio.paused;
      trackIndex = (trackIndex + 1) % trackSrcs.length;
      audio.src = trackSrcs[trackIndex];
      if (wasPlaying) play();
    }

    audio.addEventListener('play', render);
    audio.addEventListener('pause', render);

    tv.addEventListener('click', function (e) {
      if (e.target.closest('.tv-btn')) return;
      togglePlay();
    });
    var stopBtn = tv.querySelector('.tv-btn-stop');
    var toggleBtn = tv.querySelector('.tv-btn-toggle');
    var nextBtn = tv.querySelector('.tv-btn-next');
    if (stopBtn) stopBtn.addEventListener('click', function (e) { e.stopPropagation(); stopPlayback(); });
    if (toggleBtn) toggleBtn.addEventListener('click', function (e) { e.stopPropagation(); togglePlay(); });
    if (nextBtn) nextBtn.addEventListener('click', function (e) { e.stopPropagation(); nextTrack(); });
  })();

  // theme toggle (in-memory only)
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  toggle.addEventListener('click', function () {
    current = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
  });

  // scrollspy for dock active state
  var links = document.querySelectorAll('.dock-item[data-section]');
  var sections = ['top', 'about', 'work', 'experience', 'contact'].map(function (id) { return document.getElementById(id); });
  var spyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        links.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('data-section') === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
  sections.forEach(function (s) { if (s) spyObserver.observe(s); });

  // ---------- GSAP motion ----------
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    var heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.7 } });
    heroTl
      .from('#dock', { opacity: 0, x: -30 }, 0)
      .from('.title-block-main > *', { opacity: 0, y: 24, stagger: 0.08 }, 0.1)
      .from('.hero-photo-dark', { opacity: 0, scale: 0.92, duration: 0.8, clearProps: 'opacity,transform' }, 0.2);

    gsap.from(grid.children, {
      opacity: 0,
      y: 46,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
    });

    gsap.from('.chip', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.05,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.chip-row', start: 'top 90%', once: true }
    });

    gsap.from(log.children, {
      opacity: 0,
      x: -24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: log, start: 'top 85%', once: true }
    });

    gsap.from('.postcard-photo', {
      opacity: 0,
      x: -30,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.postcard', start: 'top 85%', once: true }
    });

    // landing animation for every section's heading
    gsap.utils.toArray('.section-head').forEach(function (head) {
      gsap.from(head, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: 'power2.out',
        clearProps: 'opacity,transform',
        scrollTrigger: { trigger: head, start: 'top 90%', once: true }
      });
    });

    gsap.from('.about-text', {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.ledger', start: 'top 80%', once: true }
    });

    gsap.from('.about-tv', {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.7,
      ease: 'power3.out',
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.ledger', start: 'top 80%', once: true }
    });

    gsap.from('.postcard-body > *', {
      opacity: 0,
      y: 24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.08,
      clearProps: 'opacity,transform',
      scrollTrigger: { trigger: '.postcard', start: 'top 85%', once: true }
    });
  }
})();
