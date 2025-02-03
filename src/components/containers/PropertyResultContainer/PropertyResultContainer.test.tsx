import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { PropertyResultContainer } from "./PropertyResultContainer";
import { mockPropertyResultsData } from "@/api/data";

describe("<PropertyResultContainer />", () => {
  it("should render the hotel list correctly and be sortable", async () => {
    render(<PropertyResultContainer />);

    // Renders loading state
    await waitForElementToBeRemoved(() => screen.queryByRole("progressbar"));

    // Renders all properties
    mockPropertyResultsData.results.forEach((result) => {
      expect(screen.getByText(result.property.title)).toBeVisible();
    });

    // Renders properties sorted in descending order or price by default
    const sortedResultsDsc = [...mockPropertyResultsData.results].sort(
      (a, b) => b.offer.displayPrice.amount - a.offer.displayPrice.amount
    );
    expect(screen.getAllByTestId("property-result")[0]).toHaveTextContent(
      sortedResultsDsc[0].property.title
    );

    const sortDropdownSelect = screen.getByLabelText(/Sorting method/);
    fireEvent.change(sortDropdownSelect, {
      target: { value: "ascending" },
    });

    // Renders properties sorted in descending order or price by default
    const sortedResultsAsc = [...mockPropertyResultsData.results].sort(
      (a, b) => a.offer.displayPrice.amount - b.offer.displayPrice.amount
    );

    await waitFor(() => {
      expect(screen.getAllByTestId("property-result")[0]).toHaveTextContent(
        sortedResultsAsc[0].property.title
      );
    });
  });
});
