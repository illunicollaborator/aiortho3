import { Program, Exercise } from '@/models';

export interface GetStandardProgramListRequest {}

export interface GetStandardProgramListResponse {
  adminId: string;
  presets: Program[];
}

export interface GetStaticProgramExerciseListRequest {}

export interface GetStaticProgramExerciseListResponse extends Array<Exercise> {}
