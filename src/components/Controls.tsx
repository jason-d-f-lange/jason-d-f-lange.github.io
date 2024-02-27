import styled from "@emotion/styled";
import { ChangeEvent } from "react";

type Props = {
  columns: number;
  onColumnsChanged: (columns: number) => void;

  highlightCorrectTiles: boolean;
  onHighlightCorrectTilesChanged: (highlightCorrectTiles: boolean) => void;
};

const Container = styled.div({
  border: "1px solid black",
  borderRadius: 4,
  width: "400px",
  display: "flex",
  background: "#e9e9e9",
  padding: "2rem",
  gap: 24,
  margin: "24px 0",
});

const Control = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "start",
});

function Controls({
  columns,
  onColumnsChanged,
  highlightCorrectTiles,
  onHighlightCorrectTilesChanged,
}: Props) {
  const handleColumnsChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value);
    if (number >= 1 && number <= 5) onColumnsChanged(number);
  };

  const handleHighlightCorrectTilesChanged = () => {
    onHighlightCorrectTilesChanged(!highlightCorrectTiles);
  };

  return (
    <Container>
      <Control>
        <label htmlFor="columns">Columns (1-5):</label>
        <input
          name="columns"
          type="number"
          value={columns}
          onChange={handleColumnsChanged}
        />
      </Control>

      <Control>
        <label htmlFor="highlightCorrect">Highlight correct tiles</label>
        <input
          name="highlightCorrect"
          type="checkbox"
          value={String(highlightCorrectTiles)}
          onChange={handleHighlightCorrectTilesChanged}
        />
      </Control>
    </Container>
  );
}

export default Controls;
