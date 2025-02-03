import { fireEvent, render, screen } from "@testing-library/react";
import { SortDropdown } from "./SortDropdown";

describe("<SortDropdown />", () => {
  const mockSetSortDirection = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all sort options accurately", () => {
    render(
      <SortDropdown
        sortDirection="ascending"
        setSortDirection={mockSetSortDirection}
      />
    );

    screen.getByLabelText("Sorting method");
    screen.getByText("Price (high-low)");
    screen.getByText("Price (low-high)");
  });

  it("should invoke setSortDirection function on option select", () => {
    render(
      <SortDropdown
        sortDirection="ascending"
        setSortDirection={mockSetSortDirection}
      />
    );

    const selectEl = screen.getByLabelText("Sorting method");
    fireEvent.change(selectEl, {
      target: { value: "ascending" },
    });
    expect(mockSetSortDirection).toHaveBeenCalledWith("ascending");
  });
});
