import { useState, useEffect } from "react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/portfolio/")
      .then((res) => res.json())
      .then((data) => setPortfolio(data))
      .catch((err) => console.error("Error fetching portfolio data:", err));
  }, []);

  if (!portfolio) return <p>Loading portfolio...</p>;

  return (
    <div>
      <h2>📊 Portfolio Performance</h2>
      <p><strong>Total Invested:</strong> ₹{portfolio.total_invested}</p>
      <p><strong>Portfolio Value:</strong> ₹{portfolio.portfolio_value}</p>
      <p>
        <strong>Profit/Loss:</strong>{" "}
        <span style={{ color: portfolio.profit_loss >= 0 ? "green" : "red" }}>
          ₹{portfolio.profit_loss}
        </span>
      </p>

      <h3>📌 Holdings</h3>
      <ul>
        {portfolio.holdings.map((h) => (
          <li key={h.symbol}>
            {h.symbol}: {h.quantity} shares @ ₹{h.avg_price} | 
            Live: ₹{h.live_price} | P/L: ₹{h.profit_loss}
          </li>
        ))}
      </ul>
    </div>
  );
}
