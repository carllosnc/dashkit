import * as React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownSeparator
} from './Dropdown';
import { Button } from '../Button/Button';
import {
  FiUser,
  FiSettings,
  FiMail,
  FiPlusCircle,
  FiLogOut,
  FiBell,
  FiChevronDown
} from 'react-icons/fi';

export function DropdownDemo() {
  const [selected, setSelected] = React.useState('Personal');

  return (
    <div className="flex flex-col gap-12 items-center py-10">
      <div className="flex flex-wrap gap-8 items-center justify-center">
        {/* Profile Dropdown */}
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="outlined" className="gap-2">
              <FiUser /> Account <FiChevronDown />
            </Button>
          </DropdownTrigger>
          <DropdownContent className="w-56">
            <DropdownLabel>My Account</DropdownLabel>
            <DropdownItem leftIcon={<FiUser />}>Profile</DropdownItem>
            <DropdownItem leftIcon={<FiMail />}>Messages</DropdownItem>
            <DropdownItem leftIcon={<FiBell />}>Notifications</DropdownItem>
            <DropdownSeparator />
            <DropdownLabel>Settings</DropdownLabel>
            <DropdownItem leftIcon={<FiSettings />}>Preferences</DropdownItem>
            <DropdownItem leftIcon={<FiPlusCircle />}>Invite Team</DropdownItem>
            <DropdownSeparator />
            <DropdownItem leftIcon={<FiLogOut />} destructive>Log out</DropdownItem>
          </DropdownContent>
        </Dropdown>

        {/* Workspace Selector */}
        <Dropdown>
          <DropdownTrigger asChild>
            <Button variant="filled" className="gap-2 min-w-[140px] justify-between">
              {selected} <FiChevronDown />
            </Button>
          </DropdownTrigger>
          <DropdownContent className="w-48">
            <DropdownLabel>Select Workspace</DropdownLabel>
            <DropdownItem
              selected={selected === 'Personal'}
              onClick={() => setSelected('Personal')}
            >
              Personal
            </DropdownItem>
            <DropdownItem
              selected={selected === 'Dashkit Team'}
              onClick={() => setSelected('Dashkit Team')}
            >
              Dashkit Team
            </DropdownItem>
            <DropdownItem
              selected={selected === 'Side Projects'}
              onClick={() => setSelected('Side Projects')}
            >
              Side Projects
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem leftIcon={<FiPlusCircle />} className="text-sky-500 hover:text-sky-600">
              New Workspace
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl px-4">
        <div className="bg-base-50 dark:bg-white/5 rounded-2xl p-6 border border-base-200 dark:border-base-800">
          <h4 className="text-sm font-bold mb-2">Clean Design</h4>
          <p className="text-sm text-base-500 dark:text-base-400">
            Minimalist aesthetics with smooth Framer Motion animations and subtle glassmorphism.
          </p>
        </div>
        <div className="bg-base-50 dark:bg-white/5 rounded-2xl p-6 border border-base-200 dark:border-base-800">
          <h4 className="text-sm font-bold mb-2">Context Aware</h4>
          <p className="text-sm text-base-500 dark:text-base-400">
            Supports labels, separators, and custom icons for a professional feel.
          </p>
        </div>
      </div>
    </div>
  );
}

export function BasicMenuDemo() {
  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="filled" className="gap-2">
          Options <FiChevronDown />
        </Button>
      </DropdownTrigger>
      <DropdownContent className="w-48">
        <DropdownItem leftIcon={<FiUser />}>Profile</DropdownItem>
        <DropdownItem leftIcon={<FiSettings />}>Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem leftIcon={<FiLogOut />} destructive>Logout</DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export function SelectableMenuDemo() {
  const [selected, setSelected] = React.useState('Personal');

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button variant="outlined" className="gap-2 min-w-[160px] justify-between">
          {selected} <FiChevronDown />
        </Button>
        </DropdownTrigger>
        <DropdownContent className="w-56">
          <DropdownLabel>Select Category</DropdownLabel>
          <DropdownItem
            selected={selected === 'Personal'}
            onClick={() => setSelected('Personal')}
          >
            Personal
          </DropdownItem>
          <DropdownItem
            selected={selected === 'Work'}
            onClick={() => setSelected('Work')}
          >
            Work
          </DropdownItem>
          <DropdownItem
            selected={selected === 'Shared'}
            onClick={() => setSelected('Shared')}
          >
            Shared
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem leftIcon={<FiPlusCircle />} className="text-sky-500 hover:text-sky-600">
            Create New
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
  );
}

export function CustomTriggerDemo() {
  return (
    <div className="flex gap-8 items-center">
      {/* Icon button trigger */}
      <Dropdown>
        <DropdownTrigger asChild>
          <button className="p-2 rounded-full hover:bg-base-100 dark:hover:bg-white/10 transition-colors text-base-500 hover:text-base-900 dark:hover:text-white border border-base-200 dark:border-base-800 shadow-sm">
            <FiSettings size={20} />
          </button>
        </DropdownTrigger>
        <DropdownContent className="w-48">
          <DropdownLabel>Settings</DropdownLabel>
          <DropdownItem leftIcon={<FiUser />}>Account</DropdownItem>
          <DropdownItem leftIcon={<FiBell />}>Notifications</DropdownItem>
          <DropdownSeparator />
          <DropdownItem leftIcon={<FiLogOut />} destructive>Logout</DropdownItem>
        </DropdownContent>
      </Dropdown>

      {/* Text link trigger */}
      <Dropdown>
        <DropdownTrigger asChild>
          <button className="text-sm font-semibold text-sky-500 hover:text-sky-600 underline decoration-2 underline-offset-4 flex items-center gap-1">
            Actions <FiChevronDown />
          </button>
        </DropdownTrigger>
        <DropdownContent className="w-48">
          <DropdownItem>Download PDF</DropdownItem>
          <DropdownItem>Export CSV</DropdownItem>
          <DropdownItem>Print Report</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}

