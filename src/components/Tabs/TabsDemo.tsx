import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';
import { FiUser, FiSettings, FiActivity } from 'react-icons/fi';

export function TabsDemo() {
  return (
    <div className="w-full max-w-lg p-8 rounded-2xl border border-base-200 dark:border-base-800 bg-white dark:bg-base-900 shadow-xl overflow-hidden">
      <Tabs defaultValue="profile">
        <TabsList className="mb-8 w-full">
          <TabsTrigger value="profile">
            <FiUser className="mr-2 size-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="activity">
            <FiActivity className="mr-2 size-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings">
            <FiSettings className="mr-2 size-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <div className="min-h-[140px]">
          <TabsContent value="profile">
            <h3 className="text-lg font-bold text-base-900 dark:text-white mb-2 tracking-tight">User Profile</h3>
            <p className="text-sm text-base-500 dark:text-base-400 leading-relaxed max-w-md">
              Update your personal details and public information. All changes are saved automatically.
            </p>
          </TabsContent>
          <TabsContent value="activity">
            <h3 className="text-lg font-bold text-base-900 dark:text-white mb-2 tracking-tight">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-50 dark:bg-base-800/40 border border-base-100 dark:border-base-800/80">
                <div className="size-2 rounded-full bg-emerald-500" />
                <span className="text-sm text-base-600 dark:text-base-300">Successfully deployed project <span className="font-semibold text-black dark:text-white">dashkit-ui</span></span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-base-50 dark:bg-base-800/40 border border-base-100 dark:border-base-800/80">
                <div className="size-2 rounded-full bg-blue-500" />
                <span className="text-sm text-base-600 dark:text-base-300">Updated <span className="font-semibold text-black dark:text-white">registry.json</span></span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="settings">
            <h3 className="text-lg font-bold text-base-900 dark:text-white mb-2 tracking-tight">Preferences</h3>
            <p className="text-sm text-base-500 dark:text-base-400 leading-relaxed max-w-md">
              Manage your notification types, connected accounts, and general dashboard settings.
            </p>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
