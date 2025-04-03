import { useState } from "react";

export default function TradeModal({ isOpen, onClose, onTrade }) {
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderType, setOrderType] = useState("BUY");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    onTrade({ symbol, quantity, orderType });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Place Trade</h2>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <select value={orderType} onChange={(e) => setOrderType(e.target.value)}>
          <option value="BUY">BUY</option>
          <option value="SELL">SELL</option>
        </select>
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
