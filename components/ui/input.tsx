import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-[var(--aiortho-gray-200)] flex h-4 w-full min-w-0 rounded-md border bg-transparent pl-4 pr-2 py-2 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:text-[color:var(--aiortho-gray-600)] disabled:bg-[#F6F8FC] disabled:cursor-not-allowed',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'focus:border-[color:var(--aiortho-primary)] focus:ring-1 focus:ring-[color:var(--aiortho-primary)]',
        className
      )}
      autoComplete="off"
      {...props}
    />
  );
}

export { Input };
