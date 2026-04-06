import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import { Badge } from '../../components/Badge/Badge';
import { Divider } from '../../components/Divider/Divider';
import { Avatar, AvatarGroup } from '../../components/Avatar/Avatar';
import { AnimateNumber } from '../../components/AnimateNumber';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Surface } from '../../components/Surface/Surface';
import { Slider } from '../../components/Slider/Slider';
import { Stepper, Step } from '../../components/Stepper';
import { Pagination } from '../../components/Pagination/Pagination';
import { Modal, ModalHeader, ModalContent, ModalFooter } from '../../components/Modal/Modal';
import { toast } from '../../components/Toast/useToast';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { FiMail, FiLock, FiZap, FiMoreHorizontal, FiTrendingUp, FiShieldOff, FiActivity, FiShield, FiDollarSign, FiPlay, FiSkipBack, FiSkipForward, FiHelpCircle, FiLock as FiFingerprint } from 'react-icons/fi';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AVATAR_URLS } from './Constants';

export function ColumnOne() {
  const [paginatedPage, setPaginatedPage] = React.useState(1);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-4">
      {/* 1. Login Form Example */}
      <Card>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Email Address"
            placeholder="name@example.com"
            leftIcon={<FiMail size={16} />}
            defaultValue="carllos@dashkit.ui"
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<FiLock size={16} />}
            defaultValue="password123"
          />
          <Button className="w-full mt-2" variant="filled">Sign in to account</Button>

          <Divider className="py-2">Or continue with</Divider>

          <div className="grid grid-cols-2 gap-3">
             <Button variant="outlined" className="w-full flex items-center gap-2">
                <FaGoogle size={14} />
                Google
             </Button>
             <Button variant="outlined" className="w-full flex items-center gap-2">
                <FaGithub size={14} />
                GitHub
             </Button>
          </div>

          <div className="text-center pt-2">
             <a href="#" className="text-sm text-ds-500 hover:text-ds-primary-500 transition-colors">Forgot your password?</a>
          </div>
        </CardContent>
      </Card>

      {/* 4. Action / Quick Settings Example */}
      <Card>
        <CardHeader>
           <CardTitle>System Optimizer</CardTitle>
           <CardDescription>Configure your node performance and scaling settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 p-4 ds-rounded bg-ds-50/50 dark:bg-ds-900/50 border border-ds-200 dark:border-ds-800">
              <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-ds-500">Current Load</span>
                  <FiZap size={14} className="text-ds-primary-600" />
              </div>
              <div className="text-3xl font-bold tracking-tighter">84.2%</div>
              <ProgressBar
                value={84.2}
                size="sm"
                color="primary"
              />
          </div>

          <div className="flex flex-col gap-3">
              <Button variant="outlined" className="w-full">Run System Diagnostics</Button>
              <Button variant="soft" className="w-full">Export Metrics Data</Button>
          </div>
        </CardContent>
      </Card>

      {/* 7. Team Activity Card (New with Avatars) */}
      <Card>
         <CardHeader>
            <div className="flex flex-row items-center justify-between">
               <div className="flex flex-col gap-1">
                  <CardTitle>Active Team</CardTitle>
                  <CardDescription>Members currently online.</CardDescription>
               </div>
               <Badge content="12 Active" color="success" variant="soft" />
            </div>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/30 dark:bg-ds-800/20">
               <div className="flex items-center gap-3">
                  <AvatarGroup max={3} spacing="md" size="sm">
                     <Avatar src={AVATAR_URLS.user1} alt="User 1" />
                     <Avatar src={AVATAR_URLS.user2} alt="User 2" />
                     <Avatar src={AVATAR_URLS.user3} alt="User 3" />
                     <Avatar src={AVATAR_URLS.user4} alt="User 4" />
                     <Avatar src={AVATAR_URLS.user5} alt="User 5" />
                  </AvatarGroup>
                  <div className="flex flex-col">
                     <span className="text-sm font-bold">In Collaboration</span>
                     <span className="text-xs text-ds-500">Design System Project</span>
                  </div>
               </div>
               <Button variant="soft" size="sm" className="p-0 size-8 aspect-square min-w-0">
                  <FiMoreHorizontal size={14} className="mx-auto" />
               </Button>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                     <Avatar size="sm" src={AVATAR_URLS.user1} alt="Carlos N." />
                     <div className="flex flex-col">
                        <span className="text-sm font-bold group-hover:text-ds-primary-600 transition-colors">Carlos N.</span>
                        <span className="text-xs text-ds-500 italic">Lead Architect</span>
                     </div>
                  </div>
                  <FiTrendingUp className="text-ds-success-600" size={14} />
               </div>

               <div className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                     <Avatar size="sm" src={AVATAR_URLS.user2} alt="Ana Blue" />
                     <div className="flex flex-col">
                        <span className="text-sm font-bold group-hover:text-ds-primary-600 transition-colors">Ana Blue</span>
                        <span className="text-xs text-ds-500 italic">Product Manager</span>
                     </div>
                  </div>
                  <div className="size-2 rounded-full bg-ds-success-500" />
               </div>
            </div>
         </CardContent>
      </Card>

      {/* Revenue Growth Stats Card */}
      <StatsCard
        title="Revenue Growth"
        value={128450}
        prefix="$"
        trend={24.5}
        trendLabel="vs last month"
        status="success"
        icon={<FiDollarSign className="text-ds-success-600" size={16} />}
        chart={{
          data: [110, 115, 112, 118, 122, 128],
        }}
        animate
      />

      {/* 11. Security Events (New) */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-1">
                  <CardTitle>Security Events</CardTitle>
                  <CardDescription>Recent threat intelligence log.</CardDescription>
               </div>
               <FiShield size={18} className="text-ds-danger-600" />
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/30 dark:bg-ds-100/5">
               <div className="flex items-center gap-3">
                  <FiShieldOff className="text-ds-danger-600" size={16} />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold leading-tight">Unauthorized Entry</span>
                     <span className="text-xs text-ds-500 tracking-wider font-bold uppercase">Node 0x42-E</span>
                  </div>
               </div>
               <Badge content="Critical" color="danger" variant="soft" className="text-xs" />
            </div>
            <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/30 dark:bg-ds-100/5">
               <div className="flex items-center gap-3">
                  <FiActivity className="text-ds-warning-600" size={16} />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold leading-tight">API Rate Limit</span>
                     <span className="text-xs text-ds-500 tracking-wider font-bold uppercase">Public Access</span>
                    </div>
                 </div>
                 <Badge content="Warning" color="warning" variant="soft" className="text-xs" />
              </div>
              <Button variant="outlined" size="sm" className="w-full">View Security Logs</Button>
           </CardContent>
        </Card>

        {/* 18. Wallet Portfolio (New) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <FiDollarSign className="text-ds-success-600" size={18} />
                    <CardTitle>Portfolio</CardTitle>
                 </div>
                 <Badge content="Active" color="success" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex flex-col gap-1">
                 <span className="text-xs text-ds-500 font-bold uppercase tracking-widest">Total Balance</span>
                 <div className="text-3xl font-bold tracking-tighter">
                   <AnimateNumber value={42850.25} prefix="$" precision={2} />
                 </div>
              </div>
              <Surface variant="success" className="p-3 flex items-center justify-between">
                 <div className="flex items-center gap-2 text-ds-success-600">
                    <FiTrendingUp size={14} />
                    <span className="text-xs font-bold">+12.4% this month</span>
                 </div>
                 <span className="text-xs font-bold text-ds-900 dark:text-ds-100">+$4,210.00</span>
              </Surface>
              <div className="grid grid-cols-2 gap-2">
                 <Button variant="filled" size="sm" className="w-full">Trade</Button>
                 <Button variant="soft" size="sm" className="w-full">History</Button>
              </div>
           </CardContent>
        </Card>

        {/* New 1: Podcast / Audio Player */}
        <Card>
           <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                 <Avatar src={AVATAR_URLS.user3} size="lg" shape="square" className="rounded-xl" />
                 <div className="flex flex-col flex-1">
                    <span className="text-sm font-bold tracking-tight">Design Details</span>
                    <span className="text-xs text-ds-500">Episode 42: The future of UI frameworks.</span>
                 </div>
              </div>
              <div className="flex flex-col gap-1">
                 <Slider defaultValue={35} showValue={false} />
                 <div className="flex items-center justify-between text-xs text-ds-500 font-medium font-mono">
                    <span>12:45</span>
                    <span>32:10</span>
                 </div>
              </div>
              <div className="flex items-center justify-between px-4">
                 <Button variant="soft" size="sm" className="rounded-full size-10 flex items-center justify-center p-0">
                    <FiSkipBack size={16} />
                 </Button>
                 <Button variant="filled" size="sm" className="rounded-full size-12 flex items-center justify-center p-0 shadow-lg shadow-primary/30 group">
                    <FiPlay size={20} className="ml-1 group-hover:scale-110 transition-transform" />
                 </Button>
                 <Button variant="soft" size="sm" className="rounded-full size-10 flex items-center justify-center p-0">
                    <FiSkipForward size={16} />
                 </Button>
              </div>
           </CardContent>
        </Card>

        {/* New 5: Modal Trigger Example */}
        <Card>
           <CardHeader>
              <div className="flex items-center gap-3">
                 <div className="size-8 rounded-full bg-ds-danger-500/10 flex items-center justify-center">
                    <FiLock className="text-ds-danger-600" size={16} />
                 </div>
                 <div className="flex flex-col">
                    <CardTitle>Danger Zone</CardTitle>
                    <CardDescription>Irreversible actions for this project.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="p-3 ds-rounded border border-ds-danger-200 bg-ds-danger-50 dark:border-ds-danger-900/50 dark:bg-ds-danger-500/10 flex flex-col gap-1">
                 <span className="text-sm font-bold text-ds-danger-800 dark:text-ds-danger-200">Delete this project</span>
                 <span className="text-xs text-ds-danger-600 dark:text-ds-danger-400">Once you delete it, there is no going back. Please be certain.</span>
              </div>
              <Button variant="outlined" className="w-full text-ds-danger-600 hover:bg-ds-danger-50 hover:border-ds-danger-200 dark:hover:bg-ds-danger-500/10 dark:hover:border-ds-danger-500/30" onClick={() => setIsModalOpen(true)}>
                 Delete Project
              </Button>
           </CardContent>
        </Card>

        {/* New 9: Support Ticket */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Active Ticket</CardTitle>
                    <CardDescription>Support requested.</CardDescription>
                 </div>
                 <Badge content="High Priority" color="danger" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
               <Stepper activeStep={1} orientation="vertical" className="mt-2 ml-1">
                  <Step 
                     title={<span className="text-sm font-bold leading-tight">Billing page crash on Safari</span>}
                     description="Ticket #1042 • Opened 2 hours ago"
                     icon={<FiHelpCircle size={14} />}
                  />
                  <Step 
                     title={<span className="text-sm font-bold leading-tight">Support Team (Ana)</span>}
                     description="We're looking into this right away. Fix deploying soon!"
                     icon={<Avatar src={AVATAR_URLS.user2} size="xs" />}
                  />
               </Stepper>
               <Button variant="outlined" size="sm" className="w-full">Reply to Ticket</Button>
           </CardContent>
        </Card>

        {/* New 13: Transaction History (Pagination) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex flex-col gap-1">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>View your latest transfers.</CardDescription>
                 </div>
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="flex flex-col gap-2">
                 <div className="flex items-center justify-between py-2 hover:bg-ds-50/50 dark:hover:bg-ds-800/30 ds-rounded transition-colors">
                    <span className="text-sm font-medium">Stripe Payout</span>
                    <span className="text-sm font-bold text-ds-success-600">+$124.50</span>
                 </div>
                 <div className="flex items-center justify-between py-2 hover:bg-ds-50/50 dark:hover:bg-ds-800/30 ds-rounded transition-colors">
                    <span className="text-sm font-medium">AWS Hosting</span>
                    <span className="text-sm font-bold">-$45.00</span>
                 </div>
                  <div className="flex items-center justify-between py-2 hover:bg-ds-50/50 dark:hover:bg-ds-800/30 ds-rounded transition-colors">
                    <span className="text-sm font-medium">Github Pro</span>
                    <span className="text-sm font-bold">-$4.00</span>
                 </div>
              </div>
               <div className="pt-2 border-t border-ds-200 dark:border-ds-800 flex justify-center">
                  <Pagination currentPage={paginatedPage} totalPages={10} onChange={setPaginatedPage} siblingCount={0} />
               </div>
            </CardContent>
         </Card>

        {/* New 15: Security Perimeter (New) */}
        <Card>
           <CardHeader>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="size-8 rounded-full bg-ds-primary-500/10 flex items-center justify-center">
                       <FiFingerprint className="text-ds-primary-600" size={16} />
                    </div>
                    <div className="flex flex-col">
                       <CardTitle>Security Perimeter</CardTitle>
                       <CardDescription>Biometric and hardware key status.</CardDescription>
                    </div>
                 </div>
                 <Badge content="Enforced" color="info" variant="soft" />
              </div>
           </CardHeader>
           <CardContent className="space-y-4">
              <div className="space-y-3">
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">TouchID / FaceID</span>
                    <Badge content="Active" color="success" variant="solid" dot pulse show />
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Hardware Key (Yubico)</span>
                    <span className="text-xs text-ds-500 italic">Connected via USB-C</span>
                 </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Node Encryption</span>
                     <Badge content="AES-256" color="info" variant="soft" />
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Active VPN Tunnel</span>
                     <Badge content="Connected" color="success" variant="soft" />
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">System Firewall</span>
                     <Badge content="Enabled" color="info" variant="soft" />
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Malware Protection</span>
                     <Badge content="Scanning" color="warning" variant="solid" dot />
                  </div>
                  <div className="flex items-center justify-between">
                     <span className="text-sm font-medium">Secure Boot</span>
                     <Badge content="Active" color="success" variant="soft" />
                  </div>
              </div>
              <Button variant="filled" className="w-full" onClick={() => toast({ title: 'Authentication', description: 'Biometric scan initiated.', type: 'info' })}>Re-verify Identity</Button>
           </CardContent>
        </Card>
      {/* Modals */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ModalHeader onClose={() => setIsModalOpen(false)}>
          <h3 className="text-lg font-semibold">Delete Project</h3>
        </ModalHeader>
        <ModalContent className="flex flex-col gap-4">
          <p className="text-sm text-ds-500">Are you sure you want to delete this project? This action cannot be undone.</p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outlined" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button className="bg-ds-danger-600 hover:bg-ds-danger-700 text-white border-transparent" onClick={() => { setIsModalOpen(false); toast({ type: 'error', description: 'Project deleted successfully!' }); }}>Delete</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
