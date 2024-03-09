import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as TileUtils from "../../utils/TileUtils";
import Puzzle from "../Puzzle";

jest.mock("../../utils/TileUtils", () => ({
  ...jest.requireActual("../../utils/TileUtils"),
  shuffleTiles: jest.fn((tiles) => tiles),
}));

const shuffleTilesMock = TileUtils.shuffleTiles as jest.MockedFunction<
  typeof TileUtils.shuffleTiles
>;

jest.mock("react-confetti", () => () => <div>Confetti!</div>);

it("should shuffle tiles after a delay", async () => {
  render(
    <Puzzle
      image={new Image()}
      columns={2}
      highlightCorrectTiles={false}
      solved={false}
      onSolve={jest.fn()}
    />
  );

  expect(shuffleTilesMock).not.toHaveBeenCalled();

  await waitFor(() => expect(shuffleTilesMock).toHaveBeenCalled());
});

it("show show show original image on button hover", async () => {
  const user = userEvent.setup();
  const component = render(
    <Puzzle
      image={new Image()}
      columns={2}
      highlightCorrectTiles={false}
      solved={false}
      onSolve={jest.fn()}
    />
  );

  const revealButton = component.getByRole("button", { name: /hover/i });

  expect(component.queryByRole("img")).not.toBeInTheDocument();
  await user.hover(revealButton);
  expect(component.getByRole("img")).toBeInTheDocument();
  await user.unhover(revealButton);
  expect(component.queryByRole("img")).not.toBeInTheDocument();
});

it("show confetti on solve", () => {
  const unsolved = render(
    <Puzzle
      image={new Image()}
      columns={2}
      highlightCorrectTiles={false}
      solved={false}
      onSolve={jest.fn()}
    />
  );
  expect(unsolved.queryByText(/confetti/i)).not.toBeInTheDocument();

  const solved = render(
    <Puzzle
      image={new Image()}
      columns={2}
      highlightCorrectTiles={false}
      solved
      onSolve={jest.fn()}
    />
  );
  expect(solved.getByText(/confetti/i)).toBeInTheDocument();
});

it("show restart button on solve", () => {
  const unsolved = render(
    <Puzzle
      image={new Image()}
      columns={2}
      highlightCorrectTiles={false}
      solved={false}
      onSolve={jest.fn()}
    />
  );
  expect(
    unsolved.queryByRole("button", { name: /start/i })
  ).not.toBeInTheDocument();

  const solved = render(
    <Puzzle
      image={new Image()}
      columns={2}
      highlightCorrectTiles={false}
      solved
      onSolve={jest.fn()}
    />
  );
  expect(solved.getByRole("button", { name: /start/i })).toBeInTheDocument();
});
