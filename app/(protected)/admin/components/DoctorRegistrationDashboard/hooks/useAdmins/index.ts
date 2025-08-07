import { useQuery } from '@tanstack/react-query';
import { getAdmins } from '@/apis/admin/root';
import { GetAdminsRequest } from '@/apis/admin/root/type';

export const useAdmins = (params: GetAdminsRequest) => {
  return useQuery({
    queryKey: ['admins', params],
    queryFn: () => getAdmins(params),
  });
};
