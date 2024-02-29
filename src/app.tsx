import { useState } from "react";
import PuzzleApp from "./apps/puzzle-game";
import { SiteHeader } from "./components/site-header";
import { SubApp } from "./types/SubApp";

const PUZZLE_APP: SubApp = { name: "Puzzle Game" };
const SUB_APPS: SubApp[] = [PUZZLE_APP];

function App() {
  const [selectedApp, setSelectedApp] = useState<SubApp>(PUZZLE_APP);

  return (
    <>
      <SiteHeader
        apps={SUB_APPS}
        selectedApp={selectedApp}
        onAppSelected={setSelectedApp}
      />

      <div
        className="container border border-t-0 p-0"
        style={{ height: "calc(100vh - 64px)" }}
      >
        {selectedApp === PUZZLE_APP && <PuzzleApp />}
      </div>
    </>
  );
}

export default App;
