import apiClient from '@/lib/axios';
import {
  GetDoctorProfileResponse,
  PostDoctorMedicalLicenseCheckRequest,
  PostDoctorMedicalLicenseCheckResponse,
  PostDoctorSignUpActivateCodeRequest,
  PostDoctorSignUpActivateCodeResponse,
} from './types';

const RESOURCE = '/ums/doctor';

export const postDoctorSignUpActivateCode = async (
  data: PostDoctorSignUpActivateCodeRequest
): Promise<PostDoctorSignUpActivateCodeResponse> =>
  await apiClient.post(`${RESOURCE}/signup/activatecode`, data);

export const getDoctorProfile = async (): Promise<GetDoctorProfileResponse> =>
  await apiClient.get(`${RESOURCE}`);

export const postDoctorMedicalLicenseCheck = async (
  data: PostDoctorMedicalLicenseCheckRequest,
  token: string
): Promise<PostDoctorMedicalLicenseCheckResponse> =>
  await apiClient.post(`${RESOURCE}/check/license`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
