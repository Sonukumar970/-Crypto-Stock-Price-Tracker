async function loadComponent(id, file) {
  try {
    const res = await fetch(file);
    const html = await res.text();

    document.getElementById(id).innerHTML = html;

    // Apply theme immediately after header loads
    applySavedTheme();

  } catch (err) {
    console.error("Component load error:", err);
  }
}

/* =========================
   APPLY SAVED THEME
========================= */
function applySavedTheme() {
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  updateToggleIcon();
}

/* =========================
   EVENT DELEGATION (🔥 KEY)
========================= */
document.addEventListener("click", (e) => {
  if (e.target.id === "darkToggle") {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateToggleIcon();
  }
});

/* =========================
   ICON UPDATE
========================= */
function updateToggleIcon() {
  const btn = document.getElementById("darkToggle");

  if (!btn) return;

  btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
}

/* =========================
   LOAD COMPONENTS
========================= */
loadComponent("header", "../components/header.html");
loadComponent("footer", "../components/footer.html");