import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogBackdrop,
} from "@headlessui/react";
import { Button } from "./button";
import { XIcon } from "lucide-react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  width: string;
  title: string;
}

export function Modal({
  show,
  onClose,
  children,
  width,
  title,
}: PropsWithChildren<ModalProps>) {
  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={cn(width, "w-full space-y-4 border bg-white p-6 rounded-md")}
        >
          <div className="flex justify-between align-top">
            <DialogTitle as="h3" className="text-lg md:text-xl">
              {title}
            </DialogTitle>
            <Button variant="outline" size="sm_icon" onClick={onClose}><XIcon /></Button>
          </div>
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
