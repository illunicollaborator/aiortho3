import React, { ReactNode } from 'react';

interface QuickMenuCardProps {
  subtitle: string;
  title: string;
  icon: ReactNode;
  onClick?: () => void;
}

const QuickMenuCard: React.FC<QuickMenuCardProps> = ({ subtitle, title, icon, onClick }) => {
  return (
    <article
      className="flex flex-col gap-2.5 items-start px-6 py-6 bg-white rounded-2xl shadow-[6px_6px_54px_rgba(0,0,0,0.05)] transition-shadow duration-200 min-h-[120px] w-full sm:px-8 sm:py-7 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex gap-4 items-center justify-between w-full sm:gap-8 lg:gap-16">
        <div className="flex flex-col gap-2 items-start flex-1 sm:gap-3">
          <p className="text-sm text-slate-400 sm:text-base">{subtitle}</p>
          <h3 className="text-lg font-bold tracking-wider text-gray-700 sm:text-xl lg:text-2xl">
            {title}
          </h3>
        </div>
        <div className="flex-shrink-0">{icon}</div>
      </div>
    </article>
  );
};

export default QuickMenuCard;
