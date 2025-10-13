// Load HTML components dynamically
async function loadComponent(selector, file) {
    const el = document.querySelector(selector);
    if (!el) return;
    const response = await fetch(file);
    const text = await response.text();
    el.innerHTML = text;
  
    // Example: dynamic logo
    const logoEl = document.getElementById('header-logo');
    if (logoEl) logoEl.src = constants.logo;
  }
  
  // DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    loadComponent('#header-placeholder', 'components/header.html');
    loadComponent('#footer-placeholder', 'components/footer.html');
  
    // Animate reveal elements
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => {
      el.classList.add('opacity-0', 'translate-y-10');
      setTimeout(() => {
        el.classList.remove('opacity-0', 'translate-y-10');
        el.classList.add('transition', 'duration-700', 'opacity-100', 'translate-y-0');
      }, 100);
    });
  });
  