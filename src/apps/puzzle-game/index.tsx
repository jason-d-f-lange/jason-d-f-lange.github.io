import { useEffect, useState } from "react";
import Settings from "./Settings";
import Tileset from "./Tileset";
import { TileData } from "./types/Tile";
import { generateTiles, selectTile } from "./utils/TileUtils";

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
          columns={columns}
          onColumnsChanged={setColumns}
          highlightCorrectTiles={highlightCorrectTiles}
          onHighlightCorrectTilesChanged={setHighlightCorrectTiles}
        />
      </div>

      <div className="p-6 w-full h-full flex items-center justify-center overflow-hidden">
        <Tileset
          tiles={tiles}
          onTileClick={handleTileClick}
          width={image.width}
          height={image.height}
          highlightCorrect={highlightCorrectTiles}
        />
      </div>
    </div>
  );
}

export default App;
