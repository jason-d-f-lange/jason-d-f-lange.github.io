export type Position = {
  x: number;
  y: number;
};

export type TileData = {
  id: number;
  image: HTMLImageElement;
  width: number;
  height: number;
  originalPosition: Position;
  position: Position;
  selected: boolean;
};
