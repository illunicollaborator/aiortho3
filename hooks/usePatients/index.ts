import { useQuery } from '@tanstack/react-query';
import { getPatientList } from '@/apis/patients';
import { GetPatientListRequest } from '@/apis/patients/types';

const QUERY_KEY = 'patients';

export const usePatients = (params: GetPatientListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: () => getPatientList(params),
  });
};
