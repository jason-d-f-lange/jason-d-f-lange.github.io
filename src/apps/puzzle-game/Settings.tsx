import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/utils";
import { ReactNode } from "react";

type Props = {
  disabled: boolean;

  columns: number;
  onColumnsChanged: (columns: number) => void;

  highlightCorrectTiles: boolean;
  onHighlightCorrectTilesChanged: (highlightCorrectTiles: boolean) => void;
};

const Setting = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};

function Settings({
  disabled,
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
    <div
      className={cn(
        "flex flex-col gap-4 h-full w-full",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
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
          min={2}
          max={5}
          step={1}
          disabled={disabled}
        />
      </Setting>

      <Setting>
        <Label htmlFor="highlightCorrect">Highlight correct tiles</Label>
        <Checkbox
          name="highlightCorrect"
          checked={highlightCorrectTiles}
          onCheckedChange={handleHighlightCorrectTilesChanged}
          disabled={disabled}
        />
      </Setting>
    </div>
  );
}

export default Settings;
