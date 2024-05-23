import { render, screen } from "../../../test/test-utils";
import { SponsorsView } from "./SponsorsView";
import { Sponsor } from "../../../domain/legislation";

const oneSponsor: Sponsor[] = [
  {
    sponsor: {
      as: {
        showAs: "Hello",
        uri: "",
      },
      by: {
        showAs: null,
        uri: null,
      },
    },
  },
];

const twoSponsors: Sponsor[] = [
  ...oneSponsor,
  {
    sponsor: {
      as: {
        showAs: null,
        uri: null,
      },
      by: {
        showAs: "World",
        uri: null,
      },
    },
  },
];

describe("SponsorsView", () => {
  it("should render one sponsor in the screen", () => {
    render(<SponsorsView sponsors={oneSponsor} />);

    const text = screen.getByText("Hello");

    expect(text).toBeInTheDocument();
  });

  it("should render a two sponsors in the screen", () => {
    render(<SponsorsView sponsors={twoSponsors} />);

    const text = screen.getByText("Hello | World");

    expect(text).toBeInTheDocument();
  });
});
