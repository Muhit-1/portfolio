import { init, projects, doodle, checkSvg } from './shared.js';

// "What I do" checklist
var skills = ['Backend &amp; API development', 'Full-stack web apps', 'PWA &amp; Play Store publishing', 'Self-hosted CI/CD (Coolify)', 'MySQL &amp; PostgreSQL', 'WordPress / WooCommerce'];
var checks = document.getElementById('checks');
skills.forEach(function (s) {
  var li = document.createElement('li');
  li.className = 'check';
  li.innerHTML = checkSvg() + '<span><span class="lbl">' + s + '</span></span>';
  checks.appendChild(li);
});

// work cards: each one opens its own project page
var rotates = [-1.3, 0.9, -0.6, 1.1, -0.9, 0.7];
var tapes = [-4, 3, -2, 5, -3, 2];
var grid = document.getElementById('work-grid');
projects.forEach(function (p, i) {
  var page = 'project.html?p=' + p.id;
  var slot = document.createElement('div');
  slot.className = 'slot';
  slot.innerHTML =
    '<article class="pcard" style="--rot:' + rotates[i] + 'deg">' +
      '<span class="tape" style="--tr:' + tapes[i] + 'deg" aria-hidden="true"></span>' +
      (p.live ? '<span class="stamp-live">LIVE</span>' : '') +
      doodle(p.icon) +
      '<div>' +
        '<span class="kind">' + p.kind + '</span>' +
        '<h3><a href="' + page + '" data-nb="' + page + '"><span class="title-hl">' + p.name + '</span></a></h3>' +
        '<p>' + p.desc + '</p>' +
        '<div class="mono stack">' + p.tags.join(' · ') + '</div>' +
        '<div class="links">' +
          '<a class="pen" href="' + page + '" data-nb="' + page + '">Read more <span class="arr">→</span></a>' +
          '<a class="pen" href="' + p.repo + '" target="_blank" rel="noopener">GitHub <span class="arr arr-out">↗</span></a>' +
          (p.live ? '<a class="pen" href="' + p.live + '" target="_blank" rel="noopener">Live demo <span class="arr arr-out">↗</span></a>' : '') +
        '</div>' +
      '</div>' +
    '</article>';
  grid.appendChild(slot);
});

init({
  home: '#top',
  nav: [
    { label: 'Home', icon: 'home', section: 'top', home: true },
    { label: 'About', icon: 'about', section: 'about' },
    { label: 'Work', icon: 'work', section: 'work' },
    { label: 'Experience', icon: 'experience', section: 'experience' },
    { label: 'Contact', icon: 'contact', section: 'contact' },
    { label: 'All projects', icon: 'projects', to: 'projects.html', count: projects.length }
  ]
});
