import type { Route } from "../../../domain/models";

interface Props {
  routes: Route[];
  onSetBaseline: (id: number) => Promise<void>;
}

export default function RouteTable({ routes, onSetBaseline }: Props) {
  return (
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th>Route</th>
          <th>Vessel</th>
          <th>Fuel</th>
          <th>Year</th>
          <th>GHG</th>
          <th>Fuel (t)</th>
          <th>Baseline</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {routes.map((r) => (
          <tr key={r.id} className="border-t">
            <td>{r.routeId}</td>
            <td>{r.vesselType}</td>
            <td>{r.fuelType}</td>
            <td>{r.year}</td>
            <td>{r.ghgIntensity}</td>
            <td>{r.fuelConsumption_t}</td>
            <td>{r.isBaseline ? "✅" : ""}</td>
            <td>
              <button
                className="bg-blue-600 text-white px-3 py-1 rounded"
                onClick={() => onSetBaseline(r.id)}
              >
                Set Baseline
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
