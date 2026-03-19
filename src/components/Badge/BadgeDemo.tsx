import { Badge } from './Badge';
import { Button } from '../Button/Button';
import { FiMail, FiBell, FiMessageSquare, FiShoppingCart, FiUser, FiZap } from 'react-icons/fi';

export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-12 w-full max-w-4xl">

      {/* Basic Counts */}
      <section>
        <h3 className="text-sm font-medium text-neutral-500 mb-6">Basic Notifications</h3>
        <div className="flex flex-wrap gap-8 items-center">
          <Badge content={5} color="error">
            <Button variant="outlined" leftIcon={<FiMail size={18} />}>
              Messages
            </Button>
          </Badge>

          <Badge content={12} color="primary">
            <div className="p-3 bg-neutral-300 dark:bg-white/5 rounded-xl text-white dark:text-neutral-400">
              <FiBell size={24} />
            </div>
          </Badge>

          <Badge content="New" color="success">
            <Button variant="filled">
              Post Update
            </Button>
          </Badge>

          <Badge content={120} max={99} color="error">
            <div className="p-3 bg-neutral-200 dark:bg-white/5 rounded-xl text-neutral-600 dark:text-neutral-400">
              <FiMessageSquare size={24} />
            </div>
          </Badge>
        </div>
      </section>

      {/* Pulse & Dots */}
      <section>
        <h3 className="text-sm font-medium text-neutral-500 mb-6">Status & Pulse</h3>
        <div className="flex flex-wrap gap-12 items-center">
          <Badge dot pulse color="success" position="bottom-right">
            <div className="w-12 h-12 bg-neutral-200 dark:bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden">
              <FiUser size={24} className="text-neutral-500" />
            </div>
          </Badge>

          <Badge dot pulse color="error">
            <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl text-red-500">
              <FiZap size={24} />
            </div>
          </Badge>

          <Badge content={3} pulse color="primary">
            <Button variant="outlined" leftIcon={<FiShoppingCart size={18} />}>
              Cart
            </Button>
          </Badge>

          <Badge dot color="info" pulse>
            <span className="text-sm font-semibold">Activity Feed</span>
          </Badge>
        </div>
      </section>

      {/* Variants & Colors */}
      <section>
        <h3 className="text-sm font-medium text-neutral-500 mb-6">Variants & Positions</h3>
        <div className="flex flex-wrap gap-8 items-center">
          <Badge content={1} variant="solid" color="info" position="top-left">
            <Button variant="outlined">Top Left Soft</Button>
          </Badge>

          <Badge content={8} variant="solid" color="warning" position="bottom-left">
            <Button variant="outlined">Bottom Left Outline</Button>
          </Badge>

          <Badge content="9+" variant="solid" color="info" position="bottom-right">
            <Button variant="filled">Bottom Right Solid</Button>
          </Badge>
        </div>
      </section>

    </div>
  );
}
