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
      'src/dashkit/Accordion/Accordion.tsx',
      'src/dashkit/Accordion/AccordionItem.tsx',
      'src/dashkit/Accordion/AccordionTrigger.tsx',
      'src/dashkit/Accordion/AccordionContent.tsx',
      'src/dashkit/Accordion/accordion.css',
      'src/dashkit/Accordion/AccordionContext.ts',
      'src/dashkit/Accordion/Accordion.test.tsx',
      'src/dashkit/Accordion/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  avatar: {
    name: 'Avatar',
    files: [
      'src/dashkit/Avatar/Avatar.tsx',
      'src/dashkit/Avatar/AvatarGroup.tsx',
      'src/dashkit/Avatar/avatar.css',
      'src/dashkit/Avatar/Avatar.test.tsx',
      'src/dashkit/Avatar/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  badge: {
    name: 'Badge',
    files: [
      'src/dashkit/Badge/Badge.tsx',
      'src/dashkit/Badge/badge.css',
      'src/dashkit/Badge/FloatBadge.tsx',
      'src/dashkit/Badge/Badge.test.tsx',
      'src/dashkit/Badge/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  floatbadge: {
    name: 'FloatBadge',
    files: ['src/dashkit/Badge/FloatBadge.tsx'],
    registryDependencies: ['badge'],
  },
  button: {
    name: 'Button',
    files: [
      'src/dashkit/Button/Button.tsx',
      'src/dashkit/Button/button.css',
      'src/dashkit/Button/Button.test.tsx',
      'src/dashkit/Button/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  card: {
    name: 'Card',
    files: [
      'src/dashkit/Card/Card.tsx',
      'src/dashkit/Card/CardHeader.tsx',
      'src/dashkit/Card/CardContent.tsx',
      'src/dashkit/Card/CardFooter.tsx',
      'src/dashkit/Card/card.css',
      'src/dashkit/Card/Card.test.tsx',
      'src/dashkit/Card/index.ts'
    ],
    registryDependencies: ['badge', 'button'],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  chip: {
    name: 'Chip',
    files: [
      'src/dashkit/Chip/Chip.tsx',
      'src/dashkit/Chip/chip.css',
      'src/dashkit/Chip/Chip.test.tsx',
      'src/dashkit/Chip/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  checkbox: {
    name: 'Checkbox',
    files: [
      'src/dashkit/Checkbox/Checkbox.tsx',
      'src/dashkit/Checkbox/checkbox.css',
      'src/dashkit/Checkbox/Checkbox.test.tsx',
      'src/dashkit/Checkbox/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  drawer: {
    name: 'Drawer',
    files: [
      'src/dashkit/Drawer/Drawer.tsx',
      'src/dashkit/Drawer/drawer.css',
      'src/dashkit/Drawer/useDrawer.ts',
      'src/dashkit/Drawer/Drawer.test.tsx',
      'src/dashkit/Drawer/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  dropdown: {
    name: 'Dropdown',
    files: [
      'src/dashkit/Dropdown/Dropdown.tsx',
      'src/dashkit/Dropdown/dropdown.css',
      'src/dashkit/Dropdown/useDropdown.ts',
      'src/dashkit/Dropdown/Dropdown.test.tsx',
      'src/dashkit/Dropdown/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  imageexpander: {
    name: 'ImageExpander',
    files: [
      'src/dashkit/ImageExpander/ImageExpander.tsx',
      'src/dashkit/ImageExpander/image-expander.css',
      'src/dashkit/ImageExpander/useImageExpander.ts',
      'src/dashkit/ImageExpander/ImageExpander.test.tsx',
      'src/dashkit/ImageExpander/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  input: {
    name: 'Input',
    files: [
      'src/dashkit/Input/Input.tsx',
      'src/dashkit/Input/input.css',
      'src/dashkit/Input/Input.test.tsx',
      'src/dashkit/Input/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  modal: {
    name: 'Modal',
    files: [
      'src/dashkit/Modal/Modal.tsx',
      'src/dashkit/Modal/modal.css',
      'src/dashkit/Modal/useModal.ts',
      'src/dashkit/Modal/Modal.test.tsx',
      'src/dashkit/Modal/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  otpinput: {
    name: 'OtpInput',
    files: [
      'src/dashkit/OtpInput/OtpInput.tsx',
      'src/dashkit/OtpInput/otp-input.css',
      'src/dashkit/OtpInput/useOtpInput.ts',
      'src/dashkit/OtpInput/OtpInput.test.tsx',
      'src/dashkit/OtpInput/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  radio: {
    name: 'Radio',
    files: [
      'src/dashkit/Radio/Radio.tsx',
      'src/dashkit/Radio/radio.css',
      'src/dashkit/Radio/useRadio.ts',
      'src/dashkit/Radio/Radio.test.tsx',
      'src/dashkit/Radio/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  select: {
    name: 'Select',
    files: [
      'src/dashkit/Select/Select.tsx',
      'src/dashkit/Select/select.css',
      'src/dashkit/Select/useSelect.ts',
      'src/dashkit/Select/Select.test.tsx',
      'src/dashkit/Select/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  switch: {
    name: 'Switch',
    files: [
      'src/dashkit/Switch/Switch.tsx',
      'src/dashkit/Switch/switch.css',
      'src/dashkit/Switch/useSwitch.ts',
      'src/dashkit/Switch/Switch.test.tsx',
      'src/dashkit/Switch/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  slider: {
    name: 'Slider',
    files: [
      'src/dashkit/Slider/Slider.tsx',
      'src/dashkit/Slider/slider.css',
      'src/dashkit/Slider/useSlider.ts',
      'src/dashkit/Slider/Slider.test.tsx',
      'src/dashkit/Slider/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  surface: {
    name: 'Surface',
    files: [
      'src/dashkit/Surface/Surface.tsx',
      'src/dashkit/Surface/surface.css',
      'src/dashkit/Surface/Surface.test.tsx',
      'src/dashkit/Surface/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  tabs: {
    name: 'Tabs',
    files: [
      'src/dashkit/Tabs/Tabs.tsx',
      'src/dashkit/Tabs/tabs.css',
      'src/dashkit/Tabs/Tabs.test.tsx',
      'src/dashkit/Tabs/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  toast: {
    name: 'Toast',
    files: [
      'src/dashkit/Toast/Toast.tsx',
      'src/dashkit/Toast/toast.css',
      'src/dashkit/Toast/useToast.ts',
      'src/dashkit/Toast/Toast.test.tsx',
      'src/dashkit/Toast/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  stepper: {
    name: 'Stepper',
    files: [
      'src/dashkit/Stepper/Stepper.tsx',
      'src/dashkit/Stepper/stepper.css',
      'src/dashkit/Stepper/Stepper.test.tsx',
      'src/dashkit/Stepper/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  pagination: {
    name: 'Pagination',
    files: [
      'src/dashkit/Pagination/Pagination.tsx',
      'src/dashkit/Pagination/pagination.css',
      'src/dashkit/Pagination/Pagination.test.tsx',
      'src/dashkit/Pagination/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  spinner: {
    name: 'Spinner',
    files: [
      'src/dashkit/Spinner/Spinner.tsx',
      'src/dashkit/Spinner/spinner.css',
      'src/dashkit/Spinner/Spinner.test.tsx',
      'src/dashkit/Spinner/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  navbar: {
    name: 'Navbar',
    files: [
      'src/dashkit/Navbar/Navbar.tsx',
      'src/dashkit/Navbar/navbar.css',
      'src/dashkit/Navbar/Navbar.test.tsx',
      'src/dashkit/Navbar/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  skeleton: {
    name: 'Skeleton',
    files: [
      'src/dashkit/Skeleton/Skeleton.tsx',
      'src/dashkit/Skeleton/skeleton.css',
      'src/dashkit/Skeleton/Skeleton.test.tsx',
      'src/dashkit/Skeleton/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  breadcrumb: {
    name: 'Breadcrumb',
    files: [
      'src/dashkit/Breadcrumb/Breadcrumb.tsx',
      'src/dashkit/Breadcrumb/BreadcrumbList.tsx',
      'src/dashkit/Breadcrumb/BreadcrumbItem.tsx',
      'src/dashkit/Breadcrumb/BreadcrumbSeparator.tsx',
      'src/dashkit/Breadcrumb/BreadcrumbEllipsis.tsx',
      'src/dashkit/Breadcrumb/breadcrumb.css',
      'src/dashkit/Breadcrumb/Breadcrumb.test.tsx',
      'src/dashkit/Breadcrumb/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  iconbutton: {
    name: 'IconButton',
    files: [
      'src/dashkit/IconButton/IconButton.tsx',
      'src/dashkit/IconButton/icon-button.css',
      'src/dashkit/IconButton/IconButton.test.tsx',
      'src/dashkit/IconButton/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  areachart: {
    name: 'AreaChart',
    files: [
      'src/dashkit/AreaChart/AreaChart.tsx',
      'src/dashkit/AreaChart/useAreaChart.ts',
      'src/dashkit/AreaChart/area-chart.css',
      'src/dashkit/AreaChart/AreaChart.test.tsx',
      'src/dashkit/AreaChart/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  barchart: {
    name: 'BarChart',
    files: [
      'src/dashkit/BarChart/BarChart.tsx',
      'src/dashkit/BarChart/useBarChart.ts',
      'src/dashkit/BarChart/bar-chart.css',
      'src/dashkit/BarChart/BarChart.test.tsx',
      'src/dashkit/BarChart/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  linechart: {
    name: 'LineChart',
    files: [
      'src/dashkit/LineChart/LineChart.tsx',
      'src/dashkit/LineChart/line-chart.css',
      'src/dashkit/LineChart/useLineChart.ts',
      'src/dashkit/LineChart/LineChart.test.tsx',
      'src/dashkit/LineChart/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  piechart: {
    name: 'PieChart',
    files: [
      'src/dashkit/PieChart/PieChart.tsx',
      'src/dashkit/PieChart/pie-chart.css',
      'src/dashkit/PieChart/usePieChart.ts',
      'src/dashkit/PieChart/PieChart.test.tsx',
      'src/dashkit/PieChart/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  progressbar: {
    name: 'ProgressBar',
    files: [
      'src/dashkit/ProgressBar/ProgressBar.tsx',
      'src/dashkit/ProgressBar/progress-bar.css',
      'src/dashkit/ProgressBar/useProgressBar.ts',
      'src/dashkit/ProgressBar/ProgressBar.test.tsx',
      'src/dashkit/ProgressBar/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  buttongroup: {
    name: 'ButtonGroup',
    files: [
      'src/dashkit/ButtonGroup/ButtonGroup.tsx',
      'src/dashkit/ButtonGroup/button-group.css',
      'src/dashkit/ButtonGroup/ButtonGroup.test.tsx',
      'src/dashkit/ButtonGroup/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  combobox: {
    name: 'Combobox',
    files: [
      'src/dashkit/Combobox/Combobox.tsx',
      'src/dashkit/Combobox/combobox.css',
      'src/dashkit/Combobox/useCombobox.ts',
      'src/dashkit/Combobox/Combobox.test.tsx',
      'src/dashkit/Combobox/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['chip'],
  },
  divider: {
    name: 'Divider',
    files: [
      'src/dashkit/Divider/Divider.tsx',
      'src/dashkit/Divider/Divider.test.tsx',
      'src/dashkit/Divider/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  sidebar: {
    name: 'Sidebar',
    files: [
      'src/dashkit/Sidebar/Sidebar.tsx',
      'src/dashkit/Sidebar/sidebar.css',
      'src/dashkit/Sidebar/useSidebar.ts',
      'src/dashkit/Sidebar/SidebarContext.tsx',
      'src/dashkit/Sidebar/Sidebar.test.tsx',
      'src/dashkit/Sidebar/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['iconbutton'],
  },
  'float-action-menu': {
    name: 'FloatActionMenu',
    files: [
      'src/dashkit/FloatActionMenu/FloatActionMenu.tsx',
      'src/dashkit/FloatActionMenu/useFloatActionMenu.ts',
      'src/dashkit/FloatActionMenu/float-action-menu.css',
      'src/dashkit/FloatActionMenu/FloatActionMenu.test.tsx',
      'src/dashkit/FloatActionMenu/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['iconbutton'],
  },
  textarea: {
    name: 'Textarea',
    files: [
      'src/dashkit/Textarea/Textarea.tsx',
      'src/dashkit/Textarea/textarea.css',
      'src/dashkit/Textarea/useTextarea.ts',
      'src/dashkit/Textarea/Textarea.test.tsx',
      'src/dashkit/Textarea/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  datepicker: {
    name: 'DatePicker',
    files: [
      'src/dashkit/DatePicker/DatePicker.tsx',
      'src/dashkit/DatePicker/date-picker.css',
      'src/dashkit/DatePicker/useDatePicker.ts',
      'src/dashkit/DatePicker/DatePicker.test.tsx',
      'src/dashkit/DatePicker/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  table: {
    name: 'Table',
    files: [
      'src/dashkit/Table/Table.tsx',
      'src/dashkit/Table/table.css',
      'src/dashkit/Table/Table.test.tsx',
      'src/dashkit/Table/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
  },
  animatenumber: {
    name: 'AnimateNumber',
    files: [
      'src/dashkit/AnimateNumber/AnimateNumber.tsx',
      'src/dashkit/AnimateNumber/Digit.tsx',
      'src/dashkit/AnimateNumber/AnimateNumber.test.tsx',
      'src/dashkit/AnimateNumber/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  circularprogress: {
    name: 'CircularProgress',
    files: [
      'src/dashkit/CircularProgress/CircularProgress.tsx',
      'src/dashkit/CircularProgress/circular-progress.css',
      'src/dashkit/CircularProgress/CircularProgress.test.tsx',
      'src/dashkit/CircularProgress/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  dock: {
    name: 'Dock',
    files: [
      'src/dashkit/Dock/Dock.tsx',
      'src/dashkit/Dock/dock.css',
      'src/dashkit/Dock/Dock.test.tsx',
      'src/dashkit/Dock/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  popover: {
    name: 'Popover',
    files: [
      'src/dashkit/Popover/Popover.tsx',
      'src/dashkit/Popover/popover.css',
      'src/dashkit/Popover/usePopover.ts',
      'src/dashkit/Popover/Popover.test.tsx',
      'src/dashkit/Popover/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  tooltip: {
    name: 'Tooltip',
    files: [
      'src/dashkit/Tooltip/Tooltip.tsx',
      'src/dashkit/Tooltip/tooltip.css',
      'src/dashkit/Tooltip/Tooltip.test.tsx',
      'src/dashkit/Tooltip/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  systemlogs: {
    name: 'SystemLogs',
    files: [
      'src/dashkit/SystemLogs/SystemLogs.tsx',
      'src/dashkit/SystemLogs/system-logs.css',
      'src/dashkit/SystemLogs/SystemLogs.test.tsx',
      'src/dashkit/SystemLogs/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['badge'],
  },
  datefield: {
    name: 'DateField',
    files: [
      'src/dashkit/DateField/DateField.tsx',
      'src/dashkit/DateField/useDateField.ts',
      'src/dashkit/DateField/date-field.css',
      'src/dashkit/DateField/DateField.test.tsx',
      'src/dashkit/DateField/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  'navigation-menu': {
    name: 'NavigationMenu',
    files: [
      'src/dashkit/NavigationMenu/NavigationMenu.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuContent.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuContext.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuItem.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuLink.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuList.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuTrigger.tsx',
      'src/dashkit/NavigationMenu/NavigationMenuViewport.tsx',
      'src/dashkit/NavigationMenu/navigation-menu.css',
      'src/dashkit/NavigationMenu/useNavigationMenu.ts',
      'src/dashkit/NavigationMenu/useNavigationMenuViewport.ts',
      'src/dashkit/NavigationMenu/NavigationMenu.test.tsx',
      'src/dashkit/NavigationMenu/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
  },
  backdrop: {
    name: 'Backdrop',
    files: [
      'src/dashkit/Backdrop/Backdrop.tsx',
      'src/dashkit/Backdrop/backdrop.css',
      'src/dashkit/Backdrop/Backdrop.test.tsx',
      'src/dashkit/Backdrop/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  },
  scrollarea: {
    name: 'ScrollArea',
    files: [
      'src/dashkit/ScrollArea/ScrollArea.tsx',
      'src/dashkit/ScrollArea/scroll-area.css',
      'src/dashkit/ScrollArea/ScrollArea.test.tsx',
      'src/dashkit/ScrollArea/index.ts'
    ],
    dependencies: ['clsx', 'tailwind-merge'],
  },
  statscard: {
    name: 'StatsCard',
    files: [
      'src/dashkit/StatsCard/StatsCard.tsx',
      'src/dashkit/StatsCard/stats-card.css',
      'src/dashkit/StatsCard/StatsCard.test.tsx',
      'src/dashkit/StatsCard/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['card', 'animatenumber'],
  },
  colorpicker: {
    name: 'ColorPicker',
    files: [
      'src/dashkit/ColorPicker/ColorPicker.tsx',
      'src/dashkit/ColorPicker/color-picker.css',
      'src/dashkit/ColorPicker/ColorPicker.test.tsx',
      'src/dashkit/ColorPicker/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['popover', 'input'],
  },
  copyfield: {
    name: 'CopyField',
    files: [
      'src/dashkit/CopyField/CopyField.tsx',
      'src/dashkit/CopyField/copy-field.css',
      'src/dashkit/CopyField/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge', 'react-icons'],
    registryDependencies: ['input', 'iconbutton', 'toast'],
  },
  listtile: {
    name: 'ListTile',
    files: [
      'src/dashkit/ListTile/ListTile.tsx',
      'src/dashkit/ListTile/list-tile.css',
      'src/dashkit/ListTile/index.ts'
    ],
    dependencies: ['framer-motion', 'clsx', 'tailwind-merge'],
  }
};
