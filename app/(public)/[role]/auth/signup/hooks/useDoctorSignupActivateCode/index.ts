import { useMutation } from '@tanstack/react-query';
import { postDoctorSignUpActivateCode } from '@/apis/admin/doctor';
import {
  PostDoctorSignUpActivateCodeRequest,
  PostDoctorSignUpActivateCodeResponse,
} from '@/apis/admin/doctor/types';
import { ErrorResponse } from '@/apis/types';

export const useDoctorSignupActivateCode = () => {
  return useMutation<
    PostDoctorSignUpActivateCodeResponse,
    ErrorResponse,
    PostDoctorSignUpActivateCodeRequest
  >({
    mutationFn: postDoctorSignUpActivateCode,
  });
};
