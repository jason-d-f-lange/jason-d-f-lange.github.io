import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useRef, useState } from "react";
import Settings from "./Settings";
import Solved from "./Solved";
import Tileset from "./Tileset";
import { TileData } from "./types/Tile";
import { loadImage, resizeImageToFit } from "./utils/ImageUtils";
import { generateTiles, puzzleSolved, selectTile } from "./utils/TileUtils";

const imagePath = "puzzle2.jpg";

function App() {
  const playingAreaRef = useRef<HTMLDivElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | undefined>();
  const [tiles, setTiles] = useState<TileData[]>([]);

  const [columns, setColumns] = useState<number>(3);
  const [highlightCorrectTiles, setHighlightCorrectTiles] =
    useState<boolean>(false);

  const [showOriginalImage, setShowOriginalImage] = useState<boolean>(false);

  const solved = useMemo(() => !!tiles.length && puzzleSolved(tiles), [tiles]);

  useEffect(() => {
    const init = async () => {
      if (playingAreaRef.current == null) return;

      const availableWidth = playingAreaRef.current.offsetWidth;
      const availableHeight = playingAreaRef.current.offsetHeight;

      const image = await loadImage(imagePath);
      const resizedImage = resizeImageToFit(
        image,
        availableWidth,
        availableHeight
      );

      setImage(resizedImage);
      setTiles(generateTiles(resizedImage, columns));
    };

    init();
  }, [playingAreaRef, columns]);

  const handleTileClick = (selectedTile: TileData) =>
    setTiles((prev) => selectTile(prev, selectedTile));

  return (
    <>
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

        <div
          ref={playingAreaRef}
          className="p-6 w-full h-full flex flex-col gap-3 items-center justify-center overflow-hidden"
        >
          {image && (
            <>
              {showOriginalImage || solved ? (
                <img
                  src={image.src}
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
            </>
          )}
        </div>
      </div>

      {solved && <Solved />}
    </>
  );
}

export default App;
