import { Navbar } from './Navbar';
import { Button } from '../Button/Button';
import { FiGithub, FiBell } from 'react-icons/fi';

export const NavbarDemo = () => {
  return (
    <div className="flex flex-col gap-16 w-full py-10">
      {/* Basic Navbar */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider px-4 md:px-0">Basic Branding & Links</h3>
        <Navbar 
          brandName="Dashkit UI" 
          logo={<img src="/logo.svg" className="h-6 dark:invert" alt="Dashkit" />}
          links={[
            { label: 'Docs', href: '#', active: true },
            { label: 'Examples', href: '#' }
          ]}
          actions={
            <div className="flex items-center gap-3">
               <Button variant="filled" size="sm" className="h-9 px-4">
                  Explore
               </Button>
            </div>
          }
          sticky={false}
        />
      </div>

      {/* Minimalism Navbar */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider px-4 md:px-0">Icon Actions & Dark Style</h3>
        <Navbar 
          brandName="Acme Corp" 
          logo={<div className="size-8 rounded-lg bg-black dark:bg-white" />}
          links={[
            { label: 'Platform', href: '#' },
            { label: 'Pricing', href: '#' }
          ]}
          actions={
            <div className="flex items-center gap-3">
               <button className="p-2 text-base-400 hover:text-base-900 dark:hover:text-white transition-colors">
                  <FiBell size={18} />
               </button>
               <div className="w-px h-6 bg-base-200 dark:bg-base-800 mx-1" />
               <a href="#" className="p-2 text-base-400 hover:text-base-900 dark:hover:text-white transition-colors">
                  <FiGithub size={20} />
               </a>
            </div>
          }
          sticky={false}
        />
      </div>
    </div>
  );
};
