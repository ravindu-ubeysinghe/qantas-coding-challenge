import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("<Header />", () => {
  it("should render Header correctly", () => {
    render(<Header />);

    expect(screen.getByAltText("Qantas Hotels")).toHaveAttribute(
      "src",
      "/assets/qantas-logo.png"
    );
  });
});
