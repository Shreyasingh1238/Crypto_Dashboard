import { useEffect, useState } from "react";
import axios from "axios";

const CompareStatsTable = ({ selectedCoins }) => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedCoins || selectedCoins.length === 0) return;

    setLoading(true);

    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: selectedCoins.join(","),
          price_change_percentage: "7d",
        },
      })
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedCoins]);

  if (loading) {
    return <p className="text-sm text-gray-400">Loading statistics...</p>;
  }

  return (
    <div className="bg-[#0B1220] p-6 rounded-2xl shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-white">
        Comparison Statistics
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-gray-300">
              <th className="py-3 text-left">Coin</th>
              <th className="py-3 text-left">Price</th>
              <th className="py-3 text-left">7d Change</th>
              <th className="py-3 text-left">Market Cap</th>
            </tr>
          </thead>

          <tbody>
            {stats.map((coin) => (
              <tr
                key={coin.id}
                className="border-b border-gray-800 hover:bg-[#111827]"
              >
                <td className="py-3 text-white font-medium">
                  {coin.name}
                </td>

                <td className="py-3 text-gray-300">
                  ${coin.current_price.toLocaleString()}
                </td>

                <td
                  className={`py-3 font-semibold ${
                    coin.price_change_percentage_7d_in_currency >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
                </td>

                <td className="py-3 text-gray-300">
                  ${coin.market_cap.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareStatsTable;
