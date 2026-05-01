// ==========================
// LOAD HEADER
// ==========================
fetch("./components/header.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;

    // 🔥 Header load hone ke baad toggle setup karo
    setupToggle();
  });


// ==========================
// LOAD FOOTER
// ==========================
fetch("./components/footer.html")
  .then(res => res.text())
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  });


// ==========================
// DARK MODE FUNCTION
// ==========================
function setupToggle() {
  const toggle = document.getElementById("darkToggle");

  // 🔥 Page load par theme apply karo
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  // 🔥 Toggle click event
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }
}