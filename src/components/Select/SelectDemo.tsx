import { useState } from 'react';
import { Select } from './Select';

export function SelectDemo() {
  const [value, setValue] = useState('');

  const shippingOptions = [
    { value: 'standard', label: 'Standard Shipping' },
    { value: 'priority', label: 'Priority Shipping' },
    { value: 'express', label: 'Express Delivery' },
    { value: 'overnight', label: 'Overnight Air' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <Select
        label="Shipping Method"
        description="Choose how you'd like your order delivered."
        placeholder="Choose method..."
        options={shippingOptions}
        value={value}
        onChange={setValue}
      />
      {value && (
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Selected: <span className="font-semibold text-black dark:text-white uppercase tracking-wider">{value}</span>
        </div>
      )}
    </div>
  );
}
