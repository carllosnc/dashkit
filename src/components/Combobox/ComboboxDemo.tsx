import { useState } from 'react';
import { Combobox } from './Combobox';

const frameworks = [
  { value: 'nextjs', label: 'Next.js' },
  { value: 'sveltekit', label: 'SvelteKit' },
  { value: 'nuxt', label: 'Nuxt.js' },
  { value: 'remix', label: 'Remix' },
  { value: 'astro', label: 'Astro' },
  { value: 'gatsby', label: 'Gatsby' },
  { value: 'vite', label: 'Vite' },
  { value: 'webpack', label: 'Webpack' },
  { value: 'parcel', label: 'Parcel' },
  { value: 'rollup', label: 'Rollup' },
];

export const ComboboxDemo = () => {
  const [value, setValue] = useState<string | string[]>('nextjs');
  const [multiValue, setMultiValue] = useState<string | string[]>(['nextjs', 'vite']);
  const [emptyValue, setEmptyValue] = useState<string | string[]>('');

  return (
    <div className="flex flex-col gap-12 w-full max-w-md mx-auto">
      {/* Basic Combobox */}
      <section className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-base-900 dark:text-white uppercase tracking-wider">Basic Search</h4>
        <Combobox
          label="Frontend Framework"
          description="Type to filter the available options."
          options={frameworks}
          value={value}
          onChange={setValue}
        />
        <div className="p-3 bg-base-50 dark:bg-base-900/50 rounded-lg border border-base-200 dark:border-base-800">
          <p className="text-xs text-base-500 font-mono">Selected: {value || 'None'}</p>
        </div>
      </section>

      {/* Multi-select Combobox */}
      <section className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-base-900 dark:text-white uppercase tracking-wider">Multi-Selection</h4>
        <Combobox
          label="Platform Tools"
          multiple
          placeholder="Select multiple tags..."
          options={frameworks}
          value={multiValue}
          onChange={setMultiValue}
        />
      </section>

      {/* Empty State */}
      <section className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-base-900 dark:text-white uppercase tracking-wider">Empty State</h4>
        <Combobox
          label="Pick a library"
          placeholder="Start typing..."
          options={frameworks}
          value={emptyValue}
          onChange={setEmptyValue}
        />
      </section>

      {/* Disabled State */}
      <section className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-base-900 dark:text-white uppercase tracking-wider">Disabled</h4>
        <Combobox
          label="Frozen Selection"
          disabled
          options={frameworks}
          value="nextjs"
        />
      </section>
    </div>
  );
};
