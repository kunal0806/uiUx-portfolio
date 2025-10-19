console.log("here");
const btn = document.getElementById("contact-btn");
console.log(btn);

if (btn) {
  btn.addEventListener("click", () => {
    btn.classList.add("scale-105");
    setTimeout(() => {
      btn.classList.remove("scale-105");
      window.location.href = "./contact.html";
    }, 150);
  });
}

AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true,
});
