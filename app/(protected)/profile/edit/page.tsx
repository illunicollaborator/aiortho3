'use client';

import { useEffect } from 'react';
import { useFunnel, useDoctorProfile, useNurseProfile } from '@/hooks';
import { VerifyProfile, EditProfile } from '../components';
import { useAuthStore } from '@/store/authStore';
import { isDoctorRole } from '@/lib/utils';

const EDIT_PROFILE_STEPS = ['verify-profile', 'edit-profile'] as const;

export default function ProfileEditPage() {
  const { auth } = useAuthStore();
  if (!auth) return null;

  const [Funnel, setStep, currentStep] = useFunnel(EDIT_PROFILE_STEPS, {
    initialStep: 'verify-profile',
  });

  const isDoctor = isDoctorRole(auth.role);
  const doctorProfileQuery = useDoctorProfile({ enabled: isDoctor });
  const nurseProfileQuery = useNurseProfile({ enabled: !isDoctor });

  const profileQuery = isDoctor ? doctorProfileQuery : nurseProfileQuery;

  const handleVerifyProfileSuccess = () => {
    setStep('edit-profile');
    window.history.pushState({ step: 'edit-profile' }, '', window.location.href);
  };

  // 브라우저 뒤로가기 이벤트 제어
  useEffect(() => {
    const handlePopState = () => {
      // edit-profile에서 뒤로가기를 누르면 verify-profile로 step만 변경
      // verify-profile에서는 자연스럽게 이전 페이지로 이동 (기본 동작)

      if (currentStep === 'edit-profile') {
        setStep('verify-profile');
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [currentStep, setStep]);

  const profile = profileQuery.data;

  if (!profile) return null;

  return (
    <section className="flex flex-col max-w-[680px]">
      <Funnel>
        <Funnel.Step name="verify-profile">
          <VerifyProfile role={auth.role} profile={profile} onClick={handleVerifyProfileSuccess} />
        </Funnel.Step>
        <Funnel.Step name="edit-profile">
          <EditProfile role={auth.role} profile={profile} />
        </Funnel.Step>
      </Funnel>
    </section>
  );
}
