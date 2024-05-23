export interface LegislationResponse {
  head: LegislationHead;
  results: LegislationResult[];
}

export interface LegislationResult {
  bill: Bill;
  contextDate: string;
}

interface LegislationHead {
  counts: {
    billCount: number;
    resultCount: number;
  };
  dateRange: {
    end: string;
    start: string;
  };
  lang: string;
}

export interface Bill {
  billNo: string;
  billType: string;
  status: EnumBillStatus;
  sponsors: Sponsor[];
  longTitleEn: string;
  longTitleGa: string;
  billYear: string;
  shortTitleEn: string;
  shortTitleGa: string;
}

interface WithId {
  id: string;
}

export type BillWithId = Bill & WithId;

export interface Sponsor {
  sponsor: {
    by: {
      showAs: null | string;
      uri: null | string;
    };
    as: {
      showAs: null | string;
      uri: null | string;
    };
  };
}

export enum EnumBillStatus {
  Current = "Current",
  Withdrawn = "Withdrawn",
  Enacted = "Enacted",
  Rejected = "Rejected",
  Defeated = "Defeated",
  Lapsed = "Lapsed",
}
