import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'react-day-picker/locale';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

const today = new Date();

interface RehabilitationCalendarProps {
  onMonthChange: (month: Date) => void;
}

export default function RehabilitationCalendar({ onMonthChange }: RehabilitationCalendarProps) {
  const [date, setDate] = useState<Date | undefined>(today);
  const [month, setMonth] = useState<Date>(today);

  // 현재 달인지 체크하는 함수
  const isCurrentMonth = (targetMonth: Date) => {
    return (
      targetMonth.getFullYear() === today.getFullYear() &&
      targetMonth.getMonth() === today.getMonth()
    );
  };

  // 미래 달인지 체크하는 함수 (현재 달 이후)
  const isFutureMonth = (targetMonth: Date) => {
    return (
      targetMonth.getFullYear() > today.getFullYear() ||
      (targetMonth.getFullYear() === today.getFullYear() &&
        targetMonth.getMonth() > today.getMonth())
    );
  };

  const handleDateChange = (newDate?: Date) => {
    if (newDate) {
      setDate(newDate);
      setMonth(newDate);
      onMonthChange(newDate);
    }
  };

  const handleMonthChange = (newMonth: Date) => {
    if (isFutureMonth(newMonth)) {
      return;
    }

    setMonth(newMonth);
  };

  return (
    <Calendar
      mode="single"
      locale={ko}
      selected={date}
      month={month}
      onSelect={handleDateChange}
      onMonthChange={handleMonthChange}
      className="bg-transparent w-full p-0"
      disabled={{ after: today }}
      fixedWeeks={true}
      classNames={{
        button_previous:
          'cursor-pointer size-6 text-[#66798D] aria-disabled:text-aiortho-gray-400 aria-disabled:cursor-not-allowed',
        button_next: cn(
          'cursor-pointer size-6 text-[#66798D] aria-disabled:text-aiortho-gray-400 aria-disabled:cursor-not-allowed',
          isCurrentMonth(month) && 'text-aiortho-gray-400 cursor-not-allowed'
        ),
        month_caption: 'w-full h-6 flex items-center justify-center',
        caption_label: 'font-medium text-base text-aiortho-gray-900',
        month: 'flex flex-col w-full gap-5',
        weekdays: 'flex items-center justify-between',
        weekday:
          'rounded-full w-8 h-8 flex items-center justify-center text-[14px] font-normal text-aiortho-gray-500',
        week: 'flex w-full mt-1 items-center justify-between',
        day: 'relative flex p-0 items-center justify-center rounded-full',
        today: '',
        disabled: '',
      }}
      formatters={{
        formatCaption: date => format(date, 'yyyy년 M월', { locale: ko }),
      }}
      components={{
        DayButton: ({ className, day, modifiers, ...props }) => {
          return (
            <button
              className={cn(
                'w-8 h-8 rounded-full font-medium text-base bg-transparent shadow-none border-none hover:bg-gray-100 text-aiortho-gray-800 cursor-pointer',

                modifiers.selected && 'bg-aiortho-primary text-white hover:bg-aiortho-primary/90',
                modifiers.outside && !modifiers.selected && 'text-[#B6C2D9]',
                modifiers.disabled && 'text-[#B6C2D9] cursor-not-allowed hover:bg-transparent',

                className
              )}
              {...props}
            >
              {day.date.getDate()}
            </button>
          );
        },
      }}
    />
  );
}
