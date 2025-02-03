import { render, screen } from "@testing-library/react";
import { PropertyResult } from "./PropertyResult";

describe("<PropertyResult>", () => {
  const mockProps: React.ComponentProps<typeof PropertyResult> = {
    id: "cxd650nuyo",
    image: {
      src: "https://unsplash.it/145/125/?random",
      alt: "Image of Courtyard by Marriott Sydney-North Ryde",
    },
    title: "Courtyard by Marriott Sydney-North Ryde",
    address: "7-11 Talavera Rd, North Ryde",
    promotionTitle: "Exclusive Deal",
    isFreeCancellationEligible: true,
    offerName: "Deluxe Balcony Room",
    displayPrice: {
      amount: 329.0,
      currency: "AUD",
    },
    savings: { amount: 30.0, currency: "AUD" },
  };
  it("renders property result accurately", () => {
    render(<PropertyResult {...mockProps} />);

    // Renders title
    screen.getByText("Courtyard by Marriott Sydney-North Ryde");
    // Renders address
    screen.getByText("7-11 Talavera Rd, North Ryde");
    // Renders promotional badge
    screen.getByText("Exclusive Deal");
    // Renders free cancellation badge
    screen.getByText("Free cancellation");
    // Renders offer name along with a link
    expect(
      screen.getByRole("link", { name: /Deluxe Balcony Room/ })
    ).toHaveAttribute("href", `/hotel/cxd650nuyo`);
    // Renders price tag
    screen.getByText("1 night total (AUD)");
    screen.getByText("$329");
    // Renders savings tag
    screen.getByText("Save $30~");
  });

  it("does not render the free cancellation badge if the offer is not eligible", () => {
    render(
      <PropertyResult {...mockProps} isFreeCancellationEligible={false} />
    );

    expect(screen.queryByText("Free cancellation")).not.toBeInTheDocument();
  });

  it("does not render the savings price tag if it's not available", () => {
    render(<PropertyResult {...mockProps} savings={null} />);

    // Renders savings tag
    expect(screen.queryByText(/Save/i)).not.toBeInTheDocument();
  });

  it("does not render promotion title if it's not available", () => {
    render(<PropertyResult {...mockProps} promotionTitle={undefined} />);

    // Renders savings tag
    expect(screen.queryByText("Exclusive Deal")).not.toBeInTheDocument();
  });
});
