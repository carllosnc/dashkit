import { IconButton } from './IconButton';
import { FiBell, FiSearch, FiSettings, FiTrash, FiEdit, FiShare2, FiMoreVertical } from 'react-icons/fi';

export const IconButtonDemo = () => {
  return (
    <div className="flex flex-col gap-16 w-full py-10">
      {/* Sizes Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-widest px-4 md:px-0">Size Scales</h3>
        <div className="flex items-end gap-6 flex-wrap">
          <IconButton icon={<FiSearch size={14} />} size="xs" variant="soft" />
          <IconButton icon={<FiSearch size={18} />} size="sm" variant="soft" />
          <IconButton icon={<FiSearch size={22} />} size="md" variant="soft" />
          <IconButton icon={<FiSearch size={28} />} size="lg" variant="soft" />
          <IconButton icon={<FiSearch size={40} />} size="xl" variant="soft" />
        </div>
      </div>

      {/* Variants Section */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-widest px-4 md:px-0">Style Variants</h3>
        <div className="flex items-center gap-6 flex-wrap">
          <IconButton icon={<FiBell size={22} />} variant="filled" size="md" />
          <IconButton icon={<FiSettings size={22} />} variant="soft" size="md" />
          <IconButton icon={<FiEdit size={22} />} variant="outlined" size="md" />
          <IconButton icon={<FiShare2 size={22} />} variant="ghost" size="md" />
          <IconButton icon={<FiMoreVertical size={20} />} variant="ghost" size="sm" rounded />
        </div>
      </div>

      {/* Rounded Styles */}
      <div className="flex flex-col gap-6">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-widest px-4 md:px-0">Rounded vs Circular</h3>
        <div className="flex items-center gap-8 flex-wrap">
          <div className="flex flex-col gap-3 items-center">
            <IconButton icon={<FiTrash size={22} />} size="md" variant="soft" rounded={false} />
            <span className="text-[10px] uppercase font-bold text-base-400">Default (XL)</span>
          </div>
          <div className="flex flex-col gap-3 items-center">
            <IconButton icon={<FiTrash size={22} />} size="md" variant="soft" rounded={true} />
            <span className="text-[10px] uppercase font-bold text-base-400">Full Circular</span>
          </div>
        </div>
      </div>
    </div>
  );
};
