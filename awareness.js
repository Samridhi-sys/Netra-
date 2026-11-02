(function () {
  const $ = id => document.getElementById(id);
  const DUR = 6500, MAX = 14000;           // minimum / maximum time per scene (ms)
  const SC = [
    { ico: '📞', mood: 'tense', fx: 'ring', t: ['An unknown call', 'एक अनजान कॉल'],
      x: ['You get a call from an unknown number. The caller says he is from the Cyber Crime Branch.', 'आपके पास एक अनजान नंबर से कॉल आता है। कॉल करने वाला कहता है कि वह साइबर क्राइम ब्रांच से है।'] },
    { ico: '🪪', mood: 'tense', fx: 'alarm', t: ['A scary accusation', 'डरावना आरोप'],
      x: ['He says a parcel in your name has illegal items, or your Aadhaar is linked to a crime. A warrant is ready.', 'वह कहता है कि आपके नाम के पार्सल में अवैध सामान है, या आपका आधार किसी अपराध से जुड़ा है। वारंट तैयार है।'] },
    { ico: '📹', mood: 'tense', fx: 'pop', t: ['Digital arrest', 'डिजिटल अरेस्ट'],
      x: ['You are told to stay on a video call and tell nobody. A fake uniform and fake police office make it look real.', 'आपको वीडियो कॉल पर बने रहने और किसी को न बताने को कहा जाता है। नकली वर्दी और नकली थाना इसे असली दिखाते हैं।'] },
    { ico: '💸', mood: 'tense', fx: 'alarm', t: ['Pay now to be cleared', 'बचने के लिए अभी भुगतान'],
      x: ['To avoid arrest, you must send money to a “safe account” right now. That is the real goal.', 'गिरफ़्तारी से बचने के लिए आपको अभी “सुरक्षित खाते” में पैसे भेजने होंगे। यही उनका असली मक़सद है।'] },
    { ico: '🛑', mood: 'calm', fx: 'ding', good: 1, t: ['Stop. This is a scam.', 'रुकिए। यह स्कैम है।'],
      x: ['Real agencies never arrest anyone on a video call, never ask for money, and never ask for secrecy.', 'असली एजेंसियाँ वीडियो कॉल पर गिरफ़्तारी नहीं करतीं, पैसे नहीं माँगतीं, और बात छिपाने को नहीं कहतीं।'] },
    { ico: '☎️', mood: 'calm', fx: 'win', good: 1, t: ['What to do', 'क्या करें'],
      x: ['Hang up. Call 1930. Tell your family. Report at cybercrime.gov.in. You are safe.', 'कॉल काट दें। 1930 पर कॉल करें। परिवार को बताएँ। cybercrime.gov.in पर रिपोर्ट करें। आप सुरक्षित हैं।'] }
  ];
  const S = { i: 0, el: 0, playing: false, started: false, speaking: false, drone: null, mood: null };
  let voices = [];
  const hasTTS = 'speechSynthesis' in window;
  const loadV = () => { voices = hasTTS ? speechSynthesis.getVoices() : []; };
  if (hasTTS) { loadV(); speechSynthesis.onvoiceschanged = loadV; }
  const hi = () => I18N.lang === 'hi', pick = a => a[hi() ? 1 : 0];

  function render() {
    const st = $('st');
    if (!S.started) {
      st.innerHTML = '<div class="sn"><div class="se" id="big" style="cursor:pointer" role="button" aria-label="Play">▶</div><h3>' + L('Awareness video', 'जागरूकता वीडियो') + '</h3><p>' + t('Tap ▶ to play with sound') + '</p></div>';
      $('big').onclick = toggle; $('pp').textContent = t('Play'); $('sc2').textContent = ''; $('pb').style.width = '0';
      return;
    }
    const s = SC[S.i];
    st.innerHTML = '<div class="sn' + (s.good ? ' good' : '') + '"><div class="se">' + s.ico + '</div>' +
      '<div class="eq' + (S.playing && !SND.muted ? ' on' : '') + '"><i></i><i></i><i></i><i></i></div><h3>' + pick(s.t) + '</h3><p>' + pick(s.x) + '</p></div>';
    $('sc2').textContent = t('Scene') + ' ' + (S.i + 1) + ' / ' + SC.length;
    $('pp').textContent = S.playing ? t('Pause') : (S.i === SC.length - 1 && S.el >= DUR ? t('Replay') : t('Play'));
  }

  // ---- audio ----
  function say(text) {
    stopSpeech();
    if (!hasTTS || SND.muted) return;
    const u = new SpeechSynthesisUtterance(text), want = hi() ? 'hi-IN' : 'en-IN';
    u.lang = want; u.rate = hi() ? .92 : .96; u.volume = +$('vol').value / 100;
    const norm = v => v.lang.replace('_', '-').toLowerCase();
    const v = voices.find(v => norm(v) === want.toLowerCase()) || voices.find(v => norm(v).startsWith(hi() ? 'hi' : 'en'));
    if (v) u.voice = v;
    $('nn').textContent = hi() && !voices.some(v => norm(v).startsWith('hi')) && voices.length ? t('No Hindi voice is installed on this device, so the narration may sound English. Captions are in Hindi.') : '';
    S.speaking = true; u.onend = u.onerror = () => { S.speaking = false; };
    speechSynthesis.speak(u);
  }
  function stopSpeech() { S.speaking = false; if (hasTTS) speechSynthesis.cancel(); }
  function mood(m) {
    if (S.mood === m) return; S.mood = m; if (S.drone) S.drone.stop();
    S.drone = m === 'tense' ? SND.drone([110, 130.8, 164.8], 'sawtooth', .05, 420) : m === 'calm' ? SND.drone([261.6, 329.6, 392], 'sine', .06, 900) : null;
  }
  function silence() { stopSpeech(); if (S.drone) S.drone.stop(); S.drone = null; S.mood = null; }
  function enter() {            // play the audio for the current scene
    const s = SC[S.i]; SND.init(); mood(s.mood); SND.fx[s.fx](); setTimeout(() => S.playing && say(pick(s.x)), 650);
  }

  // ---- transport ----
  let timer;
  function loop() {
    if (!S.playing) return;
    S.el += 100;
    $('pb').style.width = ((S.i + Math.min(1, S.el / DUR)) / SC.length * 100) + '%';
    if (S.el >= DUR && !(S.speaking && S.el < MAX)) {
      if (S.i < SC.length - 1) { S.i++; S.el = 0; render(); enter(); }
      else { S.playing = false; silence(); clearInterval(timer); render(); }
    }
  }
  function play() { S.playing = true; clearInterval(timer); timer = setInterval(loop, 100); render(); enter(); }
  function pause() { S.playing = false; clearInterval(timer); silence(); render(); }
  function toggle() {
    if (S.playing) return pause();
    if (!S.started || (S.i === SC.length - 1 && S.el >= DUR)) { S.started = true; S.i = 0; S.el = 0; }
    play();
  }
  function jump(d) {
    S.started = true; S.i = Math.min(SC.length - 1, Math.max(0, S.i + d)); S.el = 0; silence(); play();
  }
  $('pp').onclick = toggle; $('pv').onclick = () => jump(-1); $('nx2').onclick = () => jump(1);

  // ---- sound controls ----
  const snd = () => { $('snd').textContent = t(SND.muted ? '🔇 Sound off' : '🔊 Sound on'); };
  $('snd').onclick = () => { SND.mute(!SND.muted); snd(); if (SND.muted) silence(); else if (S.playing) enter(); render(); };
  $('vol').oninput = e => SND.volume(+e.target.value / 100);
  if (!hasTTS) $('nn').textContent = t('Voice narration is not available in this browser, so captions and sound effects are used.');
  document.addEventListener('visibilitychange', () => { if (document.hidden && S.playing) pause(); });
  addEventListener('pagehide', silence);
  window.addEventListener('langchange', () => { snd(); render(); if (S.playing) { stopSpeech(); say(pick(SC[S.i].x)); } });

  // Optional real video: save it as static/video/awareness.mp4 (it keeps its own audio track).
  const vid = $('vid');
  fetch('/static/video/awareness.mp4', { method: 'HEAD' }).then(r => {
    if (r.ok && /video/.test(r.headers.get('content-type') || '')) { vid.src = '/static/video/awareness.mp4'; vid.hidden = false; vid.addEventListener('play', pause); }
  }).catch(() => {});

  snd(); render();
})();
