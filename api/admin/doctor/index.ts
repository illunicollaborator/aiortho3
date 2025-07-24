import apiClient from '@/lib/axios';
import {
  GetDoctorProfileResponse,
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
