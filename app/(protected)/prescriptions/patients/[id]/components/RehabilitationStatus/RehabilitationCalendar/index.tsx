import { useState } from 'react';
import { format } from 'date-fns';
import { ko } from 'react-day-picker/locale';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { PatientActivityReport } from '@/models';
import { getCurrentDateYYYYMMDD } from '@/lib/utils';
import DotStatus from '../DotStatus';

interface RehabilitationCalendarProps {
  date: Date;
  month: Date;
  reports: PatientActivityReport[];
  onDateChange: (date: Date) => void;
  onMonthChange: (month: Date) => void;
}

const today = new Date();

export default function RehabilitationCalendar({
  date,
  month,
  reports,
  onDateChange,
  onMonthChange,
}: RehabilitationCalendarProps) {
  const isCurrentMonth = (targetMonth: Date) => {
    return (
      targetMonth.getFullYear() === today.getFullYear() &&
      targetMonth.getMonth() === today.getMonth()
    );
  };

  const isFutureMonth = (targetMonth: Date) => {
    return (
      targetMonth.getFullYear() > today.getFullYear() ||
      (targetMonth.getFullYear() === today.getFullYear() &&
        targetMonth.getMonth() > today.getMonth())
    );
  };

  const handleDateChange = (newDate?: Date) => {
    if (newDate) {
      onDateChange(newDate);
      onMonthChange(newDate);
    }
  };

  const handleMonthChange = (newMonth: Date) => {
    if (isFutureMonth(newMonth)) return;
    onMonthChange(newMonth);
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
        selected: '',
        outside: '',
      }}
      formatters={{
        formatCaption: date => format(date, 'yyyy년 M월', { locale: ko }),
      }}
      components={{
        DayButton: ({ className, day, modifiers, ...props }) => {
          const currentDate = getCurrentDateYYYYMMDD(day.date);
          const dayReport = reports.find(report => report.date === currentDate);

          return (
            <button
              className={cn(
                'relative w-8 h-8 rounded-full font-normal text-base bg-transparent shadow-none border-none hover:bg-gray-100 text-aiortho-gray-800 cursor-pointer',

                modifiers.selected &&
                  'bg-aiortho-primary text-white hover:bg-aiortho-primary/90 font-bold',
                modifiers.outside && !modifiers.selected && 'text-[#B6C2D9]',
                modifiers.disabled && 'text-[#B6C2D9] cursor-not-allowed hover:bg-transparent',
                dayReport && 'font-bold',

                className
              )}
              {...props}
            >
              {day.date.getDate()}
              {dayReport && !modifiers.selected && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                  <DotStatus status={dayReport.completionRate} />
                </div>
              )}
            </button>
          );
        },
      }}
    />
  );
}
