import { Exercise } from '@/models';
import { ExerciseDirection } from '@/models';

export const createDefaultExercise = (): Exercise => {
  return {
    exerciseId: '',
    name: '',
    duration: 3,
    direction: ExerciseDirection.Left,
    description: '',
  };
};
