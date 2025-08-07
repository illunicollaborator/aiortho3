import { useMutation } from '@tanstack/react-query';
import { postDoctorProfileVerify } from '@/apis/admin/doctor';
import {
  PostDoctorProfileVerifyRequest,
  PostDoctorProfileVerifyResponse,
} from '@/apis/admin/doctor/types';
import { ErrorResponse } from '@/apis/types';

export const useDoctorVerifyProfile = () => {
  return useMutation<
    PostDoctorProfileVerifyResponse,
    ErrorResponse,
    PostDoctorProfileVerifyRequest
  >({
    mutationFn: postDoctorProfileVerify,
  });
};
