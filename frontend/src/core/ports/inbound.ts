export interface DashboardController {
  loadRoutes(): Promise<void>;
  handleBaseline(routeId: number): Promise<void>;
}
