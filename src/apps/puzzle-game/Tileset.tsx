import styled from "@emotion/styled";
import Tile from "./Tile";
import { TileData } from "./types/Tile";

type ContainerProps = {
  width: number;
  height: number;
};

const Container = styled.div<ContainerProps>(({ width, height }) => ({
  width,
  height,
  maxWidth: "100%",
  maxHeight: "100%",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  position: "relative",
}));

type Props = {
  image: HTMLImageElement;
  tiles: TileData[];
  onTileClick: (tile: TileData) => void;
  width: number;
  height: number;
  highlightCorrect: boolean;
  disabled: boolean;
};

function Tileset({
  image,
  tiles,
  onTileClick,
  width,
  height,
  highlightCorrect,
  disabled,
}: Props) {
  return (
    <Container width={width} height={height}>
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          image={image}
          tile={tile}
          onClick={onTileClick}
          highlightCorrect={highlightCorrect}
          disabled={disabled}
        />
      ))}
    </Container>
  );
}

export default Tileset;
