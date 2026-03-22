import { Badge, FloatBadge } from './Badge';
import { Button } from '../Button/Button';
import { FiMail, FiBell, FiMessageSquare, FiShoppingCart, FiUser, FiZap } from 'react-icons/fi';

export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl">

      {/* Standalone Badges */}
      <section>
        <h3 className="text-sm font-medium text-neutral-500 mb-6">Standalone Badges</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge content="Live" color="success" pulse />
          <Badge content="Pending" color="warning" />
          <Badge content="Critical" color="error" />
          <Badge content="Experimental" color="info" />
          <Badge dot pulse color="success" />
        </div>
      </section>

      {/* Float Badges */}
      <section>
        <h3 className="text-sm font-medium text-neutral-500 mb-6">Floating Badges</h3>
        <div className="flex flex-wrap gap-8 items-center">
          <FloatBadge content={5} color="error">
            <Button variant="outlined" leftIcon={<FiMail size={18} />}>
              Messages
            </Button>
          </FloatBadge>

          <FloatBadge content={12} color="success">
            <div className="p-3 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 rounded-xl text-neutral-600 dark:text-neutral-400">
              <FiBell size={24} />
            </div>
          </FloatBadge>

          <FloatBadge dot pulse color="success" position="bottom-right">
            <div className="w-12 h-12 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-full flex items-center justify-center overflow-hidden">
              <FiUser size={24} className="text-neutral-400" />
            </div>
          </FloatBadge>

          <FloatBadge content={120} max={99} color="error" position="top-right">
            <div className="p-3 bg-neutral-100 dark:bg-white/5 border border-neutral-200 dark:border-white/5 rounded-xl text-neutral-600 dark:text-neutral-400">
              <FiMessageSquare size={24} />
            </div>
          </FloatBadge>
        </div>
      </section>

      {/* Pulse & Status */}
      <section>
        <h3 className="text-sm font-medium text-neutral-500 mb-6">Status Indicators</h3>
        <div className="flex flex-wrap gap-12 items-center">
          <FloatBadge dot pulse color="error">
            <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-500">
              <FiZap size={24} />
            </div>
          </FloatBadge>

          <FloatBadge content={3} pulse color="success">
            <Button variant="outlined" leftIcon={<FiShoppingCart size={18} />}>
              Cart
            </Button>
          </FloatBadge>

          <div className="flex items-center gap-2">
            <Badge dot color="success" pulse />
            <span className="text-sm font-semibold">Server Online</span>
          </div>
        </div>
      </section>
    </div>
  );
}


