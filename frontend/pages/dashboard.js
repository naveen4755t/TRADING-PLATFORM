import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";  
import TradeModal from "../components/TradeModal";

const Dashboard = () => {
  const router = useRouter();
  const [holdings, setHoldings] = useState([]);
  const [orders, setOrders] = useState([]);
  const [portfolioMetrics, setPortfolioMetrics] = useState({
    totalInvested: 0,
    profitLoss: 0,
    portfolioValue: 0
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);

  // Fetch holdings data
  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/holdings");
        const data = await response.json();
        console.log("Holdings Data:", data); // Debugging
        setHoldings(Array.isArray(data.holdings) ? data.holdings : []);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      }
    };
    fetchHoldings();
  }, []);

  // Fetch order history data
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/orders");
        const data = await response.json();
        console.log("Order History Data:", data); // Debugging
        setOrders(Array.isArray(data.orders) ? data.orders : []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Fetch portfolio metrics based on holdings
  useEffect(() => {
    const calculatePortfolioMetrics = () => {
      let totalInvested = 0;
      let portfolioValue = 0;

      holdings.forEach((holding) => {
        const { avg_price, quantity } = holding;
        totalInvested += avg_price * quantity;
        portfolioValue += avg_price * quantity;
      });

      setPortfolioMetrics({
        totalInvested,
        profitLoss: portfolioValue - totalInvested,
        portfolioValue
      });
    };

    calculatePortfolioMetrics();
  }, [holdings]);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Portfolio Dashboard</h1>

      {/* Logout Button */}
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mb-4">
        Logout
      </button>

      {/* Holdings Table */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Your Holdings</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Symbol</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Avg Price</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length > 0 ? (
              holdings.map((holding) => (
                <tr key={holding.symbol}>
                  <td className="border border-gray-300 p-2">{holding.symbol}</td>
                  <td className="border border-gray-300 p-2">{holding.quantity}</td>
                  <td className="border border-gray-300 p-2">{holding.avg_price}</td>
                  <td className="border border-gray-300 p-2">
                    <button
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                      onClick={() => {
                        setSelectedStock(holding);
                        setModalOpen(true);
                      }}
                    >
                      Buy/Sell
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2">No holdings available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Portfolio Metrics Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Portfolio Performance</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { name: "Total Invested", value: portfolioMetrics.totalInvested },
              { name: "Portfolio Value", value: portfolioMetrics.portfolioValue },
              { name: "Profit/Loss", value: portfolioMetrics.profitLoss }
            ]}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Order History */}
      <div className="mb-6">
        <h2 className="text-xl font-medium mb-2">Order History</h2>
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Symbol</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Quantity</th>
              <th className="border border-gray-300 p-2">Order Type</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td className="border border-gray-300 p-2">{order.symbol}</td>
                  <td className="border border-gray-300 p-2">{order.price}</td>
                  <td className="border border-gray-300 p-2">{order.quantity}</td>
                  <td className="border border-gray-300 p-2">{order.type}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-2">No order history available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Buy/Sell Trade Modal */}
      {modalOpen && selectedStock && <TradeModal stock={selectedStock} onClose={() => setModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;
