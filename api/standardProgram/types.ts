import { Exercise } from '@/models';

export interface StaticProgramExercise {
  exerciseId: string;
  name: string;
}

export interface GetStandardProgramListRequest {}

export interface GetStandardProgramListResponse {
  adminId: string;
  presets: {
    name: string;
    repeatCount: number;
    exercises: Exercise[];
  }[];
}

export interface GetStaticProgramExerciseListRequest {}

export interface GetStaticProgramExerciseListResponse extends Array<StaticProgramExercise> {}
