'use client';

import PatientInfoCard from '@/components/PatientInfoCard';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { showWarningToast } from '@/components/ui/toast-warning';
import { usePatient } from '@/hooks';
import { useAuthStore } from '@/store/authStore';
import { useParams, useRouter } from 'next/navigation';
import {
  ActivePrescription,
  MedicalLicenseDetails,
  PatientController,
  PrescriptionHistory,
  RehabilitationStatus,
} from './components';
import { useActivePrescription, useDeletePatient } from './hooks';

export default function PatientDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const patientQuery = usePatient(Number(id));
  const activePrescriptionQuery = useActivePrescription(Number(id));
  const deletePatientMutation = useDeletePatient();
  const { auth } = useAuthStore();

  const handleRoutePrescribe = () => {
    router.push(`/prescriptions/patients/${id}/prescribe`);
  };

  const handleDeletePatient = () => {
    deletePatientMutation.mutate(
      { patientId: Number(id) },
      {
        onSuccess: () => {
          showSuccessToast('환자 삭제 완료', '환자 등록하기에서 환자를 재등록할 수 있어요.');
          router.replace('/prescriptions/patients');
        },
        onError: () => {
          showWarningToast('환자 삭제 실패', '잠시 후 시도해주세요.');
        },
      }
    );
  };

  const patient = patientQuery.data;
  const isPatientPending = patientQuery.isPending;
  const activePrescription = activePrescriptionQuery.data;
  const isActivePrescriptionPending = activePrescriptionQuery.isPending;

  if (!patient || !auth || isPatientPending || isActivePrescriptionPending) return null;

  return (
    <div className="flex flex-col gap-30 max-w-[572px] pb-17">
      <PatientInfoCard patient={patient} hidePrescription={auth.role === 'Nurse'} />
      <ActivePrescription
        role={auth.role}
        prescription={activePrescription}
        onClick={handleRoutePrescribe}
      />
      <PrescriptionHistory patientId={Number(id)} />
      <RehabilitationStatus patientId={Number(id)} license={patient.license} />
      <MedicalLicenseDetails patientId={Number(id)} />
      <PatientController
        role={auth.role}
        name={patient.name}
        disabled={Boolean(activePrescription)}
        onClick={handleRoutePrescribe}
        onDelete={handleDeletePatient}
      />
    </div>
  );
}
