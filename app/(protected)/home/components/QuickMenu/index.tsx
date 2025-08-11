'use client';

import { useRouter } from 'next/navigation';
import QuickMenuCard from './QuickMenuCard';
import { PrescriptionIcon } from '../Icons';
import { UserRole } from '@/models';
import { isDoctorRole } from '@/lib/utils';

interface QuickMenuProps {
  role: UserRole;
}

export default function QuickMenu({ role }: QuickMenuProps) {
  const router = useRouter();

  const handlePrescriptionClick = () => {
    router.push('/home/quick');
  };

  const handlePatientRegistrationClick = () => {
    router.push('/prescriptions/patients/register');
  };

  return (
    <section className="flex flex-col gap-6">
      <h2 className="flex-1 text-2xl font-bold text-zinc-900 lg:text-3xl">Quick Menu</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6">
        {isDoctorRole(role) && (
          <QuickMenuCard
            onClick={handlePrescriptionClick}
            subtitle="빠르고 간편하게"
            title="처방하기"
            icon={<PrescriptionIcon />}
          />
        )}

        <QuickMenuCard
          onClick={handlePatientRegistrationClick}
          subtitle="처음 진료 받는"
          title="환자 등록하기"
          icon={
            <img className="w-15 h-15 cursor-pointer" src="/quick-register.png" alt="환자 등록" />
          }
        />
      </div>
    </section>
  );
}
