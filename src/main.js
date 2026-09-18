import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

(function () {
  var projects = [
    { id: 'DWG-01', name: 'Dhaka Bus Navigator', type: 'Web App', stack: 'React · Node · Maps API', status: 'LIVE' },
    { id: 'DWG-02', name: 'KeyQuest', type: 'Typing &amp; Riddle Game', stack: 'JavaScript · CSS', status: 'LIVE' },
    { id: 'DWG-03', name: 'Task Manager', type: 'Application', stack: 'React · Firebase', status: 'BUILT' },
    { id: 'DWG-04', name: 'Music Player App', type: 'Application', stack: 'Flutter', status: 'BUILT' },
    { id: 'DWG-05', name: 'Moisture Detection &amp; Auto-Irrigation', type: 'IoT System', stack: 'Arduino · Sensors', status: 'BUILT' },
    { id: 'DWG-06', name: 'Nonograms', type: 'Puzzle Game', stack: 'JavaScript', status: 'LIVE' }
  ];
  var rotates = [-1.6, 1.2, -0.8, 1.5, -1.1, 0.9];
  var grid = document.getElementById('work-grid');
  projects.forEach(function (p, i) {
    var el = document.createElement('div');
    el.className = 'pin-card';
    var deg = rotates[i % rotates.length];
    el.style.setProperty('--rot', deg + 'deg');
    var statusColor = p.status === 'LIVE' ? 'var(--accent)' : 'var(--ink-soft)';
    el.innerHTML =
      '<div class="behind-a"></div>' +
      '<div class="behind-b"></div>' +
      '<img class="pin" src="/img/just-pin.png" alt="">' +
      '<div class="card">' +
        '<div class="mono id">' + p.id + '</div>' +
        '<h3>' + p.name + '</h3>' +
        '<div class="type">' + p.type + '</div>' +
        '<div class="mono stack">' + p.stack + '</div>' +
        '<div class="mono status" style="color:' + statusColor + '">' + p.status + '</div>' +
      '</div>';
    grid.appendChild(el);
  });

  var timeline = [
    { yr: '2026 — PRESENT', ttl: 'Junior Software Engineer', org: 'SAMTrek', note: 'APIs, backend integration and frontend implementation for release-ready products.' },
    { yr: '2022 — 2026', ttl: 'B.Sc. Computer Science', org: 'BUBT', note: 'Software development, data structures, databases.' },
    { yr: '2018 — 2020', ttl: 'Higher Secondary Certificate', org: 'Science group', note: 'Mathematics, physics, ICT.' },
    { yr: '2016 — 2017', ttl: 'Secondary School Certificate', org: 'Science group', note: 'Foundation coursework.' }
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

  // contact QR (vCard: email + github + linkedin)
  if (window.QRCode) {
    var vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Rahman;Muhit;;;',
      'FN:Muhit Rahman',
      'EMAIL:senanovi908@gmail.com',
      'URL:https://github.com/muhit-1',
      'URL:https://www.linkedin.com/in/muhit-rahman',
      'END:VCARD'
    ].join('\n');
    new QRCode(document.getElementById('contact-qr'), {
      text: vcard,
      width: 126,
      height: 126,
      colorDark: '#221E1A',
      colorLight: '#FFFFFF',
      correctLevel: QRCode.CorrectLevel.M
    });
  }

  // about TV: lofi piano player
  (function () {
    var tv = document.getElementById('about-tv');
    if (!tv) return;

    var trackSrcs = [
      '/audio/lofi-piano-1.mp3',
      '/audio/lofi-piano-2.mp3',
      '/audio/lofi-piano-3.mp3'
    ];
    var trackIndex = 0;
    var audio = new Audio();
    audio.loop = true;
    audio.preload = 'none';
    audio.volume = 0.4;
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

    gsap.from('.postcard-qr', {
      opacity: 0,
      scale: 0.7,
      duration: 0.6,
      ease: 'back.out(2)',
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
