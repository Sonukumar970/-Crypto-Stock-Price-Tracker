const API_URL = "https://api.coingecko.com/api/v3";

export async function fetchCoin(coin) {
  const res = await fetch(`${API_URL}/coins/${coin}`);
  if (!res.ok) throw new Error("Not found");
  return res.json();
}

export async function fetchHistory(coin) {
  const res = await fetch(
    `${API_URL}/coins/${coin}/market_chart?vs_currency=usd&days=7`
  );
  return res.json();
}

export async function fetchMarket() {
  const res = await fetch(
    `${API_URL}/coins/markets?vs_currency=usd&per_page=20`
  );
  return res.json();
}