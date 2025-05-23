import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
  DialogDescription,
} from "./dialog";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const DialogWrapper = ({ open, onClose, title, children }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Veuillez remplir les informations ci-dessous.
          </DialogDescription>
          <div className="mt-4">{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};
