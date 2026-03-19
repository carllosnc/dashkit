import { useState } from 'react';
import { Switch } from './Switch';

export function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      <Switch 
        label="Push Notifications" 
        description="Receive alerts for all incoming activity."
        checked={enabled}
        onChange={(e) => setEnabled(e.target.checked)}
      />
      <div className="text-sm text-neutral-500 dark:text-neutral-400">
        Notifications are: <span className="font-semibold text-black dark:text-white">{enabled ? 'Enabled' : 'Disabled'}</span>
      </div>
    </div>
  );
}
