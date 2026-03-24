export interface ComponentConfig {
  name: string;
  files: string[];
  dependencies?: string[]; // NPM dependencies
  registryDependencies?: string[]; // Other dashkit components
}

export const registry: Record<string, ComponentConfig> = {
  accordion: {
    name: 'Accordion',
    files: ['src/components/Accordion/Accordion.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  avatar: {
    name: 'Avatar',
    files: ['src/components/Avatar/Avatar.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  badge: {
    name: 'Badge',
    files: ['src/components/Badge/Badge.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  floatbadge: {
    name: 'FloatBadge',
    files: ['src/components/Badge/Badge.tsx'],
    registryDependencies: ['badge'],
  },
  button: {
    name: 'Button',
    files: ['src/components/Button/Button.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react', 'react-icons'],
  },
  card: {
    name: 'Card',
    files: ['src/components/Card/Card.tsx'],
    registryDependencies: ['badge', 'button'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  checkbox: {
    name: 'Checkbox',
    files: ['src/components/Checkbox/Checkbox.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  drawer: {
    name: 'Drawer',
    files: ['src/components/Drawer/Drawer.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  dropdown: {
    name: 'Dropdown',
    files: ['src/components/Dropdown/Dropdown.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  imageexpander: {
    name: 'ImageExpander',
    files: ['src/components/ImageExpander/ImageExpander.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  input: {
    name: 'Input',
    files: ['src/components/Input/Input.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  modal: {
    name: 'Modal',
    files: ['src/components/Modal/Modal.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  otpinput: {
    name: 'OtpInput',
    files: ['src/components/OtpInput/OtpInput.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  radio: {
    name: 'Radio',
    files: ['src/components/Radio/Radio.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  select: {
    name: 'Select',
    files: ['src/components/Select/Select.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  switch: {
    name: 'Switch',
    files: ['src/components/Switch/Switch.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  tabs: {
    name: 'Tabs',
    files: ['src/components/Tabs/Tabs.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  toast: {
    name: 'Toast',
    files: ['src/components/Toast/Toast.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'lucide-react'],
  },
  spinner: {
    name: 'Spinner',
    files: ['src/components/Spinner/Spinner.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  navbar: {
    name: 'Navbar',
    files: ['src/components/Navbar/Navbar.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  skeleton: {
    name: 'Skeleton',
    files: ['src/components/Skeleton/Skeleton.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  breadcrumb: {
    name: 'Breadcrumb',
    files: ['src/components/Breadcrumb/Breadcrumb.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'lucide-react'],
  },
  iconbutton: {
    name: 'IconButton',
    files: ['src/components/IconButton/IconButton.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  areachart: {
    name: 'AreaChart',
    files: ['src/components/AreaChart/AreaChart.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  barchart: {
    name: 'BarChart',
    files: ['src/components/BarChart/BarChart.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  linechart: {
    name: 'LineChart',
    files: ['src/components/LineChart/LineChart.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  piechart: {
    name: 'PieChart',
    files: ['src/components/PieChart/PieChart.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  buttongroup: {
    name: 'ButtonGroup',
    files: ['src/components/ButtonGroup/ButtonGroup.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  chip: {
    name: 'Chip',
    files: ['src/components/Chip/Chip.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  combobox: {
    name: 'Combobox',
    files: ['src/components/Combobox/Combobox.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['chip'],
  },
  divider: {
    name: 'Divider',
    files: ['src/components/Divider/Divider.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  sidebar: {
    name: 'Sidebar',
    files: ['src/components/Sidebar/Sidebar.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  textarea: {
    name: 'Textarea',
    files: ['src/components/Textarea/Textarea.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  datepicker: {
    name: 'DatePicker',
    files: ['src/components/DatePicker/DatePicker.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  table: {
    name: 'Table',
    files: ['src/components/Table/Table.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  }
};
