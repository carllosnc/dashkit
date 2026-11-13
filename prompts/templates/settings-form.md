# Golden Template: Settings Form

Reference implementation for a structured settings page using `Card`, `Input`, `Textarea`, `Select`, `Switch`, `Divider`, `Surface`, `Button`, and `useToast`.

```tsx
import { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Divider,
  Input,
  Select,
  Surface,
  Switch,
  Textarea,
  useToast,
} from '@/dashkit';

export function WorkspaceSettingsForm() {
  const { toast } = useToast();
  const [name, setName] = useState('Acme Engineering');
  const [region, setRegion] = useState('us-east');
  const [bio, setBio] = useState('');
  const [auditLogs, setAuditLogs] = useState(true);
  const [saving, setSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        type: 'success',
        title: 'Settings saved',
        description: 'Workspace preferences have been updated.',
      });
    }, 400);
  };

  return (
    <form onSubmit={handleSave} className="max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Workspace Profile</CardTitle>
          <CardDescription>
            Configure your organization identity and regional defaults.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            label="Workspace Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Select
            label="Primary Region"
            value={region}
            onChange={setRegion}
            options={[
              { value: 'us-east', label: 'US East (N. Virginia)' },
              { value: 'eu-west', label: 'EU West (Ireland)' },
              { value: 'sa-east', label: 'South America (São Paulo)' },
            ]}
          />
          <Textarea
            label="Description"
            placeholder="Brief summary of this workspace..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
          />

          <Divider />

          <Switch
            label="Enable immutable audit logs"
            description="Stream all security and billing events to your compliance archive."
            checked={auditLogs}
            onChange={(e) => setAuditLogs(e.target.checked)}
          />

          <Surface variant="warning" className="p-4 text-sm">
            Changing the primary region after initial provisioning requires a scheduled maintenance window.
          </Surface>
        </CardContent>

        <CardFooter className="justify-end gap-2">
          <Button type="button" variant="outlined">
            Reset
          </Button>
          <Button type="submit" variant="filled" color="primary" loading={saving}>
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
```
