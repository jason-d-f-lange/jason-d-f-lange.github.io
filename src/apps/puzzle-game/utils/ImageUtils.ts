export const loadImage = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });

export const resizeImageToFit = (
  image: HTMLImageElement,
  availableWidth: number,
  availableHeight: number
): HTMLImageElement => {
  let targetWidth = image.width;
  let targetHeight = image.height;

  while (targetWidth > availableWidth || targetHeight > availableHeight) {
    targetWidth = targetWidth * 0.8;
    targetHeight = targetHeight * 0.8;
  }

  image.width = targetWidth;
  image.height = targetHeight;

  return image;
};
