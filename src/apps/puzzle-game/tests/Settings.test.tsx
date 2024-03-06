import { render } from "@testing-library/react";
import Settings from "../Settings";

it("should render", () => {
  const component = render(
    <Settings
      disabled={false}
      columns={2}
      onColumnsChanged={jest.fn()}
      highlightCorrectTiles={false}
      onHighlightCorrectTilesChanged={jest.fn()}
    />
  );
  expect(component).toBeInTheDocument();
});
