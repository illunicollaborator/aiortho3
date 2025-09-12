import { useQuery } from '@tanstack/react-query';
import { getPatientList } from '@/apis/patients';
import { GetPatientListRequest } from '@/apis/patients/types';
import { PATIENTS_QUERY_KEY } from '@/constants/queryKey';

export const usePatients = (params: GetPatientListRequest) => {
  return useQuery({
    queryKey: PATIENTS_QUERY_KEY(params),
    queryFn: () => getPatientList(params),
  });
};
