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
 * 2. SMOOTH CAROUSEL (Hero / Projects)
 * -------------------------------------------------
 */
function initCarousel() {
  const images = [
    './assets/images/projects/Maplecode-Thumbnail.png',
    './assets/images/projects/101-Thumbnail.png',
    './assets/images/projects/campaign.png',
  ];

  const carouselTrack = document.querySelector('.carousel-track');
  const dotsContainer = document.querySelector('.carousel-container .flex.space-x-2');
  const prevButton = document.querySelector('.carousel-prev');
  const nextButton = document.querySelector('.carousel-next');

  if (!carouselTrack || !dotsContainer) {
    console.warn('Carousel: Required elements not found');
    return;
  }

  let currentIndex = 0;
  let autoPlayInterval;
  let isAnimating = false;

  // Initialize carousel
  function init() {
    createSlides();
    createDots();
    updateCarousel();
    startAutoPlay();
    addEventListeners();
    addTouchSupport();
  }

  // Create slides
  function createSlides() {
    carouselTrack.innerHTML = '';
    images.forEach((image, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-slide ${index === 0 ? 'active' : ''}`;
      slide.innerHTML = `
        <img 
          src="${image}" 
          alt="Project ${index + 1}" 
          class="enhanced-image"
          loading="lazy"
        />
      `;
      carouselTrack.appendChild(slide);
    });
  }

  // Create dots
  function createDots() {
    dotsContainer.innerHTML = '';
    images.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  // Update carousel state
  function updateCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');

    slides.forEach((slide, index) => {
      slide.classList.toggle('active', index === currentIndex);
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });

    // Update transform for mobile
    if (window.innerWidth < 768) {
      const slideWidth = carouselTrack.children[0].offsetWidth + 8; // width + gap
      carouselTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
  }

  // Navigate to specific slide
  function goToSlide(index) {
    if (isAnimating) return;
    
    isAnimating = true;
    currentIndex = (index + images.length) % images.length;
    updateCarousel();
    
    // Reset animation lock
    setTimeout(() => {
      isAnimating = false;
    }, 500);
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Auto-play
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Touch support for mobile
  function addTouchSupport() {
    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    carouselTrack.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      stopAutoPlay();
    });

    carouselTrack.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
    });

    carouselTrack.addEventListener('touchend', () => {
      if (!isDragging) return;
      
      const diff = startX - currentX;
      const threshold = 50;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      isDragging = false;
      startAutoPlay();
    });
  }

  // Event listeners
  function addEventListeners() {
    if (prevButton) {
      prevButton.addEventListener('click', () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
      });
    }

    // Pause auto-play on hover
    carouselTrack.addEventListener('mouseenter', stopAutoPlay);
    carouselTrack.addEventListener('mouseleave', startAutoPlay);

    // Handle window resize
    window.addEventListener('resize', updateCarousel);
  }

  // Initialize
  init();

  // Public API
  return {
    next: nextSlide,
    prev: prevSlide,
    goTo: goToSlide,
    pause: stopAutoPlay,
    play: startAutoPlay
  };
}

/**
 * -------------------------------------------------
 * 3. DOM Ready → Run both
 * -------------------------------------------------
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScripts();
  const carousel = initCarousel();
  
  // Optional: Expose to global scope if needed
  window.projectCarousel = carousel;

});

// Counting animation for stats
function startCountAnimation() {
  const counters = document.querySelectorAll('.count-up');
  
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const updateCount = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current) + '+';
        requestAnimationFrame(updateCount);
      } else {
        counter.textContent = target + '+';
      }
    };
    
    // Start animation when element is in viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          updateCount();
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(counter);
  });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  startCountAnimation();
  
  // Add hover-lift class to all enhanced cards
  document.querySelectorAll('.enhanced-card').forEach(card => {
    card.classList.add('hover-lift');
  });
});