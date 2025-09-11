import { PatientActivityCompletionRate } from '@/models';
import { cn } from '@/lib/utils';

interface DotStatusProps {
  status: PatientActivityCompletionRate;
}

export default function DotStatus({ status }: DotStatusProps) {
  const dotClass = {
    [PatientActivityCompletionRate.NONE]: 'hidden',
    [PatientActivityCompletionRate.BAD]: 'bg-[#FF0D4E]',
    [PatientActivityCompletionRate.OK]: 'bg-[#FFAE00]',
    [PatientActivityCompletionRate.GOOD]: 'bg-[#2DD06E]',
  };

  return <div className={cn('w-1.5 h-1.5 rounded-full', dotClass[status])} />;
}
