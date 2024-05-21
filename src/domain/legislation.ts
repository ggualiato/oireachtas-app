export interface Legislation {
  head: LegislationHead;
  results: {
    bill: Bill;
  }[];
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

interface Bill {
  billNo: string;
  billType: string;
  status: string;
  sponsors: Sponsor[];
}

interface Sponsor {
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
