import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as ImageUtils from "../../utils/ImageUtils";
import ImageChooser from "../ImageChooser";

jest.mock("../../utils/ImageUtils", () => ({
  ...jest.requireActual("../../utils/ImageUtils"),
  loadImage: jest.fn(),
}));

const loadImageMock = ImageUtils.loadImage as jest.MockedFunction<
  typeof ImageUtils.loadImage
>;

it("should show 3 images", () => {
  const component = render(<ImageChooser onChange={jest.fn()} />);
  expect(component.getAllByRole("img")).toHaveLength(3);
});

it("should select image on click", async () => {
  const dummyImage = new Image(100, 100);
  loadImageMock.mockResolvedValueOnce(dummyImage);

  const user = userEvent.setup();
  const onChange = jest.fn();
  const component = render(<ImageChooser onChange={onChange} />);

  const images = component.getAllByRole("img");
  const firstImage = images[0];
  await user.click(firstImage);

  expect(loadImageMock).toHaveBeenCalledWith("puzzle1.jpg");
  expect(onChange).toHaveBeenCalledWith(dummyImage);
});

it("should hide file input", () => {
  const component = render(<ImageChooser onChange={jest.fn()} />);

  const input = component.getByLabelText(/choose file/i);
  expect(input).not.toBeVisible();
});

it("should select image on file upload", async () => {
  // Mock image constructor to call onload after a short delay
  // https://stackoverflow.com/a/69297960
  type ImageConstructor = new (
    width?: number | undefined,
    height?: number | undefined
  ) => HTMLImageElement;

  global.Image = class {
    onload: () => void;

    constructor() {
      this.onload = jest.fn();
      setTimeout(() => {
        this.onload();
      }, 50);
    }
  } as unknown as ImageConstructor;

  const user = userEvent.setup();
  const onChange = jest.fn();
  const component = render(<ImageChooser onChange={onChange} />);

  const file = new File(["picture"], "picture.png", { type: "image/png" });
  const input = component.getByLabelText(/choose file/i) as HTMLInputElement;

  await user.upload(input, file);

  expect(input.files).toHaveLength(1);
  expect(input.files![0]).toBe(file);
  expect(input.files!.item(0)).toBe(file);

  await waitFor(() => {
    expect(onChange).toHaveBeenCalled();
  });
});
