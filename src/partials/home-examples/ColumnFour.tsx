import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/Card/Card';
import { Button } from '../../components/Button/Button';
import { Badge } from '../../components/Badge/Badge';
import { Divider } from '../../components/Divider/Divider';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Slider } from '../../components/Slider/Slider';
import { Input } from '../../components/Input/Input';
import { Select } from '../../components/Select/Select';
import { StatsCard } from '../../components/StatsCard/StatsCard';
import { FiBell, FiZap, FiShield, FiMessageSquare, FiList, FiFolder, FiTrendingUp, FiShare2, FiCheckCircle, FiXCircle, FiLock, FiCopy, FiServer, FiDownload, FiFileText, FiActivity } from 'react-icons/fi';
import { FaGithub, FaGoogle, FaSlack, FaDiscord, FaAws, FaFigma } from 'react-icons/fa';
import { SiVercel, SiNotion } from 'react-icons/si';
import { PieChart } from '../../components/PieChart/PieChart';

export function ColumnFour() {
  const [tasks, setTasks] = React.useState<{ label: string; checked: boolean }[]>([
    { label: "Refactor API layer", checked: true },
    { label: "Update documentation", checked: true },
    { label: "Finalize color tokens", checked: false },
    { label: "Performance audit", checked: false },
  ]);

  const completedCount = tasks.filter(t => t.checked).length;
  const progressValue = (completedCount / tasks.length) * 100;

  const toggleTask = (index: number) => {
    setTasks(prev => prev.map((t, i) => i === index ? { ...t, checked: !t.checked } : t));
  };

  const trafficData = [
    { label: "Organic", value: 480, color: "#0099ff" },
    { label: "Referral", value: 320, color: "#6666ff" },
    { label: "Direct", value: 140, color: "#006699" },
    { label: "Social", value: 60, color: "#00cccc" }
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* 14. Notifications Feed */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <FiBell className="text-ds-primary-600" size={18} />
                  <CardTitle>Notifications</CardTitle>
               </div>
               <Badge content="3 New" color="info" variant="soft" />
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            {[
              { icon: <FiZap className="text-ds-warning-600" />, title: "Deployment successful", time: "2m ago" },
              { icon: <FiShield className="text-ds-success-600" />, title: "Security scan passed", time: "1h ago" },
              { icon: <FiMessageSquare className="text-ds-info-600" />, title: "New feedback received", time: "3h ago" }
            ].map((item, i) => (
              <div key={i} className="flex gap-3 items-start p-2 ds-rounded hover:bg-ds-50/50 dark:hover:bg-ds-800/30 transition-colors cursor-pointer group">
                 <div className="mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{item.icon}</div>
                 <div className="flex flex-col">
                    <span className="text-sm font-semibold leading-tight">{item.title}</span>
                    <span className="text-xs text-ds-500 font-medium">{item.time}</span>
                 </div>
              </div>
            ))}
            <Divider className="my-2" />
            <div className="px-2">
              <Slider 
                label="Alert Sensitivity" 
                description="Threshold for instant alerts."
                defaultValue={65} 
                showValue
              />
            </div>
            <Button variant="outlined" size="sm" className="w-full">Clear All Notifications</Button>
         </CardContent>
      </Card>

      {/* 15. Task Management */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <FiList className="text-ds-primary-600" size={18} />
                  <CardTitle>Tasks</CardTitle>
               </div>
               <span className="text-xs font-bold text-ds-500">{Math.round(progressValue)}% Done</span>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <ProgressBar value={progressValue} size="xs" color="primary" />
            <div className="space-y-5">
               {tasks.map((task, i) => (
                  <Checkbox
                      key={task.label}
                      label={task.label}
                      checked={task.checked}
                      onChange={() => toggleTask(i)}
                  />
               ))}
            </div>
         </CardContent>
      </Card>

      {/* System Uptime Stats Card */}
      <StatsCard
        title="System Uptime"
        value={99.98}
        suffix="%"
        trend={0.01}
        trendLabel="vs last month"
        status="info"
        icon={<FiActivity className="text-ds-info-600" size={16} />}
        chart={{
          data: [99.97, 99.98, 99.99, 99.98, 99.97, 99.98],
        }}
        animate
      />

      {/* 16. Cloud Storage Usage */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-2">
               <FiFolder className="text-ds-warning-600" size={18} />
               <CardTitle>Storage</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-end justify-between">
               <div className="flex flex-col">
                  <span className="text-2xl font-bold">42.8 GB</span>
                  <span className="text-xs text-ds-500">of 100 GB used</span>
               </div>
               <FiTrendingUp className="text-ds-danger-600 mb-1" />
            </div>
            <ProgressBar value={42.8} size="sm" color="warning" />
            <div className="grid grid-cols-2 gap-2">
               <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                  <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">Images</span>
                  <span className="text-sm font-bold">12.4 GB</span>
               </div>
               <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                  <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">Backups</span>
                  <span className="text-sm font-bold">30.4 GB</span>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 17. Quick Integrations */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-2">
               <FiShare2 className="text-ds-info-600" size={18} />
               <CardTitle>Integrations</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="space-y-5">
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <FaGithub size={22} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">GitHub</span>
               </div>
               <Badge content="Connected" color="success" variant="soft" />
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <FaGoogle size={20} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">Google Workspace</span>
               </div>
               <Button variant="soft" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <FaSlack size={22} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">Slack</span>
               </div>
               <Button variant="soft" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <FaDiscord size={22} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">Discord</span>
               </div>
               <Badge content="Connected" color="success" variant="soft" />
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <FaAws size={24} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">AWS Cloud</span>
               </div>
               <Button variant="soft" size="sm">Connect</Button>
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <SiVercel size={20} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">Vercel</span>
               </div>
               <Badge content="Connected" color="success" variant="soft" />
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <FaFigma size={22} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">Figma</span>
               </div>
               <Badge content="Connected" color="success" variant="soft" />
            </div>
            <div className="flex items-center justify-between group cursor-pointer">
               <div className="flex items-center gap-4">
                  <SiNotion size={22} className="text-ds-600 dark:text-ds-400" />
                  <span className="text-sm font-medium">Notion</span>
               </div>
               <Button variant="soft" size="sm">Connect</Button>
            </div>
            <Divider />
            <Button variant="outlined" className="w-full">
               Manage 12+ Connections
            </Button>
         </CardContent>
      </Card>

      {/* New 16: Security Audit */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-2">
               <div className="size-6 ds-rounded bg-ds-success-500/10 flex items-center justify-center">
                  <FiShield className="text-ds-success-600" size={14} />
               </div>
               <CardTitle>Security Audit</CardTitle>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-ds-success-50 dark:bg-ds-success-900/10 ds-rounded border border-ds-success-200 dark:border-ds-success-800">
               <FiCheckCircle className="text-ds-success-600 shrink-0" size={18} />
               <p className="text-xs text-ds-success-800 dark:text-ds-success-200 font-medium leading-tight">No vulnerabilities detected matching active CVE signatures.</p>
            </div>
            <div className="space-y-3">
               <div className="flex items-center justify-between text-sm border-b pb-2 border-ds-200 dark:border-ds-800">
                  <span className="font-bold">MFA Required</span>
                  <Badge content="Enforced" color="success" variant="soft" />
               </div>
               <div className="flex items-center justify-between text-sm border-b pb-2 border-ds-200 dark:border-ds-800">
                  <span className="font-bold">Suspicious Logins</span>
                  <span className="font-bold text-ds-500 tracking-wider">0</span>
               </div>
               <div className="flex items-center justify-between text-sm">
                  <span className="font-bold">Password Policy</span>
                  <span className="font-bold text-ds-500 tracking-wider text-xs uppercase">STRICT</span>
               </div>
            </div>
         </CardContent>
      </Card>

      {/* 21. Model Training (New) */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex flex-col gap-1">
                  <CardTitle>Model Training</CardTitle>
                  <CardDescription>GPT-Neo Large (Ver. 4.2)</CardDescription>
               </div>
               <FiZap className="text-ds-primary-600 animate-pulse" size={18} />
            </div>
         </CardHeader>
         <CardContent className="space-y-5">
            <div className="space-y-2">
               <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-ds-500 uppercase">Training Progress</span>
                  <span className="text-xs font-black">68%</span>
               </div>
               <ProgressBar value={68} color="primary" />
            </div>
            
            <div className="grid grid-cols-2 gap-3 tabular-nums">
               <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                  <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">Loss</span>
                  <span className="text-sm font-bold">0.0421</span>
               </div>
               <div className="flex flex-col p-2 bg-ds-50/50 dark:bg-ds-800/10 ds-rounded border border-ds-200 dark:border-ds-800">
                  <span className="text-xs font-bold uppercase text-ds-500 tracking-wider">ETA</span>
                  <span className="text-sm font-bold">04:12:08</span>
               </div>
            </div>

            <div className="flex gap-2">
               <Button variant="soft" className="flex-1" leftIcon={<FiXCircle />}>Abort</Button>
               <Button variant="filled" className="flex-1" leftIcon={<FiCheckCircle />}>Val.</Button>
            </div>
         </CardContent>
      </Card>

      {/* New 4: API Keys */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <div className="size-6 ds-rounded bg-ds-warning-500/10 flex items-center justify-center">
                     <FiLock className="text-ds-warning-600" size={14} />
                  </div>
                  <CardTitle>API Credentials</CardTitle>
               </div>
               <Badge content="Pro" color="warning" variant="soft" />
            </div>
            <CardDescription>Manage your secret keys for external integrations.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex flex-col gap-1.5">
               <label className="text-xs font-bold text-ds-800 dark:text-ds-200 uppercase tracking-wider">Production Key</label>
               <div className="flex gap-2 w-full">
                  <Input 
                     type="password" 
                     defaultValue="pk_live_1234567890abcdef" 
                     readOnly
                     disabled 
                     className="font-mono text-xs w-full" 
                  />
                  <Button variant="outlined" className="px-3 shrink-0" aria-label="Copy key">
                     <FiCopy size={14} />
                  </Button>
               </div>
            </div>
            <div className="flex flex-col gap-1.5 mt-2">
               <label className="text-xs font-bold text-ds-800 dark:text-ds-200 uppercase tracking-wider">Test Key</label>
               <div className="flex gap-2 w-full">
                  <Input 
                     type="password" 
                     defaultValue="pk_test_0987654321fedcba" 
                     readOnly
                     disabled 
                     className="font-mono text-xs w-full" 
                  />
                  <Button variant="outlined" className="px-3 shrink-0" aria-label="Copy key">
                     <FiCopy size={14} />
                  </Button>
               </div>
            </div>
            <Button variant="soft" className="w-full mt-2" leftIcon={<FiZap />}>Generate New Key</Button>
         </CardContent>
      </Card>

      {/* New 15: Traffic Analytics Refactored */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-2">
                  <FiTrendingUp className="text-ds-primary-600" size={18} />
                  <CardTitle>Traffic Analytics</CardTitle>
               </div>
               <Badge content="+12.5%" color="success" variant="soft" />
            </div>
         </CardHeader>
         <CardContent className="space-y-6">
            <div className="flex flex-col items-center">
              <PieChart
                data={trafficData}
                innerRadius={0.65}
                showLabels={true}
                className="max-w-[300px]"
              />
            </div>
         </CardContent>
      </Card>

      {/* New 8: Select Example */}
      <Card>
         <CardHeader>
            <div className="flex items-center gap-3">
               <div className="size-8 rounded-lg bg-ds-500/10 flex items-center justify-center">
                  <FiServer className="text-ds-500" size={16} />
               </div>
               <div className="flex flex-col gap-1">
                  <CardTitle>Environment Settings</CardTitle>
                  <CardDescription>Configure deployment targets and domains.</CardDescription>
               </div>
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <Select 
               label="Target Node"
               options={[
                 { label: 'US-East (Virginia)', value: 'us-east-1' },
                 { label: 'US-West (Oregon)', value: 'us-west-2' },
                 { label: 'EU-Central (Frankfurt)', value: 'eu-central-1' }
               ]}
               value="us-east-1"
               onChange={() => {}}
            />
            <Select 
               label="Environment"
               options={[
                 { label: 'Production', value: 'prod' },
                 { label: 'Staging', value: 'stage' },
                 { label: 'Development', value: 'dev' },
                 { label: 'Testing', value: 'test' }
               ]}
               value="prod"
               onChange={() => {}}
            />
            <div className="flex flex-col gap-1.5 pt-2">
               <span className="text-xs font-bold uppercase tracking-wider text-ds-500">Status</span>
               <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/50 dark:bg-ds-800/10">
                  <div className="flex items-center gap-2">
                     <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ds-success-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-ds-success-500"></span>
                     </span>
                     <span className="text-sm font-bold text-ds-900 dark:text-ds-100">All systems operational</span>
                  </div>
              </div>
            </div>
         </CardContent>
      </Card>

      {/* New 12: Recent Invoice */}
      <Card>
         <CardHeader>
            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className="size-8 ds-rounded bg-ds-primary-500/10 flex items-center justify-center">
                     <FiFileText className="text-ds-primary-600" size={16} />
                  </div>
                  <div className="flex flex-col gap-1">
                     <CardTitle>Recent Invoice</CardTitle>
                     <CardDescription>Generated automatically.</CardDescription>
                  </div>
               </div>
               <Badge content="Paid" color="success" variant="soft" />
            </div>
         </CardHeader>
         <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 ds-rounded border border-ds-200 dark:border-ds-800 bg-ds-50/50 dark:bg-ds-800/10">
               <div className="flex flex-col">
                  <span className="text-sm font-bold">INV-0492-MAR</span>
                  <span className="text-xs text-ds-500">Issued Mar 1st, 2026</span>
               </div>
               <span className="text-lg font-bold">$1,249.00</span>
            </div>
            <Button variant="soft" className="w-full" leftIcon={<FiDownload size={14} />}>
               Download PDF
            </Button>
         </CardContent>
      </Card>

    </div>
  );
}
