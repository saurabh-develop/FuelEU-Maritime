export const TARGET_INTENSITY = 89.3368; // gCO2e/MJ
export const MJ_PER_TONNE = 41000; // MJ/t

export function computeComplianceBalance(
  ghgIntensity: number,
  fuelConsumption_t: number
): number {
  const energyMJ = fuelConsumption_t * MJ_PER_TONNE;
  const cb_g = (TARGET_INTENSITY - ghgIntensity) * energyMJ;
  return cb_g / 1_000_000; // tonnes CO2 equivalent
}
