export interface ComponentConfig {
  name: string;
  files: string[];
  dependencies?: string[]; // NPM dependencies
  registryDependencies?: string[]; // Other dashkit components
}

export const registry: Record<string, ComponentConfig> = {
  accordion: {
    name: 'Accordion',
    files: [
      'src/components/Accordion/Accordion.tsx',
      'src/components/Accordion/AccordionItem.tsx',
      'src/components/Accordion/AccordionTrigger.tsx',
      'src/components/Accordion/AccordionContent.tsx',
      'src/components/Accordion/AccordionContext.ts',
      'src/components/Accordion/Accordion.test.tsx',
      'src/components/Accordion/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
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
    files: [
      'src/components/Button/Button.tsx',
      'src/components/Button/Button.test.tsx',
      'src/components/Button/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
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
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  drawer: {
    name: 'Drawer',
    files: [
      'src/components/Drawer/Drawer.tsx',
      'src/components/Drawer/useDrawer.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  dropdown: {
    name: 'Dropdown',
    files: [
      'src/components/Dropdown/Dropdown.tsx',
      'src/components/Dropdown/useDropdown.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  imageexpander: {
    name: 'ImageExpander',
    files: [
      'src/components/ImageExpander/ImageExpander.tsx',
      'src/components/ImageExpander/useImageExpander.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  input: {
    name: 'Input',
    files: ['src/components/Input/Input.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  modal: {
    name: 'Modal',
    files: [
      'src/components/Modal/Modal.tsx',
      'src/components/Modal/useModal.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  otpinput: {
    name: 'OtpInput',
    files: [
      'src/components/OtpInput/OtpInput.tsx',
      'src/components/OtpInput/useOtpInput.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  radio: {
    name: 'Radio',
    files: [
      'src/components/Radio/Radio.tsx',
      'src/components/Radio/useRadio.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  select: {
    name: 'Select',
    files: [
      'src/components/Select/Select.tsx',
      'src/components/Select/useSelect.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  switch: {
    name: 'Switch',
    files: [
      'src/components/Switch/Switch.tsx',
      'src/components/Switch/useSwitch.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  slider: {
    name: 'Slider',
    files: [
      'src/components/Slider/Slider.tsx',
      'src/components/Slider/useSlider.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  surface: {
    name: 'Surface',
    files: ['src/components/Surface/Surface.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  tabs: {
    name: 'Tabs',
    files: ['src/components/Tabs/Tabs.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  toast: {
    name: 'Toast',
    files: [
      'src/components/Toast/Toast.tsx',
      'src/components/Toast/useToast.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  stepper: {
    name: 'Stepper',
    files: [
      'src/components/Stepper/Stepper.tsx',
      'src/components/Stepper/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  pagination: {
    name: 'Pagination',
    files: [
      'src/components/Pagination/Pagination.tsx',
      'src/components/Pagination/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
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
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
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
    files: [
      'src/components/LineChart/LineChart.tsx',
      'src/components/LineChart/useLineChart.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  piechart: {
    name: 'PieChart',
    files: [
      'src/components/PieChart/PieChart.tsx',
      'src/components/PieChart/usePieChart.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  progressbar: {
    name: 'ProgressBar',
    files: [
      'src/components/ProgressBar/ProgressBar.tsx',
      'src/components/ProgressBar/useProgressBar.ts'
    ],
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
    files: [
      'src/components/Sidebar/Sidebar.tsx',
      'src/components/Sidebar/useSidebar.ts',
      'src/components/Sidebar/SidebarContext.tsx'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['iconbutton'],
  },
  'float-action-menu': {
    name: 'FloatActionMenu',
    files: [
      'src/components/FloatActionMenu/FloatActionMenu.tsx',
      'src/components/FloatActionMenu/useFloatActionMenu.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['iconbutton'],
  },
  textarea: {
    name: 'Textarea',
    files: [
      'src/components/Textarea/Textarea.tsx',
      'src/components/Textarea/useTextarea.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  datepicker: {
    name: 'DatePicker',
    files: [
      'src/components/DatePicker/DatePicker.tsx',
      'src/components/DatePicker/useDatePicker.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  table: {
    name: 'Table',
    files: ['src/components/Table/Table.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  animatenumber: {
    name: 'AnimateNumber',
    files: [
      'src/components/AnimateNumber/AnimateNumber.tsx',
      'src/components/AnimateNumber/Digit.tsx',
      'src/components/AnimateNumber/AnimateNumber.test.tsx',
      'src/components/AnimateNumber/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  circularprogress: {
    name: 'CircularProgress',
    files: ['src/components/CircularProgress/CircularProgress.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  dock: {
    name: 'Dock',
    files: ['src/components/Dock/Dock.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  popover: {
    name: 'Popover',
    files: [
      'src/components/Popover/Popover.tsx',
      'src/components/Popover/usePopover.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  tooltip: {
    name: 'Tooltip',
    files: ['src/components/Tooltip/Tooltip.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  systemlogs: {
    name: 'SystemLogs',
    files: ['src/components/SystemLogs/SystemLogs.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['badge'],
  },
  datefield: {
    name: 'DateField',
    files: ['src/components/DateField/DateField.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    files: ['src/components/NavigationMenu/NavigationMenu.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  backdrop: {
    name: 'Backdrop',
    files: [
      'src/components/Backdrop/Backdrop.tsx',
      'src/components/Backdrop/Backdrop.test.tsx'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  scrollarea: {
    name: 'ScrollArea',
    files: [
      'src/components/ScrollArea/ScrollArea.tsx',
      'src/components/ScrollArea/ScrollArea.test.tsx'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  statscard: {
    name: 'StatsCard',
    files: ['src/components/StatsCard/StatsCard.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['card', 'animatenumber'],
  }
};
