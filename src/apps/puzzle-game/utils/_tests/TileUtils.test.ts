import { Position, TileData } from "../../types/Tile";
import {
  generateTiles,
  puzzleSolved,
  selectTile,
  shuffleTiles,
  tileInOriginalPosition,
} from "../TileUtils";

const createMockTile = (overrides?: Partial<TileData>): TileData => ({
  id: crypto.randomUUID(),
  width: 100,
  height: 100,
  originalPosition: { x: 0, y: 0 },
  position: { x: 0, y: 0 },
  selected: false,
  ...overrides,
});

const createMockTiles = (n: number): TileData[] =>
  Array(n).fill(null).map(createMockTile);

it("should not have any tiles in their original position after shuffling", () => {
  const position1: Position = { x: 1, y: 1 };
  const position2: Position = { x: 2, y: 2 };
  const position3: Position = { x: 3, y: 3 };

  const tiles = [
    createMockTile({ originalPosition: position1, position: position1 }),
    createMockTile({ originalPosition: position2, position: position2 }),
    createMockTile({ originalPosition: position3, position: position3 }),
  ];

  for (let i = 0; i < 50; i++) {
    const shuffledTiles = shuffleTiles(tiles);

    shuffledTiles.every((tile) => {
      expect(tile.position).not.toEqual(tile.originalPosition);
    });
  }
});

it("should not have any tiles horizontally adjacent to correct tiles after shuffling", () => {
  // A 4x1 image with 4 columns will generate 1 row of 4 tiles
  const image = new Image(4, 1);
  // Give each tile a simple id: 0, 1, 2, 3
  const tiles = generateTiles(image, 4).map((tile, index) => ({
    ...tile,
    id: index.toString(),
  }));

  for (let i = 0; i < 100; i++) {
    const shuffledTiles = shuffleTiles(tiles);

    // Sort the shuffled tiles by their newly shuffled position
    const sortedIds = shuffledTiles
      .sort((a, b) => (a.position.x < b.position.x ? -1 : 1))
      .map((it) => Number(it.id));

    // If there are any sequential ids then there are tiles adjacent to a correct tile
    // e.g. 0, 2, 3, 1 is invalid because 2 and 3 were originally next to each other
    const hasSequentialIds = sortedIds.some(
      (id, index) => id === sortedIds[index + 1] - 1
    );

    expect(hasSequentialIds).toBe(false);
  }
});

// See the above test for the corresponding horizontal check
it("should not have any tiles vertically adjacent to correct tiles after shuffling", () => {
  const image = new Image(1, 4);
  const tiles = generateTiles(image, 1).map((tile, index) => ({
    ...tile,
    id: index.toString(),
  }));

  for (let i = 0; i < 100; i++) {
    const shuffledTiles = shuffleTiles(tiles);

    const sortedIds = shuffledTiles
      .sort((a, b) => (a.position.y < b.position.y ? -1 : 1))
      .map((it) => Number(it.id));

    const hasSequentialIds = sortedIds.some(
      (id, index) => id === sortedIds[index + 1] - 1
    );

    expect(hasSequentialIds).toBe(false);
  }
});

it("should generate equally sized tiles", () => {
  const image = new Image(600, 1000);
  const tiles = generateTiles(image, 2);

  tiles.every((tile) => {
    expect(tile.width).toBe(tiles[0].width);
    expect(tile.height).toBe(tiles[0].height);
  });
});

it("should generate tiles where height is as square as possible", () => {
  const image = new Image(600, 850);
  const tiles = generateTiles(image, 2);

  expect(tiles[0].width).toBe(300);
  expect(tiles[0].height).toBe(283.3333333333333);
});

it("should select tile when no tiles are selected", () => {
  const tiles = createMockTiles(2);
  const updatedTiles = selectTile(tiles, tiles[0]);
  expect(updatedTiles[0].selected).toBe(true);
  expect(updatedTiles[1].selected).toBe(false);
});

it("should de-select tile when selected tile is selected", () => {
  const tiles = [createMockTile({ selected: true }), createMockTile()];
  const updatedTiles = selectTile(tiles, tiles[0]);
  expect(updatedTiles[0].selected).toBe(false);
  expect(updatedTiles[1].selected).toBe(false);
});

it("should swap tile positions when another tile is selected", () => {
  const position1: Position = { x: 1, y: 1 };
  const position2: Position = { x: 2, y: 2 };

  const tiles = [
    createMockTile({ position: position1, selected: true }),
    createMockTile({ position: position2 }),
    createMockTile(),
  ];

  const updatedTiles = selectTile(tiles, tiles[1]);

  expect(updatedTiles[0].selected).toBe(false);
  expect(updatedTiles[0].position).toBe(position2);

  expect(updatedTiles[1].selected).toBe(false);
  expect(updatedTiles[1].position).toBe(position1);

  expect(updatedTiles[2].selected).toBe(false);
  expect(updatedTiles[2].position).toBe(tiles[2].position);
});

it("should know if tile is in original position", () => {
  const tile = createMockTile();
  expect(tileInOriginalPosition(tile)).toBe(true);

  tile.position = { x: 1, y: 0 };
  expect(tileInOriginalPosition(tile)).toBe(false);
});

it("should know if puzzle is solved", () => {
  const tiles = createMockTiles(2);
  expect(puzzleSolved(tiles)).toBe(true);

  tiles[0].position = { x: 1, y: 0 };
  expect(puzzleSolved(tiles)).toBe(false);
});
