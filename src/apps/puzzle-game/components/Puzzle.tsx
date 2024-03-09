import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { TileData } from "../types/Tile";
import {
  generateTiles,
  puzzleSolved,
  selectTile,
  shuffleTiles,
} from "../utils/TileUtils";
import Tileset from "./Tileset";

export type PuzzleProps = {
  image: HTMLImageElement;
  columns: number;
  highlightCorrectTiles: boolean;
  solved: boolean;
  onSolve: () => void;
};

const Puzzle = ({
  image,
  columns,
  highlightCorrectTiles,
  solved,
  onSolve,
}: PuzzleProps) => {
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

  return (
    <>
      <h2 className="font-bold">
        {solved ? (
          <span className="animate-fade-in">
            You solved it! <span className="text-2xl">🎉</span>
          </span>
        ) : (
          "Unscramble the image"
        )}
      </h2>

      {showOriginalImage ? (
        <img src={image.src} height={image.height} width={image.width} />
      ) : (
        <Tileset
          image={image}
          tiles={tiles}
          onTileClick={handleTileClick}
          width={image.width}
          height={image.height}
          highlightCorrect={!solved && highlightCorrectTiles}
          disabled={solved}
        />
      )}

      {!solved && (
        <Button
          variant="outline"
          onMouseEnter={() => setShowOriginalImage(true)}
          onMouseLeave={() => setShowOriginalImage(false)}
        >
          Hover over me to see the original image
        </Button>
      )}

      {solved && (
        <>
          <Confetti
            style={{ zIndex: 51 }}
            numberOfPieces={500}
            tweenDuration={10000}
            recycle={false}
          />
          <Button
            variant="destructive"
            className="animate-fade-in"
            onClick={() => window.location.reload()}
          >
            Start again
          </Button>
        </>
      )}
    </>
  );
};

export default Puzzle;
