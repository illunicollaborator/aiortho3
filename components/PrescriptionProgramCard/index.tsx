import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Exercise, ExerciseDirection, ExerciseDirectionLabel, Prescription } from '@/models';
import Divider from '@/components/Divider';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { calculateWeeks } from '@/lib/utils';
import { ChevronUp, Minus, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useStandardProgramStaticExercise } from '@/app/(protected)/prescriptions/patients/[id]/create/hooks/useStandardProgramStaticExercise';
import { createDefaultExercise } from './utils';

interface PrescriptionProgramCardProps {
  prescription: Prescription;
  defaultIsOpen?: boolean;
  disabled?: boolean;
}

const INITIAL_REPEAT_COUNT = 3;
const MAX_EXERCISE_LENGTH = 4;

export default function PrescriptionProgramCard({
  prescription,
  disabled = false,
  defaultIsOpen = false,
}: PrescriptionProgramCardProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);
  const [exercises, setExercises] = useState<Exercise[]>(prescription.exercises);
  const [repetitions, setRepetitions] = useState<number>(INITIAL_REPEAT_COUNT);
  const [isEdit, setIsEdit] = useState<boolean>(!disabled);

  const staticExerciseListQuery = useStandardProgramStaticExercise();
  const { data: staticExerciseList } = staticExerciseListQuery;

  const handleExerciseChange = (value: string, idx: number) => {
    if (!staticExerciseList) return;

    const newExercise = staticExerciseList.find(exercise => exercise.exerciseId === value);

    if (!newExercise) return;

    setExercises(
      exercises.map((exercise, i) => {
        if (i === idx) {
          if (!('description' in newExercise)) {
            delete exercise.description;
          }

          return { ...exercise, ...newExercise };
        }

        return exercise;
      })
    );
  };

  const handleDirectionChange = (value: string, idx: number) => {
    const direction = value === 'left' ? ExerciseDirection.Left : ExerciseDirection.Right;
    setExercises(
      exercises.map((exercise, i) => (i === idx ? { ...exercise, direction } : exercise))
    );
  };

  const handleDurationChange = (value: number, idx: number) => {
    setExercises(
      exercises.map((exercise, i) => (i === idx ? { ...exercise, duration: value } : exercise))
    );
  };

  const handleAddExercise = () => {
    const newExercise = createDefaultExercise();
    setExercises([...exercises, newExercise]);
  };

  const handleRepetitionsChange = (change: number) => {
    const newValue = repetitions + change;
    if (newValue >= 3 && newValue <= 12) {
      setRepetitions(newValue);
    }
  };

  const handleCreateComplete = () => {
    setIsEdit(!isEdit);
  };

  console.log(isEdit);

  if (!staticExerciseList) {
    return null;
  }

  return (
    <Card
      className={`border border-[var(--aiortho-gray-100)] p-5 transition-all duration-300 ease-in-out ${isOpen ? 'shadow-md' : 'shadow-sm'}`}
    >
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center cursor-pointer">
            <div className="flex gap-2">
              <span className="text-[var(--aiortho-gray-900)] text-lg font-semibold font-pretendard">
                {prescription.name}
              </span>

              {prescription.startDate && prescription.endDate && (
                <span className="text-xs text-[#A77600] font-bold p-2 bg-[#FEC53d]/20 rounded-sm">
                  {calculateWeeks(prescription.startDate, prescription.endDate)}주 처방
                </span>
              )}
            </div>

            <ChevronUp
              className={`text-[var(--aiortho-gray-700)] h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <Divider className="my-5" />

          <CardContent className="p-0 flex flex-col gap-7">
            {exercises.map((exercise, idx) => (
              <div key={`재활운동-${idx + 1}`} className="flex flex-col gap-7">
                <span className="text-[var(--aiortho-gray-900)] font-semibold">
                  재활 운동 {idx + 1}
                </span>
                <div className="flex flex-col gap-3">
                  <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                    운동 종류 선택
                  </Label>
                  <Select
                    value={exercise.exerciseId}
                    onValueChange={(value: string) => handleExerciseChange(value, idx)}
                  >
                    <SelectTrigger
                      className={cn(
                        'w-full border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus-visible:ring-1 focus-visible:ring-[var(--aiortho-primary)] focus-visible:border-[var(--aiortho-primary)] px-4 py-3 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99] cursor-pointer',
                        disabled && 'text-[var(--aiortho-gray-600)]'
                      )}
                      disabled={!isEdit}
                    >
                      <SelectValue placeholder="운동 종류를 선택해주세요." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {staticExerciseList.map(exercise => (
                          <SelectItem
                            key={`표준 static 프로그램-${exercise.exerciseId}`}
                            value={exercise.exerciseId}
                            className={cn(
                              'cursor-pointer',
                              disabled && 'text-[var(--aiortho-gray-600)]'
                            )}
                          >
                            <span className="truncate">{exercise.name}</span>
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {exercise.description && (
                  <div className="flex flex-col gap-3">
                    <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                      {exercise.description}
                    </Label>
                    <RadioGroup
                      value={exercise.direction}
                      onValueChange={value => handleDirectionChange(value, idx)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="left"
                          id={`exercise-${idx}-direction-left`}
                          className="text-[var(--aiortho-gray-500)] border-2 border-[var(--aiortho-gray-200)] data-[state=checked]:border-[var(--aiortho-gray-500)] data-[state=checked]:bg-transparent cursor-pointer"
                          checked={exercise.direction === ExerciseDirection.Left}
                          disabled={!isEdit}
                        />
                        <Label
                          htmlFor={`exercise-${idx}-direction-left`}
                          className={cn(
                            'text-[var(--aiortho-gray-900)] text-sm cursor-pointer',
                            disabled && 'text-[var(--aiortho-gray-500)] cursor-default'
                          )}
                        >
                          {ExerciseDirectionLabel[ExerciseDirection.Left]}
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="right"
                          id={`exercise-${idx}-direction-right`}
                          className="text-[var(--aiortho-gray-500)] border-2 border-[var(--aiortho-gray-200)] data-[state=checked]:border-[var(--aiortho-gray-500)] data-[state=checked]:bg-transparent cursor-pointer"
                          checked={exercise.direction === ExerciseDirection.Right}
                          disabled={!isEdit}
                        />
                        <Label
                          htmlFor={`exercise-${idx}-direction-right`}
                          className={cn(
                            'text-[var(--aiortho-gray-900)] text-sm cursor-pointer',
                            disabled && 'text-[var(--aiortho-gray-500)] cursor-default'
                          )}
                        >
                          {ExerciseDirectionLabel[ExerciseDirection.Right]}
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                {exercise.exerciseId && (
                  <div className="flex flex-col gap-3">
                    <Label className="text-[var(--aiortho-gray-500)] text-sm px-0 py-0 ">
                      시간 선택
                    </Label>
                    <Select
                      value={exercise.duration !== 0 ? String(exercise.duration) : ''}
                      onValueChange={value => handleDurationChange(Number(value), idx)}
                    >
                      <SelectTrigger
                        className={cn(
                          'w-full border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus-visible:ring-1 focus-visible:ring-[var(--aiortho-primary)] focus-visible:border-[var(--aiortho-primary)] px-4 py-3 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99] cursor-pointer',
                          disabled && 'text-[var(--aiortho-gray-600)]'
                        )}
                        disabled={!isEdit}
                      >
                        <SelectValue placeholder="운동 시간을 선택해주세요." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Array.from({ length: 12 }, (_, i) => (
                            <SelectItem
                              key={`운동 시간-${i + 1}`}
                              value={String(i + 1)}
                              className={cn(
                                'cursor-pointer',
                                disabled && 'text-[var(--aiortho-gray-600)]'
                              )}
                            >
                              {i + 1}분
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ))}

            {exercises.length < MAX_EXERCISE_LENGTH && isEdit && (
              <Button
                type="button"
                className="font-bold text-[var(--aiortho-primary)] bg-[#BDD5FF80] w-20 h-10 rounded-lg cursor-pointer hover:bg-[#BDD5FF]"
                onClick={handleAddExercise}
              >
                항목 추가
              </Button>
            )}

            <Divider />

            <div className="flex justify-between">
              <div className="flex flex-col gap-3">
                <p className="text-[var(--aiortho-gray-900)] text-lg font-bold">프로그램 반복 수</p>
                <p className="text-[var(--aiortho-gray-600)] text-sm">
                  최소 3회, 최대 12회까지 설정할 수 있어요
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="cursor-pointer bg-[#F7F9FC] h-6 w-6 text-[var(--aiortho-gray-600)] hover:text-[var(--aiortho-gray-900)] disabled:text-[#DADFE9]"
                  onClick={() => handleRepetitionsChange(-1)}
                  disabled={repetitions <= 3 || !isEdit}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-[var(--aiortho-gray-600)] text-sm mx-2">{repetitions}회</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-[#F7F9FC] cursor-pointer h-6 w-6 text-[var(--aiortho-gray-600)] hover:text-[var(--aiortho-gray-900)] disabled:text-[#DADFE9]"
                  onClick={() => handleRepetitionsChange(1)}
                  disabled={repetitions >= 12 || !isEdit}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isEdit && (
              <Button
                type="button"
                className="cursor-pointer w-27 h-11 font-semibold rounded-lg"
                onClick={handleCreateComplete}
              >
                생성 완료
              </Button>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
