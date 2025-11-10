import { useState, useEffect } from "react";
import { api } from "../../infrastructure/apiClient";

export default function BankingPage() {
  const [shipId, setShipId] = useState("R001");
  const [year, setYear] = useState(2024);
  const [records, setRecords] = useState<any[]>([]);
  const [available, setAvailable] = useState<number>(0);
  const [cb, setCb] = useState<number>(0);
  const [applyAmt, setApplyAmt] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const load = async () => {
    const rec = await api.getBankingRecords(shipId, year);
    const avail = await api.getAvailableBank(shipId, year);
    setRecords(rec);
    setAvailable(avail.available);
  };

  useEffect(() => {
    load();
  }, [shipId, year]);

  const handleBank = async () => {
    try {
      await api.bankCB(shipId, year, cb);
      setMessage("✅ Banked successfully");
      load();
    } catch (e: any) {
      setMessage("❌ " + e.response?.data?.error);
    }
  };

  const handleApply = async () => {
    try {
      await api.applyBankedCB(shipId, year, applyAmt);
      setMessage("✅ Applied successfully");
      load();
    } catch (e: any) {
      setMessage("❌ " + e.response?.data?.error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">💰 Banking (Article 20)</h2>

      <div className="flex gap-4 mb-4">
        <input
          value={shipId}
          onChange={(e) => setShipId(e.target.value)}
          placeholder="Ship ID"
          className="border p-2 rounded"
        />
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border p-2 rounded w-24"
        />
      </div>

      <p className="mb-2">
        Available CB: <strong>{available.toFixed(2)} tCO₂</strong>
      </p>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          placeholder="CB to bank"
          value={cb}
          onChange={(e) => setCb(Number(e.target.value))}
          className="border p-2 rounded w-32"
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={cb <= 0}
          onClick={handleBank}
        >
          Bank CB
        </button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <input
          type="number"
          placeholder="Apply amount"
          value={applyAmt}
          onChange={(e) => setApplyAmt(Number(e.target.value))}
          className="border p-2 rounded w-32"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={available <= 0 || applyAmt <= 0}
          onClick={handleApply}
        >
          Apply Banked CB
        </button>
      </div>

      {message && <p className="mb-3 text-sm text-gray-700">{message}</p>}

      <h3 className="text-lg font-semibold mt-6 mb-2">Records</h3>
      <table className="table-auto w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Year</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{r.type}</td>
              <td className="p-2">{r.amount}</td>
              <td className="p-2">{r.year}</td>
              <td className="p-2">{new Date(r.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
