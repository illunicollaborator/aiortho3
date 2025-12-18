import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { createDefaultExercise } from '@/components/PrescriptionProgramCard/utils';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Prescription, Program } from '@/models';
import { X } from 'lucide-react';
import { useState } from 'react';

interface ProgramCreateModalProps {
  standardProgram: Program[];
  lastPrescription?: Prescription;
  isOpen: boolean;
  onClose: () => void;
  onSelect: (program: Program) => void;
}

export default function ProgramCreateModal({
  isOpen,
  standardProgram,
  lastPrescription,
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
      <DialogContent className="w-[528px] max-w-[95vw] rounded-3xl data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:duration-300 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:duration-200 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 px-8 pt-12 pb-7 gap-0">
        <DialogHeader className="relative flex flex-row justify-between">
          <div className="flex flex-col gap-5">
            <DialogTitle className="text-2xl leading-[1.4] font-bold text-[#161621]">
              생성할 프로그램을 선택해주세요
            </DialogTitle>
            <DialogDescription className="text-left text-[#66798D] text-base leading-[22px]">
              선택된 프로그램은 수정할 수 있어요.
            </DialogDescription>
          </div>

          <X
            className="absolute -top-9 -right-5 size-6 text-[#66798D] cursor-pointer"
            onClick={handleClose}
          />
        </DialogHeader>

        <div className="flex flex-col mt-10">
          <div className="flex gap-2 font-bold leading-5">
            <span className="text-lg text-[#161621]">항목</span>

            <div className="flex">
              <span className="text-lg text-[#0054A6]">
                {standardProgram.length + 1 + (lastPrescription ? 1 : 0)}
              </span>
              <span className="text-lg text-[#161621]">개</span>
            </div>
          </div>

          <RadioGroup className="grid grid-cols-2 gap-x-6 gap-y-0 max-h-78 overflow-y-auto overflow-x-hidden mt-4">
            {standardProgram.map(
              item =>
                (item.isPreset = true) && (
                  <div key={item.name} className={cn('flex items-center w-[220px] h-13 gap-2')}>
                    <RadioGroupItem
                      className="border-2 border-aiortho-gray-200 data-[state=checked]:border-aiortho-primary data-[state=checked]:bg-transparent cursor-pointer disabled:border-aiortho-gray-200 disabled:data-[state=checked]:border-aiortho-gray-500 size-[22px] disabled:data-[state=checked]:text-aiortho-gray-500"
                      value={item.name}
                      id={`program-${item.name}`}
                      onClick={() => setSelectedProgram(item)}
                    />
                    <Label
                      htmlFor={`program-${item.name}`}
                      className="text-sm text-[#161621] opacity-80 cursor-pointer truncate"
                    >
                      {item.name}
                    </Label>
                  </div>
                )
            )}

            <div className={cn('flex items-center w-[220px] h-13 gap-2')}>
              <RadioGroupItem
                className="border-2 border-aiortho-gray-200 data-[state=checked]:border-aiortho-primary data-[state=checked]:bg-transparent cursor-pointer disabled:border-aiortho-gray-200 disabled:data-[state=checked]:border-aiortho-gray-500 size-[22px] disabled:data-[state=checked]:text-aiortho-gray-500"
                value={'개별 프로그램'}
                id={`개별 프로그램`}
                onClick={() =>
                  setSelectedProgram({
                    name: '',
                    exercises: [createDefaultExercise()],
                    repeatCount: 3,
                    isPreset: false,
                  })
                }
              />
              <Label
                htmlFor={`개별 프로그램`}
                className="text-sm text-[#161621] opacity-80 cursor-pointer truncate"
              >
                개별 프로그램
              </Label>
            </div>

            {lastPrescription && (
              <div className={cn('flex items-center w-[220px] h-13 gap-2')}>
                <RadioGroupItem
                  className="border-2 border-aiortho-gray-200 data-[state=checked]:border-aiortho-primary data-[state=checked]:bg-transparent cursor-pointer disabled:border-aiortho-gray-200 disabled:data-[state=checked]:border-aiortho-gray-500 size-[22px] disabled:data-[state=checked]:text-aiortho-gray-500"
                  value={'직전 처방 불러오기'}
                  id={`직전 처방 불러오기`}
                  onClick={() =>
                    setSelectedProgram({
                      name: lastPrescription.name,
                      exercises: lastPrescription.exercises,
                      repeatCount: lastPrescription.repeatCount,
                      isPreset: false,
                    })
                  }
                />
                <Label
                  htmlFor={`직전 처방 불러오기`}
                  className="text-sm text-[#161621] opacity-80 cursor-pointer truncate"
                >
                  직전 처방 불러오기
                </Label>
              </div>
            )}
          </RadioGroup>
        </div>

        <DialogFooter className="mt-7">
          <Button
            className="h-12 cursor-pointer w-full rounded-full text-sm font-bold disabled:bg-[#BDD5FF] disabled:text-white disabled:opacity-100"
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
