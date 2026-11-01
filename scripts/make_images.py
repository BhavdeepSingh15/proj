"""Generate the site's abstract imagery (still water, mist, soft light).

Every picture except the portrait is made here, procedurally, so there are no
stock-photo licences to track. Run `npm run images` to rebuild; swap any file in
assets-src/ for a real photograph with the same name and re-run images.mjs.

Output: assets-src/*.jpg (masters), assets-src/fog-*.png (with alpha),
public/img/contours.svg
"""
import math
import os

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets-src")
PUB = os.path.join(ROOT, "public", "img")
os.makedirs(SRC, exist_ok=True)
os.makedirs(PUB, exist_ok=True)


def hexrgb(h):
    h = h.lstrip("#")
    return np.array([int(h[i : i + 2], 16) for i in (0, 2, 4)], dtype=np.float32) / 255.0


def fbm(w, h, scale, octaves=5, seed=0, stretch=1.0):
    """Smooth fractal noise in [0, 1]. stretch > 1 elongates features horizontally."""
    rng = np.random.default_rng(seed)
    out = np.zeros((h, w), np.float32)
    amp, total = 1.0, 0.0
    s = scale
    for _ in range(octaves):
        gw = max(2, int(w / (s * stretch)) + 2)
        gh = max(2, int(h / s) + 2)
        grid = rng.random((gh, gw)).astype(np.float32)
        img = Image.fromarray((grid * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC)
        out += amp * (np.asarray(img, np.float32) / 255.0)
        total += amp
        amp *= 0.5
        s = max(1.0, s / 2.0)
    out /= total
    out = (out - out.min()) / (out.max() - out.min() + 1e-6)
    return out


def vgrad(h, w, stops):
    """Vertical gradient. stops: list of (pos 0..1, hex)."""
    y = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    out = np.zeros((h, w, 3), np.float32)
    for (p0, c0), (p1, c1) in zip(stops, stops[1:]):
        m = (y >= p0) & (y <= p1)
        t = np.clip((y - p0) / max(p1 - p0, 1e-6), 0, 1)
        t = t * t * (3 - 2 * t)
        col = hexrgb(c0) * (1 - t)[..., None] + hexrgb(c1) * t[..., None]
        out = np.where(m[..., None], np.broadcast_to(col, (h, w, 3)), out)
    return out


def blend(base, color, alpha):
    a = np.clip(alpha, 0, 1)[..., None]
    return base * (1 - a) + hexrgb(color) * a


def ridge(w, h, base_y, amp, seed, scale):
    n = fbm(w, 8, scale, 5, seed)[4]  # one row of noise
    return (base_y - amp * n) * h


def grain(img, amount, seed):
    rng = np.random.default_rng(seed)
    n = rng.normal(0, amount, img.shape[:2]).astype(np.float32)[..., None]
    return img + n


def vignette(img, strength):
    h, w = img.shape[:2]
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    d = np.sqrt(((x - w / 2) / (w / 2)) ** 2 + ((y - h / 2) / (h / 2)) ** 2)
    v = 1 - strength * np.clip(d - 0.35, 0, 1) ** 1.5
    return img * v[..., None]


def save(img, name, quality=90):
    arr = (np.clip(img, 0, 1) * 255).astype(np.uint8)
    Image.fromarray(arr).save(os.path.join(SRC, f"{name}.jpg"), quality=quality, subsampling=0)
    print("wrote", name)


def lake_scene(w, h, horizon, sky, hills, water, mist, seed, mist_amt=0.55, lights=None):
    """A still lake: sky, layered hills in haze, mirrored reflection, mist bands."""
    img = vgrad(h, w, sky)
    # soft cloud texture in the sky
    clouds = fbm(w, h, 260, 5, seed + 1, stretch=3.0)
    img = blend(img, mist, (clouds - 0.45).clip(0) * 0.35 * (np.linspace(1, 0.3, h)[:, None]))
    hy = int(horizon * h)
    rows = np.arange(h, dtype=np.float32)[:, None]
    # hills, far to near
    for i, (col, base, amp, sc) in enumerate(hills):
        r = ridge(w, h, base, amp, seed + 10 + i, sc)
        mask = (rows >= r[None, :]) & (rows < hy)
        img = np.where(mask[..., None], blend(img, col, np.ones((h, w)) * 0.96), img)
        # haze band at the foot of each hill layer
        band = np.exp(-((rows - (hy - 6 - i * 2)) / (h * 0.05 + i * 8)) ** 2)
        hz = fbm(w, h, 180, 4, seed + 30 + i, stretch=4.0)
        img = blend(img, mist, band * (0.25 + 0.5 * hz) * mist_amt * (rows < hy))
    # water: mirror the area above the horizon, darken and blur slightly
    above = img[max(0, 2 * hy - h) : hy][::-1]
    refl = np.zeros_like(img[hy:])
    refl[: above.shape[0]] = above
    if above.shape[0] < refl.shape[0]:
        refl[above.shape[0] :] = above[-1]
    # horizontal ripple displacement
    rh = refl.shape[0]
    dist = (fbm(w, rh, 40, 3, seed + 50, stretch=8.0) - 0.5) * 18
    xs = (np.arange(w)[None, :] + dist).astype(np.int32) % w
    refl = refl[np.arange(rh)[:, None], xs]
    refl = np.asarray(
        Image.fromarray((np.clip(refl, 0, 1) * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2)),
        np.float32,
    ) / 255.0
    tint = vgrad(rh, w, water)
    depth = np.linspace(0.35, 0.85, rh, dtype=np.float32)[:, None, None]
    img[hy:] = refl * (1 - depth) + tint * depth
    # fine horizontal streaks on the water
    streak = fbm(w, rh, 14, 3, seed + 60, stretch=30.0)
    img[hy:] = blend(img[hy:], mist, (streak - 0.6).clip(0) * 0.35)
    # mist lying on the water near the horizon
    mm = fbm(w, h, 220, 5, seed + 70, stretch=5.0)
    env = np.exp(-((rows - hy) / (h * 0.09)) ** 2)
    img = blend(img, mist, env * (0.25 + 0.75 * mm) * mist_amt)
    if lights:
        for lx, ly, rad, col, strength in lights:
            y, x = np.mgrid[0:h, 0:w].astype(np.float32)
            d = np.sqrt((x - lx * w) ** 2 + (y - ly * h) ** 2)
            img = blend(img, col, np.exp(-((d / (rad * w)) ** 2)) * strength)
            # elongated reflection
            ry = 2 * hy - ly * h
            d2 = np.sqrt(((x - lx * w) / (rad * w * 0.6)) ** 2 + ((y - ry) / (rad * w * 4)) ** 2)
            img = blend(img, col, np.exp(-(d2**2)) * strength * 0.45 * (y > hy))
    return img


def hero(w, h, name, seed):
    img = lake_scene(
        w, h, 0.6,
        sky=[(0, "#0b1210"), (0.45, "#18231f"), (0.6, "#3a4a45")],
        hills=[("#2a3834", 0.53, 0.07, 300), ("#1c2724", 0.58, 0.09, 160), ("#121a18", 0.6, 0.05, 90)],
        water=[(0, "#1b2523"), (1, "#0c1210")],
        mist="#8fa39d", seed=seed, mist_amt=0.45,
    )
    img = vignette(img, 0.55)
    img = grain(img, 0.012, seed)
    save(img, name, 88)


def dusk(w, h, name, seed):
    """Mid-tone lake at first light, deep enough for cream text on top."""
    img = lake_scene(
        w, h, 0.6,
        sky=[(0, "#2b3a36"), (0.35, "#3f4f4a"), (0.52, "#6d7a70"), (0.6, "#c2a27c")],
        hills=[("#4a5a54", 0.565, 0.04, 260), ("#34433e", 0.595, 0.05, 140)],
        water=[(0, "#56645d"), (1, "#1f2b28")],
        mist="#b9c4bf", seed=seed, mist_amt=0.5,
        lights=[(0.58, 0.585, 0.16, "#e8c497", 0.5)],
    )
    img = vignette(img, 0.35)
    img = grain(img, 0.01, seed)
    save(img, name)


def light_scene(w, h, name, seed, horizon=0.55, warm=True, mist_amt=0.7):
    img = lake_scene(
        w, h, horizon,
        sky=[(0, "#b9c7c2"), (0.7 * horizon, "#d9ddd3"), (horizon, "#f0e3cc" if warm else "#e3e8e3")],
        hills=[("#a9b8b2", horizon - 0.04, 0.05, 260), ("#8ea29b", horizon - 0.01, 0.06, 140)],
        water=[(0, "#c7d1cc"), (1, "#7d918b")],
        mist="#f2f0e9", seed=seed, mist_amt=mist_amt,
        lights=[(0.62, horizon - 0.02, 0.18, "#f6dcb4", 0.45)] if warm else None,
    )
    img = vignette(img, 0.25)
    img = grain(img, 0.008, seed)
    save(img, name)


def ripples(w, h, name, seed, centres, base, ring, dark):
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    img = vgrad(h, w, [(0, base), (1, dark)])
    tex = fbm(w, h, 120, 5, seed, stretch=1.5)
    img = blend(img, dark, (tex - 0.5).clip(0) * 0.5)
    for cx, cy, r0, waves in centres:
        d = np.sqrt((x - cx * w) ** 2 + (y - cy * h) ** 2)
        k = 2 * math.pi / (r0 * w)
        env = np.exp(-d / (waves * r0 * w)) * (d < waves * r0 * w * 1.6)
        s = np.sin(d * k) * env
        img = blend(img, ring, s.clip(0) ** 2 * 0.22)
        img = blend(img, dark, (-s).clip(0) * 0.12)
    img = grain(img, 0.01, seed)
    save(img, name)


def bokeh(w, h, name, seed):
    rng = np.random.default_rng(seed)
    img = vgrad(h, w, [(0, "#4d6a55"), (0.6, "#2f4a3d"), (1, "#1d2f28")])
    layer = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    dr = ImageDraw.Draw(layer)
    for _ in range(46):
        r = rng.uniform(14, 70)
        cx, cy = rng.uniform(0, w), rng.uniform(0, h * 0.8)
        c = [(240, 233, 205), (203, 222, 190), (160, 196, 160), (232, 214, 170)][rng.integers(0, 4)]
        a = int(rng.uniform(40, 130))
        dr.ellipse([cx - r, cy - r, cx + r, cy + r], fill=c + (a,))
    layer = layer.filter(ImageFilter.GaussianBlur(9))
    la = np.asarray(layer, np.float32) / 255.0
    img = img * (1 - la[..., 3:4]) + la[..., :3] * la[..., 3:4]
    img = vignette(img, 0.4)
    img = grain(img, 0.01, seed)
    save(img, name)


def stone(w, h, name, seed):
    img = light_scene_array(w, h, seed, horizon=0.36)
    y, x = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy, rx, ry = 0.5 * w, 0.66 * h, 0.17 * w, 0.075 * h
    d = ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2
    body = np.clip(1.15 - d, 0, 1) ** 0.4
    img = blend(img, "#3c4a46", body * (y < cy + ry * 0.2))
    hl = np.exp(-(((x - cx + rx * 0.25) / (rx * 0.5)) ** 2 + ((y - cy + ry * 0.5) / (ry * 0.35)) ** 2))
    img = blend(img, "#9eaea8", hl * 0.5 * (y < cy))
    refl = np.clip(1.15 - (((x - cx) / rx) ** 2 + ((y - (cy + ry * 0.6)) / (ry * 1.1)) ** 2), 0, 1) ** 0.6
    img = blend(img, "#56645f", refl * 0.55 * (y >= cy + ry * 0.2))
    rd = np.sqrt(((x - cx) / (rx * 1.6)) ** 2 + ((y - cy - ry * 0.3) / (ry * 1.4)) ** 2)
    ring = np.exp(-(((rd - 1.25) / 0.05) ** 2)) + 0.6 * np.exp(-(((rd - 1.7) / 0.06) ** 2))
    img = blend(img, "#eef0ea", ring * 0.35)
    img = grain(img, 0.008, seed)
    save(img, name)


def light_scene_array(w, h, seed, horizon):
    return lake_scene(
        w, h, horizon,
        sky=[(0, "#c5cfcb"), (horizon, "#e7e9e2")],
        hills=[("#b4c1bc", horizon - 0.03, 0.04, 240)],
        water=[(0, "#cdd5d1"), (1, "#8fa19b")],
        mist="#f3f2ec", seed=seed, mist_amt=0.8,
    )


def hills_layers(w, h, name, seed):
    img = vgrad(h, w, [(0, "#d7ddd8"), (0.5, "#e9e6dc"), (1, "#c9d2ce")])
    rows = np.arange(h, dtype=np.float32)[:, None]
    cols = ["#b7c4bf", "#9aada7", "#7f948e", "#62786f", "#465a53"]
    for i, c in enumerate(cols):
        r = ridge(w, h, 0.38 + i * 0.13, 0.12, seed + i, 260 - i * 30)
        img = np.where((rows >= r[None, :])[..., None], blend(img, c, np.ones((h, w))), img)
        mist = fbm(w, h, 160, 4, seed + 20 + i, stretch=4)
        band = np.exp(-((rows - (0.42 + i * 0.13) * h) / (h * 0.06)) ** 2)
        img = blend(img, "#f1efe7", band * (0.3 + 0.6 * mist) * 0.75)
    img = grain(img, 0.008, seed)
    save(img, name)


def texture(w, h, name, seed):
    img = vgrad(h, w, [(0, "#efe8da"), (1, "#e2d9c7")])
    n = fbm(w, h, 90, 6, seed, stretch=1.2)
    img = blend(img, "#cbbfa8", (n - 0.5).clip(0) * 0.6)
    m = fbm(w, h, 300, 4, seed + 3, stretch=2.5)
    img = blend(img, "#f8f4ea", (m - 0.4).clip(0) * 0.7)
    img = grain(img, 0.012, seed)
    save(img, name)


def fog(w, h, name, seed):
    rows = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    env = np.exp(-((rows - 0.55) / 0.22) ** 2)
    n = fbm(w, h, 220, 6, seed, stretch=3.5)
    n2 = fbm(w, h, 80, 4, seed + 9, stretch=2.0)
    a = np.clip((n * 0.75 + n2 * 0.25 - 0.28) * 1.6, 0, 1) * env
    # fade left/right edges so bands can overlap seamlessly
    xs = np.linspace(0, 1, w, dtype=np.float32)[None, :]
    a *= np.clip(np.minimum(xs, 1 - xs) / 0.08, 0, 1)
    rgba = np.zeros((h, w, 4), np.uint8)
    rgba[..., :3] = 255
    rgba[..., 3] = (a * 255).astype(np.uint8)
    im = Image.fromarray(rgba, "RGBA").filter(ImageFilter.GaussianBlur(6))
    im.save(os.path.join(SRC, f"{name}.png"))
    print("wrote", name)


def contours(path, seed):
    rng = np.random.default_rng(seed)
    cx, cy = 600, 420
    phases = rng.uniform(0, 2 * math.pi, 4)
    paths = []
    for k in range(14):
        r0 = 40 + k * 34
        pts = []
        for i in range(73):
            t = 2 * math.pi * i / 72
            r = r0 * (1 + 0.08 * math.sin(3 * t + phases[0] + k * 0.15) + 0.05 * math.sin(5 * t + phases[1])
                      + 0.03 * math.sin(7 * t + phases[2] - k * 0.1))
            pts.append((cx + r * math.cos(t) * 1.35, cy + r * math.sin(t)))
        d = "M" + " L".join(f"{x:.1f},{y:.1f}" for x, y in pts) + "Z"
        paths.append(f'<path d="{d}"/>')
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 840" fill="none" stroke="#3d6e68" '
        'stroke-width="1" vector-effect="non-scaling-stroke">' + "".join(paths) + "</svg>"
    )
    open(path, "w").write(svg)
    print("wrote contours.svg")


if __name__ == "__main__":
    hero(2560, 1440, "hero", 7)
    hero(1080, 1920, "hero-m", 11)
    dusk(1200, 1700, "arch", 21)
    light_scene(1600, 1200, "card", 23, horizon=0.5, warm=False, mist_amt=0.9)
    stone(900, 1125, "svc-stone", 31)
    bokeh(900, 1125, "svc-leaves", 33)
    ripples(900, 1125, "svc-ripples", 35, [(0.38, 0.45, 0.035, 7), (0.64, 0.55, 0.035, 7)], "#4a6660", "#cfe0da", "#203430")
    hills_layers(900, 1125, "svc-hills", 37)
    light_scene(900, 1125, "svc-dawn", 39, horizon=0.62, warm=True, mist_amt=0.5)
    ripples(900, 1125, "svc-rain", 41,
            [(0.3, 0.3, 0.02, 5), (0.7, 0.42, 0.025, 5), (0.45, 0.7, 0.03, 6), (0.8, 0.8, 0.018, 4)],
            "#3f5a54", "#c4d6d0", "#1a2b28")
    ripples(800, 1000, "tile-water", 43, [(0.5, 0.5, 0.05, 9)], "#5d7a73", "#e3ece8", "#2d4540")
    texture(800, 800, "tile-texture", 45)
    fog(1920, 600, "fog-a", 51)
    fog(1920, 600, "fog-b", 53)
    contours(os.path.join(PUB, "contours.svg"), 61)
