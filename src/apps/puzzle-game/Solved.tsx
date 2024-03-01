import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Confetti from "react-confetti";

function Solved() {
  return (
    <>
      <Confetti
        style={{ zIndex: 51 }}
        numberOfPieces={500}
        tweenDuration={10000}
        recycle={false}
      />
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              You solved it <span className="text-2xl">🎉</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              Refresh the page to start again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Dismiss</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Solved;
