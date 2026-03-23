import { 
  Sidebar, 
  SidebarHeader, 
  SidebarFooter, 
  SidebarSection, 
  SidebarSectionItem 
} from './Sidebar';
import { 
  FiLayout, 
  FiUsers, 
  FiSettings, 
  FiActivity, 
  FiPieChart, 
  FiShield, 
  FiLifeBuoy,
  FiUser
} from 'react-icons/fi';
import { useState } from 'react';

export function SidebarDemo() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex h-[600px] w-full max-w-5xl items-stretch border border-border rounded-2xl overflow-hidden bg-card">
      <Sidebar className="w-64 border-r border-border shrink-0">
        <SidebarHeader className="h-16 flex items-center gap-3 px-6 select-none cursor-default">
          <div className="size-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <div className="size-4 rounded-full bg-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">Dashkit</span>
        </SidebarHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar pt-4">
          <SidebarSection title="General">
            <SidebarSectionItem 
              icon={<FiLayout />} 
              active={activeTab === 'dashboard'} 
              onClick={() => setActiveTab('dashboard')}
            >
              Overview
            </SidebarSectionItem>
            <SidebarSectionItem 
              icon={<FiActivity />} 
              active={activeTab === 'analytics'} 
              onClick={() => setActiveTab('analytics')}
            >
              Analytics
            </SidebarSectionItem>
            <SidebarSectionItem 
              icon={<FiPieChart />} 
              active={activeTab === 'reports'} 
              onClick={() => setActiveTab('reports')}
            >
              Reports
            </SidebarSectionItem>
          </SidebarSection>

          <SidebarSection title="Management">
            <SidebarSectionItem 
              icon={<FiUsers />} 
              active={activeTab === 'team'} 
              onClick={() => setActiveTab('team')}
            >
              Team
            </SidebarSectionItem>
            <SidebarSectionItem 
              icon={<FiShield />} 
              active={activeTab === 'security'} 
              onClick={() => setActiveTab('security')}
            >
              Security
            </SidebarSectionItem>
            <SidebarSectionItem 
              icon={<FiSettings />} 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </SidebarSectionItem>
          </SidebarSection>
        </div>

        <SidebarFooter>
          <SidebarSectionItem icon={<FiLifeBuoy />}>
            Help Support
          </SidebarSectionItem>
          <div className="mt-4 flex items-center gap-3 px-2 py-2 rounded-xl bg-muted/30 border border-muted/50">
             <div className="size-8 rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center text-muted-foreground overflow-hidden">
                <FiUser size={18} />
             </div>
             <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold truncate">Alex Rivera</p>
                <p className="text-[10px] text-muted-foreground truncate">Free Tier</p>
             </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <div className="flex-1 bg-muted/10 p-10 flex items-center justify-center">
        <p className="text-muted-foreground text-sm font-medium italic">
          Select a navigation item to change the static view...
        </p>
      </div>
    </div>
  );
}
