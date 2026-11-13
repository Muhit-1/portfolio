import { init, projects, doodle } from './shared.js';

var cats = [['all', 'All'], ['web', 'Web apps'], ['desktop', 'Desktop'], ['game', 'Games']];
var tilts = [-1.8, 1.4, -1.1, 1.7, -1.5, 1.2];

document.getElementById('count-note').textContent = projects.length + ' so far';

// rows
var list = document.getElementById('plist');
projects.forEach(function (p, i) {
  var page = 'project.html?p=' + p.id;
  var row = document.createElement('article');
  row.className = 'prow';
  row.setAttribute('data-cat', p.cat);
  row.innerHTML =
    (p.live ? '<span class="stamp-live">LIVE</span>' : '') +
    '<figure class="shot" style="--sr:' + tilts[i] + 'deg">' +
      '<span class="tape" style="--tr:' + (-tilts[i] * 2) + 'deg" aria-hidden="true"></span>' +
      '<div class="shot-in">' + doodle(p.icon) + '<span class="shot-note">clip coming soon</span></div>' +
    '</figure>' +
    '<div>' +
      '<span class="kind">' + p.kind + '</span>' +
      '<h3><a href="' + page + '" data-nb="' + page + '"><span class="title-hl">' + p.name + '</span></a></h3>' +
      '<p>' + p.desc + '</p>' +
      '<ul class="tags">' + p.tags.map(function (t) { return '<li class="tag">' + t + '</li>'; }).join('') + '</ul>' +
      '<div class="links">' +
        '<a class="pen" href="' + page + '" data-nb="' + page + '">Open project <span class="arr">→</span></a>' +
        '<a class="pen" href="' + p.repo + '" target="_blank" rel="noopener">GitHub <span class="arr arr-out">↗</span></a>' +
        (p.live ? '<a class="pen" href="' + p.live + '" target="_blank" rel="noopener">Live demo <span class="arr arr-out">↗</span></a>' : '') +
      '</div>' +
    '</div>';
  list.appendChild(row);
});

// filter tabs, with a count on each
var filters = document.getElementById('filters');
cats.forEach(function (c, i) {
  var n = c[0] === 'all' ? projects.length : projects.filter(function (p) { return p.cat === c[0]; }).length;
  var b = document.createElement('button');
  b.type = 'button';
  b.className = 'ttab' + (i === 0 ? ' active' : '');
  b.setAttribute('data-cat', c[0]);
  b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
  b.innerHTML = c[1] + ' <small>' + n + '</small>';
  filters.appendChild(b);
});
filters.addEventListener('click', function (e) {
  var btn = e.target.closest('.ttab');
  if (!btn) return;
  var cat = btn.getAttribute('data-cat');
  [].forEach.call(filters.children, function (b) {
    b.classList.toggle('active', b === btn);
    b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
  });
  [].forEach.call(list.children, function (row) {
    var show = cat === 'all' || row.getAttribute('data-cat') === cat;
    row.hidden = !show;
    row.classList.remove('pop');
    if (show) { void row.offsetWidth; row.classList.add('pop'); }
  });
});

init({
  home: 'index.html',
  nav: [
    { label: 'Home', icon: 'home', to: 'index.html', home: true },
    { label: 'All projects', icon: 'projects', to: 'projects.html', active: true, count: projects.length },
    { label: 'About', icon: 'about', to: 'index.html#about' },
    { label: 'Experience', icon: 'experience', to: 'index.html#experience' },
    { label: 'Contact', icon: 'contact', to: 'index.html#contact' }
  ]
});
