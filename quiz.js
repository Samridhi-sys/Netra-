(function () {
  const $ = id => document.getElementById(id);
  const ROUND = 10, LIVES = 3, SECS = 15, HINTS = 2;
  // [sender, channel, isScam, EN text, HI text, EN why, HI why]  — [[...]] marks a red flag
  const Q = [
    ['VM-SBIINB', 'SMS', 1, 'Dear customer, your SBI account will be [[blocked today]]. [[Update KYC now]]: [[http://sbi-kyc-verify.xyz]]',
      'प्रिय ग्राहक, आपका SBI खाता [[आज बंद]] हो जाएगा। [[अभी केवाईसी अपडेट करें]]: [[http://sbi-kyc-verify.xyz]]',
      'Banks never ask for KYC through an SMS link. The .xyz address is fake and the deadline is meant to scare you.', 'बैंक एसएमएस लिंक से केवाईसी नहीं माँगते। .xyz पता नकली है और समय-सीमा आपको डराने के लिए है।'],
    ['HDFCBK', 'SMS', 0, 'Rs 2,450 debited from A/c XX1234 at Swiggy on 12-Oct. Not you? Call the number on the back of your card.',
      'A/c XX1234 से 12-अक्टूबर को Swiggy पर Rs 2,450 डेबिट हुए। आप नहीं? अपने कार्ड के पीछे छपे नंबर पर कॉल करें।',
      'Only information, no link and no request. It even points you to the number on your card.', 'सिर्फ़ जानकारी है, न कोई लिंक न कोई माँग। यह आपको कार्ड पर छपे नंबर की ओर भी भेजता है।'],
    ['+92 300 555 0188', 'WhatsApp', 1, 'This is the [[Cyber Crime Branch]]. A parcel in your name had illegal items. Stay on [[video call]] and [[tell no one]]. Pay [[₹49,000]] to clear your name.',
      'यह [[साइबर क्राइम ब्रांच]] है। आपके नाम के पार्सल में अवैध सामान मिला। [[वीडियो कॉल]] पर रहें और [[किसी को न बताएं]]। नाम साफ़ करने के लिए [[₹49,000]] भरें।',
      'This is a “digital arrest”. Real police never arrest by video call, never demand secrecy and never take money.', 'यह “डिजिटल अरेस्ट” है। असली पुलिस वीडियो कॉल पर गिरफ़्तारी, गोपनीयता की माँग या पैसे नहीं लेती।'],
    ['LuckyDraw', 'SMS', 1, '[[Congratulations!]] You won [[₹25 lakh]]. Pay a [[₹4,999 processing fee]] on UPI to claim your prize [[today]].',
      '[[बधाई हो!]] आपने [[₹25 लाख]] जीते हैं। इनाम पाने के लिए [[आज ही]] UPI से [[₹4,999 प्रोसेसिंग शुल्क]] भरें।',
      'You never entered a draw, and a real prize never needs an upfront fee.', 'आपने कोई ड्रॉ भरा ही नहीं, और असली इनाम के लिए पहले शुल्क नहीं लगता।'],
    ['Amazon', 'SMS', 0, 'Your order #402-1822 was delivered today. Rate your experience in the Amazon app.',
      'आपका ऑर्डर #402-1822 आज डिलीवर हो गया। Amazon ऐप में अपना अनुभव रेट करें।',
      'It talks about an order you made, has no link, and only points to the official app.', 'यह आपके किए ऑर्डर की बात करता है, कोई लिंक नहीं है और सिर्फ़ आधिकारिक ऐप की ओर भेजता है।'],
    ['Part-Time Jobs', 'WhatsApp', 1, 'Earn [[₹5,000 daily]] by liking videos. [[No experience]] needed. Send a [[₹500 deposit]] to start.',
      'वीडियो लाइक करके [[रोज़ ₹5,000]] कमाएँ। [[अनुभव ज़रूरी नहीं]]। शुरू करने के लिए [[₹500 जमा]] करें।',
      'Huge pay for easy work plus a deposit is the classic fake-job trap.', 'आसान काम के बदले भारी कमाई और जमा राशि, फ़र्ज़ी नौकरी का पुराना जाल है।'],
    ['IRCTC', 'SMS', 0, 'Your ticket PNR 2451 is confirmed for 14-Nov. Download the e-ticket from the IRCTC app.',
      'आपका टिकट PNR 2451, 14-नवंबर के लिए कन्फ़र्म है। IRCTC ऐप से ई-टिकट डाउनलोड करें।',
      'A routine confirmation for a ticket you booked. No link, no payment, no pressure.', 'आपके बुक किए टिकट की सामान्य पुष्टि। न लिंक, न भुगतान, न दबाव।'],
    ['Courier Desk', 'SMS', 1, 'Your parcel is held at customs. Pay a [[₹85 redelivery fee]] at [[bit.ly/in-post-fee]] [[within 2 hours]].',
      'आपका पार्सल कस्टम में रुका है। [[2 घंटे में]] [[bit.ly/in-post-fee]] पर [[₹85 रीडिलीवरी शुल्क]] भरें।',
      'Shortened link, a tiny fee and a ticking clock. The goal is your card details.', 'छोटा लिंक, मामूली शुल्क और घड़ी की टिक-टिक। असली मक़सद आपके कार्ड की जानकारी है।'],
    ['+91 90000 11223', 'WhatsApp', 1, 'Hi, it’s Rohan, [[new number]]. I’m in hospital and need [[₹15,000 urgently]]. Send on UPI, [[don’t call]], I’ll return it tonight.',
      'हाय, मैं रोहन, [[नया नंबर]]। मैं अस्पताल में हूँ और [[तुरंत ₹15,000]] चाहिए। UPI से भेजो, [[कॉल मत करना]], रात को लौटा दूँगा।',
      'A “friend” on a new number who refuses calls. Always call the old number first.', 'नए नंबर पर “दोस्त” जो कॉल से मना करता है। पहले पुराने नंबर पर कॉल करके पुष्टि करें।'],
    ['Jio', 'SMS', 0, 'Your Jio plan renews on 20-Oct. Recharge anytime in the MyJio app. Do not share your OTP with anyone.',
      'आपका Jio प्लान 20-अक्टूबर को रिन्यू होगा। MyJio ऐप में कभी भी रिचार्ज करें। अपना OTP किसी से साझा न करें।',
      'It informs, points to the official app and even warns you not to share an OTP.', 'यह सिर्फ़ सूचना देता है, आधिकारिक ऐप बताता है और OTP साझा न करने की चेतावनी भी देता है।'],
    ['Trade Pro VIP', 'WhatsApp', 1, '[[Guaranteed 40% returns]] in 7 days. Join our VIP stock group, [[limited seats]]. [[Deposit now]].',
      '7 दिन में [[पक्का 40% मुनाफ़ा]]। हमारे VIP स्टॉक ग्रुप से जुड़ें, [[सीमित सीटें]]। [[अभी जमा करें]]।',
      'No honest investment can guarantee returns. Limited seats and “deposit now” add pressure.', 'कोई ईमानदार निवेश पक्का मुनाफ़ा नहीं दे सकता। सीमित सीटें और “अभी जमा करें” दबाव बनाते हैं।'],
    ['Dr. Mehta Clinic', 'SMS', 0, 'Reminder: your appointment is tomorrow at 11:00 AM. Reply C to confirm or call the clinic to reschedule.',
      'अनुस्मारक: आपकी अपॉइंटमेंट कल सुबह 11:00 बजे है। पुष्टि के लिए C भेजें या बदलने के लिए क्लिनिक को कॉल करें।',
      'A normal reminder that asks for no money, link or code.', 'सामान्य अनुस्मारक, जिसमें पैसे, लिंक या कोड कुछ नहीं माँगा गया।'],
    ['Electricity Dept', 'SMS', 1, 'Your power will be [[disconnected tonight 9:30 PM]] due to unpaid bill. Call [[this officer 98765 43210]] [[now]].',
      'बिल बकाया होने से आपकी बिजली [[आज रात 9:30 बजे कट]] जाएगी। [[अभी]] [[इस अधिकारी 98765 43210]] को कॉल करें।',
      'Threat of an immediate cut plus a personal mobile number. Use the number on your bill or the official app.', 'तुरंत कनेक्शन कटने की धमकी और निजी मोबाइल नंबर। अपने बिल या आधिकारिक ऐप का नंबर इस्तेमाल करें।']
  ].map(a => ({ who: a[0], ch: a[1], scam: !!a[2], en: a[3], hi: a[4], wEn: a[5], wHi: a[6] }));

  const esc = s => s.replace(/[&<>]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
  const hi = () => I18N.lang === 'hi';
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const get = k => { try { return +localStorage.getItem(k) || 0; } catch (e) { return 0; } };
  const put = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

  let S, timer;   // S = game state
  const ranks = () => [
    [0, L('Cyber Rookie', 'साइबर नौसिखिया'), '🐣'], [600, L('Scam Spotter', 'स्कैम पहचानकर्ता'), '🕵️'],
    [1200, L('Netra Guardian', 'नेत्र रक्षक'), '🛡️'], [1800, L('Scam-proof Legend', 'स्कैम-प्रूफ़ महारथी'), '🏆']];
  const rankOf = sc => ranks().filter(r => sc >= r[0]).pop();

  function hud() {
    $('hl').textContent = '❤️'.repeat(S.lives) + '🖤'.repeat(LIVES - S.lives);
    $('hs').textContent = '⭐ ' + S.score;
    $('hk').textContent = S.streak > 1 ? '🔥 x' + S.streak : '';
    $('hm').textContent = SND.muted ? '🔇' : '🔊';
    $('qp').style.width = (S.i / ROUND * 100) + '%';
    $('qhint').textContent = '💡 ' + t('Hint') + ' (' + S.hints + ')';
    $('qhint').disabled = S.hints < 1 || S.mode !== 'ask';
  }
  function bubble(q, reveal) {
    const txt = esc(hi() ? q.hi : q.en).replace(/\[\[(.+?)\]\]/g, '<mark class="fl' + (reveal ? ' on' : '') + '">$1</mark>');
    return '<div class="bub' + (reveal ? ' rev' : '') + '"><div class="who"><i>' + (q.ch === 'SMS' ? '💬' : '🟢') + '</i><div><b>' + esc(q.who) + '</b><small>' + q.ch + ' · ' + L('now', 'अभी') + '</small></div></div><p>' + txt + '</p></div>';
  }
  function paint() {
    $('qh').hidden = S.mode === 'start'; $('tmr').hidden = S.mode !== 'ask';
    $('qbx').hidden = S.mode !== 'ask'; $('qhw').hidden = S.mode !== 'ask' && S.mode !== 'rev' ? true : S.mode === 'rev';
    $('qn').hidden = S.mode !== 'rev';
    if (S.mode === 'start') {
      $('qm').innerHTML = '<div><div style="font-size:54px">🕵️</div><h3 style="margin:6px 0">' + L('Ready, agent?', 'तैयार हैं, एजेंट?') + '</h3><p class="note">' +
        L('10 messages · 3 lives · 15 seconds each. Faster answers and streaks score more. Use hints wisely!', '10 संदेश · 3 जानें · हर एक के लिए 15 सेकंड। तेज़ जवाब और स्ट्रीक पर ज़्यादा अंक। संकेत सोच-समझकर लें!') +
        '</p><button class="btn" id="qgo">' + t('Start game') + '</button></div>';
      $('qgo').onclick = start; $('qf').innerHTML = ''; return;
    }
    if (S.mode === 'end') return endScreen();
    const q = S.q[S.i];
    $('qm').innerHTML = bubble(q, S.mode === 'rev');
    if (S.mode === 'ask') { $('qf').innerHTML = S.hintTxt || ''; }
    else $('qf').innerHTML = S.fb();
    hud();
  }
  function start() {
    SND.init();
    const sc = shuffle(Q.filter(x => x.scam)).slice(0, 6), re = shuffle(Q.filter(x => !x.scam)).slice(0, 4);
    S = { q: shuffle(sc.concat(re)), i: 0, lives: LIVES, score: 0, streak: 0, best: 0, ok: 0, hints: HINTS, mode: 'ask', t0: 0 };
    ask();
  }
  function ask() {
    S.mode = 'ask'; S.hintTxt = ''; S.t0 = performance.now(); S.lastTick = SECS;
    clearInterval(timer); timer = setInterval(tick, 100); paint(); tick();
  }
  function tick() {
    const left = Math.max(0, SECS - (performance.now() - S.t0) / 1000);
    $('qt').style.width = (left / SECS * 100) + '%';
    $('qt').style.background = left < 5 ? 'var(--bad)' : '';
    const n = Math.ceil(left);
    if (left > 0 && left < 5.1 && n !== S.lastTick) { S.lastTick = n; SND.fx.tick(); }
    if (left <= 0) answer(null);
  }
  function answer(say) {         // say: true = "scam", false = "real", null = timeout
    if (S.mode !== 'ask') return;
    clearInterval(timer);
    const q = S.q[S.i], left = Math.max(0, SECS - (performance.now() - S.t0) / 1000), good = say === q.scam && say !== null;
    let pts = 0;
    if (good) {
      S.streak++; S.best = Math.max(S.best, S.streak); S.ok++;
      pts = 100 + Math.round(left / SECS * 50) + 25 * (Math.min(S.streak, 5) - 1); S.score += pts; SND.fx.right();
      if (navigator.vibrate) navigator.vibrate(20);
    } else {
      S.streak = 0; S.lives--; SND.fx.wrong(); if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    }
    const timeout = say === null;
    S.fb = () => {
      const qq = S.q[S.i];
      const head = good ? '<span class="ok">✅ ' + L('Correct!', 'सही!') + ' +' + pts + '</span>'
        : '<span class="no">' + (timeout ? '⏰ ' + L('Time’s up!', 'समय समाप्त!') : '❌ ' + L('Not quite.', 'ठीक नहीं।')) + '</span>';
      const kind = qq.scam ? L('This was a scam.', 'यह स्कैम था।') : L('This one was real.', 'यह असली था।');
      return head + ' <b>' + kind + '</b><br>' + (hi() ? qq.wHi : qq.wEn);
    };
    S.mode = 'rev'; S.pulse = good ? 'good' : 'bad';
    S.lastNext = S.lives <= 0 || S.i + 1 >= ROUND ? 'end' : 'next';
    paint(); $('qn').textContent = S.lastNext === 'end' ? L('See result', 'नतीजा देखें') : t('Next');
    $('qm').classList.remove('good', 'bad'); void $('qm').offsetWidth; $('qm').classList.add(S.pulse);
  }
  function next() {
    if (S.mode !== 'rev') return;
    if (S.lastNext === 'end') { S.mode = 'end'; return paint(); }
    S.i++; ask();
  }
  function hint() {
    if (S.mode !== 'ask' || S.hints < 1) return;
    S.hints--; S.score = Math.max(0, S.score - 30);
    const q = S.q[S.i], m = $('qm').querySelector('mark.fl');
    if (q.scam && m) { m.classList.add('on'); S.hintTxt = '💡 ' + L('One red flag is highlighted. (−30 points)', 'एक लाल झंडा चिह्नित किया गया है। (−30 अंक)'); }
    else S.hintTxt = '💡 ' + L('No obvious red flags here. Does it ask for money, a code or a click? (−30 points)', 'यहाँ कोई साफ़ लाल झंडा नहीं। क्या यह पैसे, कोड या क्लिक माँग रहा है? (−30 अंक)');
    SND.fx.pop(); $('qf').innerHTML = S.hintTxt; hud();
  }
  function endScreen() {
    $('qh').hidden = false; $('tmr').hidden = true; $('qbx').hidden = true; $('qhw').hidden = true; $('qn').hidden = true;
    const r = rankOf(S.score), prev = get('netra.best'), nb = S.score > prev; if (nb) put('netra.best', S.score);
    const won = S.lives > 0; hud(); $('qp').style.width = '100%';
    $('qm').innerHTML = '<div><div style="font-size:60px">' + r[2] + '</div><h3 style="margin:4px 0">' + r[1] + '</h3>' +
      '<div style="font-size:34px;font-weight:800">⭐ ' + S.score + '</div>' +
      '<p class="note">' + L('Correct', 'सही') + ': ' + S.ok + '/' + (S.lives > 0 ? ROUND : S.i + 1) + ' · ' + L('Best streak', 'सबसे लंबी स्ट्रीक') + ': 🔥' + S.best + ' · ' + L('Best score', 'सर्वश्रेष्ठ स्कोर') + ': ' + Math.max(prev, S.score) + '</p>' +
      (nb ? '<p class="ok">🎉 ' + L('New personal best!', 'नया निजी रिकॉर्ड!') + '</p>' : '') +
      (won ? '' : '<p class="no">💔 ' + L('Out of lives. Scammers got you this time!', 'जानें ख़त्म। इस बार स्कैमर जीत गए!') + '</p>') +
      '<div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:8px"><button class="btn" id="pa">' + t('Play again') + '</button><button class="btn alt" id="ss">' + t('Share score') + '</button></div></div>';
    $('qf').innerHTML = '';
    $('pa').onclick = start;
    $('ss').onclick = () => {
      const m = L('I scored ' + S.score + ' (' + r[1] + ') on Netra AI Spot the Scam. Can you beat me?', 'मैंने नेत्र AI “स्कैम पहचानो” में ' + S.score + ' अंक (' + r[1] + ') बनाए। क्या आप मुझे हरा सकते हैं?');
      shareModal(m, $('ss'));
    };
    (won ? SND.fx.win : SND.fx.lose)(); if (won && S.score >= 1200) confetti();
  }
  // ---- Share-score popup: WhatsApp, Instagram, Gmail, Copy Link ----
  function shareModal(msg, opener) {
    const link = location.origin + '/quiz', full = msg + ' ' + link;
    const old = document.getElementById('shm'); if (old) old.remove();
    const ov = document.createElement('div'); ov.className = 'shm'; ov.id = 'shm';
    const opts = [
      ['wa', '💬', 'WhatsApp', 'https://wa.me/?text=' + encodeURIComponent(full)],
      ['ig', '📸', 'Instagram', null],
      ['gm', '✉️', 'Gmail', 'https://mail.google.com/mail/?view=cm&fs=1&su=' + encodeURIComponent(L('My Netra AI score', 'मेरा नेत्र AI स्कोर')) + '&body=' + encodeURIComponent(full)],
      ['cp', '🔗', L('Copy Link', 'लिंक कॉपी करें'), null]
    ];
    ov.innerHTML = '<div class="shb" role="dialog" aria-modal="true" aria-labelledby="sht"><button class="ib shx" aria-label="' + L('Close', 'बंद करें') + '">✕</button>' +
      '<h3 id="sht">' + L('Share your score', 'अपना स्कोर शेयर करें') + '</h3><p class="note">' + msg.replace(/</g, '&lt;') + '</p><div class="sho">' +
      opts.map(o => '<button class="shi ' + o[0] + '" data-k="' + o[0] + '"><span>' + o[1] + '</span>' + o[2] + '</button>').join('') +
      '</div><div class="shl"><input readonly value="' + link + '" aria-label="Link"></div><p class="note shs" id="shs" aria-live="polite"></p></div>';
    document.body.appendChild(ov);
    const say = x => { $('shs').textContent = x; };
    const copy = async txt => {
      try { await navigator.clipboard.writeText(txt); return true; } catch (e) {}
      const i = ov.querySelector('.shl input'); i.value = txt; i.select();
      try { return document.execCommand('copy'); } catch (e) { return false; } finally { i.value = link; }
    };
    const close = () => { ov.remove(); document.removeEventListener('keydown', onKey, true); if (opener) opener.focus(); };
    const onKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      if (e.key === 'Tab') {
        const f = [...ov.querySelectorAll('button,input')], a = document.activeElement;
        if (!ov.contains(a)) { e.preventDefault(); f[0].focus(); }
        else if (e.shiftKey && a === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
        else if (!e.shiftKey && a === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
      }
      e.stopPropagation();
    };
    document.addEventListener('keydown', onKey, true);
    ov.addEventListener('click', e => { if (e.target === ov) close(); });
    ov.querySelector('.shx').onclick = close;
    ov.querySelector('.shl input').onclick = e => e.target.select();
    opts.forEach(o => {
      ov.querySelector('[data-k="' + o[0] + '"]').onclick = async () => {
        if (o[0] === 'cp') return say(await copy(full) ? L('Link copied ✓', 'लिंक कॉपी हो गया ✓') : L('Could not copy. Select the link above.', 'कॉपी नहीं हुआ। ऊपर का लिंक चुनकर कॉपी करें।'));
        if (o[0] === 'ig') {
          // Instagram has no web share link, so copy the message and open Instagram.
          const ok = await copy(full);
          say(ok ? L('Message copied. Paste it in an Instagram DM or story.', 'संदेश कॉपी हो गया। इसे Instagram DM या स्टोरी में पेस्ट करें।') : L('Open Instagram and paste the link.', 'Instagram खोलकर लिंक पेस्ट करें।'));
          window.open('https://www.instagram.com/direct/inbox/', '_blank', 'noopener'); return;
        }
        window.open(o[3], '_blank', 'noopener');
      };
    });
    ov.querySelector('.shi').focus();
  }
  function confetti() {
    const box = $('qg'); for (let i = 0; i < 36; i++) {
      const s = document.createElement('span'); s.className = 'cf'; s.textContent = ['🎉', '✨', '🛡️', '⭐'][i % 4];
      s.style.left = Math.random() * 100 + '%'; s.style.animationDelay = Math.random() * .8 + 's'; s.style.fontSize = 14 + Math.random() * 16 + 'px';
      box.appendChild(s); setTimeout(() => s.remove(), 3200);
    }
  }
  $('qs').onclick = () => answer(true); $('qr').onclick = () => answer(false);
  $('qn').onclick = next; $('qhint').onclick = hint;
  $('hm').onclick = () => { SND.mute(!SND.muted); $('hm').textContent = SND.muted ? '🔇' : '🔊'; };
  document.addEventListener('keydown', e => {
    if (/INPUT|TEXTAREA|SELECT/.test((e.target.nodeName || ''))) return;
    if (S.mode === 'ask') { if (e.key === 's' || e.key === 'S') answer(true); if (e.key === 'r' || e.key === 'R') answer(false); }
    else if (S.mode === 'rev' && e.key === 'Enter') next();
  });
  window.addEventListener('langchange', () => { paint(); if (S.mode === 'rev') $('qn').textContent = S.lastNext === 'end' ? L('See result', 'नतीजा देखें') : t('Next'); });
  S = { mode: 'start', i: 0, lives: LIVES, score: 0, streak: 0, hints: HINTS }; paint();
})();
