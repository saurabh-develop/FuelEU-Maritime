export interface Route {
  id: number;
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption_t: number;
  distance_km: number;
  totalEmissions_t: number;
  isBaseline?: boolean;
}

export interface Comparison {
  routeId: string;
  baselineIntensity: number;
  comparisonIntensity: number;
  percentDiff: number;
  compliant: boolean;
}
