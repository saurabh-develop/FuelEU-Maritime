import { useState } from "react";
import { api } from "../../infrastructure/apiClient";

export default function PoolingPage() {
  const [year, setYear] = useState(2024);
  const [members, setMembers] = useState<
    { shipId: string; cb_before: number }[]
  >([
    { shipId: "R001", cb_before: 100 },
    { shipId: "R002", cb_before: -40 },
  ]);
  const [result, setResult] = useState<any>(null);
  const [message, setMessage] = useState("");

  const handleAdd = () =>
    setMembers([...members, { shipId: "", cb_before: 0 }]);

  const handleChange = (i: number, field: string, value: any) => {
    const updated = [...members];
    updated[i] = {
      ...updated[i],
      [field]: field === "cb_before" ? Number(value) : value,
    };
    setMembers(updated);
  };

  const handleCreate = async () => {
    try {
      const res = await api.createPool(year, members);
      setResult(res);
      setMessage("✅ Pool created successfully");
    } catch (e: any) {
      setMessage("❌ " + e.response?.data?.error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">⚓ Pooling (Article 21)</h2>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border p-2 rounded w-24"
        />
        <button
          onClick={handleAdd}
          className="bg-gray-200 rounded px-3 py-1 hover:bg-gray-300"
        >
          + Add Member
        </button>
      </div>

      <table className="table-auto w-full mb-4">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Ship ID</th>
            <th className="p-2">CB Before</th>
          </tr>
        </thead>
        <tbody>
          {members.map((m, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">
                <input
                  value={m.shipId}
                  onChange={(e) => handleChange(i, "shipId", e.target.value)}
                  className="border p-1 rounded w-32"
                />
              </td>
              <td className="p-2">
                <input
                  type="number"
                  value={m.cb_before}
                  onChange={(e) => handleChange(i, "cb_before", e.target.value)}
                  className="border p-1 rounded w-24"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={members.length < 2}
      >
        Create Pool
      </button>

      {message && <p className="mt-3">{message}</p>}

      {result && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Result</h3>
          <p className="mb-2">Sum CB: {result.sumCB.toFixed(2)}</p>
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Ship ID</th>
                <th className="p-2">CB Before</th>
                <th className="p-2">CB After</th>
              </tr>
            </thead>
            <tbody>
              {result.members.map((m: any, i: number) => (
                <tr key={i} className="border-t">
                  <td className="p-2">{m.shipId}</td>
                  <td className="p-2">{m.cb_before}</td>
                  <td
                    className={`p-2 ${
                      m.cb_after < 0 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {m.cb_after.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
