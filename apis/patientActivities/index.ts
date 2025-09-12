import apiClient from '@/lib/axios';
import { GetPatientActivitiesRequest, GetPatientActivitiesResponse } from './types';

const RESOURCE = '/ums/patient-activities';

export const getActivities = async (
  params: GetPatientActivitiesRequest
): Promise<GetPatientActivitiesResponse> =>
  await apiClient.get(`${RESOURCE}/${params.patientId}/${params.date}`);
