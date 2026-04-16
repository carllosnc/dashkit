import { useState } from 'react';
import { Drawer, DrawerHeader, type DrawerPosition } from './Drawer';
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
        className={activeDrawer === 'left' ? 'max-w-xs' : undefined}
      >
        <DrawerHeader>
          <h2 className="text-xl font-bold text-block-fg dark:text-block-dark-fg tracking-tight">
            Settings & Overview
          </h2>
          <p className="text-sm text-ds-500">
            Manage your global application settings and view latest activity.
          </p>
        </DrawerHeader>
        <div className="flex flex-col gap-6 py-4 px-6 overflow-y-auto">
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-ds-400 uppercase tracking-widest">General</h4>
            <div className="grid gap-2">
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl transition-all hover:bg-ds-50 dark:hover:bg-ds-900 border border-transparent hover:border-ds-200 dark:hover:border-ds-800 group text-sm font-medium text-ds-600 dark:text-ds-400 hover:text-ds-900 dark:hover:text-white">
                <FiUser className="size-4 text-sky-500" />
                Profile Settings
              </button>
              <button className="flex items-center gap-3 w-full p-2.5 rounded-xl transition-all hover:bg-ds-50 dark:hover:bg-ds-900 border border-transparent hover:border-ds-200 dark:hover:border-ds-800 group text-sm font-medium text-ds-600 dark:text-ds-400 hover:text-ds-900 dark:hover:text-white">
                <FiSettings className="size-4 text-amber-500" />
                Configuration
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-bold text-ds-400 uppercase tracking-widest">Logs</h4>
            <div className="flex flex-col gap-4 border-l-2 border-ds-100 dark:border-ds-900 ml-2 pl-6 py-2">
              {[
                { time: '2m ago', active: true, label: 'Successfully verified login' },
                { time: '45m ago', active: false, label: 'Updated profile picture' },
                { time: '3h ago', active: false, label: 'Exported analytics report' }
              ].map((log, i) => (
                <div key={i} className="relative">
                  <div className={cn(
                    "absolute -left-[31px] top-1 size-2.5 rounded-full border-2 border-white dark:border-ds-950 shadow-sm",
                    log.active ? "bg-emerald-500" : "bg-ds-300 dark:bg-ds-800"
                  )} />
                  <p className="text-sm font-medium text-ds-800 dark:text-ds-200">{log.label}</p>
                  <span className="text-xs text-ds-500">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-ds-900 text-white flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Storage</span>
              <span className="text-lg font-bold">84% Full</span>
            </div>
            <FiActivity className="size-8 text-ds-700" />
          </div>

          <Button variant="filled" className="w-full h-11" onClick={closeDrawer}>
            Save All Changes
          </Button>
        </div>
      </Drawer>
    </div>
  );
}

function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  return inputs.filter(Boolean).join(' ');
}


