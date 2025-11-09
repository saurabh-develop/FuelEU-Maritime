import { useEffect, useState } from "react";
import { api } from "../../infrastructure/apiClient";
import CompareChart from "../components/CompareChart";

export default function ComparePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    api.getComparison().then(setData);
  }, []);

  if (!data) return <p>Loading comparison...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Compare Routes</h2>
      <table className="table-auto w-full mb-6">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th>Route</th>
            <th>GHG Intensity</th>
            <th>% Diff</th>
            <th>Compliant</th>
          </tr>
        </thead>
        <tbody>
          {data.comparison.map((r: any) => (
            <tr key={r.id} className="border-t">
              <td>{r.routeId}</td>
              <td>{r.ghgIntensity.toFixed(2)}</td>
              <td>{r.percentDiff.toFixed(2)}%</td>
              <td>{r.compliant ? "✅" : "❌"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <CompareChart baseline={data.baseline} routes={data.comparison} />
    </div>
  );
}
