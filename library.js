(function () {
  const $ = id => document.getElementById(id), P = L;
  let tag = 0, open = null;
  const tags = () => [...new Set(SCAMS.map(s => s.tag[0]))];
  const tagName = en => SCAMS.find(s => s.tag[0] === en).tag[I18N.lang === 'hi' ? 1 : 0];
  function chips() {
    $('cf').innerHTML = ['All'].concat(tags()).map(x => '<button class="chip' + (x === (tag || 'All') ? ' on' : '') + '" data-t="' + x + '">' + (x === 'All' ? t('All') : tagName(x)) + '</button>').join('');
  }
  function list() {
    const q = $('q').value.trim().toLowerCase(), hi = I18N.lang === 'hi' ? 1 : 0;
    const rows = SCAMS.filter(s => (!tag || s.tag[0] === tag) &&
      (!q || (s.name.concat(s.blurb, s.flags.flat(), s.do).join(' ') + ' ' + s.id).toLowerCase().includes(q)));
    $('lib').innerHTML = rows.length ? rows.map(s =>
      '<div class="sc' + (open === s.id ? ' open' : '') + '" data-id="' + s.id + '" tabindex="0" role="button">' +
      '<span style="font-size:28px">' + s.icon + '</span><h3>' + s.name[hi] + '</h3><div class="note">' + s.blurb[hi] + '</div>' +
      '<div class="dt"><b>' + t('Red flags') + '</b><ul>' + s.flags.map(f => '<li>' + f[hi] + '</li>').join('') + '</ul>' +
      '<div class="do"><b>' + t('What to do') + ':</b> ' + s.do[hi] + '</div></div></div>').join('')
      : '<p class="note">' + t('No scam found. Try another word.') + '</p>';
  }
  const draw = () => { chips(); list(); };
  $('cf').onclick = e => { const b = e.target.closest('.chip'); if (b) { tag = b.dataset.t === 'All' ? 0 : b.dataset.t; draw(); } };
  const toggle = e => { const c = e.target.closest('.sc'); if (c) { open = open === c.dataset.id ? null : c.dataset.id; list(); } };
  $('lib').onclick = toggle;
  $('lib').onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(e); } };
  $('q').oninput = list;
  window.addEventListener('langchange', draw);
  draw();
})();
