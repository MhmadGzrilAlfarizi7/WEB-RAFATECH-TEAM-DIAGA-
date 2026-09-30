/**
 * DIAGA — Halaman Batik (batik.js)
 * Sejarah, galeri koleksi, dan generator batik
 */
import { initLayout, initParticles, escHtml, checkDemoMode } from '../modules/common.js';
import { latinKeKaganga } from '../modules/converter.js';

// ── Data galeri (keterangan JUJUR sesuai isi visual) ─────────────────────────
const GALERI_DATA = [
  {
    file: '/assets/images/pola-aksara.jpg',
    alt: 'Ilustrasi aksara Kaganga dalam pola motif',
    tag: 'Motif Aksara',
    judul: 'Pola Aksara Kaganga',
    deskripsi: 'Ilustrasi motif aksara Kaganga. (Sumber: TODO — sumber dan izin perlu dikonfirmasi)',
    sumber: 'TODO',
  },
  {
    file: '/assets/images/kain-batik-asli.jpg',
    alt: 'Produk busana bermotif aksara Kaganga',
    tag: 'Produk',
    judul: 'Busana Bermotif Aksara',
    deskripsi: 'Contoh busana bermotif aksara. (Sumber: TODO — sumber dan izin perlu dikonfirmasi)',
    sumber: 'TODO',
  },
  {
    file: '/assets/images/batik-emas.jpg',
    alt: 'Kemeja batik bermotif khas Bengkulu',
    tag: 'Batik Tulis',
    judul: 'Kemeja Batik Bermotif',
    deskripsi: 'Contoh kemeja batik bermotif. (Sumber: TODO — sumber dan izin perlu dikonfirmasi)',
    sumber: 'TODO',
  },
  {
    file: '/assets/images/kain-upacara.jpg',
    alt: 'Kain bermotif aksara dengan label Kaganga Tanah Rejang',
    tag: 'Tekstil',
    judul: 'Kain Bermotif Aksara',
    deskripsi: 'Kain dengan motif aksara. Terdapat label "Kaganga Tanah Rejang". (Sumber: TODO)',
    sumber: 'TODO',
  },
];

// ── Palet warna generator batik ───────────────────────────────────────────────
const PALETTES = {
  obsidian: { bg: '#0a0a0f', motif: 'rgba(212,168,67,0.15)', aksara: '#d4a843', rafflesia: 'rgba(0,232,123,0.1)' },
  forest:   { bg: '#0d1f0e', motif: 'rgba(0,200,80,0.12)',   aksara: '#00e87b', rafflesia: 'rgba(212,168,67,0.12)' },
  crimson:  { bg: '#1a0a0a', motif: 'rgba(180,50,50,0.15)',  aksara: '#e87b7b', rafflesia: 'rgba(212,168,67,0.1)' },
};

let activePalette = 'obsidian';

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initParticles();
  buildGallery();
  initLightbox();
  initGenerator();

  if (checkDemoMode()) {
    const inp = document.getElementById('batikName');
    if (inp) { inp.value = 'Rejang'; document.getElementById('batikGenerate')?.click(); }
  }
});

// ── Galeri ────────────────────────────────────────────────────────────────────
function buildGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  GALERI_DATA.forEach(item => {
    const card = document.createElement('div');
    card.className = 'glass gallery-card fade-up';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Buka foto: ${item.judul}`);

    const img = document.createElement('img');
    img.src = item.file;
    img.alt = item.alt;
    img.loading = 'lazy';
    img.style.width = '100%';
    img.style.height = '240px';
    img.style.objectFit = 'cover';
    img.onerror = () => {
      // Fallback: tampilkan placeholder SVG
      img.style.display = 'none';
      const ph = document.createElement('div');
      ph.style.cssText = 'height:240px;background:rgba(212,168,67,.06);display:flex;align-items:center;justify-content:center;color:var(--c-text-dim);font-size:.8rem;';
      ph.textContent = 'Foto menyusul — ' + item.judul;
      card.insertBefore(ph, card.firstChild);
    };

    const cap = document.createElement('div');
    cap.className = 'gallery-caption';
    cap.innerHTML = `
      <p class="gallery-tag">${escHtml(item.tag)}</p>
      <h3 class="gallery-card-title">${escHtml(item.judul)}</h3>
      <p class="gallery-card-desc">${escHtml(item.deskripsi)}</p>
    `;

    card.appendChild(img);
    card.appendChild(cap);
    grid.appendChild(card);

    const openLightbox = () => openLb(item);
    card.addEventListener('click', openLightbox);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(); } });
  });
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
function initLightbox() {
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightboxClose');

  closeBtn?.addEventListener('click', closeLb);
  lb?.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', e => {
    if (lb?.classList.contains('open') && e.key === 'Escape') closeLb();
  });
}

function openLb(item) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (img) { img.src = item.file; img.alt = item.alt; }
  if (cap) cap.textContent = item.deskripsi;
  lb?.classList.add('open');
  lb?.setAttribute('aria-hidden', 'false');
  document.getElementById('lightboxClose')?.focus();
  document.body.style.overflow = 'hidden';
}

function closeLb() {
  const lb = document.getElementById('lightbox');
  lb?.classList.remove('open');
  lb?.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// ── Generator Batik (Canvas) ──────────────────────────────────────────────────
function initGenerator() {
  const generateBtn = document.getElementById('batikGenerate');
  const downloadBtn = document.getElementById('batikDownload');
  const paletBtns = document.querySelectorAll('.palette-btn');

  paletBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      paletBtns.forEach(b => b.style.borderColor = 'rgba(255,255,255,.2)');
      btn.style.borderColor = 'var(--c-gold)';
      activePalette = btn.dataset.palette;
    });
  });

  generateBtn?.addEventListener('click', async () => {
    const nameInp = document.getElementById('batikName');
    const nama = nameInp?.value.trim();
    if (!nama) { nameInp?.focus(); return; }

    const wrap = document.getElementById('batikCanvasWrap');
    const canvas = document.getElementById('batikCanvas');
    const downloadBtnEl = document.getElementById('batikDownload');

    if (!canvas) return;

    // Tunggu font termuat
    const fontWarn = document.getElementById('batikFontWarn');
    try {
      await document.fonts.load('1rem "Noto Sans Rejang"');
    } catch (_) {}

    const fontLoaded = document.fonts.check('1rem "Noto Sans Rejang"');
    if (!fontLoaded && fontWarn) fontWarn.style.display = 'block';
    else if (fontWarn) fontWarn.style.display = 'none';

    gambarBatik(canvas, nama, activePalette);

    if (wrap) wrap.style.display = '';
    if (downloadBtnEl) downloadBtnEl.style.display = '';
  });

  downloadBtn?.addEventListener('click', () => {
    const canvas = document.getElementById('batikCanvas');
    const nameInp = document.getElementById('batikName');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `diaga-batik-${(nameInp?.value || 'nama').replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
}

function gambarBatik(canvas, nama, paletteKey) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width;
  const H = canvas.height;
  const pal = PALETTES[paletteKey] || PALETTES.obsidian;

  // ── Background ──────────────────────────────────────────────────────────
  ctx.fillStyle = pal.bg;
  ctx.fillRect(0, 0, W, H);

  // ── Motif geometris (batik-style) ────────────────────────────────────────
  gambarMotifGeometris(ctx, W, H, pal.motif);

  // ── Motif Rafflesia (SVG paths disederhanakan) ───────────────────────────
  gambarRafflesia(ctx, W / 2, H / 2, Math.min(W, H) * 0.3, pal.rafflesia);

  // ── Border hari emas ─────────────────────────────────────────────────────
  ctx.strokeStyle = pal.aksara;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.4;
  ctx.strokeRect(20, 20, W - 40, H - 40);
  ctx.globalAlpha = 1;

  // ── Nama dalam aksara ────────────────────────────────────────────────────
  const hasil = latinKeKaganga(nama);
  const aksaraText = hasil.teks;
  const fontSize = Math.min(H * 0.22, 120);

  ctx.font = `${fontSize}px 'Noto Sans Rejang', serif`;
  ctx.fillStyle = pal.aksara;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.globalAlpha = 0.92;
  ctx.fillText(aksaraText, W / 2, H / 2);
  ctx.globalAlpha = 1;

  // ── Label Latin di bawah ─────────────────────────────────────────────────
  ctx.font = `bold ${Math.floor(H * 0.04)}px 'Cinzel', 'Georgia', serif`;
  ctx.fillStyle = pal.aksara;
  ctx.globalAlpha = 0.65;
  ctx.fillText(nama.toUpperCase(), W / 2, H * 0.78);
  ctx.globalAlpha = 1;

  // ── Watermark DIAGA ──────────────────────────────────────────────────────
  ctx.font = `${Math.floor(H * 0.025)}px 'Inter', sans-serif`;
  ctx.fillStyle = pal.aksara;
  ctx.globalAlpha = 0.35;
  ctx.textAlign = 'right';
  ctx.fillText('DIAGA — diaga.vercel.app', W - 30, H - 25);
  ctx.globalAlpha = 1;
}

function gambarMotifGeometris(ctx, W, H, warna) {
  const step = 60;
  ctx.strokeStyle = warna;
  ctx.lineWidth = 1;

  for (let x = 0; x < W; x += step) {
    for (let y = 0; y < H; y += step) {
      // Bintang segi delapan sederhana
      ctx.beginPath();
      ctx.moveTo(x + step / 2, y);
      ctx.lineTo(x + step * 0.65, y + step * 0.35);
      ctx.lineTo(x + step, y + step / 2);
      ctx.lineTo(x + step * 0.65, y + step * 0.65);
      ctx.lineTo(x + step / 2, y + step);
      ctx.lineTo(x + step * 0.35, y + step * 0.65);
      ctx.lineTo(x, y + step / 2);
      ctx.lineTo(x + step * 0.35, y + step * 0.35);
      ctx.closePath();
      ctx.globalAlpha = 0.4;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }
}

function gambarRafflesia(ctx, cx, cy, r, warna) {
  const nPetalGroups = 5;
  const nPetals = 5;

  for (let g = 0; g < nPetalGroups; g++) {
    const outerR = r * (1 - g * 0.18);
    for (let p = 0; p < nPetals; p++) {
      const angle = (p / nPetals) * Math.PI * 2 + (g * Math.PI / nPetals);
      ctx.beginPath();
      ctx.ellipse(
        cx + Math.cos(angle) * outerR * 0.4,
        cy + Math.sin(angle) * outerR * 0.4,
        outerR * 0.45,
        outerR * 0.22,
        angle,
        0, Math.PI * 2
      );
      ctx.fillStyle = warna;
      ctx.globalAlpha = 0.5 - g * 0.08;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Pusat
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.15, 0, Math.PI * 2);
  ctx.fillStyle = warna;
  ctx.globalAlpha = 0.3;
  ctx.fill();
  ctx.globalAlpha = 1;
}