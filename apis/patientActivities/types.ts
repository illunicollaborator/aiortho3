import { PatientActivity } from '@/models';

export interface GetPatientActivitiesRequest {
  patientId: number;
  date: string;
}

export interface GetPatientActivitiesResponse extends PatientActivity {}
