/* Netra AI – English <-> Hindi. Static page text is matched against this dictionary
   (text nodes + placeholder / aria-label / data-s / title). Dynamic pages call t() / L()
   and re-render on the "langchange" event. */
(function () {
  const D = {
    // shell
    'Home': 'होम', 'Scam Checker': 'स्कैम चेकर', 'Link Tracer': 'लिंक ट्रेसर', 'Scam Library': 'स्कैम लाइब्रेरी',
    'Awareness': 'जागरूकता', 'Spot the Scam': 'स्कैम पहचानो', 'Report & Privacy': 'रिपोर्ट और गोपनीयता',
    'How it works': 'यह कैसे काम करता है', 'How It Works': 'यह कैसे काम करता है', 'Install': 'इंस्टॉल करें',
    'Netra AI': 'नेत्र AI', '👁️ Netra AI': '👁️ नेत्र AI', 'Switch language': 'भाषा बदलें', 'Toggle theme': 'थीम बदलें',
    'Smarter Alerts. Safer You.': 'समझदार अलर्ट। सुरक्षित आप।',
    'Netra keeps watch, so you don’t have to.': 'नेत्र नज़र रखता है, ताकि आपको न रखनी पड़े।',
    'Every call, message and link, checked before you act.': 'हर कॉल, संदेश और लिंक, आपके कुछ करने से पहले जाँचा गया।',
    // home
    'An AI-powered cyber-fraud detection and awareness tool that protects you from new and unknown scams, before it’s too late.': 'एक AI-आधारित साइबर-धोखाधड़ी पहचान और जागरूकता टूल, जो नए और अनजान स्कैम से आपको बहुत देर होने से पहले बचाता है।',
    'Because cyber criminals keep changing. So should your protection.': 'क्योंकि साइबर अपराधी बदलते रहते हैं। आपकी सुरक्षा भी बदलनी चाहिए।',
    'Detects': 'पहचानता है', 'suspicious activity': 'संदिग्ध गतिविधि', 'Explains': 'समझाता है', 'new scam tactics': 'स्कैम के नए तरीके',
    'Warns': 'चेताता है', 'before you act': 'आपके कुछ करने से पहले', 'Respects': 'सम्मान करता है', 'your privacy': 'आपकी गोपनीयता का',
    'Message': 'संदेश', 'WhatsApp': 'व्हाट्सऐप', '10:24 AM': '10:24 पूर्वाह्न',
    'You have a case registered against you. Pay now to avoid legal action. – CBI': 'आपके नाम पर केस दर्ज है। कानूनी कार्रवाई से बचने के लिए अभी भुगतान करें। – CBI',
    '⚠ Potential Scam Detected!': '⚠ संभावित स्कैम मिला!',
    'This message may be part of a new digital arrest scam. Be careful!': 'यह संदेश नए “डिजिटल अरेस्ट” स्कैम का हिस्सा हो सकता है। सावधान रहें!',
    'Why it’s risky?': 'यह जोखिम भरा क्यों है?', 'Uses fear and urgency': 'डर और जल्दबाज़ी का इस्तेमाल',
    'Claims to be from a government agency': 'सरकारी एजेंसी होने का दावा', 'Requests immediate payment': 'तुरंत भुगतान की माँग', 'Learn more': 'और जानें',
    'Start here': 'यहाँ से शुरू करें',
    'Paste a message or call script and see why it looks risky.': 'कोई संदेश या कॉल स्क्रिप्ट पेस्ट करें और देखें कि वह जोखिम भरा क्यों लगता है।',
    'Follow a link through every redirect before you open it.': 'लिंक खोलने से पहले उसके हर रीडायरेक्ट को फ़ॉलो करें।',
    'Awareness video': 'जागरूकता वीडियो', 'A 30-second walk through a digital arrest scam.': 'डिजिटल अरेस्ट स्कैम की 30 सेकंड की झलक, आवाज़ के साथ।',
    'Red flags and safe steps for eight common scams.': 'आठ आम स्कैम के लाल झंडे और सुरक्षित कदम।',
    'Ten quick messages. Real or scam?': 'दस छोटे संदेश। असली या स्कैम?',
    'Beat the clock, build a streak, and spot the scam.': 'समय से पहले जवाब दें, स्ट्रीक बनाएँ और स्कैम पहचानें।',
    'Emergency checklist and a cyber cell report draft.': 'आपातकालीन चेकलिस्ट और साइबर सेल रिपोर्ट का ड्राफ़्ट।',
    // checker
    'Paste a message, link or call script. The analysis runs on your device, and nothing you paste is sent anywhere or stored.': 'कोई संदेश, लिंक या कॉल स्क्रिप्ट पेस्ट करें। विश्लेषण आपके डिवाइस पर ही होता है; आप जो पेस्ट करते हैं वह कहीं भेजा या सहेजा नहीं जाता।',
    'Message, link or call script': 'संदेश, लिंक या कॉल स्क्रिप्ट', 'Paste something suspicious here…': 'यहाँ कुछ संदिग्ध पेस्ट करें…',
    'Digital arrest': 'डिजिटल अरेस्ट', 'KYC link': 'केवाईसी लिंक', 'Lottery': 'लॉटरी', 'Normal message': 'सामान्य संदेश',
    'This is Cyber Crime branch. A case is registered against you and a warrant is issued. Stay on the video call, do not tell anyone, and pay now to avoid arrest.': 'यह साइबर क्राइम ब्रांच है। आपके नाम पर केस दर्ज है और वारंट जारी हुआ है। वीडियो कॉल पर बने रहें, किसी को न बताएं, और गिरफ्तारी से बचने के लिए अभी भुगतान करें।',
    'Dear customer, your SBI KYC expires today and your account will be blocked. Update now: http://sbi-kyc-update.xyz/login and share the OTP.': 'प्रिय ग्राहक, आपका SBI केवाईसी आज समाप्त हो रहा है और आपका खाता बंद कर दिया जाएगा। अभी अपडेट करें: http://sbi-kyc-update.xyz/login और ओटीपी साझा करें।',
    'Congratulations! You won ₹25,00,000 in lucky draw. Pay ₹4,999 processing fee on UPI to claim your prize today.': 'बधाई हो! आपने लकी ड्रॉ में ₹25,00,000 जीते हैं। इनाम पाने के लिए आज ही UPI पर ₹4,999 प्रोसेसिंग शुल्क का भुगतान करें।',
    'Hi, are we still meeting at 1 for lunch? I’ll book the table.': 'हाय, क्या हम अभी भी 1 बजे लंच पर मिल रहे हैं? मैं टेबल बुक कर लूँगा।',
    'Check now': 'अभी जाँचें', 'Clear': 'साफ़ करें', 'Waiting for a message': 'संदेश की प्रतीक्षा है',
    'Reasons and safe next steps appear here.': 'कारण और सुरक्षित अगले कदम यहाँ दिखेंगे।', 'Share warning': 'चेतावनी साझा करें',
    'Looks safe': 'सुरक्षित लगता है', 'Be careful': 'सावधान रहें', 'Likely a scam': 'स्कैम होने की संभावना',
    'No warning signs found. Still, never share OTPs or PINs.': 'कोई चेतावनी संकेत नहीं मिला। फिर भी OTP या PIN कभी साझा न करें।',
    'Creates urgency to rush you': 'आपको जल्दबाज़ी में डालने के लिए जल्दी का दबाव बनाता है',
    'Claims to be police or a government agency, or threatens legal action': 'पुलिस या सरकारी एजेंसी होने का दावा करता है, या कानूनी कार्रवाई की धमकी देता है',
    'Tells you to keep it secret or stay on the call': 'बात छिपाने या कॉल पर बने रहने को कहता है',
    'Asks for money or a fee': 'पैसे या शुल्क माँगता है', 'Asks for an OTP, PIN or password': 'OTP, PIN या पासवर्ड माँगता है',
    'Contains a suspicious link': 'संदिग्ध लिंक शामिल है', 'Contains a link. Verify before opening': 'लिंक शामिल है। खोलने से पहले जाँचें',
    'Promises a prize or lottery win': 'इनाम या लॉटरी जीतने का वादा करता है', 'Threatens to block your account or asks for KYC': 'खाता बंद करने की धमकी देता है या केवाईसी माँगता है',
    'Next step: do not reply, click or pay. Call 1930 if you already shared money or codes.': 'अगला कदम: जवाब न दें, क्लिक न करें, भुगतान न करें। पैसे या कोड दे चुके हैं तो 1930 पर कॉल करें।',
    'Next step: pause and verify using the official number or app, not the one in the message.': 'अगला कदम: रुकें और संदेश वाले नहीं, आधिकारिक नंबर या ऐप से पुष्टि करें।',
    'Checked': 'जाँचे गए', 'times this visit': 'बार इस विज़िट में',
    'Netra AI warning: I checked a message and it looks like a scam. Never share OTPs, never pay under pressure, and call 1930 if you are targeted.': 'नेत्र AI चेतावनी: मैंने एक संदेश जाँचा और वह स्कैम लगता है। OTP कभी साझा न करें, दबाव में भुगतान न करें, और निशाना बनें तो 1930 पर कॉल करें।',
    'Warning copied': 'चेतावनी कॉपी हो गई',
    // tracer
    'Follow a link through every redirect to see where it really lands, without opening it yourself.': 'लिंक को खुद खोले बिना, हर रीडायरेक्ट के ज़रिए देखें कि वह असल में कहाँ पहुँचता है।',
    'Link to trace': 'ट्रेस करने के लिए लिंक', 'Trace redirects': 'रीडायरेक्ट ट्रेस करें', 'Try a demo chain': 'डेमो चेन आज़माएँ',
    'Paste a link first.': 'पहले कोई लिंक पेस्ट करें।', 'Too many requests. Wait a minute and try again.': 'बहुत अधिक अनुरोध। एक मिनट रुककर फिर कोशिश करें।',
    'Only http and https links can be traced.': 'केवल http और https लिंक ट्रेस किए जा सकते हैं।', 'That address cannot be traced.': 'यह पता ट्रेस नहीं किया जा सकता।',
    'Tracing…': 'ट्रेस हो रहा है…', 'Could not reach the tracer. It needs an internet connection and the Netra server.': 'ट्रेसर तक पहुँच नहीं हो सकी। इसके लिए इंटरनेट और नेत्र सर्वर चाहिए।',
    'Risk score': 'जोखिम स्कोर', 'Redirect path': 'रीडायरेक्ट का रास्ता',
    'A shortened link hides the real site': 'छोटा किया गया लिंक असली साइट छिपाता है',
    'Imitates a trusted brand but is not its official site': 'किसी भरोसेमंद ब्रांड की नकल करता है, पर उसकी आधिकारिक साइट नहीं है',
    'Uses an insecure http connection': 'असुरक्षित http कनेक्शन इस्तेमाल करता है', 'A web address with many hyphens': 'कई हाइफ़न वाला वेब पता',
    'Passes through many redirects': 'कई रीडायरेक्ट से गुज़रता है', 'Ends on a different site than it started': 'शुरू से अलग साइट पर पहुँचता है',
    'shortener': 'शॉर्टनर', 'risky domain': 'जोखिम भरा डोमेन', 'many hyphens': 'कई हाइफ़न', 'look-alike': 'हूबहू नकल', 'no warning signs': 'कोई चेतावनी संकेत नहीं', 'no reply': 'कोई जवाब नहीं',
    // library
    'Learn how each scam works and what to do. Tap a card to open it.': 'जानें कि हर स्कैम कैसे काम करता है और क्या करना चाहिए। खोलने के लिए कार्ड पर टैप करें।',
    'Search scams, e.g. parcel, UPI, job…': 'स्कैम खोजें, जैसे पार्सल, UPI, नौकरी…', 'All': 'सभी', 'Red flags': 'लाल झंडे', 'What to do': 'क्या करें', 'No scam found. Try another word.': 'कोई स्कैम नहीं मिला। दूसरा शब्द आज़माएँ।',
    // awareness
    'Cyber Crime Awareness': 'साइबर क्राइम जागरूकता',
    'Watch how a digital arrest scam unfolds, scene by scene, and what to do when it happens to you.': 'देखिए “डिजिटल अरेस्ट” स्कैम कैसे दृश्य-दर-दृश्य आगे बढ़ता है, और आपके साथ ऐसा हो तो क्या करें।',
    'Pause': 'रोकें', 'Play': 'चलाएँ', 'Replay': 'फिर से चलाएँ', 'Remember': 'याद रखें', 'Previous scene': 'पिछला दृश्य', 'Next scene': 'अगला दृश्य',
    'Agencies never arrest or ask for money over a call.': 'कोई भी एजेंसी फ़ोन कॉल पर न गिरफ़्तार करती है, न पैसे माँगती है।',
    'Nobody real tells you to keep it secret.': 'असली अधिकारी आपसे कभी बात छिपाने को नहीं कहते।',
    'Verify with the official number from the agency’s own website.': 'एजेंसी की अपनी वेबसाइट पर दिए आधिकारिक नंबर से पुष्टि करें।',
    'If you already paid: call 1930 right away.': 'अगर आप पैसे दे चुके हैं: तुरंत 1930 पर कॉल करें।',
    '🔊 Sound on': '🔊 आवाज़ चालू', '🔇 Sound off': '🔇 आवाज़ बंद', 'Volume': 'आवाज़', 'Scene': 'दृश्य',
    'Tap ▶ to play with sound': 'आवाज़ के साथ चलाने के लिए ▶ दबाएँ',
    'Voice narration is not available in this browser, so captions and sound effects are used.': 'इस ब्राउज़र में वॉइस-ओवर उपलब्ध नहीं है, इसलिए कैप्शन और ध्वनि प्रभाव इस्तेमाल हो रहे हैं।',
    'No Hindi voice is installed on this device, so the narration may sound English. Captions are in Hindi.': 'इस डिवाइस में हिंदी आवाज़ इंस्टॉल नहीं है, इसलिए वॉइस-ओवर अंग्रेज़ी जैसी लग सकती है। कैप्शन हिंदी में हैं।',
    // quiz
    'Ten messages. Three lives. Beat the clock!': 'दस संदेश। तीन जानें। समय से पहले जवाब दें!',
    'Scam': 'स्कैम', 'Looks real': 'असली लगता है', 'Hint': 'संकेत', 'Next': 'आगे', 'Start game': 'खेल शुरू करें', 'Play again': 'फिर से खेलें', 'Share score': 'स्कोर साझा करें',
    // how
    'Netra AI works in the background, continuously analysing your phone’s activity and the latest cyber threat updates.': 'नेत्र AI बैकग्राउंड में काम करता है, और आपके फ़ोन की गतिविधि तथा साइबर ख़तरों की ताज़ा जानकारी का लगातार विश्लेषण करता है।',
    'Monitors Your Phone': 'आपके फ़ोन पर नज़र रखता है', 'Looks at messages, calls, notifications and links (with your permission).': 'आपकी अनुमति से संदेश, कॉल, नोटिफ़िकेशन और लिंक देखता है।',
    'Fetches Latest Threats': 'ताज़ा ख़तरे जुटाता है', 'Uses TinyFish + trusted sources (news, advisory, cyber cells) to learn new scam tactics.': 'स्कैम के नए तरीके सीखने के लिए TinyFish और भरोसेमंद स्रोत (समाचार, एडवाइज़री, साइबर सेल) इस्तेमाल करता है।',
    'Analyses & Matches': 'विश्लेषण और मिलान', 'Compares what it finds with known and emerging fraud patterns using AI + rules.': 'AI और नियमों से, जो मिलता है उसकी तुलना जाने-पहचाने और उभरते धोखाधड़ी पैटर्न से करता है।',
    'Warns You': 'आपको चेताता है', 'Gives clear, simple alerts with reasons and safe next steps.': 'कारणों और सुरक्षित अगले कदमों के साथ साफ़, सरल अलर्ट देता है।',
    'Optional Reporting': 'वैकल्पिक रिपोर्टिंग', 'With your consent, shares relevant threat information with cyber authorities (using minimal data).': 'आपकी सहमति से, न्यूनतम डेटा के साथ संबंधित ख़तरे की जानकारी साइबर अधिकारियों से साझा करता है।',
    // safety
    'Privacy Controls & Reporting': 'गोपनीयता नियंत्रण और रिपोर्टिंग',
    'You decide what Netra AI can look at and whether anything is ever shared. Choices are saved only in this browser.': 'आप तय करते हैं कि नेत्र AI क्या देख सकता है और कुछ साझा होगा या नहीं। आपकी पसंद केवल इसी ब्राउज़र में सहेजी जाती है।',
    '🔒 Permissions': '🔒 अनुमतियाँ', 'Messages': 'संदेश', 'Look at messages for scam patterns': 'स्कैम पैटर्न के लिए संदेश देखें',
    'Calls': 'कॉल', 'Flag impersonation and fake calls': 'नकली पहचान और फ़र्ज़ी कॉल चिह्नित करें', 'Links': 'लिंक', 'Check links before you open them': 'खोलने से पहले लिंक जाँचें',
    'Reporting to cyber cells': 'साइबर सेल को रिपोर्टिंग', 'Share minimal threat info, only with your consent': 'केवल आपकी सहमति से, न्यूनतम ख़तरा-जानकारी साझा करें',
    'Message content is never stored. Only threat patterns are used.': 'संदेश की सामग्री कभी सहेजी नहीं जाती। केवल ख़तरे के पैटर्न इस्तेमाल होते हैं।',
    '🚨 Already paid or shared a code?': '🚨 पैसे दे दिए या कोड बता दिया?',
    'Call 1930 (National Cyber Crime Helpline) right away': 'तुरंत 1930 (राष्ट्रीय साइबर क्राइम हेल्पलाइन) पर कॉल करें',
    'Call your bank to block cards, UPI and net banking': 'कार्ड, UPI और नेट बैंकिंग बंद कराने के लिए अपने बैंक को कॉल करें',
    'Screenshot messages, numbers, links and payment receipts': 'संदेश, नंबर, लिंक और भुगतान रसीदों के स्क्रीनशॉट लें',
    'File a complaint at cybercrime.gov.in': 'cybercrime.gov.in पर शिकायत दर्ज करें', 'Change passwords and sign out of other devices': 'पासवर्ड बदलें और दूसरे डिवाइस से साइन आउट करें',
    '📋 Report to cyber cell': '📋 साइबर सेल को रिपोर्ट करें', 'Find nearest cyber cell': 'नज़दीकी साइबर सेल खोजें',
    'Turn on “Reporting to cyber cells” to create a report.': 'रिपोर्ट बनाने के लिए “साइबर सेल को रिपोर्टिंग” चालू करें।',
    'Reporting is on. Fill in the details and tap Create report.': 'रिपोर्टिंग चालू है। विवरण भरें और “रिपोर्ट बनाएँ” दबाएँ।',
    'Scam type': 'स्कैम का प्रकार', 'Amount lost (₹), if any': 'खोई गई रकम (₹), यदि कोई', 'Date': 'तारीख़', 'Report draft': 'रिपोर्ट का ड्राफ़्ट',
    'Create report': 'रिपोर्ट बनाएँ', 'Copy': 'कॉपी करें', 'Copied ✓': 'कॉपी हो गया ✓', 'Open portal': 'पोर्टल खोलें', 'Other': 'अन्य'
  };
  const P = [[/^Lands on a domain ending often used in scams \(\.(\w+)\)$/, m => 'स्कैम में अक्सर इस्तेमाल होने वाले डोमेन-अंत पर पहुँचता है (.' + m[1] + ')']];
  let lang = 'en';
  try { lang = (window.__S && window.__S.lang) || localStorage.getItem('netra.lang') || 'en'; } catch (e) { lang = (window.__S && window.__S.lang) || 'en'; }
  const tr = s => {
    if (lang !== 'hi' || typeof s !== 'string') return s;
    const k = s.replace(/\s+/g, ' ').trim();
    if (!k) return s;
    if (D[k]) return s.replace(s.trim(), D[k]);
    for (const [re, f] of P) { const m = k.match(re); if (m) return f(m); }
    return s;
  };
  const ATTR = ['placeholder', 'aria-label', 'data-s', 'title'];
  let obs;
  function textNodes(root) {
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n =>
      /^(SCRIPT|STYLE|TEXTAREA)$/.test(n.parentNode.nodeName) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    const out = []; while (w.nextNode()) out.push(w.currentNode); return out;
  }
  function apply(root) {
    root = root || document.body;
    if (obs) obs.disconnect();
    for (const n of textNodes(root)) {
      if (n.__o === undefined) { if (lang === 'hi' && /\S/.test(n.nodeValue)) n.__o = n.nodeValue; else continue; }
      n.nodeValue = lang === 'hi' ? tr(n.__o) : n.__o;
    }
    const els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[aria-label],[data-s],[title]') : [];
    els.forEach(el => ATTR.forEach(a => {
      if (!el.hasAttribute(a)) return;
      const k = '__o_' + a;
      if (el[k] === undefined) { if (lang === 'hi') el[k] = el.getAttribute(a); else return; }
      el.setAttribute(a, lang === 'hi' ? tr(el[k]) : el[k]);
    }));
    document.documentElement.lang = lang;
    if (document.__ot === undefined) document.__ot = document.title;
    document.title = lang === 'hi' ? document.__ot.split(' – ').map(tr).join(' – ') : document.__ot;
    watch();
  }
  function watch() {
    if (!document.body) return;
    obs = obs || new MutationObserver(ms => {
      obs.disconnect();
      if (lang === 'hi') ms.forEach(m => m.addedNodes.forEach(n => {
        if (n.nodeType === 3 && n.__o === undefined && /\S/.test(n.nodeValue)) { n.__o = n.nodeValue; n.nodeValue = tr(n.__o); }
        else if (n.nodeType === 1) apply(n);
      }));
      watch();
    });
    obs.observe(document.body, { childList: true, subtree: true });
  }
  window.I18N = {
    apply,
    get lang() { return lang; },
    set(l) {
      lang = l;
      try { localStorage.setItem('netra.lang', l); } catch (e) {}
      try { if (window.parent !== window) window.parent.postMessage({ netra: 'state', lang: l }, '*'); } catch (e) {}
      apply(); window.dispatchEvent(new Event('langchange'));
    }
  };
  window.t = tr;                                   // t('English') -> Hindi when active
  window.L = (en, hi) => (lang === 'hi' ? hi : en); // L('English','हिंदी')
})();
