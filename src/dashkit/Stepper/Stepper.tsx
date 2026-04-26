import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';
import { FiCheck } from 'react-icons/fi';
import './stepper.css';

interface StepperContextType {
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  onChange?: (step: number) => void;
}

const StepperContext = React.createContext<StepperContextType | undefined>(undefined);

export interface StepperProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  activeStep: number;
  orientation?: 'horizontal' | 'vertical';
  onChange?: (step: number) => void;
  children: React.ReactNode;
}

export function Stepper({
  activeStep,
  orientation = 'horizontal',
  onChange,
  children,
  className,
  ...props
}: StepperProps) {
  const steps = React.Children.toArray(children).filter(React.isValidElement);

  return (
    <StepperContext.Provider value={{ activeStep, orientation, onChange }}>
      <div
        className={cn(
          'stepper',
          orientation === 'horizontal' ? 'stepper--horizontal' : 'stepper--vertical',
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

  const { activeStep, orientation, onChange } = context;

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
        'step',
        orientation === 'horizontal' ? 'step--horizontal' : 'step--vertical',
        isClickable && 'step--clickable',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {/* Horizontal Line */}
      {!isLast && orientation === 'horizontal' && (
        <div className="step__connector--horizontal">
           <div className="step__connector-line--bg" />
           <div className="step__connector-line--fill-container">
             <motion.div
               className="step__connector-line--fill"
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
        'step__container',
        orientation === 'horizontal' ? 'step__container--horizontal' : 'step__container--vertical',
      )}>
        {/* Step Icon */}
        <div
          className={cn(
            'step__icon',
            (isCompleted || isActive) ? 'step__icon--active' : 'step__icon--inactive'
          )}
        >
          {isCompleted ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
               <FiCheck size={14} className="text-primary-foreground stroke-[3]" />
            </motion.div>
          ) : icon ? (
            icon
          ) : (
            <span className="text-sm font-bold">{index + 1}</span>
          )}
        </div>

        {/* Step Content */}
        <div className={cn(
          'step__content',
           orientation === 'horizontal' ? 'step__content--horizontal' : 'step__content--vertical'
        )}>
          {title && (
            <span className={cn(
              'step__title',
              isActive ? 'step__title--active' : isCompleted ? 'step__title--completed' : 'step__title--inactive'
            )}>
              {title}
            </span>
          )}
          {description && (
            <span className={cn(
              'step__description',
              orientation === 'horizontal' ? 'step__description--horizontal' : 'step__description--vertical'
            )}>
              {description}
            </span>
          )}
        </div>
      </div>

      {/* Vertical Line */}
      {!isLast && orientation === 'vertical' && (
        <div className="step__connector--vertical">
           <div className="step__connector-line--bg" />
           <motion.div
             className="step__connector-line--fill"
             initial={false}
             animate={{ scaleY: isCompleted ? 1 : 0 }}
             style={{ transformOrigin: 'top center' }}
             transition={{ duration: 0.4, ease: "easeInOut" }}
           />
        </div>
      )}
    </div>
  );
}

Step.displayName = 'Step';
Stepper.displayName = 'Stepper';
