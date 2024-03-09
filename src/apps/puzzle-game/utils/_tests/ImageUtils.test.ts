import { resizeImageToFit } from "../ImageUtils";

it("should resize oversized images to fit available space", () => {
  const image = new Image(1000, 1000);
  const resizedImage = resizeImageToFit(image, 500, 500);
  expect(resizedImage.width).toBe(409);
  expect(resizedImage.height).toBe(409);
});

it("should not resize images if they already fit available space", () => {
  const image = new Image(1000, 1000);
  const resizedImage = resizeImageToFit(image, 1000, 1000);
  expect(resizedImage.width).toBe(1000);
  expect(resizedImage.height).toBe(1000);
});
