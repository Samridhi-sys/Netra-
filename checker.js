(function () {
  const $ = id => document.getElementById(id);
  const BAD = /\.(xyz|top|click|live|icu|shop|vip|cc|link|info|buzz|work)(\/|$|\s|:)/i;
  const SHORT = /(bit\.ly|tinyurl\.com|cutt\.ly|rb\.gy|is\.gd|goo\.gl|shorturl\.at|t\.co)\//i;
  // Each rule works on English AND Hindi text. (No \b: it does not work with Devanagari.)
  const RULES = [
    [15, /(urgent|immediately|right now|within \d+ ?(hours?|minutes?)|expires?|expiring|last chance|tonight|(pay|update|call|act|claim|verify)\b.{0,30}\b(now|today)\b|तुरंत|आज ही|अभी (भुगतान|अपडेट|कॉल|क्लिक|वेरिफ़ाई)|समाप्त|जल्द से जल्द)/i, 'Creates urgency to rush you'],
    [25, /(cyber ?crime|cbi|police|warrant|arrest|court|case (is )?registered|legal action|customs|narcotics|साइबर ?क्राइम|पुलिस|वारंट|गिरफ्तार|गिरफ़्तार|केस दर्ज|कानूनी|कोर्ट|कस्टम)/i, 'Claims to be police or a government agency, or threatens legal action'],
    [20, /(do not tell|don'?t tell|tell no ?one|keep (it )?secret|stay on (the )?(video )?call|किसी को न बता|किसी को मत बता|गोपनीय|कॉल पर बने रहें)/i, 'Tells you to keep it secret or stay on the call'],
    [15, /(pay now|pay ₹|processing fee|transfer|deposit|\bupi\b|₹ ?\d|rs\.? ?\d|भुगतान|शुल्क|फीस|ट्रांसफर|यूपीआई|पैसे भेज)/i, 'Asks for money or a fee'],
    [25, /(\botp\b|\bcvv\b|\bpin\b|password|share (the )?code|ओटीपी|पासवर्ड|पिन|सीवीवी)/i, 'Asks for an OTP, PIN or password'],
    [20, /(congratulations|you won|winner|lottery|lucky draw|prize|बधाई|जीते|जीत|लॉटरी|लकी ड्रॉ|इनाम)/i, 'Promises a prize or lottery win'],
    [20, /(kyc|account (will be )?(blocked|suspended)|update now|केवाईसी|खाता.{0,20}(बंद|ब्लॉक)|अभी अपडेट)/i, 'Threatens to block your account or asks for KYC']
  ];
  let checks = 0;

  function analyse(text) {
    let score = 0; const why = [];
    RULES.forEach(([w, re, msg]) => { if (re.test(text)) { score += w; why.push(msg); } });
    const urls = text.match(/https?:\/\/\S+|\b[\w-]+(\.[\w-]+)+\/\S*/gi) || [];
    if (urls.length) {
      const bad = urls.some(u => BAD.test(u) || SHORT.test(u) || (u.match(/-/g) || []).length >= 2);
      score += bad ? 25 : 5; why.push(bad ? 'Contains a suspicious link' : 'Contains a link. Verify before opening');
    }
    return { score: Math.min(score, 100), why };
  }

  function show(score, why, empty) {
    const fg = $('fg'), sc = $('sc'), vd = $('vd'), rl = $('rl');
    fg.style.strokeDashoffset = 439.8 * (1 - score / 100);
    const lvl = score < 25 ? 0 : score < 50 ? 1 : 2;
    fg.style.stroke = ['var(--ok)', '#f08a1c', 'var(--bad)'][lvl];
    sc.textContent = empty ? '–' : score;
    vd.textContent = empty ? t('Waiting for a message') : t(['Looks safe', 'Be careful', 'Likely a scam'][lvl]);
    rl.innerHTML = '';
    const add = (txt, cls) => { const li = document.createElement('li'); if (cls) li.className = cls; li.textContent = txt; rl.appendChild(li); };
    if (empty) return add(t('Reasons and safe next steps appear here.'), 'nx');
    if (!why.length) add(t('No warning signs found. Still, never share OTPs or PINs.'), 'nx');
    why.forEach(w => add(t(w)));
    add(t(lvl === 2 ? 'Next step: do not reply, click or pay. Call 1930 if you already shared money or codes.'
      : 'Next step: pause and verify using the official number or app, not the one in the message.'), 'nx');
    $('sh').dataset.bad = lvl === 2 ? '1' : '';
  }

  let last = null;
  function run() {
    const txt = $('txt').value.trim();
    if (!txt) { last = null; return show(0, [], true); }
    const r = analyse(txt); last = r; checks++;
    show(r.score, r.why); hist();
  }
  const hist = () => { $('hist').textContent = checks ? t('Checked') + ' ' + checks + ' ' + t('times this visit') : ''; };

  $('go').onclick = run;
  $('clr').onclick = () => { $('txt').value = ''; last = null; show(0, [], true); };
  $('smp').onclick = e => { const b = e.target.closest('.chip'); if (!b) return; $('txt').value = b.dataset.s; run(); };
  $('sh').onclick = async () => {
    const msg = t('Netra AI warning: I checked a message and it looks like a scam. Never share OTPs, never pay under pressure, and call 1930 if you are targeted.');
    try { if (navigator.share) return await navigator.share({ text: msg }); } catch (e) { return; }
    try { await navigator.clipboard.writeText(msg); } catch (e) {}
    $('sh').textContent = t('Warning copied'); setTimeout(() => ($('sh').textContent = t('Share warning')), 1800);
  };
  window.addEventListener('langchange', () => { if (last) show(last.score, last.why); else show(0, [], true); hist(); });
  show(0, [], true);
})();
