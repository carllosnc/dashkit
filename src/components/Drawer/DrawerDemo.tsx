import { useState } from 'react';
import { Drawer, type DrawerPosition } from './Drawer';
import { Button } from '../Button/Button';
import { FiLayout, FiSidebar, FiAlignLeft, FiUser, FiSettings, FiActivity } from 'react-icons/fi';

export function DrawerDemo() {
  const [activeDrawer, setActiveDrawer] = useState<DrawerPosition | null>(null);

  const closeDrawer = () => setActiveDrawer(null);

  return (
    <div className="flex flex-wrap gap-4 w-full">
      <Button 
        variant="outlined" 
        onClick={() => setActiveDrawer('left')}
        leftIcon={<FiAlignLeft />}
      >
        Left Drawer
      </Button>
      
      <Button 
        variant="filled" 
        onClick={() => setActiveDrawer('right')}
        leftIcon={<FiSidebar />}
      >
        Right Drawer
      </Button>

      <Button 
        variant="outlined" 
        onClick={() => setActiveDrawer('top')}
        leftIcon={<FiLayout />}
      >
        Top Drawer
      </Button>

      <Button 
        variant="outlined" 
        onClick={() => setActiveDrawer('bottom')}
        leftIcon={<FiLayout className="rotate-180" />}
      >
        Bottom Drawer
      </Button>

      {/* Shared Drawer implementation */}
      <Drawer
        isOpen={!!activeDrawer}
        onClose={closeDrawer}
        position={activeDrawer || 'right'}
        title="Settings & Overview"
        description="Manage your global application settings and view latest activity."
        className={activeDrawer === 'left' ? 'max-w-xs' : undefined}
      >
        <div className="flex flex-col gap-6 py-4">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-base-400 uppercase tracking-widest">General</h4>
            <div className="grid gap-2">
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl transition-all hover:bg-base-50 dark:hover:bg-base-900 border border-transparent hover:border-base-200 dark:hover:border-base-800 group text-sm font-medium text-base-600 dark:text-base-400 hover:text-base-900 dark:hover:text-white">
                <FiUser className="size-4 text-sky-500" />
                Profile Settings
              </button>
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl transition-all hover:bg-base-50 dark:hover:bg-base-900 border border-transparent hover:border-base-200 dark:hover:border-base-800 group text-sm font-medium text-base-600 dark:text-base-400 hover:text-base-900 dark:hover:text-white">
                <FiSettings className="size-4 text-amber-500" />
                Configuration
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-base-400 uppercase tracking-widest">Logs</h4>
            <div className="flex flex-col gap-4 border-l-2 border-base-100 dark:border-base-900 ml-2 pl-6 py-2">
              {[
                { time: '2m ago', active: true, label: 'Successfully verified login' },
                { time: '45m ago', active: false, label: 'Updated profile picture' },
                { time: '3h ago', active: false, label: 'Exported analytics report' }
              ].map((log, i) => (
                <div key={i} className="relative">
                  <div className={cn(
                    "absolute -left-[31px] top-1 size-2.5 rounded-full border-2 border-white dark:border-base-950 shadow-sm",
                    log.active ? "bg-emerald-500" : "bg-base-300 dark:bg-base-800"
                  )} />
                  <p className="text-sm font-medium text-base-800 dark:text-base-200">{log.label}</p>
                  <span className="text-xs text-base-500">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-base-900 text-white flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Storage</span>
              <span className="text-lg font-bold">84% Full</span>
            </div>
            <FiActivity className="size-8 text-base-700" />
          </div>

          <Button variant="filled" className="w-full h-11" onClick={closeDrawer}>
            Save All Changes
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

// Utility local for demo
function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return inputs.filter(Boolean).join(' ');
}
