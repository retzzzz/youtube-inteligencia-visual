
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  showCancel?: boolean;
  onConfirm?: () => void;
  confirmText?: string;
}

const BaseDialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  showCancel = true,
  onConfirm,
  confirmText = "Confirmar"
}: BaseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {children}
        </div>
        
        <DialogFooter>
          {footer || (
            <>
              {showCancel && (
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancelar
                </Button>
              )}
              {onConfirm && (
                <Button onClick={onConfirm}>
                  {confirmText}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BaseDialog;
