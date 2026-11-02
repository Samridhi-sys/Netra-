/* Tiny WebAudio helper shared by the quiz and the awareness player. No audio files needed. */
(function () {
  let ctx, master, muted = false, vol = 0.8;
  try { muted = localStorage.getItem('netra.mute') === '1'; } catch (e) {}
  function init() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC(); master = ctx.createGain(); master.gain.value = muted ? 0 : vol; master.connect(ctx.destination);
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(f, d, type, v, at, to) {
    if (!init() || muted) return null;
    const t0 = ctx.currentTime + (at || 0), o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + d);
    g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(v || 0.2, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + d);
    o.connect(g); g.connect(master); o.start(t0); o.stop(t0 + d + 0.05); return o;
  }
  // sustained pad/drone; returns {stop()}
  function drone(freqs, type, v, cutoff) {
    if (!init()) return { stop() {} };
    const g = ctx.createGain(), lp = ctx.createBiquadFilter(), os = [];
    lp.type = 'lowpass'; lp.frequency.value = cutoff || 500;
    g.gain.setValueAtTime(0.0001, ctx.currentTime); g.gain.linearRampToValueAtTime(v || 0.05, ctx.currentTime + 1);
    freqs.forEach((f, i) => { const o = ctx.createOscillator(); o.type = type || 'sawtooth'; o.frequency.value = f; o.detune.value = i % 2 ? 7 : -7; o.connect(lp); o.start(); os.push(o); });
    lp.connect(g); g.connect(master);
    return { stop() { try { g.gain.cancelScheduledValues(ctx.currentTime); g.gain.setValueAtTime(Math.max(g.gain.value, 0.0001), ctx.currentTime); g.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 0.6); os.forEach(o => o.stop(ctx.currentTime + 0.7)); } catch (e) {} } };
  }
  const fx = {
    right() { tone(660, .12, 'triangle', .25); tone(990, .22, 'triangle', .25, .1); },
    wrong() { tone(200, .35, 'sawtooth', .22, 0, 90); },
    tick() { tone(1200, .05, 'square', .08); },
    ring() { [0, .45].forEach(a => { tone(440, .35, 'sine', .22, a); tone(480, .35, 'sine', .22, a); }); },
    alarm() { [0, .25, .5].forEach(a => tone(900, .15, 'square', .12, a)); },
    ding() { tone(880, .6, 'sine', .22); tone(1320, .8, 'sine', .15, .12); },
    win() { [523, 659, 784, 1047].forEach((f, i) => tone(f, .3, 'triangle', .25, i * .12)); },
    lose() { [392, 330, 262].forEach((f, i) => tone(f, .35, 'triangle', .22, i * .18)); },
    pop() { tone(500, .08, 'sine', .18, 0, 900); }
  };
  window.SND = {
    init, tone, drone, fx,
    get muted() { return muted; },
    mute(m) { muted = !!m; try { localStorage.setItem('netra.mute', m ? '1' : '0'); } catch (e) {} if (master) master.gain.value = muted ? 0 : vol; },
    volume(v) { vol = v; if (master && !muted) master.gain.value = v; }
  };
})();
