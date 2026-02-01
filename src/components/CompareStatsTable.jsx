import { useEffect, useState } from "react";
import { getTopCoins } from "../api/coingecko";

const CompareStatsTable = ({ selectedCoins }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getTopCoins().then((res) => {
      setData(
        res.data.filter((coin) => selectedCoins.includes(coin.id))
      );
    });
  }, [selectedCoins]);

  return (
    <div className="p-6 rounded-2xl shadow bg-white text-gray-900 dark:bg-[#111827] dark:text-gray-100">
      <h3 className="font-semibold mb-4">Comparison Statistics</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="text-left py-2">Coin</th>
            <th className="text-left py-2">Price</th>
            <th className="text-left py-2">7d Change</th>
            <th className="text-left py-2">Market Cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coin) => (
            <tr key={coin.id} className="border-b dark:border-gray-700">
              <td className="py-2">{coin.name}</td>
              <td className="py-2">${coin.current_price}</td>
              <td
                className={`py-2 ${
                  coin.price_change_percentage_7d_in_currency >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {coin.price_change_percentage_7d_in_currency?.toFixed(2)}%
              </td>
              <td className="py-2">
                ${coin.market_cap.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompareStatsTable;
