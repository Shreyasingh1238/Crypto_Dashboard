import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Brush,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#0B1220] p-3 rounded-lg shadow text-sm">
        <p className="text-gray-500 dark:text-gray-400">{label}</p>
        <p className="font-semibold text-gray-900 dark:text-gray-100">
          ${payload[0].value.toFixed(2)}
        </p>
      </div>
    );
  }
  return null;
};

const PriceChart = ({ data, days }) => {
  const [resetKey, setResetKey] = useState(0);

  if (!data || data.length === 0) {
    return (
      <div className="p-6 rounded-2xl shadow-md
        bg-white dark:bg-[#111827]
        border border-gray-200 dark:border-gray-700"
      >
        <p className="text-center text-gray-500 dark:text-gray-400">
          Loading chart data...
        </p>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-2xl shadow-md
      bg-white dark:bg-[#111827]
      border border-gray-200 dark:border-gray-700"
    >
      <h2 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Bitcoin price movement (last {days === 1 ? "24 hours" : `${days} days`})
      </h2>

      <button
        onClick={() => setResetKey((prev) => prev + 1)}
        className="mb-4 px-3 py-1 text-xs rounded border
        bg-gray-100 dark:bg-[#0B1220]
        text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        Reset Zoom
      </button>

      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <LineChart key={resetKey} data={data}>
            <XAxis dataKey="time" hide />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="price"
              stroke="#60A5FA"
              strokeWidth={2}
              dot={false}
            />

            <Brush
              dataKey="time"
              height={20}
              stroke="#60A5FA"
              travellerWidth={10}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
