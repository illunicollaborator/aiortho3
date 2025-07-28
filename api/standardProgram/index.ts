import { GetStandardProgramListResponse } from './types';
import apiClient from '@/lib/axios';

const RESOURCE = '/ums/standardProgram';

export const getStandardProgramList = async (): Promise<GetStandardProgramListResponse> =>
  await apiClient.get(`${RESOURCE}`);
