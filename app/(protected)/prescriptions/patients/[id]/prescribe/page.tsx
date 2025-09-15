'use client';

import { useParams, useRouter } from 'next/navigation';
import { usePatient, useStandardProgram } from '@/hooks';
import PatientInfoCard from '@/components/PatientInfoCard';
import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { PrescriptionPeriodSelector, ProgramCreateModal } from './components';
import { useCreatePrescription } from './hooks';
import PrescriptionProgramCard from '@/components/PrescriptionProgramCard';
import { Prescription, Program } from '@/models';
import { Form, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  calculateWeeks,
  getCurrentDateYYYYMMDD,
  getPeriodYYYYMMDD,
  isDoctorRole,
} from '@/lib/utils';
import { showWarningToast } from '@/components/ui/toast-warning';
import { showSuccessToast } from '@/components/ui/toast-notification';
import { useAuthStore } from '@/store/authStore';
import { useCreatePrescriptionRequest } from './hooks/useCreatePrescriptionRequest';
import { useActivePrescription } from '../hooks';
import { useUpdatePrescription } from './hooks/useUpdatePrescription';

const formSchema = z.object({
  period: z.string().min(1, '치료 기간을 선택해주세요'),
});

export type FormValues = z.infer<typeof formSchema>;

export default function CreatePrescriptionPage() {
  const { auth } = useAuthStore();
  if (!auth) return null;
  const router = useRouter();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const patientQuery = usePatient(Number(id));
  const activePrescriptionQuery = useActivePrescription(Number(id));
  const standardProgramQuery = useStandardProgram();
  const createPrescriptionMutation = useCreatePrescription();
  const createPrescriptionRequestMutation = useCreatePrescriptionRequest();
  const updatePrescriptionMutation = useUpdatePrescription();
  const [prescriptionProgram, setPrescriptionProgram] = useState<Prescription>();
  const [prescriptionProgramIsDirty, setPrescriptionProgramIsDirty] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [minPeriod, setMinPeriod] = useState(1);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      period: '',
    },
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSetProgram = (program: Program) => {
    setPrescriptionProgram({
      ...program,
      patientId: Number(id),
    });

    setIsEditing(true);
  };

  const handleDeleteProgram = () => {
    setPrescriptionProgram(undefined);
  };

  const onSubmit = async (data: FormValues) => {
    if (!prescriptionProgram) return;

    const activePrescription = activePrescriptionQuery.data;
    const initialStartDate = activePrescription?.startDate ?? '';
    const { startDate, endDate } = getPeriodYYYYMMDD(Number(data.period), initialStartDate);

    const payload = {
      exercises: prescriptionProgram.exercises,
      repeatCount: prescriptionProgram.repeatCount,
      startDate,
      endDate,
      patientId: Number(id),
      name: prescriptionProgram.name,
    };

    if (activePrescription && activePrescription.prescriptionId) {
      // 수정
      const updatePayload = {
        prescriptionId: activePrescription.prescriptionId,
        params: {
          exercises: prescriptionProgram.exercises,
          repeatCount: prescriptionProgram.repeatCount,
          endDate,
          name: prescriptionProgram.name,
        },
      };

      await updatePrescriptionMutation.mutateAsync(updatePayload, {
        onSuccess: () => {
          router.push(`/prescriptions/patients/${id}`);

          setTimeout(() => {
            showSuccessToast(
              '프로그램 처방 수정 완료',
              '처방된 프로그램 내역은 처방 상세 내역에서 확인할 수 있어요.'
            );
          }, 500);
        },
      });
    } else {
      // 최초 생성
      if (isDoctorRole(auth.role)) {
        await createPrescriptionMutation.mutateAsync(payload, {
          onSuccess: () => {
            router.push(`/prescriptions/patients/${id}`);

            setTimeout(() => {
              showSuccessToast(
                '프로그램 처방 완료',
                '처방된 프로그램 내역은 처방 상세 내역에서 확인할 수 있어요.'
              );
            }, 500);
          },
          onError: () => {
            showWarningToast('프로그램 처방 실패', '잠시 후 시도하세요.');
          },
        });
      } else {
        await createPrescriptionRequestMutation.mutateAsync(payload, {
          onSuccess: () => {
            showSuccessToast('프로그램 처방 요청 완료', '처방 요청이 완료되었습니다.');
            router.push(`/prescriptions/patients/${id}`);
          },
        });
      }
    }
  };

  useEffect(() => {
    if (activePrescriptionQuery.data) {
      setPrescriptionProgram(activePrescriptionQuery.data);
    }

    if (activePrescriptionQuery.data?.startDate && activePrescriptionQuery.data?.endDate) {
      const initialPeriod = calculateWeeks(
        activePrescriptionQuery.data.startDate,
        activePrescriptionQuery.data.endDate
      );

      const minPeriod = calculateWeeks(
        activePrescriptionQuery.data.startDate,
        getCurrentDateYYYYMMDD(new Date())
      );

      form.setValue('period', String(initialPeriod));
      setMinPeriod(minPeriod);
    }
  }, [activePrescriptionQuery.data]);

  if (!patientQuery.data || !standardProgramQuery.data) return;

  const { data: patient } = patientQuery;
  const { data: standardProgram } = standardProgramQuery;

  const isDirty = prescriptionProgramIsDirty || form.formState.isDirty;

  return (
    <section className="flex flex-col max-w-[680px]">
      <h1 className="text-[32px] font-bold text-[var(--aiortho-gray-900)] mb-8">처방하기</h1>
      <PatientInfoCard patient={patient} hideEditButton hidePrescription />

      <h1 className="text-[22px] font-bold text-[var(--aiortho-gray-900)] mt-22 mb-3">
        치료 프로그램 구성
      </h1>
      <h2 className="text-[var(--aiortho-gray-600)] mb-8">
        환자에게 처방할 치료 운동 종류를 선택해주세요
      </h2>

      {prescriptionProgram ? (
        <>
          <PrescriptionProgramCard
            prescription={prescriptionProgram}
            isEditing={isEditing}
            onStartEditing={() => setIsEditing(true)}
            onStopEditing={() => setIsEditing(false)}
            onUpdate={handleSetProgram}
            onDelete={handleDeleteProgram}
            setIsDirty={setPrescriptionProgramIsDirty}
            defaultIsOpen
            showControl
          />

          {!isEditing && (
            <Form {...form}>
              <form onSubmit={e => e.preventDefault()}>
                <FormField
                  control={form.control}
                  name="period"
                  render={({ field }) => (
                    <FormItem>
                      <PrescriptionPeriodSelector field={field} minPeriod={minPeriod} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={handleOpenModal}
          className="flex w-full h-12 px-4 py-3 items-center justify-center gap-2 self-stretch rounded-xl border border-[var(--aiortho-primary)] cursor-pointer mb-3"
        >
          <Plus className="w-5 h-5 text-[var(--aiortho-primary)] font-bold" />
          <span className="text-base text-[var(--aiortho-primary)] font-bold">프로그램 생성</span>
        </button>
      )}

      <div className="flex gap-5 w-full mt-18">
        <Button
          type="button"
          className="flex-1 h-12 rounded-full cursor-pointer bg-[var(--aiortho-gray-600)] text-white hover:bg-[var(--aiortho-gray-600)]/80 disabled:bg-aiortho-gray-200"
          disabled={isEditing}
          onClick={() => router.back()}
        >
          취소
        </Button>
        <Button
          className="flex-1 h-12 rounded-full cursor-pointer"
          disabled={
            !form.formState.isValid ||
            !prescriptionProgram ||
            isEditing ||
            createPrescriptionMutation.isPending ||
            updatePrescriptionMutation.isPending ||
            !isDirty
          }
          onClick={form.handleSubmit(onSubmit)}
        >
          처방하기
        </Button>
      </div>

      <ProgramCreateModal
        isOpen={isModalOpen}
        standardProgram={standardProgram.presets}
        onClose={handleCloseModal}
        onSelect={handleSetProgram}
      />
    </section>
  );
}
