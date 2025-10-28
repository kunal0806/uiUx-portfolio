'use strict';

/**
 * -------------------------------------------------
 * 1. HEADER & MOBILE MENU
 * -------------------------------------------------
 */
function initHeaderScripts() {
  console.log('Header script loaded');

  // Elements
  const menuBtn       = document.getElementById('menu-btn');
  const hamburger     = menuBtn?.querySelector('.hamburger');
  const closeBtn      = document.getElementById('close-menu');
  const mobileMenu    = document.getElementById('mobile-menu');
  const contactBtn    = document.getElementById('contact-btn');
  const mobileContact = document.getElementById('mobile-contact-btn');

  if (!menuBtn || !mobileMenu || !closeBtn) {
    console.error('Header: Required elements missing');
    return;
  }

  // Open / Close helpers
  const openMenu = () => {
    mobileMenu.classList.remove('hidden');
    requestAnimationFrame(() => mobileMenu.classList.add('open'));
    hamburger?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger?.classList.remove('active');
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
      document.body.style.overflow = '';
    }, 400); // matches CSS transition
  };

  // Event Listeners
  menuBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);

  // Close on backdrop click
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close with ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Contact navigation
  const goToContact = () => { window.location.href = './contact.html'; };
  contactBtn?.addEventListener('click', goToContact);
  mobileContact?.addEventListener('click', goToContact);
}

/**
 * -------------------------------------------------
 * 2. IMAGE CAROUSEL (Hero / Projects)
 * -------------------------------------------------
 */
function initCarousel() {
  const images = [
    './assets/images/projects/Maplecode-Thumbnail.png',
    './assets/images/projects/101-Thumbnail.png',
    './assets/images/projects/campaign.png',
  ];

  let current = 1;
  const left   = document.getElementById('leftImg');
  const center = document.getElementById('centerImg');
  const right  = document.getElementById('rightImg');

  if (!left || !center || !right) {
    console.warn('Carousel: Image elements not found');
    return;
  }

  // Fade + scale transition
  const fadeTransition = (el, src) => {
    el.classList.add('opacity-0', 'scale-95');
    setTimeout(() => {
      el.src = src;
      el.classList.remove('opacity-0');
      setTimeout(() => el.classList.remove('scale-95'), 50);
    }, 300);
  };

  const update = () => {
    const len = images.length;
    fadeTransition(left,   images[(current - 1 + len) % len]);
    fadeTransition(center, images[current % len]);
    fadeTransition(right,  images[(current + 1) % len]);
  };

  const next = () => {
    current = (current + 1) % images.length;
    update();
  };

  // Initial render
  update();
  const interval = setInterval(next, 3500);

  // Optional: expose controls globally if needed
  window.carouselAPI = { next, pause: () => clearInterval(interval) };
}

/**
 * -------------------------------------------------
 * 3. DOM Ready → Run both
 * -------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScripts();
  initCarousel();
});