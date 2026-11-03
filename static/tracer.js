(function () {
  const $ = id => document.getElementById(id), out = $('to');
  const DEMO = {
    score: 85, final: 'http://sbi-kyc-verify.xyz/login',
    reasons: ['A shortened link hides the real site', 'Lands on a domain ending often used in scams (.top)',
      'Imitates a trusted brand but is not its official site', 'Uses an insecure http connection',
      'Ends on a different site than it started'],
    hops: [
      { url: 'https://bit.ly/3kycNow', status: 301, flag: true, note: '301 · shortener' },
      { url: 'https://track.fast-deals-now-win.top/r?id=88', status: 302, flag: true, note: '302 · risky domain, many hyphens' },
      { url: 'http://sbi-kyc-verify.xyz/login', status: 200, flag: true, note: '200 · risky domain, look-alike' }]
  };
  let last = null, lastErr = null;

  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const note = n => n.split(' · ').map((p, i) => i ? p.split(', ').map(t).join(', ') : t(p)).join(' · ');

  function render(r) {
    last = r; lastErr = null;
    const lvl = r.score < 25 ? 0 : r.score < 55 ? 1 : 2;
    const col = ['var(--ok)', '#f08a1c', 'var(--bad)'][lvl];
    out.innerHTML =
      '<div class="vd" style="color:' + col + '">' + t('Risk score') + ': ' + r.score + '/100 · ' + t(['Looks safe', 'Be careful', 'Likely a scam'][lvl]) + '</div>' +
      '<ul class="rl">' + (r.reasons.length ? r.reasons : ['No warning signs found. Still, never share OTPs or PINs.']).map(x => '<li>' + esc(t(x)) + '</li>').join('') + '</ul>' +
      '<h3 style="margin:16px 0 0;font-size:16px">' + t('Redirect path') + '</h3><div class="hops">' +
      r.hops.map((h, i) => '<div class="hop' + (h.flag ? ' bad' : '') + '" style="animation-delay:' + i * .25 + 's">' + esc(h.url) + '<small>' + esc(note(h.note || String(h.status))) + '</small></div>').join('') + '</div>';
  }
  function fail(msg) { lastErr = msg; last = null; out.innerHTML = '<div class="result"><b>' + esc(t(msg)) + '</b></div>'; }

  async function trace() {
    const url = $('tu').value.trim();
    if (!url) return fail('Paste a link first.');
    out.textContent = t('Tracing…');
    try {
      const res = await fetch('/api/trace', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ url }) });
      const j = await res.json();
      if (!res.ok) return fail(j.error || 'Could not reach the tracer. It needs an internet connection and the Netra server.');
      render(j);
    } catch (e) { fail('Could not reach the tracer. It needs an internet connection and the Netra server.'); }
  }
  $('bt').onclick = trace;
  $('tu').addEventListener('keydown', e => { if (e.key === 'Enter') trace(); });
  $('bd').onclick = () => { $('tu').value = 'https://bit.ly/3kycNow'; render(DEMO); };
  window.addEventListener('langchange', () => { if (last) render(last); else if (lastErr) fail(lastErr); });
})();
