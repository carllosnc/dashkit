import { useState } from 'react'
import { AnimateNumber } from '../components/AnimateNumber/AnimateNumber'
import { Button } from '../components/Button/Button'

export const AnimateNumberExample = () => {
  const [val, setVal] = useState(1250);
  return (
    <div className="not-prose flex flex-col items-center gap-6 p-8 w-full max-w-sm mx-auto">
      <div className="text-5xl font-bold tracking-tighter tabular-nums text-ds-950 dark:text-ds-50">
        <AnimateNumber value={val} />
      </div>
      <div className="flex gap-4 mt-8">
         <Button variant="soft" size="sm" onClick={() => setVal(v => v + Math.floor(Math.random() * 100))}>Update Value</Button>
         <Button variant="outlined" size="sm" onClick={() => setVal(1250)}>Reset</Button>
      </div>
    </div>
  );
}
