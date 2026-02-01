import axios from "axios";

const api = axios.create({
  baseURL: "https://api.coingecko.com/api/v3",
});

/* =====================
   DASHBOARD TOP CARDS
===================== */
export const getTopCoins = () =>
  api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      order: "market_cap_desc",
      per_page: 5,
      page: 1,
      price_change_percentage: "24h",
    },
  });

/* =====================
   SINGLE COIN CHART
===================== */
export const getChartData = (id, days = 7) =>
  api.get(`/coins/${id}/market_chart`, {
    params: {
      vs_currency: "usd",
      days,
    },
  });

/* =====================
   COMPARISON STATS TABLE
===================== */
export const getComparisonStats = (coinIds) =>
  api.get("/coins/markets", {
    params: {
      vs_currency: "usd",
      ids: coinIds.join(","),
      price_change_percentage: "7d",
    },
  });
