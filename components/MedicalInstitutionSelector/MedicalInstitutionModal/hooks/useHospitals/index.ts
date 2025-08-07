import { useQuery } from '@tanstack/react-query';
import { getHospitalList } from '@/apis/admin/common';
import { GetHospitalListRequest } from '@/apis/admin/common/types';

export const useHospitals = (params: GetHospitalListRequest) => {
  return useQuery({
    queryKey: ['hospitals', params],
    queryFn: () => getHospitalList(params),
  });
};
