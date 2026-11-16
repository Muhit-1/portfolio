import { init, projects, doodle, checkSvg } from './shared.js';

var id = new URLSearchParams(window.location.search).get('p');
var index = 0;
projects.forEach(function (p, i) { if (p.id === id) index = i; });
var p = projects[index];
var prev = projects[(index - 1 + projects.length) % projects.length];
var next = projects[(index + 1) % projects.length];
document.title = p.name + ' — Muhit Rahman Kayeem';

function scribble() {
  return '<svg class="scribble" viewBox="0 0 600 30" preserveAspectRatio="none" aria-hidden="true"><path d="M4 18 C 90 6, 190 26, 300 14 S 500 8, 596 18"/></svg>';
}

// the taped frame: shows the clip once `media` is set on the project, a labelled placeholder until then
var media;
if (p.media && p.media.type === 'video') {
  media =
    '<video id="clip" src="' + p.media.src + '" autoplay muted loop playsinline></video>' +
    '<span class="vbar" aria-hidden="true"><i id="clip-bar"></i></span>' +
    '<div class="vctl">' +
      '<button type="button" class="vbtn" id="clip-play">Pause</button>' +
      '<button type="button" class="vbtn" id="clip-sound">Sound on</button>' +
      '<button type="button" class="vbtn" id="clip-full">Full screen</button>' +
    '</div>';
} else if (p.media) {
  media = '<img class="media" src="' + p.media.src + '" alt="' + p.name + ' in use">';
} else {
  media = doodle(p.icon) +
    '<span class="shot-note">demo clip goes here</span>' +
    '<span class="shot-hint">a short video or GIF of ' + p.name + ' in use</span>';
}

var sections = [];
sections.push({
  id: 'goal', title: 'The goal', aside: 'why it exists',
  body: p.goal.length
    ? p.goal.map(function (g) { return '<p>' + g + '</p>'; }).join('')
    : '<p class="pj-todo">Still to write: why this project exists and who it is for.</p>'
});
sections.push({
  id: 'what', title: 'What it does', aside: p.features.length + ' things worth pointing at',
  body: '<ul class="feat" data-stagger>' + p.features.map(function (f) {
    return '<li class="check">' + checkSvg() + '<span><strong><span class="lbl">' + f[0] + '</span></strong><em>' + f[1] + '</em></span></li>';
  }).join('') + '</ul>'
});
sections.push({
  id: 'built', title: 'How it\'s built', aside: 'under the hood',
  body: '<dl class="toolkit"><span class="tape" aria-hidden="true"></span><p class="toolkit-title">Tech stack</p>' + p.stack.map(function (s) {
    return '<div class="tk-row"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>';
  }).join('') + '</dl>'
});
if (p.notes.length) {
  sections.push({
    id: 'notes', title: 'Worth knowing', aside: 'the honest caveats',
    body: '<ul class="notes">' + p.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>'
  });
}

var byId = {};
sections.forEach(function (s) { byId[s.id] = s; });
function sectionHtml(s) {
  return '<section class="pj-sec" id="' + s.id + '">' +
    '<div class="pj-h" data-reveal><h2>' + s.title + scribble() + '</h2><p class="aside">' + s.aside + '</p></div>' +
    '<div data-reveal>' + s.body + '</div>' +
  '</section>';
}

var buttons =
  (p.live ? '<a href="' + p.live + '" target="_blank" rel="noopener" class="btn btn-orange sk">Open the live demo <span class="arr arr-out">↗</span></a>' : '') +
  '<a href="' + p.repo + '" target="_blank" rel="noopener" class="btn ' + (p.live ? '' : 'btn-orange ') + 'sk">View the code on GitHub <span class="arr arr-out">↗</span></a>';

function neighbour(other, label, cls) {
  var page = 'project.html?p=' + other.id;
  return '<a class="' + cls + '" href="' + page + '" data-nb="' + page + '">' +
    doodle(other.icon) +
    '<span><small>' + label + '</small><strong><span class="title-hl">' + other.name + '</span></strong><em>' + other.kind + '</em></span>' +
  '</a>';
}

document.getElementById('project').innerHTML =
  '<header class="pj-head" id="top">' +
    '<div>' +
      '<div class="crumb">' +
        '<a class="pen" href="projects.html" data-nb="projects.html"><span class="arr arr-back">←</span> All projects</a>' +
        '<span class="mono">PROJECT ' + (index + 1) + ' OF ' + projects.length + '</span>' +
      '</div>' +
      '<div class="pj-kind">' + doodle(p.icon) + p.kind + (p.live ? '<span class="stamp-live">LIVE</span>' : '') + '</div>' +
      '<h1 class="pj-title"><span class="write">' + p.name + '</span></h1>' +
      '<p class="pj-summary" data-in style="--d:.5s">' + p.summary + '</p>' +
      '<div class="btn-row" data-in style="--d:.65s">' + buttons + '</div>' +
    '</div>' +
    '<dl class="form pj-facts" data-in style="--d:.4s">' +
      '<div class="form-row"><dt>Type</dt><dd><span style="--wd:.7s">' + p.platform + '</span></dd></div>' +
      '<div class="form-row"><dt>Built with</dt><dd><span style="--wd:.95s">' + p.tags.join(', ') + '</span></dd></div>' +
      '<div class="form-row"><dt>Status</dt><dd><span style="--wd:1.2s">' + p.status + '</span></dd></div>' +
    '</dl>' +
  '</header>' +

  // the clip, with the page's contents beside it
  '<div class="media-row">' +
    '<figure class="shot big" data-reveal><span class="tape" aria-hidden="true"></span><div class="shot-in">' + media + '</div></figure>' +
    '<aside class="pj-side" data-reveal>' +
      '<div><p class="toc-title">ON THIS PAGE</p><ul class="toc">' + sections.map(function (s) {
        return '<li><a class="pen" href="#' + s.id + '">' + s.title + '</a></li>';
      }).join('') + '</ul></div>' +
      '<div class="sticky">The full write-up and all the code are <a href="' + p.repo + '" target="_blank" rel="noopener">on GitHub</a>.</div>' +
    '</aside>' +
  '</div>' +

  // why it exists next to what it is made of, then the feature list across the full width
  '<div class="pj-top">' + sectionHtml(byId.goal) + sectionHtml(byId.built) + '</div>' +
  sectionHtml(byId.what) +
  (byId.notes ? sectionHtml(byId.notes) : '') +

  '<div class="pj-cta" data-reveal>' +
    '<div><p class="pj-cta-title">Want something like this built?</p><p>I\'m open to remote roles and freelance work.</p></div>' +
    '<div class="btn-row">' +
      '<a href="index.html#contact" data-nb="index.html#contact" class="btn btn-orange sk">Get in touch <span class="arr">→</span></a>' +
      '<a href="' + p.repo + '" target="_blank" rel="noopener" class="btn sk">Read the code <span class="arr arr-out">↗</span></a>' +
    '</div>' +
  '</div>' +

  '<nav class="pjnav" aria-label="Other projects" data-reveal>' +
    neighbour(prev, '← PREVIOUS PROJECT', 'pjnav-prev') +
    neighbour(next, 'NEXT PROJECT →', 'pjnav-next') +
  '</nav>' +

  '<footer class="foot"></footer>';

// clip controls: the video starts muted (browsers require it), so sound is one click away
(function () {
  var clip = document.getElementById('clip');
  if (!clip) return;
  var play = document.getElementById('clip-play'), sound = document.getElementById('clip-sound');
  var full = document.getElementById('clip-full'), bar = document.getElementById('clip-bar');
  function render() {
    play.textContent = clip.paused ? 'Play' : 'Pause';
    sound.textContent = clip.muted ? 'Sound on' : 'Sound off';
  }
  function toggle() { if (clip.paused) clip.play().catch(function () {}); else clip.pause(); }
  play.addEventListener('click', toggle);
  clip.addEventListener('click', toggle);
  sound.addEventListener('click', function () { clip.muted = !clip.muted; render(); });
  full.addEventListener('click', function () {
    var go = clip.requestFullscreen || clip.webkitRequestFullscreen || clip.webkitEnterFullscreen;
    if (go) go.call(clip);
  });
  clip.addEventListener('play', render);
  clip.addEventListener('pause', render);
  clip.addEventListener('timeupdate', function () {
    if (clip.duration) bar.style.transform = 'scaleX(' + (clip.currentTime / clip.duration) + ')';
  });
  render();
})();

init({
  home: 'index.html',
  nav: [
    { label: 'Home', icon: 'home', to: 'index.html', home: true },
    { label: 'All projects', icon: 'projects', to: 'projects.html', active: true },
    { label: 'About', icon: 'about', to: 'index.html#about' },
    { label: 'Experience', icon: 'experience', to: 'index.html#experience' },
    { label: 'Contact', icon: 'contact', to: 'index.html#contact' }
  ]
});
