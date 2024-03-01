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

const shuffle = (tiles: TileData[]): TileData[] => {
  let shuffles = 0;

  do {
    for (let currentIndex = tiles.length; currentIndex > 0; currentIndex--) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      const temp = tiles[currentIndex].position;
      tiles[currentIndex].position = tiles[randomIndex].position;
      tiles[randomIndex].position = temp;
    }

    shuffles++;
  } while (tiles.some(tileInOriginalPosition) && shuffles < 10);

  return tiles;
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
        id: tiles.length,
        image,
        width: tileWidth,
        height: tileHeight,
        originalPosition: position,
        position,
        selected: false,
      });
    }
  }

  return shuffle(tiles);
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
