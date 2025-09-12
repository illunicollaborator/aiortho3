import apiClient from '@/lib/axios';
import { PostAppLicenseRequest, PostAppLicenseResponse } from './types';

const RESOURCE = '/ums/applicense';

export const postAppLicense = async (
  data: PostAppLicenseRequest
): Promise<PostAppLicenseResponse> => await apiClient.post(`${RESOURCE}`, data);
