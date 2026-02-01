import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getChartData } from "../api/coingecko";

import Header from "../components/Header";
import CryptoList from "../components/CryptoList";
import PriceChart from "../components/PriceChart";
import CompareSelector from "../components/CompareSelector";
import CompareChart from "../components/CompareChart";
import CompareStatsTable from "../components/CompareStatsTable";

const Dashboard = () => {
  const { darkMode } = useContext(ThemeContext);

  // Single coin chart
  const [chartData, setChartData] = useState([]);
  const [days, setDays] = useState(7);

  // Comparison
  const [selectedCoins, setSelectedCoins] = useState([
    "bitcoin",
    "ethereum",
  ]);

  useEffect(() => {
    getChartData("bitcoin", days).then((res) => {
      const formatted = res.data.prices.map((item) => ({
        time: new Date(item[0]).toLocaleDateString(),
        price: item[1],
      }));
      setChartData(formatted);
    });
  }, [days]);

  return (
    <>
      <Header />

      <main
        className={
          "min-h-screen px-4 sm:px-6 py-6 space-y-8 transition-colors " +
          (darkMode
            ? "bg-[#0B1220] text-gray-100"
            : "bg-gray-100 text-gray-900")
        }
      >
        {/* Top crypto cards */}
        <CryptoList />

        {/* Time range buttons */}
        <div className="flex gap-2">
          {[1, 7, 30].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={
                "px-4 py-1 rounded-full text-sm border transition " +
                (days === d
                  ? "bg-blue-600 text-white border-blue-600"
                  : darkMode
                  ? "bg-[#0B1220] text-gray-300 border-gray-600 hover:bg-gray-700"
                  : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100")
              }
            >
              {d === 1 ? "24h" : d + "d"}
            </button>
          ))}
        </div>

        {/* Single coin chart */}
        <PriceChart data={chartData} days={days} />

        {/* Comparison section */}
        <section className="space-y-6">
          <CompareSelector
            selectedCoins={selectedCoins}
            setSelectedCoins={setSelectedCoins}
          />

          <CompareChart selectedCoins={selectedCoins} />

          <div className="overflow-x-auto">
            <CompareStatsTable selectedCoins={selectedCoins} />
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
