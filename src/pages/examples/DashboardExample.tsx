import { useState } from 'react';
import { 
  FiGrid, FiUsers, FiSettings, FiSearch, FiBell, 
  FiMoreVertical, FiExternalLink,
  FiZap, FiPieChart, FiTrendingUp, FiCheckCircle, FiClock
} from 'react-icons/fi';
import { Navbar, NavbarBrand, NavbarLinks, NavbarActions } from '../../components/Navbar/Navbar';
import { Button } from '../../components/Button/Button';
import { IconButton } from '../../components/IconButton/IconButton';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card/Card';
import { Badge, FloatBadge, type BadgeColor } from '../../components/Badge/Badge';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import { Select } from '../../components/Select/Select';
import { Input } from '../../components/Input/Input';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { Dropdown, DropdownTrigger, DropdownContent, DropdownItem } from '../../components/Dropdown/Dropdown';
import { Chip } from '../../components/Chip/Chip';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../../components/Accordion/Accordion';
import { Switch } from '../../components/Switch/Switch';
import { Modal } from '../../components/Modal/Modal';
import { Drawer } from '../../components/Drawer/Drawer';
import { toast } from '../../components/Toast/useToast';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Footer } from '../../components/Footer';

export function DashboardExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({ type: 'success', description: 'Dashboard data refreshed successfully' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-base-bg dark:bg-base-dark-bg font-sans flex flex-col">
      <Navbar>
        <NavbarBrand>
           <div className="flex items-center gap-2">
             <img src="/logo.svg" alt="Dashkit Logo" className="size-16 dark:invert" />
           </div>
        </NavbarBrand>

        <NavbarLinks>
           <a href="#" className="text-sm font-medium text-base-950 dark:text-white">Overview</a>
           <a href="#" className="text-sm font-medium text-base-500 dark:text-base-400">Analytics</a>
           <a href="#" className="text-sm font-medium text-base-500 dark:text-base-400">Team</a>
        </NavbarLinks>

        <NavbarActions>
          <IconButton icon={<FiSearch size={18} />} />
          <FloatBadge dot color="error" pulse>
            <IconButton icon={<FiBell size={18} />} />
          </FloatBadge>
          <ThemeToggle />
          <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
        </NavbarActions>
      </Navbar>

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 flex flex-col gap-12">
        {/* Header with Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Dashboard', active: true }
              ]}
            />
            <h1 className="text-xl font-bold tracking-tight text-base-950 dark:text-white">
              Project Overview
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Select
              value="this-week"
              options={[
                { label: 'This Week', value: 'this-week' },
                { label: 'Last 30 Days', value: 'last-30' },
                { label: 'Custom Range', value: 'custom' }
              ]}
              className="w-48"
            />
            <Button variant="outlined" loading={isLoading} onClick={handleRefresh}>
              {isLoading ? 'Refreshing...' : 'Analyze'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card shadowed>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-base-500 dark:text-base-400">Total Revenue</span>
                 <Badge content="+12.5%" color="base" />
              </div>
              <div className="text-2xl font-bold mb-1">$45,231.89</div>
              <div className="text-[11px] text-base-400 uppercase tracking-wider font-bold">vs last month</div>
            </CardContent>
          </Card>

          <Card shadowed>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-medium text-base-500 dark:text-base-400">Active Tasks</span>
                 <Badge content="82%" color="base" />
              </div>
              <div className="text-2xl font-bold mb-1">1,240</div>
              <Skeleton className="h-1.5 w-full mt-2" />
            </CardContent>
          </Card>

          <Card shadowed>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-2">
                 <span className="text-sm font-semibold text-base-700 dark:text-base-200">Efficiency Rate</span>
                 <Badge content="94%" color="base" />
              </div>
              <div className="text-2xl font-bold mb-1">94.2%</div>
              <div className="flex gap-1.5 mt-2">
                 {[1,2,3,4,5].map(i => <div key={i} className="flex-1 h-3 rounded-sm bg-base-border dark:bg-base-dark-border" />)}
                 <div className="flex-1 h-3 rounded-sm bg-base-900 dark:bg-white" />
              </div>
            </CardContent>
          </Card>

          <Card shadowed>
            <CardContent className="pt-6 text-center flex flex-col items-center justify-center min-h-[100px]">
              <div className="size-10 rounded-full bg-base-900 dark:bg-white flex items-center justify-center mb-2">
                <FiZap className="text-white dark:text-base-950" />
              </div>
              <div className="text-sm font-bold text-base-950 dark:text-white">Active Sprints</div>
              <div className="text-[11px] text-base-400">3 ongoing now</div>
            </CardContent>
          </Card>
        </div>

        {/* Overview Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-base-400 flex items-center gap-2">
             <FiPieChart /> Activity Overview
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="h-full" shadowed>
                <CardHeader 
                  extra={
                    <Dropdown>
                      <DropdownTrigger asChild>
                        <IconButton icon={<FiMoreVertical />} />
                      </DropdownTrigger>
                      <DropdownContent align="end">
                        <DropdownItem leftIcon={<FiExternalLink />} onClick={() => {}}>View all reports</DropdownItem>
                        <DropdownItem leftIcon={<FiTrendingUp />} onClick={() => {}}>Export to CSV</DropdownItem>
                      </DropdownContent>
                    </Dropdown>
                  }
                >
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Monitor your latest project updates.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3 flex-1">
                  {[
                    { title: 'Update Dashkit styles', user: 'Carllos', status: 'Completed', color: 'base' as BadgeColor },
                    { title: 'Fix drawer animation lag', user: 'Alex', status: 'In Progress', color: 'base' as BadgeColor },
                    { title: 'Refactor Auth logic', user: 'John', status: 'Blocked', color: 'base' as BadgeColor }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-md bg-white dark:bg-base-900 border border-base-border dark:border-base-dark-border">
                      <div className="flex items-center gap-4">
                        <Checkbox />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold">{item.title}</span>
                          <span className="text-xs text-base-400">Assigned to {item.user}</span>
                        </div>
                      </div>
                      <Badge content={item.status} color={item.color} />
                    </div>
                  ))}
                  <div>
                    <Button onClick={() => setIsDrawerOpen(true)}>
                      Show more activity
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col gap-6">
              <Card shadowed>
                <CardHeader>
                  <CardTitle>Team Status</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="size-10 rounded-full border-4 border-white dark:border-base-950 bg-base-200 dark:bg-base-800 flex items-center justify-center overflow-hidden">
                        <FiUsers className="size-4" />
                      </div>
                    ))}
                    <div className="size-10 rounded-full border-4 border-white dark:border-base-950 bg-base-900 text-white text-[10px] font-bold flex items-center justify-center">
                      +12
                    </div>
                  </div>
                  <p className="text-sm text-base-500">Your team has completed 24 tasks today.</p>
                  <div className="flex gap-2">
                    <Chip label="Mobile App" onDelete={() => {}} />
                    <Chip label="Dashboard" onDelete={() => {}} />
                  </div>
                </CardContent>
              </Card>

              <Card shadowed>
                <CardHeader>
                  <CardTitle>System Config</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <Switch label="Auto-Scaling" description="Enable dynamic node creation." defaultChecked />
                  <Switch label="Maintenance Mode" description="Block all external traffic." />
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-base-400 flex items-center gap-2">
             <FiGrid /> Active Projects
          </h2>

          <div className="w-full">
            <Accordion type="multiple" defaultValue={['item-1']} shadowed>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiCheckCircle size={20} className="text-base-500" />
                    Phase 1: Foundation
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <div className="py-2 text-sm text-base-500 flex flex-col gap-4">
                     <p>Implement core UI elements and accessibility foundations. Focus on design tokens and basic interactions.</p>
                     <div className="flex items-center gap-4">
                       <Badge content="On Track" color="base" />
                       <span className="text-xs text-base-400">Due Dec 12, 2026</span>
                     </div>
                   </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiClock size={20} className="text-base-500" />
                    Phase 2: Integration
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-base-500">Connecting external API services and real-time database syncing across distributed nodes.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiZap size={20} className="text-base-500" />
                    Phase 3: Performance Optimization
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-base-500">Optimizing bundle sizes, implementing edge caching, and fine-tuning database queries for scale.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiUsers size={20} className="text-base-500" />
                    Phase 4: Feedback & Pilot
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-base-500">Launching to a subset of users to gather real-world usage patterns and edge cases.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  <div className="flex items-center gap-3">
                    <FiPieChart size={20} className="text-base-500" />
                    Phase 5: Global Rollout
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                   <p className="py-2 text-sm text-base-500">Final production deployment across all regions with multi-cluster traffic management.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Settings Section */}
        <section className="flex flex-col gap-6">
          <h2 className="text-sm font-bold uppercase tracking-widest text-base-400 flex items-center gap-2">
             <FiSettings /> Account Settings
          </h2>
          <div className="w-full">
            <Card shadowed>
              <CardHeader>
                <CardTitle>Account Preferences</CardTitle>
                <CardDescription>Manage your display and data settings across the platform.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-base-700 dark:text-base-300">Username</label>
                    <Input placeholder="carllosnc" />
                    <p className="text-[11px] text-base-400">This is your public display name.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-base-700 dark:text-base-300">Email Address</label>
                    <Input placeholder="hello@dashkit.ui" type="email" />
                  </div>
                  <div className="flex flex-col gap-6 md:col-span-2 border-t border-base-border dark:border-base-dark-border pt-8 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      <Switch label="Public Profile" description="Allow others to see your stats." defaultChecked />
                      <Switch label="Direct Mentions" description="Enable push notifications for @mentions." />
                      <Switch label="Daily Digest" description="Receive a summary of your activity." />
                      <Switch label="Security Alerts" description="Notify on suspicious login attempts." defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />

      {/* Overlays Demo */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Create New Project"
      >
        <div className="flex flex-col gap-6 pt-4">
          <Input label="Project Name" placeholder="E-commerce Redesign" required />
          <Select 
            label="Priority"
            options={[
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' }
            ]}
          />
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => { setIsModalOpen(false); toast({ type: 'success', description: 'Project created!' }); }}>Create</Button>
          </div>
        </div>
      </Modal>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Notifications"
        description="Stay up to date with your team's progress."
      >
        <div className="flex flex-col gap-4 py-6">
           {[1,2,3,4,5].map(i => (
             <div key={i} className="flex gap-4 p-4 rounded-md hover:bg-base-50 dark:hover:bg-base-900 transition-colors border border-transparent hover:border-base-border dark:hover:border-base-dark-border">
                <div className="size-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                   <FiBell className="text-blue-500" />
                </div>
                <div>
                   <div className="text-sm font-bold">New comment on "Auth Logic"</div>
                   <div className="text-xs text-base-500">2 hours ago</div>
                </div>
             </div>
           ))}
        </div>
      </Drawer>
    </div>
  );
}
