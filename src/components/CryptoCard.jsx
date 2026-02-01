// import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const CryptoCard = ({ coin }) => {
  const isPositive = coin.price_change_percentage_24h >= 0;

  return (
    <div
      className="
        bg-white dark:bg-[#111827]
        border border-gray-200 dark:border-gray-700
        rounded-2xl p-4
        transition hover:shadow-md
      "
    >
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-8 h-8" />
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          {coin.name}
        </h3>
      </div>

      <p className="mt-3 text-xl font-bold text-gray-900 dark:text-gray-100">
        ${coin.current_price.toLocaleString()}
      </p>

      <p
        className={`text-sm font-medium ${
          isPositive ? "text-green-500" : "text-red-500"
        }`}
      >
        {isPositive ? "+" : ""}
        {coin.price_change_percentage_24h.toFixed(2)}%
      </p>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Market Cap: ${coin.market_cap.toLocaleString()}
      </p>
    </div>
  );
};

export default CryptoCard;
