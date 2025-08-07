import { getDepartmentList } from '@/apis/admin/common';
import { useQuery } from '@tanstack/react-query';

export const useMedicalDepartments = () => {
  return useQuery({
    queryKey: ['medical-department-list'],
    queryFn: getDepartmentList,
  });
};
