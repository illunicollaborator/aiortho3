import { useQuery } from '@tanstack/react-query';
import { getPrescriptionHistory } from '@/apis/prescription';
import { GetPrescriptionHistoryRequest } from '@/apis/prescription/types';

interface UsePrescriptionHistoryProps {
  patientId: number;
  params: GetPrescriptionHistoryRequest;
}

export const usePrescriptionHistory = ({ patientId, params }: UsePrescriptionHistoryProps) => {
  return useQuery({
    queryKey: ['prescriptionHistory', patientId, params],
    queryFn: () => getPrescriptionHistory(patientId, params),
  });
};
