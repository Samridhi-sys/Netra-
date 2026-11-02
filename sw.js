const V = 'netra-v3', SHELL = ['/', '/checker', '/tracer', '/library', '/awareness', '/quiz', '/safety', '/how',
  '/static/style.css', '/static/i18n.js', '/static/common.js', '/static/sound.js', '/static/data.js', '/static/checker.js', '/static/tracer.js',
  '/static/library.js', '/static/awareness.js', '/static/quiz.js', '/static/safety.js', '/static/how.js', '/static/manifest.webmanifest'];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== V).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET' || new URL(r.url).pathname.startsWith('/api/')) return;
  e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r)));
});
