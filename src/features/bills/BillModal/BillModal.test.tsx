import { render, fireEvent, screen } from "@testing-library/react";
import { BillModal, BillModalProps } from "./BillModal";

//#region - mocks
const pickBill = {
  longTitleEn: "long title english",
  longTitleGa: "long title gaeilge",
  shortTitleEn: "short title english",
  shortTitleGa: "short title gaeilge",
};
//#endregion

describe("BillModal", () => {
  const commonProps: BillModalProps = {
    bill: pickBill,
    onClose: vi.fn(),
  };

  it("should render modal with english tab as default", () => {
    render(<BillModal {...commonProps} />);

    const longText = screen.getByText(pickBill.longTitleEn);
    const shortText = screen.getByText(pickBill.shortTitleEn);

    expect(longText).toBeInTheDocument();
    expect(shortText).toBeInTheDocument();
  });

  it("should switch to gaeilge content", () => {
    render(<BillModal {...commonProps} />);

    const gaeilgeTab = screen.getByRole("tab", {
      name: /gaeilge/i,
    });

    fireEvent.click(gaeilgeTab);

    const longText = screen.getByText(pickBill.longTitleGa);
    const shortText = screen.getByText(pickBill.shortTitleGa);

    expect(longText).toBeInTheDocument();
    expect(shortText).toBeInTheDocument();
  });
});
