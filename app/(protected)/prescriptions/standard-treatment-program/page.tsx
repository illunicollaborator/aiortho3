'use client';

import { useEffect, useState } from 'react';
import {
  useCreateStandardProgram,
  useStandardProgram,
  useDeleteStandardProgram,
  useUpdateStandardProgram,
} from '@/hooks';
import { Prescription, Program } from '@/models';
import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { createDefaultExercise } from '@/components/PrescriptionProgramCard/utils';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { showWarningToast } from '@/components/ui/toast-warning';

const isStandardProgramNumber = (name: string): boolean => {
  const standardProgramRegex = /^표준 프로그램 \d+$/;
  return standardProgramRegex.test(name);
};

export default function StandardTreatmentProgramPage() {
  const standardProgramQuery = useStandardProgram();
  const createStandardProgramMutation = useCreateStandardProgram();
  const updateStandardProgramMutation = useUpdateStandardProgram();
  const deleteStandardProgramMutation = useDeleteStandardProgram();
  const [standardProgram, setStandardProgram] = useState<Program[]>([]);
  const [currentCustomStandardProgramNumber, setCurrentCustomStandardProgramNumber] =
    useState<number>(1);
  const [editingPrograms, setEditingPrograms] = useState<boolean[]>([]);
  const [newProgramIndices, setNewProgramIndices] = useState<Set<number>>(new Set());

  const removeFromNewProgramIndices = (index: number) => {
    setNewProgramIndices(prev => {
      const newSet = new Set(prev);
      newSet.delete(index);
      return newSet;
    });
  };

  const handleAddCustomStandardProgramClick = () => {
    const newIndex = standardProgram.length;

    setStandardProgram(prev => [
      ...prev,
      {
        name: `표준 프로그램 ${currentCustomStandardProgramNumber}`,
        exercises: [createDefaultExercise()],
        repeatCount: 3,
      },
    ]);

    setCurrentCustomStandardProgramNumber(currentCustomStandardProgramNumber + 1);
    setEditingPrograms(prev => [...prev, true]);
    setNewProgramIndices(prev => new Set([...prev, newIndex]));
  };

  const handleStartEditing = (index: number) => {
    setEditingPrograms(prev => prev.map((isEditing, i) => (i === index ? true : isEditing)));
  };

  const handleStopEditing = (index: number) => {
    setEditingPrograms(prev => prev.map((isEditing, i) => (i === index ? false : isEditing)));
  };

  const handleUpdateProgram = (program: Program, index: number) => {
    const isNewProgram = newProgramIndices.has(index);

    if (isNewProgram) {
      createStandardProgramMutation.mutateAsync({
        name: program.name,
        exercises: program.exercises,
        repeatCount: program.repeatCount,
      });

      removeFromNewProgramIndices(index);
    } else {
      updateStandardProgramMutation.mutateAsync({
        presetIndex: index,
        name: program.name,
        exercises: program.exercises,
        repeatCount: program.repeatCount,
      });
    }

    handleStopEditing(index);
  };

  const handleDeleteProgram = (index: number) => {
    deleteStandardProgramMutation.mutateAsync(
      {
        presetIndex: index,
      },
      {
        onSuccess: () => {
          showSuccessToast(`${standardProgram[index].name} 삭제 완료`, '프로그램이 삭제되었어요.');
        },
        onError: () => {
          showWarningToast('프로그램 삭제 실패', '잠시 후 시도해주세요.');
        },
      }
    );

    removeFromNewProgramIndices(index);
  };

  const isAnyProgramEditing = editingPrograms.some(Boolean);

  useEffect(() => {
    if (standardProgramQuery.data) {
      setStandardProgram(standardProgramQuery.data.presets);
      setEditingPrograms(standardProgramQuery.data.presets.map(() => false));
      setCurrentCustomStandardProgramNumber(
        standardProgramQuery.data.presets.filter(program => isStandardProgramNumber(program.name))
          .length + 1
      );

      setNewProgramIndices(new Set());
    }
  }, [standardProgramQuery.data]);

  return (
    <section className="flex flex-col max-w-[680px]">
      <h1 className="text-3xl font-bold text-[var(--aiortho-gray-900)] mb-5">표준 치료 프로그램</h1>
      <h2 className=" text-[var(--aiortho-gray-600)] mb-13">
        프로그램의 개별 프로그램 생성을 미리 세팅할 수 있어요
      </h2>

      <div className="flex text-xl text-[var(--aiortho-gray-900)] font-bold mb-4">
        <span className="mr-2">프로그램</span>
        <span className="text-[var(--aiortho-primary)]">{standardProgram.length}</span>
        <span>개</span>
      </div>

      <div className="flex flex-col gap-3">
        {standardProgram.map((program, idx) => (
          <PrescriptionProgramCard
            key={`${program.name}-${idx}`}
            prescription={{ ...program, patientId: 0 }}
            isEditing={editingPrograms[idx]}
            isPending={
              createStandardProgramMutation.isPending ||
              updateStandardProgramMutation.isPending ||
              deleteStandardProgramMutation.isPending
            }
            defaultIsOpen={editingPrograms[idx]}
            showControl={!isAnyProgramEditing}
            onStartEditing={() => handleStartEditing(idx)}
            onStopEditing={() => handleStopEditing(idx)}
            onUpdate={p => handleUpdateProgram(p, idx)}
            onDelete={() => handleDeleteProgram(idx)}
            isDeleteConfirm
            checkIsDirty
          />
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full h-12"
          onClick={handleAddCustomStandardProgramClick}
          disabled={isAnyProgramEditing}
        >
          <PlusIcon size={24} className="text-[var(--aiortho-primary)]" />
          <span className="font-semibold text-base">프로그램 추가</span>
        </Button>
      </div>
    </section>
  );
}
