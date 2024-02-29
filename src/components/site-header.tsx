import { Button } from "@/components/ui/button";
import { SubApp } from "@/types/SubApp";

type Props = {
  apps: SubApp[];
  selectedApp: SubApp;
  onAppSelected: (appId: SubApp) => void;
};

export function SiteHeader({ apps, selectedApp, onAppSelected }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 border">
        <h1 className="font-bold text-2xl">
          J<span className="font-normal text-md">a</span>SON Lange
        </h1>
        <>
          {apps.map((app) => (
            <Button
              key={app.name}
              variant={selectedApp === app ? "default" : "link"}
              onClick={() => onAppSelected(app)}
            >
              {app.name}
            </Button>
          ))}
        </>
      </div>
    </header>
  );
}
