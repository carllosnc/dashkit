import React, { useState } from 'react';
import {
  FiUser, FiMail, FiPhone, FiGlobe, FiMapPin,
  FiSave, FiX, FiBriefcase, FiLinkedin, FiGithub, FiTwitter, FiLayers,
} from 'react-icons/fi';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Select } from '../../components/Select/Select';
import { Switch } from '../../components/Switch/Switch';
import { Radio } from '../../components/Radio/Radio';
import { Textarea } from '../../components/Textarea/Textarea';
import { Combobox } from '../../components/Combobox/Combobox';
import { Divider } from '../../components/Divider/Divider';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/Card/Card';

export const ComplexFormExample = () => {
  const [role, setRole] = useState('developer');
  const [techStack, setTechStack] = useState<string[]>(['react', 'typescript', 'tailwind']);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen ds-page flex items-center justify-center p-6 md:p-12 relative overflow-hidden">
      <Card className="w-full max-w-4xl relative z-10 shrink-0">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl">
              <FiUser className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">Complete Your Profile</CardTitle>
          </div>
          <CardDescription className="text-base-500 dark:text-base-400">
            Update your personal information and preferences to get started with Dashkit.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-16 py-10">
            {/* Personal Info Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Personal Information
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <Input
                  label="First Name"
                  placeholder="John"
                  leftIcon={<FiUser className="size-4" />}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  leftIcon={<FiUser className="size-4" />}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  leftIcon={<FiMail className="size-4" />}
                  required
                />
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  leftIcon={<FiPhone className="size-4" />}
                />
                <div className="md:col-span-2 flex flex-col gap-4">
                  <label className="text-[13px] font-semibold text-base-700 dark:text-base-300 ml-1 tracking-tight">
                    Gender
                  </label>
                  <div className="flex gap-12">
                    <Radio name="gender" label="Male" defaultChecked />
                    <Radio name="gender" label="Female" />
                    <Radio name="gender" label="Other" />
                  </div>
                </div>
              </div>
            </section>

            {/* Company Info Section */}
            <section className="flex flex-col gap-8 text-6">
              <Divider contentPosition="left">
                Company Information
              </Divider>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <Input
                  label="Company Name"
                  placeholder="Dashkit UI Inc."
                  leftIcon={<FiBriefcase className="size-4" />}
                />
                <Input
                  label="Tax ID / VAT"
                  placeholder="US-123456789"
                  leftIcon={<FiLayers className="size-4" />}
                />
              </div>
            </section>

            {/* Professional Info Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Professional Details
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <Select
                  label="Professional Role"
                  value={role}
                  onChange={setRole}
                  options={[
                    { value: 'developer', label: 'Software Developer' },
                    { value: 'designer', label: 'UI/UX Designer' },
                    { value: 'manager', label: 'Project Manager' },
                    { value: 'other', label: 'Other' },
                  ]}
                  description="Select the role that best describes you."
                />
                <Input
                  label="Portfolio Website"
                  placeholder="https://example.com"
                  leftIcon={<FiGlobe className="size-4" />}
                />
              </div>
            </section>

            {/* Technical Stack Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Technical Expertise
              </Divider>
              <Combobox
                label="Core Technologies"
                multiple
                placeholder="Search technologies..."
                description="List the key frameworks and tools you use daily."
                options={[
                  { value: 'react', label: 'React' },
                  { value: 'typescript', label: 'TypeScript' },
                  { value: 'tailwind', label: 'Tailwind CSS' },
                  { value: 'nextjs', label: 'Next.js' },
                  { value: 'nodejs', label: 'Node.js' },
                  { value: 'postgre', label: 'PostgreSQL' },
                  { value: 'docker', label: 'Docker' },
                  { value: 'aws', label: 'AWS' },
                  { value: 'framer', label: 'Framer Motion' },
                ]}
                value={techStack}
                onChange={(val) => setTechStack(val as string[])}
              />
            </section>

            {/* Skills Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Skills & Interests
              </Divider>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <Checkbox label="React" defaultChecked />
                <Checkbox label="TypeScript" defaultChecked />
                <Checkbox label="Tailwind CSS" defaultChecked />
                <Checkbox label="Node.js" />
                <Checkbox label="UI/UX Design" />
                <Checkbox label="Next.js" />
                <Checkbox label="Framer Motion" />
                <Checkbox label="PostgreSQL" />
                <Checkbox label="GraphQL" />
                <Checkbox label="Docker" />
                <Checkbox label="Cloud Computing" />
                <Checkbox label="Open Source" />
              </div>
            </section>

            {/* Social Presence Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Social Presence
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                <Input
                  label="LinkedIn Profile"
                  placeholder="linkedin.com/in/username"
                  leftIcon={<FiLinkedin className="size-4" />}
                />
                <Input
                  label="GitHub Username"
                  placeholder="github.com/username"
                  leftIcon={<FiGithub className="size-4" />}
                />
                <div className="md:col-span-2">
                  <Input
                    label="X / Twitter"
                    placeholder="x.com/username"
                    leftIcon={<FiTwitter className="size-4" />}
                  />
                </div>
              </div>
            </section>

            {/* Bio Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                About Yourself
              </Divider>
              <Textarea
                label="Quick Biography"
                placeholder="Tell us a bit about your journey..."
                helperText="This will be displayed on your public profile. Max 500 characters."
                autoGrow
              />
            </section>

            {/* Location Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Location Details
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Input
                    label="Street Address"
                    placeholder="123 Design Lane"
                    leftIcon={<FiMapPin className="size-4" />}
                  />
                </div>
                <Input
                  label="Postal Code"
                  placeholder="90210"
                />
              </div>
            </section>

            {/* Preferences Section */}
            <section className="flex flex-col gap-8">
              <Divider contentPosition="left">
                Preferences & Security
              </Divider>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10">
                <div className="flex flex-col gap-8">
                  <Switch
                    label="Email Notifications"
                    description="Receive weekly updates about your dashboard activity."
                    defaultChecked
                  />
                  <Switch
                    label="Biometric Login"
                    description="Use FaceID or Fingerprint for faster access."
                  />
                </div>
                <div className="flex flex-col gap-8">
                  <Switch
                    label="Two-Factor Authentication"
                    description="Add an extra layer of security to your account."
                    defaultChecked
                  />
                  <Checkbox
                    label="Terms and Conditions"
                    description="I agree to the Dashkit Terms of Service and Privacy Policy."
                    required
                  />
                </div>
              </div>
            </section>
          </CardContent>

          <CardFooter className="p-8 flex items-center justify-between">
            <Button type="button" variant="outlined" leftIcon={<FiX />}>
              Discard
            </Button>
            <Button
              type="submit"
              variant="filled"
              loading={loading}
              leftIcon={!loading && <FiSave className="size-4" />}
            >
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
