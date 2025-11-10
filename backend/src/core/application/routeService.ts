import { RouteRepository } from "../ports/outbound/routeRepo";
import {
  computeComplianceBalance,
  TARGET_INTENSITY,
} from "../domain/compliance";

export class RouteService {
  constructor(private routeRepo: RouteRepository) {}

  async listRoutes() {
    return this.routeRepo.getAll();
  }

  async setBaseline(id: number) {
    await this.routeRepo.resetBaseline();
    return this.routeRepo.updateBaseline(id);
  }

  async getComparison() {
    const baseline = await this.routeRepo.getBaseline();
    if (!baseline) throw new Error("No baseline route set");

    const others = await this.routeRepo.getNonBaseline();

    const comparison = others.map((r) => ({
      ...r,
      percentDiff: (r.ghgIntensity / baseline.ghgIntensity - 1) * 100,
      compliant: r.ghgIntensity <= TARGET_INTENSITY,
    }));

    return { baseline, comparison };
  }

  async computeCB(routeId: string) {
    const route = await this.routeRepo.getByRouteId(routeId);
    if (!route) throw new Error("Route not found");
    return computeComplianceBalance(
      route.ghgIntensity,
      route.fuelConsumption_t
    );
  }
}
