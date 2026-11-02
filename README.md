# Netra AI: Smarter Alerts. Safer You.

A multi-page scam-protection web app (installable on a phone): Home, Scam Checker, Link Tracer, Scam Library, Awareness video, Spot the Scam quiz, Report & Privacy, How it works. English and Hindi.

## Run
    python -m venv .venv && source .venv/bin/activate    # Windows: .venv\Scripts\activate
    pip install -r requirements.txt
    python app.py                                        # http://localhost:5000

Installing on a phone needs HTTPS, so deploy first (e.g. Render: build `pip install -r requirements.txt`, start `gunicorn app:app`).

## Pages
`/` `/checker` `/tracer` `/library` `/awareness` `/quiz` `/safety` `/how` (templates in `templates/`, one script per page in `static/`).

## Awareness video (now with audio)
The Awareness page plays a built-in animated explainer of the digital arrest scam, about 30 seconds in six scenes. It now has sound:
- **Voice-over** of every scene using the browser's built-in speech (`en-IN` or `hi-IN`, following the language switch).
- **Sound design**: a tense background drone, a phone ring, alarm beeps and a calm "safe" chord for the last two scenes, all generated live with WebAudio (no audio files).
- **Controls**: Play/Pause, previous/next scene, Sound on/off, and a volume slider. Sound starts only after the person taps Play, as browsers require.
- Hindi voice-over needs a Hindi voice on the device (most Android phones have one). If none is installed, the captions are still in Hindi and the page says so.

To add your own video, save it as `static/video/awareness.mp4`; it appears above the explainer automatically and keeps its own audio.

## What runs where
- Checker, library, quiz and report draft run in the browser. Pasted text never leaves the device.
- Link tracer (`POST /api/trace`): the server follows up to 8 redirects (public addresses only, 20 requests/min per IP) and flags shorteners, risky domains and brand look-alikes.
- Offline: the page shell is cached by `static/sw.js`; the tracer needs a connection.

## Spot the Scam (game)
Ten random messages per round (6 scams, 4 real) with 3 lives and 15 seconds each. Faster answers and streaks score more, 2 hints per game (-30 points), red flags are highlighted after each answer, and there are ranks from Cyber Rookie to Scam-proof Legend, a saved personal best, sound effects (mute button), vibration on phones, and a share button. Keys: `S` scam, `R` real, `Enter` next.

## Language (English / Hindi)
The `हिं` / `EN` button switches the whole app at once, and the choice is remembered. All page text, the checker (it also detects Hindi scam wording), the tracer results, the library, the quiz, the explainer captions and narration, and the report draft are covered. Static text lives in the dictionary in `static/i18n.js`; the library, quiz and explainer content is written in both languages in `data.js`, `quiz.js` and `awareness.js`.
To translate a new line of page text, add `'English text': 'हिंदी'` to the dictionary in `i18n.js`.

## Notes
- Detection is rule-based: guidance, not proof.
- Hindi text uses the Noto Sans Devanagari font (loaded from Google Fonts, with system fallback).
