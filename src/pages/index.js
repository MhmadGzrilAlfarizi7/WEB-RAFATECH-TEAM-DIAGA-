/**
 * DIAGA — Beranda (index.js)
 */
import { initLayout, initParticles, escHtml, checkDemoMode } from '../modules/common.js';
import { latinKeKaganga } from '../modules/converter.js';

document.addEventListener('DOMContentLoaded', () => {
  initLayout();
  initParticles();
  initHeroConverter();

  if (checkDemoMode()) {
    const inp = document.getElementById('heroInput');
    if (inp) { inp.value = 'rejang'; inp.dispatchEvent(new Event('input')); }
  }
});

function initHeroConverter() {
  const inp = document.getElementById('heroInput');
  const out = document.getElementById('heroOutput');
  if (!inp || !out) return;

  inp.addEventListener('input', () => {
    const val = inp.value.trim();
    if (!val) { out.textContent = '—'; return; }
    const hasil = latinKeKaganga(val);
    out.textContent = hasil.teks || '—';
  });
}