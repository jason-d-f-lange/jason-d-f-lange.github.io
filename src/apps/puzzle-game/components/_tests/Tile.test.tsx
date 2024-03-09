import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Tile from "../Tile";

it("should not click when disabled", async () => {
  const user = userEvent.setup();

  const onClick = jest.fn();
  const component = render(
    <Tile
      image={new Image()}
      tile={{
        id: "1",
        width: 0,
        height: 0,
        originalPosition: { x: 0, y: 0 },
        position: { x: 0, y: 0 },
        selected: false,
      }}
      onClick={onClick}
      highlightCorrect={false}
      disabled
    />
  );

  await user.click(component.getByTestId("tile"));

  expect(onClick).not.toHaveBeenCalled();
});
