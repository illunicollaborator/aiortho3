'use client';

import { Button } from '../ui/button';
import PatientTable from './PatientTable';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { isDoctorRole } from '@/lib/utils';

const PatientDashboard = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { auth } = useAuthStore();

  if (!auth) return null;

  return (
    <section className="flex flex-col gap-6">
      <div className="flex w-full flex-col md:flex-row gap-2 md:gap-0 justify-between md:jitems-center">
        <div className="flex w-full items-center gap-5">
          <h2 className="text-2xl font-bold text-[var(--aiortho-gray-900)] lg:text-[32px]">
            환자 명단
          </h2>
          {pathname === '/home' && (
            <span className="text-[var(--aiortho-gray-600)] text-xl font-medium leading-none lg:text-[22px]">
              {'(최근 3개월 기준)'}
            </span>
          )}
        </div>

        <Button
          type="button"
          className="cursor-pointer w-[120px] h-12 rounded-[14px]"
          onClick={() => router.push('/prescriptions/patients/register')}
        >
          환자 등록하기
        </Button>
      </div>

      <PatientTable showMyPatientFilter={isDoctorRole(auth.role)} />
    </section>
  );
};

export default PatientDashboard;
