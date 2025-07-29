import { useQuery } from '@tanstack/react-query';
import { getHospitalList } from '@/api/admin/common';
import { GetHospitalListRequest } from '@/api/admin/common/types';

export const useHospitals = (params: GetHospitalListRequest) => {
  return useQuery({
    queryKey: ['hospitals', params],
    queryFn: () => getHospitalList(params),
  });
};
