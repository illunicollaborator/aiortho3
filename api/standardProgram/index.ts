import { GetStandardProgramListResponse, GetStaticProgramExerciseListResponse } from './types';
import apiClient from '@/lib/axios';

const RESOURCE = '/ums/standardProgram';

export const getStandardProgramList = async (): Promise<GetStandardProgramListResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const getStaticProgramExerciseList =
  async (): Promise<GetStaticProgramExerciseListResponse> =>
    await apiClient.get(`${RESOURCE}/programs`);
