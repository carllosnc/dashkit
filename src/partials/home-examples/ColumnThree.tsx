import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/dashkit/Card';
import { Button } from '../../components/dashkit/Button/Button';
import { ButtonGroup } from '../../components/dashkit/ButtonGroup/ButtonGroup';
import { Badge } from '../../components/dashkit/Badge';
import { Input } from '../../components/dashkit/Input/Input';
import { Divider } from '../../components/dashkit/Divider/Divider';
import { Checkbox } from '../../components/dashkit/Checkbox/Checkbox';
import { Radio } from '../../components/dashkit/Radio/Radio';
import { BarChart } from '../../components/dashkit/BarChart/BarChart';
import { OtpInput } from '../../components/dashkit/OtpInput/OtpInput';
import { Chip } from '../../components/dashkit/Chip/Chip';
import { SystemLogs, type LogEntry } from '../../components/dashkit/SystemLogs/SystemLogs';
import { Surface } from '../../components/dashkit/Surface/Surface';
import { Switch } from '../../components/dashkit/Switch/Switch';
import { Select } from '../../components/dashkit/Select/Select';
import { toast } from '../../components/dashkit/Toast/useToast';
import { CopyField } from '../../components/dashkit/CopyField/CopyField';
import { Slider } from '../../components/dashkit/Slider/Slider';
import { StatsCard } from '../../components/dashkit/StatsCard/StatsCard';
import { FiSettings, FiBarChart2, FiMonitor, FiSmartphone, FiBell, FiCheckCircle, FiXCircle, FiUserPlus, FiSend, FiSun, FiMoon, FiUsers } from 'react-icons/fi';
import { CONVERSION_DATA } from './Constants';

export function ColumnThree() {
  const [selectedSurveys, setSelectedSurveys] = React.useState<string[]>(['Development', 'Design']);
  const [otp, setOtp] = React.useState('');
  const [logs] = React.useState<LogEntry[]>([
    { type: 'ok', message: 'Initialized edge gateway...', timestamp: '14:20:01' },
    { type: 'info', message: 'Indexing 4,208 vectors...', timestamp: '14:20:05' },
    { type: 'warn', message: 'Rate limit approaching (US-E)', timestamp: '14:21:12' },
    { type: 'ok', message: 'Handshake verified (0x42...F)', timestamp: '14:22:30' },
  ]);
  return (
    <div className="flex flex-col gap-4">
      {/* 3. Settings & Preferences Example */}
      <Card>
        <CardHeader>
           <div className="flex items-center gap-2">
              <div className="size-6 ds-rounded bg-ds-primary-500/10 flex items-center justify-center">
                 <FiSettings className="text-ds-primary-600" size={14} />
              </div>
              <CardTitle>Preferences</CardTitle>
           </div>
           <CardDescription>Manage your workspace and notification settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
             <span className="text-xs block font-bold uppercase tracking-widest text-ds-500">Privacy & Security</span>
             <div className="space-y-3">
                <Checkbox
                   label="Two-factor auth"
                   description="Secure your account with 2FA."
                   defaultChecked
                />
                <Checkbox
                   label="Public profile"
                   description="Allow others to see your stats."
                />
             </div>

          <div className="space-y-4 border-t  dark:border-ds-800 pt-6">
             <span className="text-xs block font-bold uppercase tracking-widest text-ds-500">Subscription Plan</span>
             <Radio
                name="plan"
                label="Starter Plan"
                description="Free forever for 1 user."
                />
                <Radio
                name="plan"
                label="Pro Plan"
                description="$12/mo for unlimited team."
                defaultChecked
                />
          </div>

          <Button className="w-full" variant="outlined">Save Changes</Button>
        </CardContent>
      </Card>

      {/* 9. Conversion Overview Card (New with BarChart) */}
      <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiBarChart2 className="text-ds-primary-600" size={18} />
                  <CardTitle>Traffic Sources</CardTitle>
               </div>
               <Badge content="Monthly" color="info" variant="soft" />
            </div>
         </CardHeader>
         <CardContent className="space-y-6">
          <div className="w-full">
              <BarChart
                 data={CONVERSION_DATA}
                 series={[
                    { key: 'desktop', label: 'Desktop', color: '#3b82f6' },
                    { key: 'mobile', label: 'Mobile', color: '#10b981' }
                 ]}
                 showGrid={false}
                 rounded
                 barGap={2}
              />
          </div>
          <Divider />
          <div className="flex items-center justify-around">
             <div className="flex flex-col items-center text-center">
                <span className="text-xs uppercase font-bold text-ds-500 tracking-wider">Highest</span>
                <span className="text-sm font-bold">Organic</span>
             </div>
             <Divider orientation="vertical" />
             <div className="flex flex-col items-center text-center">
                <span className="text-xs uppercase font-bold text-ds-500 tracking-wider">Engagement</span>
                <span className="text-sm font-bold text-ds-success-600">+18.4%</span>
             </div>
          </div>
         </CardContent>
      </Card>

      {/* 6. OTP Verification Card */}
      <Card>
         <CardHeader>
            <CardTitle>Two-Factor Auth</CardTitle>
            <CardDescription>Enter the 6-digit code sent to your device.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-6">
            <OtpInput 
               length={6}
               value={otp}
               onChange={setOtp}
               containerClassName="justify-between"
            />
            <div className="space-y-3">
               <Button variant="filled" className="w-full">Verify Identity</Button>
               <div className="text-center">
                  <span className="text-xs text-ds-500">Didn't receive the code? </span>
                  <button className="text-xs font-bold text-ds-primary-600 hover:underline cursor-pointer">Resend</button>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* Platform Traffic Stats Card */}
      <StatsCard
        title="Platform Traffic"
        value={128400}
        suffix="k"
        trend={12.8}
        trendLabel="vs yesterday"
        status="success"
        icon={<FiUsers className="text-ds-primary-600" size={16} />}
        chart={{
          data: [100, 110, 115, 120, 125, 128],
        }}
        animate
      />

      {/* 13. Personalization Survey (New) */}
      <Card>
         <CardHeader>
            <CardTitle>Personalize your experience</CardTitle>
            <CardDescription>Select your areas of interest to tailor the dashboard to your needs.</CardDescription>
         </CardHeader>
         <CardContent>
          <div className="flex flex-wrap gap-2">
             {[
               'Design', 'Development', 'Marketing', 'Analytics',
               'Operations', 'Sales', 'Management', 'Strategy'
             ].map((option) => (
               <Chip
                 key={option}
                 label={option}
                 variant="tonal"
                 selected={selectedSurveys.includes(option)}
                 onClick={() => {
                   setSelectedSurveys(prev =>
                     prev.includes(option)
                       ? prev.filter(s => s !== option)
                       : [...prev, option]
                   );
                 }}
               />
             ))}
          </div>
         </CardContent>
      </Card>

      {/* 20. Recent Logs / Terminal (New Refactored) */}
      <SystemLogs 
        logs={logs}
        title="Terminal Feed"
        session="bash-412"
        status="Stable"
        statusColor="success"
      />

      {/* New 3: Active Sessions */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-1">
                  <CardTitle>Active Sessions</CardTitle>
                  <CardDescription>Devices logged into your account.</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <Surface variant="info" className="flex items-center justify-between p-3">
               <div className="flex items-center gap-3">
                  <FiMonitor className="text-ds-info-600" size={18} />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-ds-900 dark:text-ds-100">MacBook Pro 16"</span>
                     <span className="text-xs text-ds-500">San Francisco, US • Current session</span>
                  </div>
               </div>
               <Badge content="Active" color="info" variant="soft" pulse />
            </Surface>
            <div className="flex items-center justify-between p-3">
               <div className="flex items-center gap-3">
                  <FiSmartphone className="text-ds-500" size={18} />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-ds-800 dark:text-ds-200">iPhone 14 Pro</span>
                     <span className="text-xs text-ds-500">New York, US • 2 hours ago</span>
                  </div>
               </div>
               <Button variant="soft" size="sm">Revoke</Button>
            </div>
            <Divider />
            <div className="flex items-center justify-between p-3">
               <div className="flex items-center gap-3">
                  <FiMonitor className="text-ds-500" size={18} />
                  <div className="flex flex-col">
                     <span className="text-sm font-bold text-ds-800 dark:text-ds-200">Chrome on Windows</span>
                     <span className="text-xs text-ds-500">London, UK • 3 days ago</span>
                  </div>
               </div>
               <Button variant="soft" size="sm">Revoke</Button>
            </div>
         </CardContent>
      </Card>

      {/* New 7: Toast Example */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-3">
               <div className="size-8 rounded-lg bg-ds-primary-500/10 flex items-center justify-center">
                  <FiBell className="text-ds-primary-600" size={16} />
               </div>
               <div className="flex flex-col gap-1">
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>System toast dispatcher testing.</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex flex-col gap-2 p-3 bg-ds-50 dark:bg-ds-800/40 rounded-lg border border-ds-200 dark:border-ds-800">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Push Notifications</span>
                  <Switch defaultChecked />
               </div>
               <span className="text-xs text-ds-500">Allow systemic alerts to pop up.</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
               <Button variant="soft" size="sm" leftIcon={<FiCheckCircle size={14} />} onClick={() => toast({ title: 'Saved!', description: 'Settings updated successfully.', type: 'success', invert: true })}>Success</Button>
               <Button variant="soft" size="sm" leftIcon={<FiXCircle size={14} />} onClick={() => toast({ title: 'Error', description: 'Failed to apply change.', type: 'error', invert: true })}>Error</Button>
            </div>
         </CardContent>
      </Card>

      {/* New 11: Invite Team */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="size-8 ds-rounded bg-ds-success-500/10 flex items-center justify-center">
                     <FiUserPlus className="text-ds-success-600" size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                     <CardTitle>Invite Members</CardTitle>
                     <CardDescription>Grow your workspace team.</CardDescription>
                  </div>
               </div>
            </div>
         </CardHeader>
         <CardContent className="space-y-5">
            <CopyField 
               label="Invite Link" 
               value="https://dashkit.ui/join/t_xe9qw" 
               description="Share this link to invite team members."
            />
            <div className="flex gap-2 w-full items-end mt-1">
               <div className="flex-1">
                  <Input 
                     label="Email Address"
                     placeholder="teammate@example.com"
                     type="email"
                     className="w-full text-sm" 
                  />
               </div>
               <Button variant="filled" className="px-4 shrink-0" rightIcon={<FiSend size={14} />}>
                  Send
               </Button>
            </div>
         </CardContent>
      </Card>
      <Card>
         <CardHeader>
            <CardTitle>Data Export</CardTitle>
            <CardDescription>Download your workspace activity logs.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
             <Surface className="p-4 space-y-3">
               <Checkbox label="User Profiles" defaultChecked />
               <Checkbox label="Transaction History" defaultChecked />
               <Checkbox label="System Logs" />
             </Surface>

            <Select
               label="Format"
               options={[
                 { label: 'CSV (Comma Separated)', value: 'csv' },
                 { label: 'JSON Data array', value: 'json' }
               ]}
               value="csv"
               onChange={() => {}}
            />
             <Button variant="outlined" className="w-full">Initiate Export</Button>
          </CardContent>
       </Card>

       {/* New 15: Appearance Engine (New) */}
       <Card>
          <CardHeader>
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="size-8 rounded-full bg-ds-warning-500/10 flex items-center justify-center">
                      <FiSun className="text-ds-warning-600" size={16} />
                   </div>
                   <div className="flex flex-col">
                      <CardTitle>Appearance Engine</CardTitle>
                      <CardDescription>Customize your workspace theme.</CardDescription>
                   </div>
                </div>
                <Badge content="Pro" color="warning" variant="soft" />
             </div>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-widest text-ds-500">Interface Theme</span>
                <ButtonGroup className="w-full">
                   <Button 
                     variant="soft" 
                     className="flex-1 text-xs gap-2 font-semibold"
                     leftIcon={<FiCheckCircle size={14} className="text-ds-primary-600" />}
                   >
                     Light
                   </Button>
                   <Button 
                     variant="soft" 
                     className="flex-1 text-xs gap-2 font-semibold opacity-70"
                     leftIcon={<FiMoon size={14} />}
                   >
                     Dark
                   </Button>
                   <Button 
                     variant="soft" 
                     className="flex-1 text-xs gap-2 font-semibold opacity-70"
                     leftIcon={<FiMonitor size={14} />}
                   >
                     System
                   </Button>
                </ButtonGroup>
             </div>
             <div className="space-y-3">
                <div className="flex items-center justify-between">
                   <span className="text-xs font-bold uppercase tracking-widest text-ds-500">Contrast Ratio</span>
                   <span className="text-sm font-bold text-ds-primary-600">Enhanced</span>
                </div>
                <Slider defaultValue={75} showValue={false} />
             </div>
             <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/50 dark:bg-ds-100/5">
                <div className="flex items-center gap-2">
                   <div className="size-2 rounded-full bg-ds-success-500" />
                   <span className="text-sm font-medium">Automatic Brightness</span>
                </div>
                <Switch defaultChecked />
             </div>
          </CardContent>
       </Card>
    </div>
  );
}
