import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { FiCheck } from 'react-icons/fi';

export type StepperColor = 'primary' | 'base';

interface StepperContextType {
  color: StepperColor;
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  onChange?: (step: number) => void;
}

const StepperContext = React.createContext<StepperContextType | undefined>(undefined);

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  color?: StepperColor;
  onChange?: (step: number) => void;
  children: React.ReactNode;
}

export function Stepper({
  activeStep,
  orientation = 'horizontal',
  color = 'primary',
  onChange,
  children,
  className,
  ...props
}: StepperProps) {
  const steps = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <StepperContext.Provider value={{ activeStep, orientation, color, onChange }}>
      <div
        data-color={color}
        data-orientation={orientation}
        className={cn(
          'flex w-full',
          orientation === 'horizontal' ? 'flex-row items-start' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return React.cloneElement(step as React.ReactElement<StepProps>, {
            index,
            isLast,
          });
        })}
      </div>
    </StepperContext.Provider>
  );
}

export interface StepProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  index?: number;
  isLast?: boolean;
}

export function Step({
  title,
  description,
  icon,
  index = 0,
  isLast = false,
  className,
  ...props
}: StepProps) {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error('Step must be used within a Stepper');
  }

  const { activeStep, orientation, color, onChange } = context;

  const isCompleted = index < activeStep;
  const isActive = index === activeStep;
  const isClickable = !!onChange;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isClickable && onChange) {
      onChange(index);
    }
    props.onClick?.(e);
  };

  return (
    <div
      className={cn(
        'group relative flex',
        orientation === 'horizontal' ? 'flex-1' : 'flex-col items-start pb-6 w-full',
        isClickable && 'cursor-pointer',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Horizontal Line */}
      {!isLast && orientation === 'horizontal' && (
        <div className="absolute top-4 left-[50%] w-full h-[2px] -translate-y-1/2 z-0">
          <div className="absolute left-6 right-6 h-full bg-ds-200 dark:bg-ds-800 rounded-full" />
          <div className="absolute left-6 right-6 h-full overflow-hidden rounded-full">
            <motion.div
              className={cn(
                'absolute top-0 left-0 h-full w-full',
                color === 'base' ? 'bg-foreground/30 dark:bg-foreground/25' : 'bg-primary'
              )}
              initial={false}
              animate={{ scaleX: isCompleted ? 1 : 0 }}
              style={{ transformOrigin: 'left center' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={cn(
        'flex shrink-0 relative z-10',
        orientation === 'horizontal' ? 'flex-col items-center text-center w-full gap-3' : 'items-start gap-3.5 w-full'
      )}>
        {/* Step Icon */}
        <div
          className={cn(
            'flex items-center justify-center size-8 rounded-full ds-pill border-2 shrink-0 transition-colors duration-300 bg-card',
            (isCompleted || isActive)
              ? color === 'base'
                ? isActive
                  ? 'border-foreground/60 bg-muted text-foreground ring-2 ring-foreground/10 dark:border-foreground/50 dark:bg-ds-800 dark:text-foreground dark:ring-2 dark:ring-foreground/10'
                  : 'border-border/80 bg-muted text-foreground dark:border-border dark:bg-ds-800/80 dark:text-foreground'
                : 'border-primary bg-primary text-primary-foreground'
              : 'border-ds-200 dark:border-ds-800 text-muted-foreground group-hover:border-ds-400 dark:group-hover:border-ds-600'
          )}
        >
          {isCompleted ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
               <FiCheck size={14} className={cn(color === 'base' ? 'text-foreground' : 'text-primary-foreground', 'stroke-[3]')} />
            </motion.div>
          ) : icon ? (
            icon
          ) : (
            <span className="text-sm font-bold">{index + 1}</span>
          )}
        </div>

        {/* Step Content */}
        <div className={cn(
          'flex flex-col',
          orientation === 'horizontal' ? 'items-center' : 'mt-0.5 flex-1 w-full min-w-0'
        )}>
          {title && (
            <span className={cn(
              'text-sm font-bold transition-colors duration-300',
              isActive
                ? 'text-foreground'
                : isCompleted
                ? 'text-foreground/80'
                : cn('text-muted-foreground', isClickable && 'group-hover:text-foreground/80')
            )}>
              {title}
            </span>
          )}
          {description && (
            <span className={cn(
              'text-xs text-muted-foreground mt-0.5 leading-tight',
              orientation === 'horizontal' ? 'max-w-[150px]' : 'w-full max-w-none'
            )}>
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Vertical Line */}
      {!isLast && orientation === 'vertical' && (
        <div className="absolute top-[2rem] left-4 bottom-0 w-[2px] -translate-x-1/2">
          <div className="absolute inset-0 h-full bg-ds-200 dark:bg-ds-800 rounded-full" />
          <div className="absolute inset-0 h-full overflow-hidden rounded-full">
            <motion.div
              className={cn(
                'absolute top-0 left-0 h-full w-full',
                color === 'base' ? 'bg-foreground/30 dark:bg-foreground/25' : 'bg-primary'
              )}
              initial={false}
              animate={{ scaleY: isCompleted ? 1 : 0 }}
              style={{ transformOrigin: 'top center' }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

Step.displayName = 'Step';
Stepper.displayName = 'Stepper';
