// ASM release countdown popup
// Drop into any page with: <script src="asm-popup.js" data-base="" data-release="2026-12-05"></script>
// data-base = relative path back to website-mockups root (e.g., "../" or "../../")

(function () {
  const scriptEl = document.currentScript;
  const base = scriptEl?.dataset.base ?? '';
  const releaseStr = scriptEl?.dataset.release ?? '2026-12-05T00:00:00';
  const releaseDate = new Date(releaseStr).getTime();

  const html = `
    <div class="asm-popup" id="asm-popup">
      <div class="asm-popup-backdrop"></div>
      <div class="asm-popup-card">
        <button class="asm-popup-close" aria-label="Close">&times;</button>
        <div class="banner-ornament">
          <img src="${base}assets/banner-clean.png" alt="">
          <span class="banner-text">A New Release</span>
        </div>
        <h2 class="asm-popup-title">An <em>American Single Malt</em><br>by Thornton Distilling Co.</h2>
        <p class="asm-popup-sub">The first craft-malt single malt of the American Prairie &mdash; bottled at our 1857 brewery. Releasing on Repeal Day.</p>
        <div class="asm-popup-countdown">
          <div class="cd-unit"><span class="cd-num" data-unit="days">&mdash;</span><span class="cd-label">Days</span></div>
          <div class="cd-unit"><span class="cd-num" data-unit="hours">&mdash;</span><span class="cd-label">Hours</span></div>
          <div class="cd-unit"><span class="cd-num" data-unit="mins">&mdash;</span><span class="cd-label">Min</span></div>
          <div class="cd-unit"><span class="cd-num" data-unit="secs">&mdash;</span><span class="cd-label">Sec</span></div>
        </div>
        <a class="asm-popup-cta" href="${base}spirits/single-malt/index.html">Get Notified</a>
        <button class="asm-popup-dismiss">No thanks, take me to the site</button>
      </div>
    </div>
  `;

  function init() {
    document.body.insertAdjacentHTML('beforeend', html);

    const popup = document.getElementById('asm-popup');

    function update() {
      const diff = releaseDate - Date.now();
      if (diff <= 0) {
        popup.querySelectorAll('.cd-num').forEach(n => (n.textContent = '0'));
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      popup.querySelector('[data-unit="days"]').textContent = days;
      popup.querySelector('[data-unit="hours"]').textContent = String(hours).padStart(2, '0');
      popup.querySelector('[data-unit="mins"]').textContent = String(mins).padStart(2, '0');
      popup.querySelector('[data-unit="secs"]').textContent = String(secs).padStart(2, '0');
    }
    update();
    setInterval(update, 1000);

    function dismiss() {
      popup.classList.remove('active');
      try { sessionStorage.setItem('asm-popup-dismissed', '1'); } catch (e) {}
    }
    popup.querySelector('.asm-popup-close').addEventListener('click', dismiss);
    popup.querySelector('.asm-popup-dismiss').addEventListener('click', dismiss);
    popup.querySelector('.asm-popup-backdrop').addEventListener('click', dismiss);

    let dismissed = false;
    try { dismissed = sessionStorage.getItem('asm-popup-dismissed') === '1'; } catch (e) {}
    /* For visual inspection: skip popup if URL has ?nopopup */
    const skipPopup = /[?&]nopopup\b/.test(location.search);
    if (!dismissed && !skipPopup) {
      setTimeout(() => popup.classList.add('active'), 1500);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
