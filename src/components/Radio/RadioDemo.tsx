import { useState } from 'react';
import { Radio } from './Radio';

export function RadioDemo() {
  const [selected, setSelected] = useState('one');

  const options = [
    { id: 'one', label: 'Option One', description: 'This is the first selection.' },
    { id: 'two', label: 'Option Two', description: 'This is the second choice.' },
    { id: 'three', label: 'Option Three', description: 'Finally, the third option.' },
  ];

  return (
    <div className="flex flex-col gap-6 w-full max-w-sm">
      {options.map((opt) => (
        <Radio
          key={opt.id}
          label={opt.label}
          description={opt.description}
          name="demo-radio"
          value={opt.id}
          checked={selected === opt.id}
          onChange={() => setSelected(opt.id)}
        />
      ))}
    </div>
  );
}


