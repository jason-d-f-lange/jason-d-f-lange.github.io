import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Tileset from "./Tileset";
import { TileData } from "./types/Tile";
import {
  generateTiles,
  puzzleSolved,
  selectTile,
  shuffleTiles,
} from "./utils/TileUtils";

type Props = {
  image: HTMLImageElement;
  columns: number;
  highlightCorrectTiles: boolean;
  onSolve: () => void;
};

const Puzzle = ({ image, columns, highlightCorrectTiles, onSolve }: Props) => {
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [showOriginalImage, setShowOriginalImage] = useState<boolean>(false);

  useEffect(() => {
    setTiles(generateTiles(image, columns));

    setTimeout(() => {
      setTiles(shuffleTiles);
    }, 750);
  }, [image, columns]);

  const handleTileClick = (selectedTile: TileData) => {
    const updatedTiles = selectTile(tiles, selectedTile);
    setTiles(updatedTiles);
    if (puzzleSolved(updatedTiles)) onSolve();
  };

  if (!image) return;

  return (
    <>
      {showOriginalImage ? (
        <img src={image.src} height={image.height} width={image.width} />
      ) : (
        <Tileset
          image={image}
          tiles={tiles}
          onTileClick={handleTileClick}
          width={image.width}
          height={image.height}
          highlightCorrect={highlightCorrectTiles}
        />
      )}
      <Button
        variant="outline"
        onMouseEnter={() => setShowOriginalImage(true)}
        onMouseLeave={() => setShowOriginalImage(false)}
      >
        Hover over me to see the original image
      </Button>
    </>
  );
};

export default Puzzle;
