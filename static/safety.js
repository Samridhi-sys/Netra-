(function () {
  const $ = id => document.getElementById(id);
  const get = k => { try { return localStorage.getItem(k); } catch (e) { return null; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  ['t1', 't2', 't3', 't4'].forEach(id => { const el = $(id); el.checked = get('netra.' + id) === '1'; el.onchange = () => { put('netra.' + id, el.checked ? '1' : '0'); sync(); }; });
  $('rd').valueAsDate = new Date();

  function types() {
    const hi = I18N.lang === 'hi' ? 1 : 0, cur = $('rt').value;
    $('rt').innerHTML = SCAMS.map(s => '<option value="' + s.id + '">' + s.name[hi] + '</option>').join('') + '<option value="other">' + t('Other') + '</option>';
    if (cur) $('rt').value = cur;
  }
  function sync() {
    const on = $('t4').checked;
    $('rg').disabled = !on;
    $('rn').textContent = t(on ? 'Reporting is on. Fill in the details and tap Create report.' : 'Turn on “Reporting to cyber cells” to create a report.');
  }
  $('rg').onclick = () => {
    const hi = I18N.lang === 'hi', s = SCAMS.find(x => x.id === $('rt').value);
    const type = s ? s.name[hi ? 1 : 0] : t('Other'), amt = $('ra').value || '0', d = $('rd').value || new Date().toISOString().slice(0, 10);
    $('ro').value = hi
      ? 'विषय: ऑनलाइन धोखाधड़ी की शिकायत\n\nमैं एक साइबर धोखाधड़ी की सूचना देना चाहता/चाहती हूँ।\nघटना का प्रकार: ' + type + '\nतारीख़: ' + d + '\nखोई गई रकम: ₹' + amt + '\n\nमेरे पास संदेशों, नंबरों, लिंक और भुगतान रसीदों के स्क्रीनशॉट हैं। कृपया FIR दर्ज करें और आगे की कार्रवाई करें।\n\n(मैंने राष्ट्रीय साइबर क्राइम हेल्पलाइन 1930 पर भी संपर्क किया है।)'
      : 'Subject: Complaint about online fraud\n\nI would like to report a cyber fraud.\nType of incident: ' + type + '\nDate: ' + d + '\nAmount lost: ₹' + amt + '\n\nI have screenshots of the messages, numbers, links and payment receipts. Please register an FIR and advise on next steps.\n\n(I have also contacted the National Cyber Crime Helpline 1930.)';
  };
  $('rc').onclick = async () => {
    try { await navigator.clipboard.writeText($('ro').value); } catch (e) { $('ro').select(); document.execCommand && document.execCommand('copy'); }
    $('rc').textContent = t('Copied ✓'); setTimeout(() => ($('rc').textContent = t('Copy')), 1500);
  };
  window.addEventListener('langchange', () => { types(); sync(); if ($('ro').value) $('rg').click(); });
  types(); sync();
})();
