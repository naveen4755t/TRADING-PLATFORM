import { useState, useEffect } from "react";
import TradeModal from "../components/TradeModal";

export default function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrade, setSelectedTrade] = useState(null);

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/holdings/");
        const data = await res.json();
        if (data.holdings) {
          setHoldings(data.holdings);
        } else {
          console.error("Invalid holdings data", data);
        }
      } catch (err) {
        console.error("Error fetching holdings:", err);
      }
    };
    fetchHoldings();
  }, []);

  const handleTrade = (trade) => {
    setSelectedTrade(trade);
    setIsModalOpen(true);
  };

  const submitTrade = async ({ symbol, quantity, orderType }) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/trade/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symbol, quantity, order_type: orderType }),
      });

      const data = await res.json();
      if (data.success) {
        alert(`${orderType} Order Placed Successfully!`);
        setIsModalOpen(false);
      } else {
        alert("Trade failed: " + data.error);
      }
    } catch (err) {
      console.error("Trade error:", err);
      alert("Trade request failed.");
    }
  };

  return (
    <div>
      <h2>Your Holdings</h2>
      {holdings.length > 0 ? (
        <ul>
          {holdings.map((stock, index) => (
            <li key={index}>
              {stock.symbol}: {stock.quantity} shares @ ₹{stock.avg_price}
              <button onClick={() => handleTrade({ symbol: stock.symbol, orderType: "BUY" })}>
                Buy
              </button>
              <button onClick={() => handleTrade({ symbol: stock.symbol, orderType: "SELL" })}>
                Sell
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No holdings available.</p>
      )}

      <TradeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onTrade={submitTrade} 
      />
    </div>
  );
}
