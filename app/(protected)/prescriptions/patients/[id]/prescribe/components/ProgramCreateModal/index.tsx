import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Program } from '@/models';
import { createDefaultExercise } from '@/components/PrescriptionProgramCard/utils';

interface ProgramCreateModalProps {
  standardProgram: Program[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (program: Program) => void;
}

export default function ProgramCreateModal({
  isOpen,
  standardProgram,
  onClose,
  onSelect,
}: ProgramCreateModalProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const handleClose = () => {
    setSelectedProgram(null);
    onClose();
  };

  const handleSelect = () => {
    if (selectedProgram) {
      onSelect(selectedProgram);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-[528px] w-[95vw] sm:w-full rounded-[24px] max-h-[560px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 px-8 pt-12 pb-7 gap-0">
        <DialogHeader className="relative flex flex-row justify-between">
          <div className="flex flex-col gap-5">
            <DialogTitle className="text-2xl font-bold text-[var(--aiortho-gray-900)]">
              생성할 프로그램을 선택해주세요
            </DialogTitle>
            <DialogDescription className="text-aiortho-gray-600 text-[16px]">
              선택된 프로그램은 수정할 수 있어요.
            </DialogDescription>
          </div>

          <X
            className="absolute -top-9 -right-5 w-6 h-6 text-[var(--aiortho-gray-600)] cursor-pointer"
            onClick={handleClose}
          />
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-10">
          <div className="flex gap-2 font-bold">
            <span className="text-aiortho-gray-900">항목</span>

            <div className="flex">
              <span className="text-aiortho-primary">{standardProgram.length + 1}</span>
              <span className="text-aiortho-gray-900">개</span>
            </div>
          </div>

          <RadioGroup className="grid grid-cols-2 gap-x-6 gap-y-0">
            {standardProgram.map(item => 
            (item.isPreset = true) &&
            (
              <div key={item.name} className={cn('flex items-center w-full h-13 gap-3')}>
                <RadioGroupItem
                  className="border-2 border-aiortho-gray-200 data-[state=checked]:border-aiortho-primary data-[state=checked]:bg-transparent cursor-pointer disabled:border-aiortho-gray-200 disabled:data-[state=checked]:border-aiortho-gray-500 w-[22px] h-[22px] disabled:data-[state=checked]:text-aiortho-gray-500"
                  value={item.name}
                  id={`program-${item.name}`}
                  onClick={() => setSelectedProgram(item)}
                />
                <Label
                  htmlFor={`program-${item.name}`}
                  className="text-sm text-aiortho-gray-900 cursor-pointer"
                >
                  {item.name}
                </Label>
              </div>
            ))}

            <div className={cn('flex items-center w-full h-13 gap-3')}>
              <RadioGroupItem
                className="border-2 border-aiortho-gray-200 data-[state=checked]:border-aiortho-primary data-[state=checked]:bg-transparent cursor-pointer disabled:border-aiortho-gray-200 disabled:data-[state=checked]:border-aiortho-gray-500 w-[22px] h-[22px] disabled:data-[state=checked]:text-aiortho-gray-500"
                value={'개별 프로그램'}
                id={`개별 프로그램`}
                onClick={() =>
                  setSelectedProgram({
                    name: '',
                    exercises: [createDefaultExercise()],
                    repeatCount: 3,
                    isPreset: false
                  })
                }
              />
              <Label
                htmlFor={`개별 프로그램`}
                className="text-sm text-aiortho-gray-900 cursor-pointer"
              >
                개별 프로그램
              </Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="mt-7">
          <Button
            className="h-12 cursor-pointer w-full rounded-full text-sm"
            disabled={selectedProgram === null}
            onClick={handleSelect}
          >
            선택
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
