document.addEventListener("DOMContentLoaded", async () => {
  const basePath = "components/";

  const include = async (selector, file, callback) => {
    const el = document.querySelector(selector);
    if (el) {
      const res = await fetch(basePath + file);
      const html = await res.text();
      el.innerHTML = html;
      if (callback) callback(); // Run callback AFTER header loads
    }
  };

  include("header", "header.html", initHeaderScripts);
  include("footer", "footer.html");
});
