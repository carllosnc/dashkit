import React, { useState, useRef, useEffect, type ComponentType, type ReactNode, type ElementType } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator
} from '../components/dashkit/Dropdown';
import { Backdrop } from '../components/dashkit/Backdrop/Backdrop';
import { Button } from '../components/dashkit/Button/Button';
import { DatePicker } from '../components/dashkit/DatePicker/DatePicker';
import { ButtonGroup } from '../components/dashkit/ButtonGroup/ButtonGroup';
import { Checkbox } from '../components/dashkit/Checkbox/Checkbox';
import { Input } from '../components/dashkit/Input/Input';
import { Chip } from '../components/dashkit/Chip/Chip';
import { Combobox } from '../components/dashkit/Combobox/Combobox';
import { Divider } from '../components/dashkit/Divider/Divider';
import { Drawer } from '../components/dashkit/Drawer/Drawer';
import { Modal } from '../components/dashkit/Modal/Modal';
import { Radio } from '../components/dashkit/Radio/Radio';
import { Select } from '../components/dashkit/Select/Select';
import { Switch } from '../components/dashkit/Switch/Switch';
import { Textarea } from '../components/dashkit/Textarea/Textarea';
import { Surface } from '../components/dashkit/Surface/Surface';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/dashkit/Tabs/Tabs';
import { OtpInput } from '../components/dashkit/OtpInput/OtpInput';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarItem } from '../components/dashkit/Sidebar/Sidebar';
import { ImageExpander } from '../components/dashkit/ImageExpander/ImageExpander';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/dashkit/Accordion';
import { Badge, FloatBadge } from '../components/dashkit/Badge';
import { Skeleton } from '../components/dashkit/Skeleton/Skeleton';
import { Spinner } from '../components/dashkit/Spinner/Spinner';
import { Navbar } from '../components/dashkit/Navbar/Navbar';
import { IconButton } from '../components/dashkit/IconButton/IconButton';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '../components/dashkit/Breadcrumb';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../components/dashkit/Card';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '../components/dashkit/Table/Table';
import { Avatar, AvatarGroup } from '../components/dashkit/Avatar';
import { FiDownload, FiArrowRight, FiCopy, FiCheck, FiSearch, FiLock, FiUser, FiSettings, FiActivity, FiCheckCircle, FiClock, FiMail, FiShield, FiZap, FiBell, FiMessageSquare, FiShoppingCart, FiHome, FiMoreVertical } from 'react-icons/fi';
import { PropertyDoc } from '../partials/PropertyDoc';
import { ProgressBar } from '../components/dashkit/ProgressBar/ProgressBar';
import { Popover, PopoverTrigger, PopoverContent } from '../components/dashkit/Popover';
import { AnimateNumber } from '../components/dashkit/AnimateNumber';
import { CircularProgress } from '../components/dashkit/CircularProgress/CircularProgress';
import { SystemLogs } from '../components/dashkit/SystemLogs/SystemLogs';
import { DateField } from '../components/dashkit/DateField/DateField';
import { ColorPicker } from '../components/dashkit/ColorPicker/ColorPicker';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport
} from '../components/dashkit/NavigationMenu/NavigationMenu';
import { StatsCard } from '../components/dashkit/StatsCard/StatsCard';
import { HiOutlineChartBarSquare, HiOutlineTicket } from 'react-icons/hi2';


type MdxComponentProps = { components?: Record<string, ElementType> };
type MdxComponent = ComponentType<MdxComponentProps>;

interface CustomPreProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: ReactNode;
  'data-theme'?: string;
  'data-language'?: string;
}

const CopyButton = ({ preRef }: { preRef: React.RefObject<HTMLPreElement | null> }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    const text = preRef.current?.textContent;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={copy}
      type="button"
      className="absolute top-2 right-2 p-1.5 rounded-md transition-all duration-200 bg-ds-800 hover:bg-ds-700 text-ds-400 hover:text-white border border-ds-700 z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label="Copy code"
    >
      {isCopied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
    </button>
  );
};

const CustomPre = ({ children, ...props }: CustomPreProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  const divProps = props as React.HTMLAttributes<HTMLDivElement>;

  return (
    <div
      {...divProps}
      className="relative group mt-6 first:mt-0 overflow-hidden rounded-lg border border-ds-200 dark:border-ds-800"
    >
      <pre ref={preRef} className="m-0! bg-transparent!">
        {children}
      </pre>
      <CopyButton preRef={preRef} />
    </div>
  );
};

const components: Record<string, ElementType> = {
  Button,
  Backdrop,
  DatePicker,
  ButtonGroup,
  Input,
  Chip,
  Combobox,
  Drawer,
  Modal,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AnimateNumber,
  Checkbox,
  Radio,
  Select,
  Divider,
  Switch,
  Textarea,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  OtpInput,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarSection,
  SidebarItem,
  ImageExpander,
  SystemLogs,
  CircularProgress,
  Avatar,
  AvatarGroup,
  Badge,
  FloatBadge,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator,
  Card,
  ProgressBar,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  FiDownload,
  FiArrowRight,
  FiSearch,
  FiLock,
  FiUser,
  FiSettings,
  FiActivity,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiShield,
  FiZap,
  FiBell,
  FiMessageSquare,
  FiShoppingCart,
  FiHome,
  FiMoreVertical,
  Surface,
  Skeleton,
  Spinner,
  Navbar,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  PropertyDoc,
  DateField,
  ColorPicker,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport,
  StatsCard,
  HiOutlineChartBarSquare,
  HiOutlineTicket,
  Preview: ({ children }: { children: ReactNode }) => (
    <div className="not-prose border bg-card border-ds-200 dark:border-ds-800 ds-rounded flex flex-col p-4 gap-4 first:pt-0 items-start">
      {children}
    </div>
  ),
  pre: CustomPre,
};

export function MdxWrapper({ Component }: { Component: MdxComponent }) {
  const [title, setTitle] = useState('Dashkit UI');
  const [description, setDescription] = useState('Premium React component library for modern dashboards.');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const h1 = containerRef.current.querySelector('h1');
      const p = containerRef.current.querySelector('p');

      if (h1 && h1.textContent) {
        setTitle(`${h1.textContent} | Dashkit UI`);
      }

      if (p && p.textContent) {
        // Truncate description if too long
        const text = p.textContent.trim();
        setDescription(text.length > 160 ? text.substring(0, 157) + '...' : text);
      }
    }
  }, [Component]);

  return (
    <div className="prose prose-sm md:prose-base md:prose-pre:text-base prose-neutral dark:prose-invert max-w-full" ref={containerRef}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content="/og.png" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/og.png" />
      </Helmet>
      <Component components={components} />
    </div>
  );
}


