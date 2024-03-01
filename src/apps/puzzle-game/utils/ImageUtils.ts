export const loadImage = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });

export const resizeImage = async (
  image: HTMLImageElement,
  newWidth: number,
  newHeight: number
): Promise<HTMLImageElement> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    const resizedImage = new Image();
    resizedImage.src = canvas.toDataURL();
    resizedImage.onload = () => resolve(resizedImage);
  });
};
