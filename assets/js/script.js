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
