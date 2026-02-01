import { useEffect, useState } from "react";
import { getTopCoins } from "../api/coingecko";
import CryptoCard from "./CryptoCard";

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(30);

  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    changeType: "all",
  });

  const fetchMarketData = () => {
    setLoading(true);
    getTopCoins()
      .then((res) => {
        setCoins(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchMarketData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          fetchMarketData();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const filteredCoins = coins.filter((coin) => {
    const price = coin.current_price;
    const change = coin.price_change_percentage_24h;

    if (filters.minPrice && price < filters.minPrice) return false;
    if (filters.maxPrice && price > filters.maxPrice) return false;
    if (filters.changeType === "gain" && change < 0) return false;
    if (filters.changeType === "loss" && change > 0) return false;

    return true;
  });

  if (loading && coins.length === 0) {
    return <p className="text-gray-500">Loading prices...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        🔄 Auto refresh in <span className="font-semibold">{timer}s</span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end p-4 rounded-xl shadow bg-white text-gray-900 dark:bg-[#111827] dark:text-gray-100">
        <div>
          <label className="text-xs text-gray-500">Min Price ($)</label>
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: e.target.value })
            }
            className="block mt-1 px-3 py-1 rounded border
            bg-white text-gray-900
            dark:bg-[#0B1220] dark:text-gray-100
            border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">Max Price ($)</label>
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: e.target.value })
            }
            className="block mt-1 px-3 py-1 rounded border
            bg-white text-gray-900
            dark:bg-[#0B1220] dark:text-gray-100
            border-gray-300 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="text-xs text-gray-500">% Change</label>
          <select
            value={filters.changeType}
            onChange={(e) =>
              setFilters({ ...filters, changeType: e.target.value })
            }
            className="block mt-1 px-3 py-1 rounded border
            bg-white text-gray-900
            dark:bg-[#0B1220] dark:text-gray-100
            border-gray-300 dark:border-gray-600"
          >
            <option value="all">All</option>
            <option value="gain">Gainers</option>
            <option value="loss">Losers</option>
          </select>
        </div>

        <button
          onClick={() =>
            setFilters({ minPrice: "", maxPrice: "", changeType: "all" })
          }
          className="px-4 py-1 text-sm rounded-full
          bg-gray-200 text-gray-800
          dark:bg-gray-700 dark:text-gray-200
          hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Clear Filters
        </button>
      </div>

      {filteredCoins.length === 0 ? (
        <p className="text-sm text-red-500">
          No coins match the selected filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {filteredCoins.map((coin) => (
            <CryptoCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoList;
