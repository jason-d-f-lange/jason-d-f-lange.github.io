import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { ImageChooserProps } from "../ImageChooser";
import { PuzzleProps } from "../Puzzle";

jest.mock("../../utils/ImageUtils", () => {
  const actual = jest.requireActual("../../utils/ImageUtils");
  return {
    ...actual,
    // As there is no DOM, we cannot resize image based on available space
    resizeImageToFit: (image: HTMLImageElement) => {
      image.width /= 2;
      image.height /= 2;
      return image;
    },
  };
});

jest.mock("../ImageChooser", () => {
  return (props: ImageChooserProps) => {
    const image = new Image(1000, 1000);
    return <div onClick={() => props.onChange(image)}>Choose Image</div>;
  };
});

jest.mock("../Puzzle", () => {
  return ({ image, onSolve }: PuzzleProps) => {
    return (
      <div data-testid="puzzle" onClick={onSolve}>
        <img src={image.src} width={image.width} height={image.height} />
      </div>
    );
  };
});

it("should show image chooser on load", () => {
  const component = render(<App />);
  expect(component.getByText(/choose image/i)).toBeInTheDocument();
  expect(component.queryByTestId("puzzle")).not.toBeInTheDocument();
});

it("should show puzzle once image chosen", async () => {
  const user = userEvent.setup();
  const component = render(<App />);

  const imageChooser = component.getByText(/choose image/i);
  await user.click(imageChooser);

  expect(imageChooser).not.toBeInTheDocument();

  expect(component.getByTestId("puzzle")).toBeInTheDocument();
});

it("should resize image on selection", async () => {
  const user = userEvent.setup();
  const component = render(<App />);

  const imageChooser = component.getByText(/choose image/i);
  await user.click(imageChooser);

  const image = component.getByRole("img");
  expect(image.getAttribute("width")).toEqual("500");
  expect(image.getAttribute("height")).toEqual("500");
});
