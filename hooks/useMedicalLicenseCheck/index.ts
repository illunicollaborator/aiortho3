import { useMutation } from '@tanstack/react-query';
import {
  PostDoctorMedicalLicenseCheckRequest,
  PostDoctorMedicalLicenseCheckResponse,
} from '@/apis/admin/doctor/types';
import { ErrorResponse } from '@/apis/types';
import { postDoctorMedicalLicenseCheck } from '@/apis/admin/doctor';

interface PostDoctorMedicalLicenseCheckVariables extends PostDoctorMedicalLicenseCheckRequest {
  token: string;
}

export const useMedicalLicenseCheck = () => {
  return useMutation<
    PostDoctorMedicalLicenseCheckResponse,
    ErrorResponse,
    PostDoctorMedicalLicenseCheckVariables
  >({
    mutationFn: ({ licenseNumber, token }) =>
      postDoctorMedicalLicenseCheck({ licenseNumber }, token),
  });
};
