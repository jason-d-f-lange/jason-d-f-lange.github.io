import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ReactNode } from "react";

type Props = {
  columns: number;
  onColumnsChanged: (columns: number) => void;

  highlightCorrectTiles: boolean;
  onHighlightCorrectTilesChanged: (highlightCorrectTiles: boolean) => void;
};

const Setting = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

function Settings({
  columns,
  onColumnsChanged,
  highlightCorrectTiles,
  onHighlightCorrectTilesChanged,
}: Props) {
  const handleColumnsChanged = (value: number[]) => {
    onColumnsChanged(value[0]);
  };

  const handleHighlightCorrectTilesChanged = () => {
    onHighlightCorrectTilesChanged(!highlightCorrectTiles);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-l font-bold">Settings</h2>

      <Setting>
        <Label htmlFor="difficulty">
          Difficulty
          <p className="text-[0.8rem] text-muted-foreground mt-1">
            (This will reset the puzzle)
          </p>
        </Label>
        <Slider
          defaultValue={[columns]}
          onValueCommit={handleColumnsChanged}
          min={1}
          max={5}
          step={1}
        />
      </Setting>

      <Setting>
        <Label htmlFor="highlightCorrect">Highlight correct tiles</Label>
        <Checkbox
          name="highlightCorrect"
          checked={highlightCorrectTiles}
          onCheckedChange={handleHighlightCorrectTilesChanged}
        />
      </Setting>
    </div>
  );
}

export default Settings;
