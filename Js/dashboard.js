import { fetchCoin, fetchHistory, fetchMarket } from "./api.js";
import { saveFavorite, loadFavorites, usdToInr, toggleTheme, loadTheme } from "./utils.js";

const search = document.getElementById("search");
const results = document.getElementById("results");
const favList = document.getElementById("favList");
const loader = document.getElementById("loader");

const usdInput = document.getElementById("usdInput");
const inrOutput = document.getElementById("inrOutput");

const gainersDiv = document.getElementById("gainers");
const losersDiv = document.getElementById("losers");

let chart;

/* =========================
   LOADER FUNCTIONS
========================= */
function showLoader() {
  if (loader) loader.style.display = "block";
}

function hideLoader() {
  if (loader) loader.style.display = "none";
}

/* =========================
   SEARCH
========================= */
if (search) {
  search.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      const coin = search.value.toLowerCase();
      if (!coin) return;

      try {
        showLoader();
        const data = await fetchCoin(coin);
        renderResult(data);
        renderChart(coin);
      } catch {
        results.innerHTML = `<p class="error">Coin not found</p>`;
      } finally {
        hideLoader();
      }
    }
  });
}

/* =========================
   RENDER RESULT
========================= */
function renderResult(data) {
  results.innerHTML = `
    <div class="card">
      <img src="${data.image.small}">
      <h2>${data.name}</h2>
      <p>Price: ₹${usdToInr(data.market_data.current_price.usd)}</p>
      <p>24h: ${data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <button id="favBtn">⭐ Add to Favorites</button>
    </div>
  `;

  const favBtn = document.getElementById("favBtn");
  if (favBtn) {
    favBtn.onclick = () => {
      saveFavorite({ id: data.id, name: data.name });
      renderFavorites();
    };
  }
}

/* =========================
   CHART
========================= */
async function renderChart(coin) {
  const history = await fetchHistory(coin);
  const ctx = document.getElementById("priceChart");

  if (!ctx) return;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.prices.map(p =>
        new Date(p[0]).toLocaleDateString()
      ),
      datasets: [{
        label: coin,
        data: history.prices.map(p => p[1]),
        borderColor: "#007BFF",
        fill: false
      }]
    }
  });
}

/* =========================
   FAVORITES
========================= */
function renderFavorites() {
  const favs = loadFavorites();

  if (!favList) return;

  favList.innerHTML = favs.map(f => `
    <li onclick="loadCoin('${f.id}')">${f.name}</li>
  `).join("");
}

window.loadCoin = async function (coin) {
  try {
    showLoader();
    const data = await fetchCoin(coin);
    renderResult(data);
    renderChart(coin);
  } finally {
    hideLoader();
  }
};

/* =========================
   CONVERTER
========================= */
if (usdInput) {
  usdInput.addEventListener("input", () => {
    if (!usdInput.value) {
      inrOutput.innerText = "";
      return;
    }

    inrOutput.innerText = `₹${usdToInr(usdInput.value)}`;
  });
}

/* =========================
   TRENDS (GAINERS / LOSERS)
========================= */
async function loadTrends() {
  const coins = await fetchMarket();

  const sorted = coins.sort(
    (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h
  );

  if (gainersDiv) {
    gainersDiv.innerHTML = sorted.slice(0, 3).map(c => `
      <div class="card">${c.name} +${c.price_change_percentage_24h.toFixed(2)}%</div>
    `).join("");
  }

  if (losersDiv) {
    losersDiv.innerHTML = sorted.slice(-3).map(c => `
      <div class="card">${c.name} ${c.price_change_percentage_24h.toFixed(2)}%</div>
    `).join("");
  }
}

/* =========================
   THEME (FIXED 🔥)
========================= */
function initThemeToggle() {
  const toggle = document.getElementById("darkToggle") || document.getElementById("themeToggle");

  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }
}

/* Wait for header load */
// setTimeout(initThemeToggle, 300);

// loadTheme();

/* =========================
   INIT
========================= */
renderFavorites();
loadTrends();