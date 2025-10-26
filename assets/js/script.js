function initHeaderScripts() {
  console.log("Header loaded ✅");

  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const contactBtn = document.getElementById("contact-btn");
  const mobileContactBtn = document.getElementById("mobile-contact-btn");

  if (!menuBtn || !mobileMenu) {
    console.error("Header elements not found");
    return;
  }

  // Hamburger open
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  // Close button
  closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    document.body.style.overflow = "auto";
  });

  // Contact buttons
  const goContact = () => (window.location.href = "./contact.html");
  if (contactBtn) contactBtn.addEventListener("click", goContact);
  if (mobileContactBtn) mobileContactBtn.addEventListener("click", goContact);
}
  const images = [
    "./assets/images/projects/Maplecode-Thumbnail.png",
    "./assets/images/projects/101-Thumbnail.png",
    "./assets/images/projects/campaign.png",
  ];
  let current = 1;
  const left = document.getElementById("leftImg");
  const center = document.getElementById("centerImg");
  const right = document.getElementById("rightImg");

  function fadeTransition(element, newSrc) {
    element.classList.add("opacity-0", "scale-95");
    setTimeout(() => {
      element.src = newSrc;
      element.classList.remove("opacity-0");
      setTimeout(() => {
        element.classList.remove("scale-95");
      }, 50);
    }, 300);
  }

  function updateImages() {
    fadeTransition(left, images[(current - 1 + images.length) % images.length]);
    fadeTransition(center, images[current % images.length]);
    fadeTransition(right, images[(current + 1) % images.length]);
  }

  function nextSlide() {
    current = (current + 1) % images.length;
    updateImages();
  }

  updateImages();
  setInterval(nextSlide, 3500);
