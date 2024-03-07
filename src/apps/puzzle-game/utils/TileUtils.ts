import { Position, TileData } from "../types/Tile";

const roundUpToNearestDivisible = (number: number, divisor: number) => {
  return Math.ceil(number / divisor) * divisor;
};

const calculateIdealTileHeight = (
  image: HTMLImageElement,
  tileWidth: number
): number => {
  const idealImageHeight = roundUpToNearestDivisible(image.height, tileWidth);
  const idealNumberOfRows = idealImageHeight / tileWidth;
  return image.height / idealNumberOfRows;
};

export const shuffleTiles = (tiles: TileData[]): TileData[] => {
  const cloned = structuredClone(tiles);
  let shuffles = 0;

  do {
    for (let currentIndex = cloned.length; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      const temp = cloned[currentIndex].position;
      cloned[currentIndex].position = cloned[randomIndex].position;
      cloned[randomIndex].position = temp;
    }

    shuffles++;
  } while (
    (cloned.some(tileInOriginalPosition) ||
      cloned.some((tile) => hasCorrectTileNextToIt(cloned, tile))) &&
    shuffles < 100
  );

  return cloned;
};

const hasCorrectTileNextToIt = (tiles: TileData[], tile: TileData): boolean => {
  for (const other of tiles) {
    const isNorth =
      other.position.x === tile.position.x &&
      other.position.y === tile.position.y - tile.height;

    const isEast =
      other.position.y === tile.position.y &&
      other.position.x === tile.position.x + tile.width;

    if (isNorth) {
      const isCorrect =
        tile.originalPosition.x === other.originalPosition.x &&
        tile.originalPosition.y === other.originalPosition.y + tile.height;
      if (isCorrect) return true;
      else continue;
    }

    if (isEast) {
      const isCorrect =
        tile.originalPosition.y === other.originalPosition.y &&
        tile.originalPosition.x === other.originalPosition.x - tile.width;
      if (isCorrect) return true;
      else continue;
    }
  }

  return false;
};

export const generateTiles = (
  image: HTMLImageElement,
  columns: number
): TileData[] => {
  const tiles: TileData[] = [];

  const tileWidth = image.width / columns;
  const tileHeight = calculateIdealTileHeight(image, tileWidth);

  for (let x = 0; x < image.width; x += tileWidth) {
    for (let y = 0; y < image.height; y += tileHeight) {
      const position: Position = { x, y };

      tiles.push({
        id: crypto.randomUUID(),
        width: tileWidth,
        height: tileHeight,
        originalPosition: position,
        position,
        selected: false,
      });
    }
  }

  return tiles;
};

export const selectTile = (
  tiles: TileData[],
  selectedTile: TileData
): TileData[] => {
  const selectedTiles = tiles.filter((t) => t.selected);

  const alreadySelected = selectedTile.selected;
  if (alreadySelected || selectedTiles.length === 0) {
    return tiles.map((tile) => ({
      ...tile,
      selected: tile.id === selectedTile.id ? !tile.selected : tile.selected,
    }));
  } else {
    const previouslySelectedTile = selectedTiles[0];

    return tiles.map((tile) => {
      let position;
      if (tile.id === previouslySelectedTile.id) {
        position = selectedTile.position;
      } else if (tile.id === selectedTile.id) {
        position = previouslySelectedTile.position;
      } else {
        position = tile.position;
      }

      return {
        ...tile,
        selected: false,
        position,
      };
    });
  }
};

export const tileInOriginalPosition = (tile: TileData): boolean =>
  tile.position.x === tile.originalPosition.x &&
  tile.position.y === tile.originalPosition.y;

export const puzzleSolved = (tiles: TileData[]): boolean =>
  tiles.every(tileInOriginalPosition);
