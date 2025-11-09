export type ComplianceBalance = {
  cb_before: number;
  applied?: number;
  cb_after: number;
};

export type PoolMember = {
  routeId: string;
  cb_before: number;
  cb_after?: number;
};
