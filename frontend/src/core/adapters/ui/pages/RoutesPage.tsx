import { useEffect, useState } from "react";
import { api } from "../../infrastructure/apiClient";
import type { Route } from "../../../domain/models";
import RouteTable from "../components/RouteTable";

export default function RoutesPage() {
  const [routes, setRoutes] = useState<Route[]>([]);

  const load = async () => {
    const data = await api.getRoutes();
    setRoutes(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">Routes</h2>
      <RouteTable
        routes={routes}
        onSetBaseline={async (id) => {
          await api.setBaseline(id);
          await load();
        }}
      />
    </div>
  );
}
