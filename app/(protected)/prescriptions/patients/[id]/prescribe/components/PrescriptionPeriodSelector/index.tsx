import { ControllerRenderProps } from 'react-hook-form';
import { FormLabel, FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormValues } from '../../page';

interface PrescriptionPeriodSelectorProps {
  field: ControllerRenderProps<FormValues, 'period'>;
  minPeriod?: number;
  maxPeriod?: number;
}

export default function PrescriptionPeriodSelector({
  field,
  minPeriod = 1,
  maxPeriod = 12,
}: PrescriptionPeriodSelectorProps) {
  const period = Array.from({ length: maxPeriod - minPeriod + 1 }, (_, idx) => idx + minPeriod);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-2xl font-bold text-[var(--aiortho-gray-900)] lg:text-3xl mt-22 mb-3">
        치료 프로그램 구성
      </h1>
      <h2 className="text-[var(--aiortho-gray-600)] mb-8">
        환자에게 처방할 치료 운동 종류를 선택해주세요
      </h2>

      <FormLabel className="text-sm text-[var(--aiortho-gray-500)] mb-3">기간 선택</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-full cursor-pointer">
            <SelectValue placeholder="기간을 선택해주세요." />
          </SelectTrigger>
          <SelectContent>
            {period.map(value => (
              <SelectItem className="cursor-pointer" key={`period-${value}`} value={String(value)}>
                {`${value}주`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
    </div>
  );
}
