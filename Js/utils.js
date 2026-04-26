export function loadFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

export function saveFavorite(coin) {
  const favs = loadFavorites();
  if (!favs.find(f => f.id === coin.id)) {
    favs.push(coin);
  }
  localStorage.setItem("favorites", JSON.stringify(favs));
}

export function usdToInr(usd) {
  return (usd * 83).toFixed(2);
}

export function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
}

export function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}