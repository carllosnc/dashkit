import { useState } from 'react';
import { Chip } from './Chip';
import { FiClock, FiSettings } from 'react-icons/fi';

export const ChipDemo = () => {
  const [selectedChips, setSelectedChips] = useState<string[]>(['React', 'Vite']);
  const [chips, setChips] = useState(['Personal', 'Work', 'Urgent', 'Low Priority']);

  const toggleChip = (label: string) => {
    setSelectedChips(prev =>
      prev.includes(label) ? prev.filter(c => c !== label) : [...prev, label]
    );
  };

  const removeChip = (label: string) => {
    setChips(prev => prev.filter(c => c !== label));
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Types Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Chip Types</h4>
        <div className="flex flex-wrap gap-3">
          <Chip label="Assist Chip" icon={<FiClock />} onClick={() => {}} />
          <Chip label="Filter Chip" selected onClick={() => {}} />
          <Chip label="Input Chip" onDelete={() => {}} />
          <Chip label="Action Chip" icon={<FiSettings />} onClick={() => {}} color="info" />
        </div>
      </div>

      {/* Variants Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Variants</h4>
        <div className="flex flex-wrap gap-3">
          <Chip label="Tonal (Default)" variant="tonal" onClick={() => {}} />
          <Chip label="Filled" variant="filled" onClick={() => {}} />
          <Chip label="Outlined" variant="outlined" onClick={() => {}} />
        </div>
      </div>

      {/* Colors Section */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Colors</h4>
        <div className="flex flex-wrap gap-3">
          <Chip label="Default" color="base" onClick={() => {}} />
          <Chip label="Success" color="success" onClick={() => {}} />
          <Chip label="Warning" color="warning" onClick={() => {}} />
          <Chip label="Error" color="error" onClick={() => {}} />
          <Chip label="Info" color="info" onClick={() => {}} />
        </div>
      </div>

      {/* Interactive Selection */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Multi-Selection</h4>
        <div className="flex flex-wrap gap-3 p-4 border border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl">
          {['React', 'Next.js', 'Vite', 'Tailwind', 'Framer'].map(tech => (
            <Chip 
              key={tech}
              label={tech}
              selected={selectedChips.includes(tech)}
              variant="outlined"
              onClick={() => toggleChip(tech)}
            />
          ))}
        </div>
      </div>

      {/* Removable Chips */}
      <div className="flex flex-col gap-4">
        <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Removable Labels</h4>
        <div className="flex flex-wrap gap-3">
          {chips.map(tag => (
            <Chip 
              key={tag}
              label={tag}
              onDelete={() => removeChip(tag)}
            />
          ))}
          {chips.length === 0 && (
            <p className="text-xs text-neutral-500 italic">No tags left. Refresh the page to reset.</p>
          )}
        </div>
      </div>
    </div>
  );
};


