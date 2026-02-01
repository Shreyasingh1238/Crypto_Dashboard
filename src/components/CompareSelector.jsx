const COINS = [
  { id: "bitcoin", name: "Bitcoin" },
  { id: "ethereum", name: "Ethereum" },
  { id: "solana", name: "Solana" },
  { id: "cardano", name: "Cardano" },
  { id: "binancecoin", name: "BNB" }, 
];


const CompareSelector = ({ selectedCoins, setSelectedCoins }) => {
  const toggleCoin = (coinId) => {
    if (selectedCoins.includes(coinId)) {
      setSelectedCoins(selectedCoins.filter((id) => id !== coinId));
    } else {
      if (selectedCoins.length < 3) {
        setSelectedCoins([...selectedCoins, coinId]);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-[#111827] p-4 rounded-2xl shadow">
      <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
        Compare Cryptocurrencies (Select up to 3)
      </h3>

      <div className="flex gap-4 flex-wrap">
        {COINS.map((coin) => (
          <label
            key={coin.id}
            className="flex items-center gap-2 cursor-pointer
            text-gray-700 dark:text-gray-300"
          >
            <input
              type="checkbox"
              checked={selectedCoins.includes(coin.id)}
              onChange={() => toggleCoin(coin.id)}
            />
            {coin.name}
          </label>
        ))}
      </div>

      {selectedCoins.length < 2 && (
        <p className="text-xs text-red-500 mt-2">
          Please select at least 2 coins to compare
        </p>
      )}
    </div>
  );
};

export default CompareSelector;
