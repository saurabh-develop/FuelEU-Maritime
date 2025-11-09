import { computeComplianceBalance } from "../../core/domain/compliance";

test("computes positive CB for compliant route", () => {
  const cb = computeComplianceBalance(88.0, 4800);
  expect(cb).toBeGreaterThan(0);
});

test("computes negative CB for non-compliant route", () => {
  const cb = computeComplianceBalance(91.0, 5000);
  expect(cb).toBeLessThan(0);
});
