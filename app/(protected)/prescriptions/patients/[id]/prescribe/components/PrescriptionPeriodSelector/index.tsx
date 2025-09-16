import { ControllerRenderProps } from 'react-hook-form';
import { FormLabel, FormControl } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
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
        처방 기간
      </h1>
      <h2 className="text-[var(--aiortho-gray-600)] mb-8">처방할 기간을 선택해주세요</h2>

      <FormLabel className="text-sm text-[var(--aiortho-gray-400)] mb-3">기간 선택</FormLabel>
      <FormControl>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger className="w-full h-12 border border-[var(--aiortho-gray-200)] text-[var(--aiortho-gray-900)] focus:ring-0 focus:ring-offset-0 focus:border-2 focus:border-[color:var(--aiortho-primary)] data-[state=open]:border-2 data-[state=open]:border-[color:var(--aiortho-primary)] data-[state=open]:ring-0 px-4 data-[disabled]:opacity-100 disabled:bg-[#F0F3FA99] cursor-pointer disabled:text-[var(--aiortho-gray-600)] rounded-[12px] data-[placeholder]:text-[var(--aiortho-gray-400)]">
            <SelectValue placeholder="기간을 선택해주세요." />
          </SelectTrigger>
          <SelectContent className="w-full max-h-55 data-[side=bottom]:translate-y-2 shadow-[0px_0px_32px_rgba(159,171,196,0.3)] border-0">
            <div className="scrollable h-50 overflow-y-scroll pl-2">
              <SelectGroup className="flex flex-col gap-1">
                {period.map(value => (
                  <SelectItem
                    key={`period-${value}`}
                    className="flex w-full items-center cursor-pointer h-12 disabled:text-aiortho-gray-600 justify-center text-center p-0 [&>span:first-child]:hidden font-semibold focus:font-semibold"
                    value={String(value)}
                  >
                    {`${value}주`}
                  </SelectItem>
                ))}
              </SelectGroup>
            </div>
          </SelectContent>
        </Select>
      </FormControl>
    </div>
  );
}
