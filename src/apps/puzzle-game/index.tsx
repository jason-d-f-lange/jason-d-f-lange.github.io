import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import Confetti from "react-confetti";
import Settings from "./Settings";
import Tileset from "./Tileset";
import { TileData } from "./types/Tile";
import { generateTiles, puzzleSolved, selectTile } from "./utils/TileUtils";

const loadImage = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.src = url;
  });

function App() {
  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [tiles, setTiles] = useState<TileData[]>([]);
  const [columns, setColumns] = useState<number>(3);
  const [highlightCorrectTiles, setHighlightCorrectTiles] =
    useState<boolean>(false);
  const [showOriginalImage, setShowOriginalImage] = useState<boolean>(false);

  const solved = useMemo(() => puzzleSolved(tiles), [tiles]);

  useEffect(() => {
    loadImage("puzzle.jpg").then((image) => {
      setImage(image);
      setTiles(generateTiles(image, columns));
    });
  }, [columns]);

  const handleTileClick = (selectedTile: TileData) =>
    setTiles((prev) => selectTile(prev, selectedTile));

  if (!image) return null;

  return (
    <div className="flex" style={{ height: "100%" }}>
      <div className="w-60 border-r p-6">
        <Settings
          disabled={solved}
          columns={columns}
          onColumnsChanged={setColumns}
          highlightCorrectTiles={highlightCorrectTiles}
          onHighlightCorrectTilesChanged={setHighlightCorrectTiles}
        />
      </div>

      <div className="p-6 w-full h-full flex flex-col gap-3 items-center justify-center overflow-hidden">
        {showOriginalImage || solved ? (
          <img
            src="puzzle.jpg"
            height={image.height}
            width={image.width}
            className="cursor-not-allowed"
          />
        ) : (
          <Tileset
            tiles={tiles}
            onTileClick={handleTileClick}
            width={image.width}
            height={image.height}
            highlightCorrect={highlightCorrectTiles}
          />
        )}
        <Button
          variant="outline"
          disabled={!image || solved}
          onMouseEnter={() => setShowOriginalImage(true)}
          onMouseLeave={() => setShowOriginalImage(false)}
        >
          Hover over me to see the original image
        </Button>
      </div>

      {solved && (
        <>
          <Confetti
            style={{ zIndex: 51 }}
            numberOfPieces={500}
            tweenDuration={10000}
            recycle={false}
          />
          <AlertDialog defaultOpen>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  You solved it <span className="text-2xl">🎉</span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Refresh the page to start again.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Dismiss</AlertDialogCancel>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
}

export default App;
