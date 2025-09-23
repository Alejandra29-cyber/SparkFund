import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList
} from "recharts";

function DonationsChartAdvanced() {
  const [data, setData] = useState([]);
  const [totalGlobal, setTotalGlobal] = useState(0);
  const [topWallet, setTopWallet] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/donations/summary");
      const result = await response.json();

      // Convertir todos los 'total' a números
      const summary = result.summary.map(item => ({
        ...item,
        total: Number(item.total)
      }));

      setData(summary);
      setTotalGlobal(Number(result.totalGlobal) || 0);
      setTopWallet(result.topWallet ? { ...result.topWallet, total: Number(result.topWallet.total) } : null);
    } catch (err) {
      console.error("Error fetching donation data:", err);
    }
  };

  useEffect(() => {
    fetchData(); // primer fetch
    const interval = setInterval(fetchData, 5000); // actualizar cada 5 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: "100%", maxWidth: 800, margin: "0 auto" }}>
      <h2>Total global de donaciones: ${totalGlobal.toFixed(2)}</h2>
      {topWallet && topWallet.total !== undefined && (
        <h3>
          Wallet que más ha donado: {topWallet.wallet_address} (${topWallet.total.toFixed(2)})
        </h3>
      )}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="wallet_address" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Bar dataKey="total" fill="#82ca9d">
            <LabelList
  dataKey="total"
  position="top"
  formatter={(val, index) => {
    const wallet = data[index];
    if (!wallet) return `$${val.toFixed(2)}`;
    return wallet.wallet_address === topWallet?.wallet_address
      ? `🌟 $${val.toFixed(2)}`
      : `$${val.toFixed(2)}`;
  }}
/>

          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DonationsChartAdvanced;
