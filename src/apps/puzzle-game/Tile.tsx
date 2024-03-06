import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { TileData } from "./types/Tile";
import { tileInOriginalPosition } from "./utils/TileUtils";

type Props = {
  image: HTMLImageElement;
  tile: TileData;
  onClick: (tile: TileData) => void;
  highlightCorrect: boolean;
};

type CellProps = { animate: boolean } & Pick<
  Props,
  "image" | "tile" | "highlightCorrect"
>;

const ANIMATION_DURATION_MS = 750;

const Cell = styled.div<CellProps>(
  ({ image, tile, highlightCorrect, animate }) => ({
    width: tile.width,
    height: tile.height,
    backgroundImage: `url("${image.src}")`,
    backgroundSize: `${image.width}px ${image.height}px`,
    backgroundPositionX: tile.originalPosition.x * -1,
    backgroundPositionY: tile.originalPosition.y * -1,
    position: "absolute",
    left: tile.position.x,
    top: tile.position.y,
    ...(animate && {
      transitionProperty: "left, top",
      transitionDuration: `${ANIMATION_DURATION_MS}ms`,
      transitionTimingFunction: "ease",
    }),
    border: (tile.selected && "4px solid red") || undefined,
    "&:hover": {
      border: (!tile.selected && "2px solid white") || undefined,
      cursor: "pointer",
      opacity: 0.9,
    },
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
  })
);

function Tile({ image, tile, onClick, highlightCorrect }: Props) {
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => setAnimate(false),
      ANIMATION_DURATION_MS
    );

    return () => clearTimeout(timeoutId);
  }, [tile.position]);

  return (
    <Cell
      image={image}
      tile={tile}
      onClick={() => onClick(tile)}
      highlightCorrect={highlightCorrect}
      animate={animate}
    />
  );
}

export default Tile;
