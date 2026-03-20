import { Spinner } from './Spinner';

export const SpinnerDemo = () => {
  return (
    <div className="flex flex-col gap-8 w-full items-center justify-center py-10">
      {/* Sizes Section */}
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider">Sizes</h3>
        <div className="flex items-center gap-6">
          <Spinner size={16} />
          <Spinner size={24} />
          <Spinner size={32} />
          <Spinner size={48} />
        </div>
      </div>

      {/* Colors Section */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider">Colors</h3>
        <div className="flex items-center gap-6">
          <Spinner color="#10b981" /> {/* Emerald-500 */}
          <Spinner color="#3b82f6" /> {/* Blue-500 */}
          <Spinner color="#f59e0b" /> {/* Amber-500 */}
          <Spinner color="#ef4444" /> {/* Red-500 */}
        </div>
      </div>

      {/* With Thickness Section */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider">Custom Thickness</h3>
        <div className="flex items-center gap-6">
          <Spinner size={32} thickness={1} />
          <Spinner size={32} thickness={2} />
          <Spinner size={32} thickness={3} />
          <Spinner size={32} thickness={4} />
        </div>
      </div>

      {/* Status Indicators Section */}
      <div className="flex flex-col items-center gap-4 mt-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider">Context Labels</h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-base-50 dark:bg-white/5 rounded-lg border border-base-200 dark:border-white/10 min-w-[200px]">
            <Spinner size={18} thickness={2} color="#3b82f6" />
            <span className="text-sm font-medium text-base-700 dark:text-base-300">Fetching data...</span>
          </div>
          <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 min-w-[200px]">
            <Spinner size={18} thickness={2} color="#10b981" />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Processing update...</span>
          </div>
        </div>
      </div>
    </div>
  );
};
