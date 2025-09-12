import { useQuery } from '@tanstack/react-query';
import { getStandardProgramList } from '@/apis/standardProgram';
import { GetStandardProgramListResponse } from '@/apis/standardProgram/types';
import { ErrorResponse } from '@/apis/types';
import { STANDARD_PROGRAM_QUERY_KEY } from '@/constants/queryKey';

export const useStandardProgram = () => {
  return useQuery<GetStandardProgramListResponse, ErrorResponse>({
    queryKey: STANDARD_PROGRAM_QUERY_KEY,
    queryFn: getStandardProgramList,
  });
};
