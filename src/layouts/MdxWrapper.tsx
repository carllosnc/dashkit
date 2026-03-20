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
import { Checkbox } from '../components/Checkbox/Checkbox';
import { CheckboxDemo } from '../components/Checkbox/CheckboxDemo';
import { Input } from '../components/Input/Input';
import { InputDemo } from '../components/Input/InputDemo';
import { Drawer } from '../components/Drawer/Drawer';
import { DrawerDemo } from '../components/Drawer/DrawerDemo';
import { Modal } from '../components/Modal/Modal';
import { ModalDemo } from '../components/Modal/ModalDemo';
import { Radio } from '../components/Radio/Radio';
import { RadioDemo } from '../components/Radio/RadioDemo';
import { Select } from '../components/Select/Select';
import { SelectDemo } from '../components/Select/SelectDemo';
import { Switch } from '../components/Switch/Switch';
import { SwitchDemo } from '../components/Switch/SwitchDemo';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/Tabs/Tabs';
import { TabsDemo } from '../components/Tabs/TabsDemo';
import { OtpInput } from '../components/OtpInput/OtpInput';
import { OtpInputDemo } from '../components/OtpInput/OtpInputDemo';
import { ImageExpander } from '../components/ImageExpander/ImageExpander';
import { ImageExpanderDemo } from '../components/ImageExpander/ImageExpanderDemo';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/Accordion/Accordion';
import { AccordionDemo } from '../components/Accordion/AccordionDemo';
import { ToastDemo } from '../components/Toast/ToastDemo';
import { DropdownDemo, BasicMenuDemo, SelectableMenuDemo, CustomTriggerDemo } from '../components/Dropdown/DropdownDemo';
import { Badge, FloatBadge } from '../components/Badge/Badge';
import { BadgeDemo } from '../components/Badge/BadgeDemo';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { SkeletonDemo } from '../components/Skeleton/SkeletonDemo';
import { Breadcrumb } from '../components/Breadcrumb/Breadcrumb';
import { BreadcrumbDemo } from '../components/Breadcrumb/BreadcrumbDemo';
import { 
  Card, 
  CardDemo, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardComponent, 
  CardFooter 
} from '../components/Card';
import { FiDownload, FiArrowRight, FiCopy, FiCheck, FiSearch, FiLock, FiUser, FiSettings, FiActivity, FiCheckCircle } from 'react-icons/fi';

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
      className="absolute top-2 right-2 p-1.5 rounded-md transition-all duration-200 bg-base-800 hover:bg-base-700 text-base-400 hover:text-white border border-base-700 z-20 opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label="Copy code"
    >
      {isCopied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
    </button>
  );
};

const CustomPre = ({ children, ...props }: CustomPreProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  // Cast props to Div attributes but maintain data-* attributes
  // In MDX, most props passed to 'pre' are standard or safe for 'div' wrappers
  const divProps = props as React.HTMLAttributes<HTMLDivElement>;

  return (
    <div 
      {...divProps}
      className="relative group mt-6 first:mt-0 overflow-hidden rounded-lg border border-base-200 dark:border-base-800"
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
  Input,
  InputDemo,
  Drawer,
  DrawerDemo,
  Modal,
  ModalDemo,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionDemo,
  ToastDemo,
  Checkbox,
  CheckboxDemo,
  Radio,
  RadioDemo,
  Select,
  SelectDemo,
  Switch,
  SwitchDemo,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsDemo,
  OtpInput,
  OtpInputDemo,
  ImageExpander,
  ImageExpanderDemo,
  Badge,
  FloatBadge,
  BadgeDemo,
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
  CardDemo,
  CardHeader,
  CardTitle,
  CardDescription,
  CardComponent,
  CardFooter,
  FiDownload,
  FiArrowRight,
  FiSearch,
  FiLock,
  FiUser,
  FiSettings,
  FiActivity,
  FiCheckCircle,
  Skeleton,
  SkeletonDemo,
  Breadcrumb,
  BreadcrumbDemo,
  Preview: ({ children }: { children: ReactNode }) => (
    <div className="not-prose flex flex-wrap gap-4 p-4 md:p-6 rounded-lg bg-base-50 dark:bg-base-900 border border-base-200 dark:border-base-800">
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
    <div className="prose dark:prose-invert max-w-full" ref={containerRef}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Component components={components} />
    </div>
  );
}
