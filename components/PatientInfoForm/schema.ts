import { z } from 'zod';

// Zod 스키마 정의
export const patientFormSchema = z.object({
  patientName: z
    .string()
    .min(2, { message: '환자명을 입력해주세요' })
    .max(10, { message: '환자명은 2자 이상 입력해주세요' })
    .regex(/^[가-힣]+$/, { message: '환자명은 2자 이상 입력해주세요' })
    .refine(
      val => {
        const singleConsonantVowel = /[ㄱ-ㅎㅏ-ㅣ]/;
        return !singleConsonantVowel.test(val);
      },
      { message: '환자명은 2자 이상 입력해주세요' }
    ),
  birthDate: z
    .string()
    .length(6, '주민등록번호 앞자리를 입력해주세요')
    .regex(/^\d{6}$/, '주민등록번호 앞자리를 다시 확인해주세요')
    .refine(val => {
      const num = parseInt(val, 10);
      return num >= 190001 && num <= 999999;
    }, '주민등록번호 앞자리를 다시 확인해주세요'),
  genderDigit: z
    .string()
    .min(1, '주민등록번호 뒷자리를 입력해주세요')
    .regex(/^[1-4]$/, '주민등록번호 뒷자리를 다시 확인해주세요'),
  hospitalNumber: z
    .string()
    .min(1, '병원 환자 번호를 입력해주세요')
    .regex(/^\d+$/, '병원 환자 번호를 다시 확인해주세요'),
  guardianName: z
    .string()
    .min(1, '보호자명을 입력해주세요')
    .max(10, { message: '보호자명은 2자 이상 입력해주세요' })
    .regex(/^[가-힣]+$/, { message: '보호자명은 2자 이상 입력해주세요' })
    .refine(
      val => {
        const singleConsonantVowel = /[ㄱ-ㅎㅏ-ㅣ]/;
        return !singleConsonantVowel.test(val);
      },
      { message: '보호자명은 2자 이상 입력해주세요' }
    ),
  guardianPhone: z
    .string()
    .min(1, '보호자 휴대폰 번호를 입력해주세요')
    .refine(val => {
      const numbers = val.replace(/[^0-9]/g, '');
      return numbers.length === 11;
    }, '보호자 휴대폰 번호를 다시 확인해주세요')
    .refine(val => {
      const numbers = val.replace(/[^0-9]/g, '');
      return numbers.startsWith('010');
    }, '보호자 휴대폰 번호를 다시 확인해주세요')
    .transform(val => val.replace(/[^0-9]/g, '')),
});

export type PatientFormData = z.infer<typeof patientFormSchema>;
