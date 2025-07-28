import { Exercise } from '@/models';

export interface GetStandardProgramListRequest {}

export interface GetStandardProgramListResponse {
  adminId: string;
  presets: {
    name: string;
    repeatCount: number;
    exercises: Exercise[];
  }[];
}
