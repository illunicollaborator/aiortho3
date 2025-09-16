import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-[var(--aiortho-primary)] text-primary-foreground hover:bg-[color:var(--aiortho-primary)]/80 disabled:bg-[color:var(--aiortho-disabled)] font-bold',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-[var(--aiortho-primary)] bg-background rounded-[12px] text-[var(--aiortho-primary)] dark:bg-input/30 dark:border-input dark:hover:bg-input/50 cursor-pointer disabled:cursor-not-allowed',
        secondary:
          'bg-[var(--aiortho-secondary)] text-aiortho-gray-700 hover:bg-[var(--aiortho-secondary)]/80 font-bold',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        input:
          'text-white bg-[var(--aiortho-gray-500)] hover:bg-[var(--aiortho-gray-500)]/90 disabled:bg-[var(--aiortho-gray-100)] rounded-md h-8 font-normal text-[13px] disabled:opacity-100 disabled:text-[var(--aiortho-gray-400)] cursor-pointer',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'w-21 h-10 rounded-md px-4 py-3 has-[>svg]:px-4',
        icon: 'size-9',
        inputConfirm: 'w-[72px] h-[32px] px-[24.5px]py-2',
        inputCertify: 'w-[92px] h-[32px] px-[10.5px] py-2',
        confirm: 'h-12 py-3',
        cancle: 'h-12 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
