import type { Route } from "./models";

export const TARGET_INTENSITY = 89.3368;

export function computePercentDiff(
  baseline: number,
  comparison: number
): number {
  return (comparison / baseline - 1) * 100;
}

export function isCompliant(intensity: number): boolean {
  return intensity <= TARGET_INTENSITY;
}

export function filterRoutes(
  routes: Route[],
  filters: Partial<Route>
): Route[] {
  return routes.filter(
    (r) =>
      (!filters.vesselType || r.vesselType === filters.vesselType) &&
      (!filters.fuelType || r.fuelType === filters.fuelType) &&
      (!filters.year || r.year === filters.year)
  );
}
