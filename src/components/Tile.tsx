import styled from "@emotion/styled";
import { TileData } from "../types/Tile";
import { tileInOriginalPosition } from "../utils/TileUtils";

type Props = {
  tile: TileData;
  onClick: (tile: TileData) => void;
  highlightCorrect: boolean;
};

type CellProps = Pick<Props, "tile" | "highlightCorrect">;

const Cell = styled.div<CellProps>(({ tile, highlightCorrect }) => ({
  boxSizing: "border-box",
  width: tile.width,
  height: tile.height,
  // flex: "1 0 auto",
  backgroundImage: `url("${tile.image.src}")`,
  backgroundPositionX: tile.position.x * -1,
  backgroundPositionY: tile.position.y * -1,
  "&:hover": {
    border: (!tile.selected && "2px solid white") || undefined,
    cursor: "pointer",
    opacity: 0.9,
  },
  border: (tile.selected && "4px solid red") || undefined,
  position: "relative",
  ...(highlightCorrect &&
    tileInOriginalPosition(tile) && {
      "&::before": {
        backgroundColor: "green",
        content: "''",
        opacity: 0.3,
        width: "100%",
        height: "100%",
        display: "block",
        position: "absolute",
        top: 0,
        left: 0,
      },
    }),
}));

function Tile({ tile, onClick, highlightCorrect }: Props) {
  return (
    <Cell
      tile={tile}
      onClick={() => onClick(tile)}
      highlightCorrect={highlightCorrect}
    />
  );
}

export default Tile;
