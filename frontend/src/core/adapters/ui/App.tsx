import { useState } from "react";
import RoutesPage from "./pages/RoutesPage";
import ComparePage from "./pages/ComparePage";
import BankingPage from "./pages/BankingPage";
import PoolingPage from "./pages/PoolingPage";

export default function App() {
  const [tab, setTab] = useState("Routes");
  const tabs = ["Routes", "Compare", "Banking", "Pooling"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">
        ⚓ FuelEU Maritime Dashboard
      </h1>

      <div className="flex gap-3 mb-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg shadow ${
              tab === t ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Routes" && <RoutesPage />}
      {tab === "Compare" && <ComparePage />}
      {tab === "Banking" && <BankingPage />}
      {tab === "Pooling" && <PoolingPage />}
    </div>
  );
}
