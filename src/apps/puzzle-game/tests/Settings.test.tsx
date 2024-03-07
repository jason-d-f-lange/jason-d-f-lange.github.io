import { render } from "@testing-library/react";
import Settings from "../Settings";

it("should disable correct tiles checkbox", () => {
  const component = render(
    <Settings
      columns={2}
      onColumnsChanged={jest.fn()}
      highlightCorrectTiles={false}
      onHighlightCorrectTilesChanged={jest.fn()}
      disabled
    />
  );

  const checkbox = component.getByRole("checkbox", {
    name: /highlight correct/i,
  });

  expect(checkbox).toBeDisabled();
});
