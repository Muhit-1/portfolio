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
  media = '<video src="' + p.media.src + '" autoplay muted loop playsinline></video>';
} else if (p.media) {
  media = '<img class="media" src="' + p.media.src + '" alt="' + p.name + ' in use">';
} else {
  media = doodle(p.icon) +
    '<span class="shot-note">demo clip goes here</span>' +
    '<span class="shot-hint">a short video or GIF of ' + p.name + ' in use</span>';
}

var sections = [];
sections.push({
  id: 'goal', title: 'The goal',
  body: p.goal.length
    ? p.goal.map(function (g) { return '<p>' + g + '</p>'; }).join('')
    : '<p class="pj-todo">Still to write: why this project exists and who it is for.</p>'
});
sections.push({
  id: 'what', title: 'What it does',
  body: '<ul class="feat" data-stagger>' + p.features.map(function (f) {
    return '<li class="check">' + checkSvg() + '<span><strong><span class="lbl">' + f[0] + '</span></strong><em>' + f[1] + '</em></span></li>';
  }).join('') + '</ul>'
});
sections.push({
  id: 'built', title: 'How it\'s built',
  body: '<dl class="toolkit"><span class="tape" aria-hidden="true"></span><p class="toolkit-title">Tech stack</p>' + p.stack.map(function (s) {
    return '<div class="tk-row"><dt>' + s[0] + '</dt><dd>' + s[1] + '</dd></div>';
  }).join('') + '</dl>'
});
if (p.notes.length) {
  sections.push({
    id: 'notes', title: 'Worth knowing',
    body: '<ul class="notes">' + p.notes.map(function (n) { return '<li>' + n + '</li>'; }).join('') + '</ul>'
  });
}

var byId = {};
sections.forEach(function (s) { byId[s.id] = s; });
function sectionHtml(s) {
  return '<section class="pj-sec" id="' + s.id + '" style="padding-top:0"><div data-reveal><h2>' + s.title + scribble() + '</h2></div><div data-reveal>' + s.body + '</div></section>';
}

var buttons =
  (p.live ? '<a href="' + p.live + '" target="_blank" rel="noopener" class="btn btn-orange sk">Open the live demo <span class="arr arr-out">↗</span></a>' : '') +
  '<a href="' + p.repo + '" target="_blank" rel="noopener" class="btn ' + (p.live ? '' : 'btn-orange ') + 'sk">View the code on GitHub <span class="arr arr-out">↗</span></a>';

document.getElementById('project').innerHTML =
  '<header class="pj-head" id="top">' +
    '<div>' +
      '<a class="pen" href="projects.html" data-nb="projects.html"><span class="arr arr-back">←</span> All projects</a>' +
      '<div class="pj-kind" style="margin-top:1.1em">' + p.kind + (p.live ? '<span class="stamp-live">LIVE</span>' : '') + '</div>' +
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

  '<nav class="pjnav" aria-label="Other projects" data-reveal>' +
    '<a href="project.html?p=' + prev.id + '" data-nb="project.html?p=' + prev.id + '"><small>← PREVIOUS PROJECT</small><strong><span class="title-hl">' + prev.name + '</span></strong></a>' +
    '<a href="project.html?p=' + next.id + '" data-nb="project.html?p=' + next.id + '"><small>NEXT PROJECT →</small><strong><span class="title-hl">' + next.name + '</span></strong></a>' +
  '</nav>' +

  '<footer class="foot">' +
    '<span>Muhit Rahman Kayeem · Dhaka, Bangladesh</span>' +
    '<a href="#top">Back to top <span class="arr">↑</span></a>' +
  '</footer>';

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
