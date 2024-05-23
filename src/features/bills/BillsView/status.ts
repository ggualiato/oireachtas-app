export const statuses = [
  "Current",
  "Withdrawn",
  "Enacted",
  "Rejected",
  "Defeated",
  "Lapsed",
] as const;

export type BillStatus = (typeof statuses)[number];
