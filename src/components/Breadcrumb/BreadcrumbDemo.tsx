import { Breadcrumb } from './Breadcrumb';
import { Home, Settings, User } from 'lucide-react';

export const BreadcrumbDemo = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Basic Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/' },
          { label: 'Breadcrumb' },
        ]}
      />

      {/* With Icons */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/', icon: <Home size={14} /> },
          { label: 'Settings', href: '/', icon: <Settings size={14} /> },
          { label: 'Profile', icon: <User size={14} /> },
        ]}
      />

      {/* Custom Separator */}
      <Breadcrumb
        separator={<span className="text-base-300 dark:text-base-700 mx-1">/</span>}
        items={[
          { label: 'Projects', href: '#' },
          { label: 'Dashkit', href: '#' },
          { label: 'Releases' },
        ]}
      />
    </div>
  );
};
