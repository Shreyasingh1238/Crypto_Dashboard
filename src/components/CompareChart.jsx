import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getChartData } from "../api/coingecko";

const CompareChart = ({ selectedCoins }) => {
  const [compareData, setCompareData] = useState([]);

  useEffect(() => {
    if (selectedCoins.length < 2) return;

    Promise.all(selectedCoins.map((coin) => getChartData(coin, 7))).then(
      (responses) => {
        const minLength = Math.min(
          ...responses.map((res) => res.data.prices.length)
        );

        const basePrices = responses.map(
          (res) => res.data.prices[0][1]
        );

        const merged = Array.from({ length: minLength }).map((_, idx) => {
          const point = {
            time: new Date(
              responses[0].data.prices[idx][0]
            ).toLocaleDateString(),
          };

          responses.forEach((res, i) => {
            const price = res.data.prices[idx][1];
            point[selectedCoins[i]] =
              ((price - basePrices[i]) / basePrices[i]) * 100;
          });

          return point;
        });

        setCompareData(merged);
      }
    );
  }, [selectedCoins]);

  if (selectedCoins.length < 2) {
    return (
      <p className="text-sm text-red-500">
        Select at least 2 coins to compare
      </p>
    );
  }

  return (
    <div className="p-6 rounded-2xl shadow-md bg-white text-gray-900 dark:bg-[#111827] dark:text-gray-100">
      <h3 className="font-semibold mb-4">Comparison Chart (% Growth)</h3>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={compareData}>
            <XAxis dataKey="time" />
            <YAxis hide />
            <Tooltip formatter={(v) => `${v.toFixed(2)}%`} />
            {selectedCoins.map((coin, index) => (
              <Line
                key={coin}
                type="monotone"
                dataKey={coin}
                stroke={
                  index === 0
                    ? "#60A5FA"
                    : index === 1
                    ? "#34D399"
                    : "#F87171"
                }
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompareChart;
