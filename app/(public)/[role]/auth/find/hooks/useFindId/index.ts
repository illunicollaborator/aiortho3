import { useMutation } from '@tanstack/react-query';
import { findId } from '@/apis/admin/common';
import { FindIdRequest, FindIdResponse } from '@/apis/admin/common/types';
import { ErrorResponse } from '@/apis/types';

export const useFindId = () => {
  return useMutation<FindIdResponse, ErrorResponse, FindIdRequest>({
    mutationFn: findId,
  });
};
