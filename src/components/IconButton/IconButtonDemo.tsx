import { IconButton } from './IconButton';
import { FiBell, FiSettings, FiTrash, FiEdit, FiShare2 } from 'react-icons/fi';

export const IconButtonDemo = () => {
  return (
    <div className="flex flex-col gap-16 w-full">
      {/* Variants Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest px-4 md:px-0">Style Variants</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <IconButton icon={<FiBell size={20} />} variant="filled" />
          <IconButton icon={<FiSettings size={20} />} variant="soft" />
          <IconButton icon={<FiShare2 size={20} />} variant="ghost" />
          <IconButton icon={<FiEdit size={20} />} variant="soft" rounded />
        </div>
      </div>

      {/* Rounded Styles */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest px-4 md:px-0">Shape Options</h3>
        <div className="flex items-center gap-12 flex-wrap">
          <div className="flex flex-col gap-4 items-center">
            <IconButton icon={<FiTrash size={20} />} variant="soft" rounded={false} />
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Default (MD)</span>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <IconButton icon={<FiTrash size={20} />} variant="soft" rounded={true} />
            <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Full Circular</span>
          </div>
        </div>
      </div>
    </div>
  );
};


