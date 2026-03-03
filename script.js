/* =========================================================
   script.js — Mangalam HDPE Pipes
   =========================================================
   1. Sticky Header      5. Touch Swipe
   2. Hamburger Menu     6. FAQ Accordion
   3. Image Carousel     7. Applications Carousel
   4. Zoom on Hover      8. Process Tabs
                         9. Contact Form
                        10. Scroll Reveal
   ========================================================= */

/* 1. STICKY HEADER */
(function () {
  var sticky = document.getElementById('stickyHeader');
  var hero   = document.getElementById('hero');
  if (!sticky || !hero) return;
  window.addEventListener('scroll', function () {
    if (hero.getBoundingClientRect().bottom <= 0) {
      sticky.classList.add('visible');
    } else {
      sticky.classList.remove('visible');
    }
  }, { passive: true });
})();

/* 2. HAMBURGER MENU */
(function () {
  var btn  = document.getElementById('hamburger');
  var menu = document.getElementById('mobileNav');
  if (!btn || !menu) return;
  btn.addEventListener('click', function () {
    this.classList.toggle('open');
    menu.classList.toggle('open');
  });
})();

/* 3. IMAGE CAROUSEL */
(function () {
  var slides  = Array.from(document.querySelectorAll('.car-slide'));
  var thumbs  = Array.from(document.querySelectorAll('.car-thumb'));
  var prevBtn = document.getElementById('carPrev');
  var nextBtn = document.getElementById('carNext');
  if (!slides.length) return;
  var current = 0;
  var timer   = null;

  function goTo(idx) {
    slides[current].classList.remove('active');
    if (thumbs[current]) thumbs[current].classList.remove('active');
    current = ((idx % slides.length) + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (thumbs[current]) thumbs[current].classList.add('active');
  }

  function reset() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, 5000);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); reset(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); reset(); });
  thumbs.forEach(function (t) {
    t.addEventListener('click', function () { goTo(parseInt(t.dataset.idx, 10)); reset(); });
  });
  reset();
})();

/* 4. ZOOM ON HOVER */
(function () {
  var ZOOM = 2.5;
  document.querySelectorAll('.car-slide').forEach(function (slide) {
    var img  = slide.querySelector('.main-slide-img');
    var lens = slide.querySelector('.zoom-lens');
    var box  = slide.querySelector('.zoom-result');
    var zImg = slide.querySelector('.zoom-result-img');
    if (!img || !lens || !box || !zImg) return;

    function setup() {
      zImg.style.width  = (img.offsetWidth  * ZOOM) + 'px';
      zImg.style.height = (img.offsetHeight * ZOOM) + 'px';
    }
    img.addEventListener('load', setup);
    window.addEventListener('resize', setup, { passive: true });
    if (img.complete) setup();

    slide.addEventListener('mousemove', function (e) {
      if (!slide.classList.contains('active')) return;
      var r  = img.getBoundingClientRect();
      var lw = lens.offsetWidth || 100;
      var lh = lens.offsetHeight || 100;
      var lx = Math.max(0, Math.min(e.clientX - r.left - lw / 2, r.width  - lw));
      var ly = Math.max(0, Math.min(e.clientY - r.top  - lh / 2, r.height - lh));
      lens.style.left    = lx + 'px';
      lens.style.top     = ly + 'px';
      lens.style.display = 'block';
      box.style.display  = 'block';
      zImg.style.transform = 'translate(' + (-lx * ZOOM) + 'px,' + (-ly * ZOOM) + 'px)';
    });

    slide.addEventListener('mouseleave', function () {
      lens.style.display = 'none';
      box.style.display  = 'none';
    });
  });
})();

/* 5. TOUCH SWIPE */
(function () {
  var track = document.getElementById('carSlides');
  var prev  = document.getElementById('carPrev');
  var next  = document.getElementById('carNext');
  if (!track || !prev || !next) return;
  var startX = 0;
  track.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend',   function (e) {
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { dx < 0 ? next.click() : prev.click(); }
  }, { passive: true });
})();

/* 6. FAQ ACCORDION */
(function () {
  var items = Array.from(document.querySelectorAll('.faq-item'));
  items.forEach(function (item) {
    var btn = item.querySelector('.faq-q');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var open = item.classList.contains('open');
      items.forEach(function (i) {
        i.classList.remove('open');
        var t = i.querySelector('.faq-toggle');
        if (t) t.innerHTML = '&#8744;';
      });
      if (!open) {
        item.classList.add('open');
        var t = btn.querySelector('.faq-toggle');
        if (t) t.innerHTML = '&#8743;';
      }
    });
  });
})();

/* 7. APPLICATIONS CAROUSEL */
(function () {
  var track = document.getElementById('appsTrack');
  var prev  = document.getElementById('appsPrev');
  var next  = document.getElementById('appsNext');
  if (!track) return;
  var cards = Array.from(track.querySelectorAll('.app-card'));
  var pos   = 0;

  function visible() {
    return window.innerWidth > 900 ? 4 : window.innerWidth > 640 ? 3 : 1.5;
  }
  function step() {
    if (!cards[0]) return 280;
    return cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap || '20');
  }
  function slide(idx) {
    pos = Math.max(0, Math.min(idx, cards.length - Math.floor(visible())));
    track.style.transform = 'translateX(-' + (pos * step()) + 'px)';
  }

  if (prev) prev.addEventListener('click', function () { slide(pos - 1); });
  if (next) next.addEventListener('click', function () { slide(pos + 1); });
  window.addEventListener('resize', function () { slide(pos); }, { passive: true });
})();

/* 8. PROCESS TABS */
(function () {
  var tabs  = Array.from(document.querySelectorAll('.ptab'));
  var steps = Array.from(document.querySelectorAll('.pstep'));
  if (!tabs.length) return;
  var cur = 0;

  function show(n) {
    steps[cur].classList.remove('active'); tabs[cur].classList.remove('active');
    cur = ((n % tabs.length) + tabs.length) % tabs.length;
    steps[cur].classList.add('active'); tabs[cur].classList.add('active');
    tabs[cur].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }

  tabs.forEach(function (t, i) { t.addEventListener('click', function () { show(i); }); });
  document.querySelectorAll('.pstep-prev').forEach(function (b) { b.addEventListener('click', function () { show(cur - 1); }); });
  document.querySelectorAll('.pstep-next').forEach(function (b) { b.addEventListener('click', function () { show(cur + 1); }); });
})();

/* 9. CONTACT FORM */
(function () {
  var form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn  = form.querySelector('.btn-submit');
    var orig = btn.textContent;
    btn.textContent = '✓ Message Sent!';
    btn.style.cssText = 'background:#e0fdf4;color:#15803d;pointer-events:none';
    setTimeout(function () {
      btn.textContent = orig;
      btn.style.cssText = '';
      form.reset();
    }, 3000);
  });
})();

/* 10. SCROLL REVEAL */
(function () {
  if (!('IntersectionObserver' in window)) return;
  var els = document.querySelectorAll('.feat-card,.port-card,.testi-card,.res-item,.app-card');
  els.forEach(function (el, i) {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease ' + (i * .05) + 's,transform .5s ease ' + (i * .05) + 's';
  });
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(function (el) { io.observe(el); });
})();


