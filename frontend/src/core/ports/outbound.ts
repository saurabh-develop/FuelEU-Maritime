import type { Route } from "../domain/models";

export interface RouteRepository {
  fetchRoutes(): Promise<Route[]>;
  setBaseline(id: number): Promise<void>;
  fetchComparison(): Promise<any>;
}
