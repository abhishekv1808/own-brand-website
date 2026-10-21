// Generates soft-gradient UI mockup placeholders (WebP) into /public/work.
// Run: npm run placeholders   (replace the output with real screenshots later)
import { mkdirSync, rmSync } from "node:fs";
import sharp from "sharp";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "work");
mkdirSync(out, { recursive: true });

const W = 1600;
const H = 1100;

const projects = [
  { slug: "kora", name: "Kora Pay", layout: "phones", bg: ["#E9E7FF", "#C9C3FF"], blob: "#7C72FF", ui: "#4F46FF" },
  { slug: "thali", name: "Thali & Co", layout: "brand", bg: ["#FFF1E2", "#FFD9B8"], blob: "#F59E5B", ui: "#9A3412" },
  { slug: "fieldnote", name: "Fieldnote", layout: "dashboard", bg: ["#E6F4EF", "#BFE3D5"], blob: "#3FB28A", ui: "#0F766E" },
  { slug: "aranya", name: "Aranya", layout: "browser", bg: ["#E3EFE6", "#B5D3BD"], blob: "#4E8B5F", ui: "#1F4D2E" },
  { slug: "mitti", name: "Mitti", layout: "shop", bg: ["#F6ECE6", "#E7CDBE"], blob: "#C08467", ui: "#7C4A32" },
  { slug: "pulse", name: "Pulse", layout: "phone", bg: ["#E5F2FF", "#BBDAFF"], blob: "#4C9BFF", ui: "#1D4ED8" },
  { slug: "orbit", name: "Orbit", layout: "dashboard-dark", bg: ["#1A1B2E", "#2B2D52"], blob: "#6366F1", ui: "#A5B4FC" },
  { slug: "neel", name: "Studio Neel", layout: "editorial", bg: ["#ECEEF3", "#CDD3E0"], blob: "#7C8AA8", ui: "#1E293B" },
  { slug: "brightpath", name: "Brightpath", layout: "browser", bg: ["#FFF7D6", "#FFE58A"], blob: "#F5B800", ui: "#7A5800" },
  { slug: "showreel", name: "Showreel", layout: "reel", bg: ["#17123A", "#3B2FD9"], blob: "#9B8CFF", ui: "#FFFFFF" },
];

const r = (x, y, w, h, rx, fill, extra = "") => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" ${extra}/>`;

// Gradients only (no SVG filters): blur/shadow filters are very slow to rasterise on mobile CPUs.
function defs(p) {
  return `<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg[0]}"/><stop offset="1" stop-color="${p.bg[1]}"/></linearGradient>
  <radialGradient id="blob"><stop offset="0" stop-color="${p.blob}" stop-opacity=".55"/><stop offset="1" stop-color="${p.blob}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="${W * 0.18}" cy="${H * 0.2}" r="440" fill="url(#blob)"/>
  <circle cx="${W * 0.85}" cy="${H * 0.85}" r="520" fill="url(#blob)" opacity=".8"/>`;
}

// Cheap soft shadow: two offset translucent copies of the shape.
const shadow = (x, y, w, h, rx) =>
  r(x - 6, y + 22, w + 12, h + 14, rx + 6, "#111114", 'opacity=".05"') + r(x, y + 12, w, h, rx, "#111114", 'opacity=".07"');

function phone(x, y, s, p, variant = 0) {
  const w = 300 * s;
  const h = 620 * s;
  const pad = 18 * s;
  let ui = "";
  const ix = x + pad;
  const iw = w - pad * 2;
  ui += r(ix, y + 60 * s, iw * 0.5, 16 * s, 8 * s, p.ui, 'opacity=".9"');
  ui += r(ix, y + 90 * s, iw * 0.7, 12 * s, 6 * s, "#111114", 'opacity=".12"');
  if (variant === 0) {
    ui += r(ix, y + 130 * s, iw, 170 * s, 22 * s, p.ui);
    ui += r(ix + 20 * s, y + 160 * s, iw * 0.4, 14 * s, 7 * s, "#fff", 'opacity=".6"');
    ui += r(ix + 20 * s, y + 190 * s, iw * 0.6, 34 * s, 10 * s, "#fff", 'opacity=".95"');
    for (let i = 0; i < 4; i++) {
      const yy = y + (330 + i * 62) * s;
      ui += `<circle cx="${ix + 22 * s}" cy="${yy + 22 * s}" r="${20 * s}" fill="${p.blob}" opacity=".35"/>`;
      ui += r(ix + 54 * s, yy + 10 * s, iw * 0.45, 11 * s, 5 * s, "#111114", 'opacity=".55"');
      ui += r(ix + 54 * s, yy + 28 * s, iw * 0.3, 9 * s, 4 * s, "#111114", 'opacity=".15"');
      ui += r(ix + iw - 60 * s, yy + 14 * s, 60 * s, 14 * s, 7 * s, p.ui, 'opacity=".25"');
    }
  } else {
    for (let i = 0; i < 2; i++) {
      const yy = y + (130 + i * 200) * s;
      ui += r(ix, yy, iw, 180 * s, 22 * s, i ? "#F4F4F6" : p.blob, i ? "" : 'opacity=".35"');
      ui += r(ix + 18 * s, yy + 120 * s, iw * 0.5, 14 * s, 7 * s, "#111114", 'opacity=".6"');
      ui += r(ix + 18 * s, yy + 144 * s, iw * 0.3, 10 * s, 5 * s, "#111114", 'opacity=".2"');
    }
    ui += r(ix, y + h - 110 * s, iw, 56 * s, 28 * s, p.ui);
  }
  return `${shadow(x, y, w, h, 46 * s)}${r(x, y, w, h, 46 * s, "#111114")}${r(x + 8 * s, y + 8 * s, w - 16 * s, h - 16 * s, 40 * s, "#fff")}
  ${r(x + w / 2 - 50 * s, y + 22 * s, 100 * s, 22 * s, 11 * s, "#111114")}${ui}`;
}

function browser(x, y, w, h, p, kind = "hero", dark = false) {
  const bar = 54;
  const surface = dark ? "#14152A" : "#fff";
  const ink = dark ? "#fff" : "#111114";
  let s = shadow(x, y, w, h, 22) + r(x, y, w, h, 22, surface);
  s += `<path d="M${x} ${y + 22}a22 22 0 0 1 22-22h${w - 44}a22 22 0 0 1 22 22v${bar - 22}h-${w}z" fill="${dark ? "#1E1F38" : "#F3F3F5"}"/>`;
  [0, 1, 2].forEach(
    (i) => (s += `<circle cx="${x + 28 + i * 22}" cy="${y + bar / 2}" r="7" fill="${["#FF6159", "#FFBD2E", "#28C941"][i]}"/>`),
  );
  s += r(x + w / 2 - 160, y + 15, 320, 24, 12, dark ? "#2A2C4A" : "#E6E6EA");
  const cx = x + 56;
  const cy = y + bar + 40;
  const cw = w - 112;
  if (kind === "hero") {
    s += r(cx, cy, 90, 14, 7, p.ui);
    [0, 1, 2, 3].forEach((i) => (s += r(cx + cw - 360 + i * 90, cy, 64, 12, 6, ink, 'opacity=".25"')));
    s += r(cx, cy + 70, cw * 0.55, 46, 12, ink, 'opacity=".85"');
    s += r(cx, cy + 128, cw * 0.4, 46, 12, ink, 'opacity=".85"');
    s += r(cx, cy + 200, cw * 0.42, 14, 7, ink, 'opacity=".25"');
    s += r(cx, cy + 224, cw * 0.32, 14, 7, ink, 'opacity=".25"');
    s += r(cx, cy + 270, 170, 50, 25, p.ui);
    s += r(cx + 186, cy + 270, 150, 50, 25, "none", `stroke="${ink}" stroke-opacity=".2" stroke-width="2"`);
    s += `<g>${r(cx + cw * 0.6, cy + 60, cw * 0.4, h - bar - 140, 18, p.blob, 'opacity=".55"')}
      <circle cx="${cx + cw * 0.8}" cy="${cy + 60 + (h - bar - 140) / 2}" r="${Math.min(cw * 0.12, 120)}" fill="#fff" opacity=".55"/></g>`;
  } else if (kind === "dashboard") {
    s += r(x, y + bar, 210, h - bar, 0, dark ? "#101122" : "#FAFAFB");
    [0, 1, 2, 3, 4, 5].forEach(
      (i) => (s += r(x + 28, y + bar + 40 + i * 44, i ? 130 : 150, 14, 7, i ? ink : p.ui, i ? 'opacity=".2"' : "")),
    );
    const dx = x + 250;
    const dw = w - 290;
    [0, 1, 2].forEach((i) => {
      const bx = dx + i * (dw / 3);
      s += r(bx, cy, dw / 3 - 20, 120, 16, dark ? "#1E1F38" : "#F5F5F7");
      s += r(bx + 22, cy + 26, 90, 12, 6, ink, 'opacity=".3"');
      s += r(bx + 22, cy + 56, 140, 32, 8, i === 0 ? p.ui : ink, i === 0 ? "" : 'opacity=".8"');
    });
    const gy = cy + 150;
    const gh = h - bar - 250;
    s += r(dx, gy, dw - 20, gh, 16, dark ? "#1E1F38" : "#F5F5F7");
    let path = `M${dx + 30} ${gy + gh - 40}`;
    for (let i = 1; i <= 10; i++)
      path += ` L${dx + 30 + ((dw - 80) / 10) * i} ${gy + gh - 40 - (Math.sin(i * 0.9) * 0.3 + i / 14) * (gh - 90)}`;
    s += `<path d="${path}" fill="none" stroke="${p.ui}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
    s += `<path d="${path} L${dx + dw - 50} ${gy + gh - 30} L${dx + 30} ${gy + gh - 30}Z" fill="${p.ui}" opacity=".12"/>`;
  } else if (kind === "shop") {
    s += r(cx, cy, 80, 14, 7, p.ui);
    [0, 1, 2, 3].forEach((i) => {
      const cw4 = (cw - 60) / 4;
      const bx = cx + i * (cw4 + 20);
      s += r(bx, cy + 50, cw4, cw4 * 1.15, 16, i % 2 ? "#F3EAE4" : p.blob, i % 2 ? "" : 'opacity=".35"');
      s += `<ellipse cx="${bx + cw4 / 2}" cy="${cy + 50 + cw4 * 0.62}" rx="${cw4 * 0.24}" ry="${cw4 * 0.3}" fill="${p.ui}" opacity="${0.55 + i * 0.1}"/>`;
      s += r(bx, cy + 70 + cw4 * 1.15, cw4 * 0.7, 14, 7, ink, 'opacity=".6"');
      s += r(bx, cy + 94 + cw4 * 1.15, cw4 * 0.35, 12, 6, p.ui, 'opacity=".7"');
    });
  } else if (kind === "editorial") {
    s += r(cx, cy, 140, 14, 7, ink, 'opacity=".8"');
    s += r(cx, cy + 50, cw * 0.62, h - bar - 150, 4, "#C9CFDC");
    s += `<path d="M${cx} ${cy + h - bar - 100}L${cx + cw * 0.25} ${cy + 180}L${cx + cw * 0.4} ${cy + 300}L${cx + cw * 0.62} ${cy + 120}V${cy + h - bar - 100}Z" fill="${p.ui}" opacity=".35"/>`;
    s += r(cx + cw * 0.68, cy + 50, cw * 0.32, 40, 6, ink, 'opacity=".85"');
    s += r(cx + cw * 0.68, cy + 100, cw * 0.24, 40, 6, ink, 'opacity=".85"');
    [0, 1, 2, 3, 4].forEach((i) => (s += r(cx + cw * 0.68, cy + 180 + i * 26, cw * (0.3 - (i % 2) * 0.06), 10, 5, ink, 'opacity=".22"')));
  }
  return s;
}

function render(p) {
  let body = defs(p);
  switch (p.layout) {
    case "phones":
      body += phone(W / 2 - 380, 220, 1.15, p, 0) + phone(W / 2 + 40, 140, 1.15, p, 1);
      break;
    case "phone":
      body += phone(W / 2 - 172, 170, 1.15, p, 1);
      break;
    case "browser":
      body += browser(170, 150, W - 340, H - 230, p, "hero");
      break;
    case "dashboard":
      body += browser(150, 140, W - 300, H - 220, p, "dashboard");
      break;
    case "dashboard-dark":
      body += browser(150, 140, W - 300, H - 220, p, "dashboard", true);
      break;
    case "shop":
      body += browser(170, 170, W - 340, H - 260, p, "shop");
      break;
    case "editorial":
      body += browser(170, 150, W - 340, H - 230, p, "editorial");
      break;
    case "brand": {
      const cards = [
        [250, 200, 520, 700, p.ui],
        [830, 200, 520, 330, "#fff"],
        [830, 570, 520, 330, p.blob],
      ];
      cards.forEach(([x, y, w, h, f]) => (body += shadow(x, y, w, h, 28) + r(x, y, w, h, 28, f)));
      body += `<circle cx="510" cy="500" r="120" fill="none" stroke="#fff" stroke-width="22"/><circle cx="510" cy="500" r="46" fill="#fff"/>`;
      body += r(390, 700, 240, 22, 11, "#fff", 'opacity=".8"');
      ["#9A3412", "#F59E5B", "#FFD9B8", "#111114"].forEach(
        (c, i) => (body += `<circle cx="${900 + i * 110}" cy="365" r="42" fill="${c}"/>`),
      );
      body += r(880, 640, 300, 40, 10, "#fff", 'opacity=".9"') + r(880, 700, 200, 18, 9, "#fff", 'opacity=".6"');
      break;
    }
    case "reel": {
      body += `<circle cx="${W / 2}" cy="${H / 2}" r="360" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
        <circle cx="${W / 2}" cy="${H / 2}" r="250" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="2"/>
        <circle cx="${W / 2}" cy="${H / 2}" r="96" fill="#fff"/>
        <path d="M${W / 2 - 26} ${H / 2 - 40}L${W / 2 + 44} ${H / 2}L${W / 2 - 26} ${H / 2 + 40}Z" fill="#4F46FF"/>
`;
      break;
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${body}</svg>`;
}

// Rasterise to WebP: real screenshots will be bitmaps too, and SVG rasterises on the main thread.
for (const p of projects) {
  const file = join(out, `${p.slug}.webp`);
  await sharp(Buffer.from(render(p))).webp({ quality: 82 }).toFile(file);
  rmSync(join(out, `${p.slug}.svg`), { force: true });
  console.log("wrote", file);
}
