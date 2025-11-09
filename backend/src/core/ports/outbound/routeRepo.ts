import { Route } from "../../domain/route";

export interface RouteRepository {
  getAll(): Promise<Route[]>;
  getBaseline(): Promise<Route | null>;
  getNonBaseline(): Promise<Route[]>;
  resetBaseline(): Promise<void>;
  updateBaseline(id: number): Promise<Route>;
  getByRouteId(routeId: string): Promise<Route | null>;
}
