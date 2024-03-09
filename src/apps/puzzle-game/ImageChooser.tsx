import styled from "@emotion/styled";
import { ChangeEvent } from "react";
import { loadImage } from "./utils/ImageUtils";

const Row = styled.div({
  display: "flex",
  justifyContent: "space-evenly",
  gap: "10px",
  maxWidth: "100%",
  margin: "16px 0",
});

const Img = styled.img({
  transition: "all .2s ease-in-out",
  maxWidth: "30%",
  maxHeight: "400px",
  width: "auto",
  height: "auto",
  cursor: "pointer",
  flexBasis: "30%",
  "&:hover": {
    transform: "scale(1.5)",
  },
});

type Props = {
  onChange: (image: HTMLImageElement) => void;
};

const ImageChooser = ({ onChange }: Props) => {
  const handleImageSelected = (path: string) => {
    loadImage(path).then(onChange);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();

      image.onload = () => {
        onChange(image);
      };

      image.src = e.target!.result as string;
    };

    reader.readAsDataURL(file);
  };

  const imagePaths = ["puzzle.jpg", "puzzle2.jpg", "puzzle3.jpg"];

  return (
    <>
      <h2 className="text-l font-bold">Choose image</h2>
      <Row>
        {imagePaths.map((imagePath) => (
          <Img
            key={imagePath}
            src={imagePath}
            onClick={() => handleImageSelected(imagePath)}
          />
        ))}
      </Row>

      <h3 className="text-l font-bold">OR</h3>

      <label
        htmlFor="upload"
        className="cursor-pointer border py-1 px-2 rounded-sm bg-neutral-100"
      >
        Choose file
      </label>
      <input
        className="opacity-0"
        id="upload"
        type="file"
        accept="image/png, image/jpg, image/jpeg"
        onChange={handleImageUpload}
      />
    </>
  );
};

export default ImageChooser;
