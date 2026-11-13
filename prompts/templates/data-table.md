# Golden Template: Searchable Data Table

Reference implementation for a filterable, paginated data table with confirmation modal using `Card`, `Input`, `Select`, `Table`, `Badge`, `Pagination`, `Modal`, and `Button`.

```tsx
import { useState } from 'react';
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
} from '@/dashkit';

interface Member {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'invited' | 'suspended';
}

const MEMBERS: Member[] = [
  { id: '1', name: 'Alice Chen', email: 'alice@acme.dev', role: 'admin', status: 'active' },
  { id: '2', name: 'Bruno Silva', email: 'bruno@acme.dev', role: 'editor', status: 'invited' },
  { id: '3', name: 'Clara Diaz', email: 'clara@acme.dev', role: 'viewer', status: 'suspended' },
];

const STATUS_COLOR = {
  active: 'success',
  invited: 'info',
  suspended: 'danger',
} as const;

export function MembersTable() {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filtered = MEMBERS.filter((member) => {
    const matchesQuery =
      member.name.toLowerCase().includes(query.toLowerCase()) ||
      member.email.toLowerCase().includes(query.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesQuery && matchesRole;
  });

  return (
    <Card>
      <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-4">
        <CardTitle>Team Members</CardTitle>
        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Search by name or email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64"
          />
          <Select
            value={roleFilter}
            onChange={setRoleFilter}
            options={[
              { value: 'all', label: 'All roles' },
              { value: 'admin', label: 'Admin' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ]}
          />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium text-foreground">{member.name}</TableCell>
                  <TableCell className="text-muted-foreground">{member.email}</TableCell>
                  <TableCell className="capitalize">{member.role}</TableCell>
                  <TableCell>
                    <Badge
                      variant="soft"
                      color={STATUS_COLOR[member.status]}
                      content={member.status}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      color="danger"
                      size="sm"
                      onClick={() => setSelectedMember(member)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Showing {filtered.length} of {MEMBERS.length} members
          </span>
          <Pagination currentPage={page} totalPages={3} onChange={setPage} />
        </div>
      </CardContent>

      <Modal
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        size="sm"
      >
        <ModalHeader>Remove Member</ModalHeader>
        <ModalContent>
          <p className="text-sm text-muted-foreground">
            Are you sure you want to remove <strong>{selectedMember?.name}</strong> from the workspace?
          </p>
        </ModalContent>
        <ModalFooter>
          <Button variant="outlined" onClick={() => setSelectedMember(null)}>
            Cancel
          </Button>
          <Button
            variant="filled"
            color="danger"
            onClick={() => setSelectedMember(null)}
          >
            Confirm Removal
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
}
```
