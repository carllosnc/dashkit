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
      'src/components/dashkit/Accordion/Accordion.tsx',
      'src/components/dashkit/Accordion/AccordionItem.tsx',
      'src/components/dashkit/Accordion/AccordionTrigger.tsx',
      'src/components/dashkit/Accordion/AccordionContent.tsx',
      'src/components/dashkit/Accordion/AccordionContext.ts',
      'src/components/dashkit/Accordion/Accordion.test.tsx',
      'src/components/dashkit/Accordion/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  avatar: {
    name: 'Avatar',
    files: [
      'src/components/dashkit/Avatar/Avatar.tsx',
      'src/components/dashkit/Avatar/AvatarGroup.tsx',
      'src/components/dashkit/Avatar/Avatar.test.tsx',
      'src/components/dashkit/Avatar/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  badge: {
    name: 'Badge',
    files: [
      'src/components/dashkit/Badge/Badge.tsx',
      'src/components/dashkit/Badge/FloatBadge.tsx',
      'src/components/dashkit/Badge/Badge.test.tsx',
      'src/components/dashkit/Badge/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  floatbadge: {
    name: 'FloatBadge',
    files: ['src/components/dashkit/Badge/FloatBadge.tsx'],
    registryDependencies: ['badge'],
  },
  button: {
    name: 'Button',
    files: [
      'src/components/dashkit/Button/Button.tsx',
      'src/components/dashkit/Button/Button.test.tsx',
      'src/components/dashkit/Button/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  card: {
    name: 'Card',
    files: [
      'src/components/dashkit/Card/Card.tsx',
      'src/components/dashkit/Card/CardHeader.tsx',
      'src/components/dashkit/Card/CardTitle.tsx',
      'src/components/dashkit/Card/CardDescription.tsx',
      'src/components/dashkit/Card/CardContent.tsx',
      'src/components/dashkit/Card/CardFooter.tsx',
      'src/components/dashkit/Card/Card.test.tsx',
      'src/components/dashkit/Card/index.ts'
    ],
    registryDependencies: ['badge', 'button'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  checkbox: {
    name: 'Checkbox',
    files: [
      'src/components/dashkit/Checkbox/Checkbox.tsx',
      'src/components/dashkit/Checkbox/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  drawer: {
    name: 'Drawer',
    files: [
      'src/components/dashkit/Drawer/Drawer.tsx',
      'src/components/dashkit/Drawer/useDrawer.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  dropdown: {
    name: 'Dropdown',
    files: [
      'src/components/dashkit/Dropdown/Dropdown.tsx',
      'src/components/dashkit/Dropdown/useDropdown.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  imageexpander: {
    name: 'ImageExpander',
    files: [
      'src/components/dashkit/ImageExpander/ImageExpander.tsx',
      'src/components/dashkit/ImageExpander/useImageExpander.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  input: {
    name: 'Input',
    files: ['src/components/dashkit/Input/Input.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  modal: {
    name: 'Modal',
    files: [
      'src/components/dashkit/Modal/Modal.tsx',
      'src/components/dashkit/Modal/useModal.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  otpinput: {
    name: 'OtpInput',
    files: [
      'src/components/dashkit/OtpInput/OtpInput.tsx',
      'src/components/dashkit/OtpInput/useOtpInput.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  radio: {
    name: 'Radio',
    files: [
      'src/components/dashkit/Radio/Radio.tsx',
      'src/components/dashkit/Radio/useRadio.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  select: {
    name: 'Select',
    files: [
      'src/components/dashkit/Select/Select.tsx',
      'src/components/dashkit/Select/useSelect.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  switch: {
    name: 'Switch',
    files: [
      'src/components/dashkit/Switch/Switch.tsx',
      'src/components/dashkit/Switch/useSwitch.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  slider: {
    name: 'Slider',
    files: [
      'src/components/dashkit/Slider/Slider.tsx',
      'src/components/dashkit/Slider/useSlider.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  surface: {
    name: 'Surface',
    files: ['src/components/dashkit/Surface/Surface.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  tabs: {
    name: 'Tabs',
    files: ['src/components/dashkit/Tabs/Tabs.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  toast: {
    name: 'Toast',
    files: [
      'src/components/dashkit/Toast/Toast.tsx',
      'src/components/dashkit/Toast/useToast.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  stepper: {
    name: 'Stepper',
    files: [
      'src/components/dashkit/Stepper/Stepper.tsx',
      'src/components/dashkit/Stepper/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  pagination: {
    name: 'Pagination',
    files: [
      'src/components/dashkit/Pagination/Pagination.tsx',
      'src/components/dashkit/Pagination/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  spinner: {
    name: 'Spinner',
    files: ['src/components/dashkit/Spinner/Spinner.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  navbar: {
    name: 'Navbar',
    files: ['src/components/dashkit/Navbar/Navbar.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  skeleton: {
    name: 'Skeleton',
    files: ['src/components/dashkit/Skeleton/Skeleton.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  breadcrumb: {
    name: 'Breadcrumb',
    files: [
      'src/components/dashkit/Breadcrumb/Breadcrumb.tsx',
      'src/components/dashkit/Breadcrumb/BreadcrumbList.tsx',
      'src/components/dashkit/Breadcrumb/BreadcrumbItem.tsx',
      'src/components/dashkit/Breadcrumb/BreadcrumbSeparator.tsx',
      'src/components/dashkit/Breadcrumb/BreadcrumbEllipsis.tsx',
      'src/components/dashkit/Breadcrumb/Breadcrumb.test.tsx',
      'src/components/dashkit/Breadcrumb/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  iconbutton: {
    name: 'IconButton',
    files: ['src/components/dashkit/IconButton/IconButton.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  areachart: {
    name: 'AreaChart',
    files: [
      'src/components/dashkit/AreaChart/AreaChart.tsx',
      'src/components/dashkit/AreaChart/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  barchart: {
    name: 'BarChart',
    files: [
      'src/components/dashkit/BarChart/BarChart.tsx',
      'src/components/dashkit/BarChart/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  linechart: {
    name: 'LineChart',
    files: [
      'src/components/dashkit/LineChart/LineChart.tsx',
      'src/components/dashkit/LineChart/useLineChart.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  piechart: {
    name: 'PieChart',
    files: [
      'src/components/dashkit/PieChart/PieChart.tsx',
      'src/components/dashkit/PieChart/usePieChart.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  progressbar: {
    name: 'ProgressBar',
    files: [
      'src/components/dashkit/ProgressBar/ProgressBar.tsx',
      'src/components/dashkit/ProgressBar/useProgressBar.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  buttongroup: {
    name: 'ButtonGroup',
    files: ['src/components/dashkit/ButtonGroup/ButtonGroup.tsx'],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  chip: {
    name: 'Chip',
    files: [
      'src/components/dashkit/Chip/Chip.tsx',
      'src/components/dashkit/Chip/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  combobox: {
    name: 'Combobox',
    files: [
      'src/components/dashkit/Combobox/Combobox.tsx',
      'src/components/dashkit/Combobox/useCombobox.ts',
      'src/components/dashkit/Combobox/Combobox.test.tsx',
      'src/components/dashkit/Combobox/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['chip'],
  },
  divider: {
    name: 'Divider',
    files: [
      'src/components/dashkit/Divider/Divider.tsx',
      'src/components/dashkit/Divider/Divider.test.tsx',
      'src/components/dashkit/Divider/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  sidebar: {
    name: 'Sidebar',
    files: [
      'src/components/dashkit/Sidebar/Sidebar.tsx',
      'src/components/dashkit/Sidebar/useSidebar.ts',
      'src/components/dashkit/Sidebar/SidebarContext.tsx'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['iconbutton'],
  },
  'float-action-menu': {
    name: 'FloatActionMenu',
    files: [
      'src/components/dashkit/FloatActionMenu/FloatActionMenu.tsx',
      'src/components/dashkit/FloatActionMenu/useFloatActionMenu.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['iconbutton'],
  },
  textarea: {
    name: 'Textarea',
    files: [
      'src/components/dashkit/Textarea/Textarea.tsx',
      'src/components/dashkit/Textarea/useTextarea.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  datepicker: {
    name: 'DatePicker',
    files: [
      'src/components/dashkit/DatePicker/DatePicker.tsx',
      'src/components/dashkit/DatePicker/useDatePicker.ts',
      'src/components/dashkit/DatePicker/DatePicker.test.tsx',
      'src/components/dashkit/DatePicker/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  table: {
    name: 'Table',
    files: ['src/components/dashkit/Table/Table.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  animatenumber: {
    name: 'AnimateNumber',
    files: [
      'src/components/dashkit/AnimateNumber/AnimateNumber.tsx',
      'src/components/dashkit/AnimateNumber/Digit.tsx',
      'src/components/dashkit/AnimateNumber/AnimateNumber.test.tsx',
      'src/components/dashkit/AnimateNumber/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  circularprogress: {
    name: 'CircularProgress',
    files: [
      'src/components/dashkit/CircularProgress/CircularProgress.tsx',
      'src/components/dashkit/CircularProgress/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  dock: {
    name: 'Dock',
    files: ['src/components/dashkit/Dock/Dock.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  popover: {
    name: 'Popover',
    files: [
      'src/components/dashkit/Popover/Popover.tsx',
      'src/components/dashkit/Popover/usePopover.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  tooltip: {
    name: 'Tooltip',
    files: ['src/components/dashkit/Tooltip/Tooltip.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  systemlogs: {
    name: 'SystemLogs',
    files: ['src/components/dashkit/SystemLogs/SystemLogs.tsx'],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['badge'],
  },
  datefield: {
    name: 'DateField',
    files: [
      'src/components/dashkit/DateField/DateField.tsx',
      'src/components/dashkit/DateField/DateField.test.tsx',
      'src/components/dashkit/DateField/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    files: ['src/components/dashkit/NavigationMenu/NavigationMenu.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  backdrop: {
    name: 'Backdrop',
    files: [
      'src/components/dashkit/Backdrop/Backdrop.tsx',
      'src/components/dashkit/Backdrop/Backdrop.test.tsx',
      'src/components/dashkit/Backdrop/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  scrollarea: {
    name: 'ScrollArea',
    files: [
      'src/components/dashkit/ScrollArea/ScrollArea.tsx',
      'src/components/dashkit/ScrollArea/ScrollArea.test.tsx'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  statscard: {
    name: 'StatsCard',
    files: ['src/components/dashkit/StatsCard/StatsCard.tsx'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['card', 'animatenumber'],
  },
  colorpicker: {
    name: 'ColorPicker',
    files: [
      'src/components/dashkit/ColorPicker/ColorPicker.tsx',
      'src/components/dashkit/ColorPicker/ColorPicker.test.tsx'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['popover', 'input'],
  },
  copyfield: {
    name: 'CopyField',
    files: [
      'src/components/dashkit/CopyField/CopyField.tsx',
      'src/components/dashkit/CopyField/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['input', 'iconbutton', 'toast'],
  },
  listtile: {
    name: 'ListTile',
    files: [
      'src/components/dashkit/ListTile/ListTile.tsx',
      'src/components/dashkit/ListTile/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  }
};
