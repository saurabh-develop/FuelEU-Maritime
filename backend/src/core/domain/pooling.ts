export type PoolMemberInput = {
  shipId: string;
  cb_before: number;
};

export type PoolMemberResult = {
  shipId: string;
  cb_before: number;
  cb_after: number;
};

export type PoolResult = {
  members: PoolMemberResult[];
  sumCB: number;
  valid: boolean;
};

/**
 * Greedy reallocation:
 * - sort surplus descending, deficits ascending
 * - move from largest surplus to largest deficit until deficits resolved
 */
export function computePool(members: PoolMemberInput[]): PoolResult {
  const sumCB = members.reduce((s, m) => s + m.cb_before, 0);
  if (sumCB < 0) return { members: [], sumCB, valid: false };

  // clone arrays
  const surpluses = members
    .filter((m) => m.cb_before > 0)
    .map((m) => ({ ...m }));
  surpluses.sort((a, b) => b.cb_before - a.cb_before);

  const deficits = members
    .filter((m) => m.cb_before < 0)
    .map((m) => ({ ...m }));
  deficits.sort((a, b) => a.cb_before - b.cb_before);

  for (const d of deficits) {
    let needed = -d.cb_before;
    for (const s of surpluses) {
      if (needed <= 0) break;
      if (s.cb_before <= 0) continue;
      const transfer = Math.min(s.cb_before, needed);
      s.cb_before -= transfer;
      needed -= transfer;
      d.cb_before += transfer;
    }
  }

  const resultMap = new Map<string, number>();
  for (const s of surpluses) resultMap.set(s.shipId, s.cb_before);
  for (const d of deficits) resultMap.set(d.shipId, d.cb_before);

  const membersResult: PoolMemberResult[] = members.map((m) => ({
    shipId: m.shipId,
    cb_before: m.cb_before,
    cb_after: resultMap.get(m.shipId) ?? m.cb_before,
  }));

  return { members: membersResult, sumCB, valid: true };
}
