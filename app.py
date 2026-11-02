"""Netra AI - Flask app: multi-page UI and link tracer API."""
import ipaddress, os, socket, time
from urllib.parse import urljoin, urlparse

import requests
from flask import Flask, jsonify, render_template, request, send_from_directory

app = Flask(__name__)
SHORT = {"bit.ly", "tinyurl.com", "t.co", "cutt.ly", "rb.gy", "is.gd", "goo.gl", "shorturl.at"}
BAD_TLD = {"xyz", "top", "click", "live", "icu", "shop", "vip", "cc", "link", "info", "buzz", "work"}
BRANDS = {"sbi": "sbi.co.in", "hdfc": "hdfcbank.com", "icici": "icicibank.com", "paytm": "paytm.com",
          "phonepe": "phonepe.com", "amazon": "amazon.in", "flipkart": "flipkart.com", "irctc": "irctc.co.in"}
MAX_HOPS = 8
_hits = {}


def too_many(ip):
    now = time.time()
    q = [t for t in _hits.get(ip, []) if now - t < 60] + [now]
    _hits[ip] = q
    return len(q) > 20


def public_host(host):
    """Block private/loopback/link-local targets so the tracer cannot probe internal networks."""
    try:
        for info in socket.getaddrinfo(host, None):
            ip = ipaddress.ip_address(info[4][0])
            if ip.is_private or ip.is_loopback or ip.is_link_local or ip.is_reserved or ip.is_multicast:
                return False
        return True
    except (socket.gaierror, ValueError):
        return False


def follow(url):
    hops, cur = [], url
    for _ in range(MAX_HOPS + 1):
        p = urlparse(cur)
        if p.scheme not in ("http", "https") or not p.hostname:
            raise ValueError("Only http and https links can be traced.")
        if not public_host(p.hostname):
            raise ValueError("That address cannot be traced.")
        try:
            r = requests.get(cur, allow_redirects=False, timeout=5, stream=True,
                             headers={"User-Agent": "NetraTracer/1.0"})
            code, loc = r.status_code, r.headers.get("Location")
            r.close()
        except requests.RequestException:
            hops.append({"url": cur, "status": 0})
            break
        hops.append({"url": cur, "status": code})
        if code in (301, 302, 303, 307, 308) and loc:
            cur = urljoin(cur, loc)
        else:
            break
    return hops


def base(host):
    return ".".join(host.split(".")[-2:])


def assess(hops):
    score, reasons = 0, []
    def add(n, why):
        nonlocal score
        if why not in reasons:
            score += n
            reasons.append(why)
    for h in hops:
        host = (urlparse(h["url"]).hostname or "").lower()
        tld = host.split(".")[-1]
        flags = []
        if host in SHORT:
            add(20, "A shortened link hides the real site"); flags.append("shortener")
        if tld in BAD_TLD:
            add(20, "Lands on a domain ending often used in scams (." + tld + ")"); flags.append("risky domain")
        if host.count("-") >= 3:
            add(10, "A web address with many hyphens"); flags.append("many hyphens")
        for b, official in BRANDS.items():
            if b in host and not (host == official or host.endswith("." + official)):
                add(25, "Imitates a trusted brand but is not its official site"); flags.append("look-alike")
                break
        if h["url"].startswith("http://"):
            add(10, "Uses an insecure http connection")
        h["flag"] = bool(flags)
        h["note"] = (str(h["status"]) if h["status"] else "no reply") + " · " + (", ".join(flags) or "no warning signs")
    if len(hops) >= 4:
        add(10, "Passes through many redirects")
    if len(hops) > 1 and base(urlparse(hops[0]["url"]).hostname or "") != base(urlparse(hops[-1]["url"]).hostname or ""):
        add(10, "Ends on a different site than it started")
    return min(score, 100), reasons


@app.route("/")
def index():
    return render_template("home.html")


@app.route("/sw.js")
def sw():
    r = send_from_directory(app.static_folder, "sw.js")
    r.headers["Service-Worker-Allowed"] = "/"
    r.headers["Cache-Control"] = "no-cache"
    return r


@app.post("/api/trace")
def trace():
    if too_many(request.remote_addr or "?"):
        return jsonify(error="Too many requests. Wait a minute and try again."), 429
    url = ((request.get_json(silent=True) or {}).get("url") or "").strip()
    if not url:
        return jsonify(error="Paste a link first."), 400
    if "://" not in url:
        url = "http://" + url
    try:
        hops = follow(url)
    except ValueError as e:
        return jsonify(error=str(e)), 400
    score, reasons = assess(hops)
    return jsonify(score=score, reasons=reasons, hops=hops, final=hops[-1]["url"])


for _n in ("checker", "tracer", "library", "awareness", "quiz", "safety", "how"):
    app.add_url_rule("/" + _n, _n, (lambda t: lambda: render_template(t))(_n + ".html"))


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)), debug=bool(os.environ.get("DEBUG")))
