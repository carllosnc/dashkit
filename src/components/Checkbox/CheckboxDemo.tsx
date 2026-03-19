import { useState } from 'react';
import { Checkbox } from './Checkbox';

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full">
      <Checkbox 
        label="Controlled Checkbox" 
        description={`The current state is: ${checked ? 'Checked' : 'Unchecked'}`}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <div className="flex gap-2">
        <button 
          onClick={() => setChecked(true)}
          className="text-xs px-2 py-1 bg-base-100 dark:bg-base-800 rounded-md hover:bg-base-200 dark:hover:bg-base-700 transition-colors"
        >
          Check
        </button>
        <button 
          onClick={() => setChecked(false)}
          className="text-xs px-2 py-1 bg-base-100 dark:bg-base-800 rounded-md hover:bg-base-200 dark:hover:bg-base-700 transition-colors"
        >
          Uncheck
        </button>
      </div>
    </div>
  );
}
