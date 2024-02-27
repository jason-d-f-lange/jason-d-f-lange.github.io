import styled from "@emotion/styled";
import { TileData } from "../types/Tile";
import Tile from "./Tile";

type ContainerProps = {
  width: number;
  height: number;
};

const Container = styled.div<ContainerProps>(({ width, height }) => ({
  width,
  height,
  outline: "1px solid black",
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
}));

type Props = {
  tiles: TileData[];
  onTileClick: (tile: TileData) => void;
  width: number;
  height: number;
  highlightCorrect: boolean;
};

function Tileset({
  tiles,
  onTileClick,
  width,
  height,
  highlightCorrect,
}: Props) {
  return (
    <Container width={width} height={height}>
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          onClick={onTileClick}
          highlightCorrect={highlightCorrect}
        />
      ))}
    </Container>
  );
}

export default Tileset;
