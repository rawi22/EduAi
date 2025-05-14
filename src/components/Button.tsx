import { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils/cn';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
}

export function Button({ 
  children, 
  className, 
  variant = 'primary', 
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={cn(
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}