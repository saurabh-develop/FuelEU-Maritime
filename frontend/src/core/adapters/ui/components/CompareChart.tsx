import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function CompareChart({ baseline, routes }: any) {
  const data = routes.map((r: any) => ({
    name: r.routeId,
    baseline: baseline.ghgIntensity,
    comparison: r.ghgIntensity,
  }));

  return (
    <BarChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="baseline" fill="#8884d8" name="Baseline" />
      <Bar dataKey="comparison" fill="#82ca9d" name="Comparison" />
    </BarChart>
  );
}
