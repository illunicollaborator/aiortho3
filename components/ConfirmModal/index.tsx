import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmText,
  cancelText,
  onClose,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex flex-col justify-between h-60 pt-12 px-8 pb-7 rounded-3xl">
        <DialogHeader className="flex flex-col gap-5">
          <DialogTitle className="font-bold text-2xl text-aiortho-gray-900 m-0">
            {title}
          </DialogTitle>
          <DialogDescription className="text-[var(--aiortho-gray-600)] text-[16px] m-0">
            {description}
          </DialogDescription>
          <button
            onClick={onClose}
            className="absolute z-0 rounded-[29px] flex min-h-6 min-w-6 items-center justify-center right-3 top-3 cursor-pointer"
          >
            <X className="w-5 h-5 text-[#66798D]" />
          </button>
        </DialogHeader>
        <DialogFooter className="flex gap-3">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="cursor-pointer flex-1 h-12 font-bold m-0 rounded-full text-aiortho-gray-800 bg-[#ECEFF4]"
              onClick={onClose}
            >
              {cancelText ?? '취소'}
            </Button>
          </DialogClose>

          <Button
            type="button"
            className="cursor-pointer flex-1 h-12 font-bold rounded-full"
            onClick={onConfirm}
          >
            {confirmText ?? '확인'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
