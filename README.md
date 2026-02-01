# 🚀 Crypto Dashboard – Interactive Data Visualization

## 📌 Project Overview
Crypto Dashboard is a modern, responsive web application that displays real-time cryptocurrency data using interactive charts, comparison tools, and filters.

The goal of this project is to provide a clean, user-friendly interface for tracking crypto prices, trends, and comparisons while following scalable frontend architecture.

---

## 🌐 Live Demo

👉 https://crypto-dashboard-ten-delta.vercel.app


## ✨ Features
- 📊 Live cryptocurrency prices (auto-refresh every 30 seconds)
- 📈 Interactive price chart (24h / 7d / 30d)
- 🔍 Zoom & reset functionality on charts
- 🔄 Compare up to 3 cryptocurrencies
- 📉 Percentage growth comparison chart
- 📋 Comparison statistics table
- 🎛️ Filters:
  - Price range filter
  - Gainers / Losers filter
  - Clear active filters
- 🌗 Dark & Light mode toggle
- 📱 Fully responsive (mobile, tablet, desktop)

---

## 🧑‍💻 Tech Stack Used

### Frontend
- **React.js** – UI library for building component-based interfaces
- **Vite** – Fast development build tool
- **Tailwind CSS** – Utility-first CSS framework for styling
- **Recharts** – Charting library for data visualization

### State Management
- **React Hooks** (`useState`, `useEffect`)
- **Context API** – for global theme (dark/light mode)

### API
- **CoinGecko API** – for real-time cryptocurrency market data

### Tools & Platform
- **Git & GitHub** – version control
- **Vercel / Netlify** – deployment & hosting

---

## 📂 Project Folder Structure

```text
crypto-dashboard/
│
├── public/
│   └── vite.svg
│
├── src/
│   ├── api/
│   │   └── coingecko.js        # API calls
│   │
│   ├── components/
│   │   ├── CryptoCard.jsx
│   │   ├── CryptoList.jsx
│   │   ├── PriceChart.jsx
│   │   ├── CompareChart.jsx
│   │   ├── CompareSelector.jsx
│   │   ├── CompareStatsTable.jsx
│   │   └── Header.jsx
│   │
│   ├── context/
│   │   └── ThemeContext.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
