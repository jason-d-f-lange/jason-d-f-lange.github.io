import { useEffect, useState } from "react";
import { TileData } from "../types/Tile";
import { generateTiles, puzzleSolved, selectTile } from "../utils/TileUtils";
import Controls from "./Controls";
import Tileset from "./Tileset";

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
    const init = async () => {
      const image = await loadImage("src/assets/puzzle.jpg");
      setImage(image);
      setTiles(generateTiles(image, columns));
    };

    init();
  }, [columns]);

  const handleTileClick = (selectedTile: TileData) =>
    setTiles((prev) => selectTile(prev, selectedTile));

  if (!image) return null;

  return (
    <>
      <h1>Picture Puzzle</h1>
      {puzzleSolved(tiles) && <h2>You won!</h2>}

      <Controls
        columns={columns}
        onColumnsChanged={setColumns}
        highlightCorrectTiles={highlightCorrectTiles}
        onHighlightCorrectTilesChanged={setHighlightCorrectTiles}
      />

      <Tileset
        tiles={tiles}
        onTileClick={handleTileClick}
        width={image.width}
        height={image.height}
        highlightCorrect={highlightCorrectTiles}
      />
    </>
  );
}

export default App;
