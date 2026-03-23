import React, { useState, useRef, useEffect, type ComponentType, type ReactNode, type ElementType } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator
} from '../components/Dropdown/Dropdown';
import { Button } from '../components/Button/Button';
import { ButtonGroup } from '../components/ButtonGroup/ButtonGroup';
import { Checkbox } from '../components/Checkbox/Checkbox';
import { Input } from '../components/Input/Input';
import { Chip } from '../components/Chip/Chip';
import { Combobox } from '../components/Combobox/Combobox';
import { Divider } from '../components/Divider/Divider';
import { Drawer } from '../components/Drawer/Drawer';
import { DrawerDemo } from '../components/Drawer/DrawerDemo';
import { Modal } from '../components/Modal/Modal';
import { Radio } from '../components/Radio/Radio';
import { RadioDemo } from '../components/Radio/RadioDemo';
import { Select } from '../components/Select/Select';
import { SelectDemo } from '../components/Select/SelectDemo';
import { Switch } from '../components/Switch/Switch';
import { SwitchDemo } from '../components/Switch/SwitchDemo';
import { Textarea } from '../components/Textarea/Textarea';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs/Tabs';
import { OtpInput } from '../components/OtpInput/OtpInput';
import { OtpInputDemo } from '../components/OtpInput/OtpInputDemo';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarSectionItem } from '../components/Sidebar/Sidebar';
import { ImageExpander } from '../components/ImageExpander/ImageExpander';
import { ImageExpanderDemo } from '../components/ImageExpander/ImageExpanderDemo';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion/Accordion';
import { DropdownDemo, BasicMenuDemo, SelectableMenuDemo, CustomTriggerDemo } from '../components/Dropdown/DropdownDemo';
import { Badge, FloatBadge } from '../components/Badge/Badge';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { SkeletonDemo } from '../components/Skeleton/SkeletonDemo';
import { Spinner } from '../components/Spinner/Spinner';
import { Navbar } from '../components/Navbar/Navbar';
import { IconButton } from '../components/IconButton/IconButton';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '../components/Breadcrumb/Breadcrumb';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../components/Card/Card';
import { FiDownload, FiArrowRight, FiCopy, FiCheck, FiSearch, FiLock, FiUser, FiSettings, FiActivity, FiCheckCircle, FiClock, FiMail, FiShield, FiZap, FiBell, FiMessageSquare, FiShoppingCart, FiHome } from 'react-icons/fi';
import { PropertyDoc } from '../partials/PropertyDoc';


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
      className="absolute top-2 right-2 p-1.5 rounded-md transition-all duration-200 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white border border-neutral-700 z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
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
      className="relative group mt-6 first:mt-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800"
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
  ButtonGroup,
  Input,
  Chip,
  Combobox,
  Drawer,
  DrawerDemo,
  Modal,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Checkbox,
  Radio,
  RadioDemo,
  Select,
  SelectDemo,
  Divider,
  Switch,
  SwitchDemo,
  Textarea,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  OtpInput,
  OtpInputDemo,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarSection,
  SidebarSectionItem,
  ImageExpander,
  ImageExpanderDemo,
  Badge,
  FloatBadge,
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator,
  DropdownDemo,
  BasicMenuDemo,
  SelectableMenuDemo,
  CustomTriggerDemo,
  Card,
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
  Skeleton,
  SkeletonDemo,
  Spinner,
  Navbar,
  IconButton,
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
  PropertyDoc,
  Preview: ({ children }: { children: ReactNode }) => (
    <div className="not-prose border bg-card border-neutral-200 dark:border-neutral-800 rounded-lg flex flex-col gap-8 py-4 px-4 first:pt-0 items-start">
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


