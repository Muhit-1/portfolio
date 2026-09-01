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
    el.style.transform = 'rotate(' + deg + 'deg)';
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

  // theme toggle (in-memory only)
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');
  var current = 'light';
  toggle.addEventListener('click', function () {
    current = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', current);
  });

  // scrollspy for dock active state
  var links = document.querySelectorAll('.dock-item[data-section]');
  var sections = ['about', 'work', 'experience', 'contact'].map(function (id) { return document.getElementById(id); });
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
      .from('.hero-photo', { opacity: 0, scale: 0.92, duration: 0.8 }, 0.2);

    gsap.from(grid.children, {
      opacity: 0,
      y: 46,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.12,
      scrollTrigger: { trigger: grid, start: 'top 85%', once: true }
    });

    gsap.from('.chip', {
      opacity: 0,
      y: 10,
      duration: 0.4,
      ease: 'power2.out',
      stagger: 0.05,
      scrollTrigger: { trigger: '.chip-row', start: 'top 90%', once: true }
    });

    gsap.from(log.children, {
      opacity: 0,
      x: -24,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: { trigger: log, start: 'top 85%', once: true }
    });

    gsap.from('.stamp', {
      opacity: 0,
      scale: 0.7,
      duration: 0.6,
      ease: 'back.out(2)',
      scrollTrigger: { trigger: '.contact-wrap', start: 'top 85%', once: true }
    });
  }
})();
