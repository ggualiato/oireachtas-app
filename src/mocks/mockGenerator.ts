import {
  Bill,
  EnumBillStatus,
  LegislationResponse,
  LegislationResult,
  Sponsor,
} from "../domain/legislation";

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(start: Date, end: Date): string {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
}

function getRandomBillStatus(): string {
  const statuses = [
    "Current",
    "Withdrawn",
    "Enacted",
    "Rejected",
    "Defeated",
    "Lapsed",
  ];
  return statuses[getRandomInt(0, statuses.length - 1)];
}

function getRandomSponsor(): Sponsor {
  const showAsNames = [
    null,
    "Sponsor A",
    "Sponsor B",
    "Sponsor C",
    "Sponsor D",
  ];
  const uris = [
    null,
    "http://example.com/sponsorA",
    "http://example.com/sponsorB",
    "http://example.com/sponsorC",
    "http://example.com/sponsorD",
  ];

  return {
    sponsor: {
      by: {
        showAs: showAsNames[getRandomInt(0, showAsNames.length - 1)],
        uri: uris[getRandomInt(0, uris.length - 1)],
      },
      as: {
        showAs: showAsNames[getRandomInt(0, showAsNames.length - 1)],
        uri: uris[getRandomInt(0, uris.length - 1)],
      },
    },
  };
}

function getRandomBill(billNo: string, billYear: string): Bill {
  return {
    billNo: billNo,
    billType: `Type${String.fromCharCode(65 + getRandomInt(0, 25))}`,
    status: getRandomBillStatus() as EnumBillStatus,
    sponsors: [getRandomSponsor()],
    longTitleEn: "An Act to " + Math.random().toString(36).substring(7),
    longTitleGa: "Acht chun " + Math.random().toString(36).substring(7),
    billYear: billYear,
    shortTitleEn: "Title " + Math.random().toString(36).substring(7),
    shortTitleGa: "Teideal " + Math.random().toString(36).substring(7),
  };
}

export function createMockLegislationResponse(
  count: number
): LegislationResponse {
  const results: LegislationResult[] = [];
  const currentYear = new Date().getFullYear();

  for (let i = 0; i < count; i++) {
    const billNo = `B${(i + 1).toString().padStart(3, "0")}`;
    const billYear = (currentYear - getRandomInt(0, 5)).toString();
    const contextDate = getRandomDate(
      new Date(currentYear - 1, 0, 1),
      new Date(currentYear, 11, 31)
    );

    results.push({
      bill: getRandomBill(billNo, billYear),
      contextDate: contextDate,
    });
  }

  const mockLegislationResponse: LegislationResponse = {
    head: {
      counts: {
        billCount: count,
        resultCount: count,
      },
      dateRange: {
        start: `${currentYear - 1}-01-01`,
        end: `${currentYear}-12-31`,
      },
      lang: "en",
    },
    results: results,
  };

  return mockLegislationResponse;
}

export const createMockFavourites = () => {
  return [
    {
      id: "222024",
      shortTitle: "Automatic Enrolment Retirement Savings System Bill 2024",
    },
    {
      id: "372024",
      shortTitle: "Grocery Price Caps Bill 2024",
    },
    {
      id: "212024",
      shortTitle:
        "Future Ireland Fund and Infrastructure, Climate and Nature Fund Bill 2024",
    },
    {
      id: "382024",
      shortTitle: "Education (Smartphones in Primary Schools) Bill 2024",
    },
    {
      id: "362024",
      shortTitle: "Social Welfare (Miscellaneous Provisions) Bill 2024",
    },
    {
      id: "912022",
      shortTitle: "Employment Permits Bill 2022",
    },
  ];
};

// Usage
// const mockResponse = createMockLegislationResponse(5);
// console.log(mockResponse);
