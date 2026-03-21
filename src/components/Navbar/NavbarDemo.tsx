import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from './Navbar';
import { Button } from '../Button/Button';
import { FiGithub, FiBell } from 'react-icons/fi';

export const NavbarDemo = () => {
  return (
    <div className="flex flex-col gap-16 w-full py-10">
      {/* Basic Navbar */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider px-4 md:px-0">Basic Branding & Links</h3>
        <Navbar sticky={false}>
          <NavbarBrand>
            <img src="/logo.svg" className="h-6 dark:invert" alt="Dashkit" />
          </NavbarBrand>

          <NavbarLinks>
            <a href="#" className="text-sm font-medium text-base-950 dark:text-white">Docs</a>
            <a href="#" className="text-sm font-medium text-base-500 dark:text-base-400">Examples</a>
          </NavbarLinks>

          <NavbarActions>
            <Button variant="filled" size="sm" className="h-9 px-4">
              Explore
            </Button>
          </NavbarActions>
        </Navbar>
      </div>

      {/* Minimalism Navbar */}
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-medium text-base-500 uppercase tracking-wider px-4 md:px-0">Icon Actions & Dark Style</h3>
        <Navbar sticky={false}>
          <NavbarBrand>
            <span className="text-lg tracking-tight text-base-950 dark:text-white">Acme Corp</span>
          </NavbarBrand>
          
          <NavbarLinks>
            <a href="#" className="text-sm font-medium text-base-500 dark:text-base-400">Platform</a>
            <a href="#" className="text-sm font-medium text-base-500 dark:text-base-400">Pricing</a>
          </NavbarLinks>

          <NavbarActions>
             <button className="p-2 text-base-400 hover:text-base-900 dark:hover:text-white transition-colors">
                <FiBell size={18} />
             </button>
             <div className="w-px h-6 bg-base-200 dark:bg-base-800 mx-1" />
             <a href="#" className="p-2 text-base-400 hover:text-base-900 dark:hover:text-white transition-colors">
                <FiGithub size={20} />
             </a>
          </NavbarActions>
        </Navbar>
      </div>
    </div>
  );
};
