import { useRef, useState } from "react";
import ImageChooser from "./ImageChooser";
import Puzzle from "./Puzzle";
import Settings from "./Settings";
import Solved from "./Solved";
import { resizeImageToFit } from "./utils/ImageUtils";

function App() {
  const playingAreaRef = useRef<HTMLDivElement | null>(null);

  const [image, setImage] = useState<HTMLImageElement | undefined>();

  const [columns, setColumns] = useState<number>(3);
  const [highlightCorrectTiles, setHighlightCorrectTiles] =
    useState<boolean>(false);

  const [solved, setSolved] = useState<boolean>(false);

  const handleImageChange = (chosenImage: HTMLImageElement) => {
    const availableWidth = playingAreaRef.current!.offsetWidth;
    const availableHeight = playingAreaRef.current!.offsetHeight;

    const resizedImage = resizeImageToFit(
      chosenImage,
      availableWidth,
      availableHeight
    );

    setImage(resizedImage);
  };

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
          className="p-6 w-full h-full flex flex-col gap-3 items-center justify-center"
        >
          {!image ? (
            <ImageChooser onChange={handleImageChange} />
          ) : (
            <Puzzle
              image={image}
              columns={columns}
              highlightCorrectTiles={highlightCorrectTiles}
              onSolve={() => setSolved(true)}
            />
          )}
        </div>
      </div>

      {solved && <Solved />}
    </>
  );
}

export default App;
