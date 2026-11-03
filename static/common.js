(function () {
  const root = document.documentElement, $ = id => document.getElementById(id);
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  // theme
  const th = (window.__S && window.__S.theme) || get('netra.theme');
  if (th) root.setAttribute('data-theme', th);
  $('th').onclick = () => {
    const dark = root.getAttribute('data-theme') === 'dark' ||
      (!root.getAttribute('data-theme') && matchMedia('(prefers-color-scheme:dark)').matches);
    const n = dark ? 'light' : 'dark';
    root.setAttribute('data-theme', n); put('netra.theme', n);
    try { if (parent !== window) parent.postMessage({ netra: 'state', theme: n }, '*'); } catch (e) {}
  };

  // language button: shows the language you can switch TO
  const lg = $('lg');
  const label = () => { lg.textContent = I18N.lang === 'hi' ? 'EN' : 'हिं'; };
  lg.onclick = () => I18N.set(I18N.lang === 'hi' ? 'en' : 'hi');
  window.addEventListener('langchange', label);
  label(); I18N.apply();

  // scroll reveal
  const rv = [...document.querySelectorAll('.rv')];
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('show'); io.unobserve(e.target); } }), { threshold: .08 });
    rv.forEach(el => io.observe(el));
  } else rv.forEach(el => el.classList.add('show'));

  // install prompt + offline shell
  let dp;
  addEventListener('beforeinstallprompt', e => { e.preventDefault(); dp = e; $('ins').hidden = false; });
  $('ins').onclick = async () => { if (!dp) return; dp.prompt(); await dp.userChoice; dp = null; $('ins').hidden = true; };
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  }
})();
