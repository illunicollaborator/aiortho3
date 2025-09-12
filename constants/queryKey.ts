import { GetPatientListRequest } from '@/apis/patients/types';

export const DOCTOR_PROFILE_QUERY_KEY = ['doctorProfile'];
export const NURSE_PROFILE_QUERY_KEY = ['nurseProfile'];
export const STANDARD_PROGRAM_QUERY_KEY = ['standardProgram'];
export const PATIENTS_QUERY_KEY = (params: GetPatientListRequest) => ['patients', params];
export const PATIENT_QUERY_KEY = (patientId: number) => ['patients', patientId];
export const ACTIVE_PRESCRIPTION_QUERY_KEY = (patientId: number) => [
  'activePrescription',
  patientId,
];
