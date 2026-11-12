import React, { useState, useRef, useEffect, type ComponentType, type ReactNode, type ElementType } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownLabel,
  DropdownItem,
  DropdownSeparator
} from '../dashkit/Dropdown';
import { Backdrop } from '../dashkit/Backdrop/Backdrop';
import { Button } from '../dashkit/Button/Button';
import { DatePicker } from '../dashkit/DatePicker/DatePicker';
import { ButtonGroup, ButtonGroupItem } from '../dashkit/ButtonGroup/ButtonGroup';
import { Checkbox } from '../dashkit/Checkbox/Checkbox';
import { Input } from '../dashkit/Input/Input';
import { Chip } from '../dashkit/Chip/Chip';
import { Combobox } from '../dashkit/Combobox/Combobox';
import { Divider } from '../dashkit/Divider/Divider';
import { Drawer } from '../dashkit/Drawer/Drawer';
import { Modal } from '../dashkit/Modal';
import { Radio } from '../dashkit/Radio/Radio';
import { Select } from '../dashkit/Select/Select';
import { Switch } from '../dashkit/Switch/Switch';
import { Textarea } from '../dashkit/Textarea/Textarea';
import { Surface } from '../dashkit/Surface/Surface';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../dashkit/Tabs/Tabs';
import { OtpInput } from '../dashkit/OtpInput/OtpInput';
import { Sidebar, SidebarHeader, SidebarFooter, SidebarSection, SidebarItem } from '../dashkit/Sidebar/Sidebar';
import { ImageExpander } from '../dashkit/ImageExpander/ImageExpander';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../dashkit/Accordion';
import { Badge, FloatBadge } from '../dashkit/Badge';
import { BentoGrid, BentoGridItem } from '../dashkit/BentoGrid';
import { Skeleton } from '../dashkit/Skeleton/Skeleton';
import { Spinner } from '../dashkit/Spinner/Spinner';
import { Navbar } from '../dashkit/Navbar';
import { IconButton } from '../dashkit/IconButton/IconButton';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
  BreadcrumbEllipsis
} from '../dashkit/Breadcrumb';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '../dashkit/Card';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption
} from '../dashkit/Table/Table';
import { Avatar, AvatarGroup } from '../dashkit/Avatar';
import { FiDownload, FiArrowRight, FiCopy, FiCheck, FiSearch, FiLock, FiUser, FiSettings, FiActivity, FiCheckCircle, FiClock, FiMail, FiShield, FiZap, FiBell, FiMessageSquare, FiShoppingCart, FiHome, FiMoreVertical } from 'react-icons/fi';
import { PropertyDoc } from '../partials/PropertyDoc';
import { ProgressBar } from '../dashkit/ProgressBar/ProgressBar';
import { Popover, PopoverTrigger, PopoverContent } from '../dashkit/Popover';
import { AnimateNumber } from '../dashkit/AnimateNumber';
import { CircularProgress } from '../dashkit/CircularProgress/CircularProgress';
import { SystemLogs } from '../dashkit/SystemLogs/SystemLogs';
import { DateField } from '../dashkit/DateField/DateField';
import { ColorPicker } from '../dashkit/ColorPicker/ColorPicker';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuViewport
} from '../dashkit/NavigationMenu';
import { StatsCard } from '../dashkit/StatsCard/StatsCard';
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
      className="absolute top-2.5 right-2.5 p-1.5 rounded-md transition-opacity duration-150 bg-ds-800 hover:bg-ds-700 text-ds-300 hover:text-white border border-ds-700 z-20 opacity-80 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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
      className="relative group mt-6 first:mt-0 overflow-hidden ds-rounded border border-ds-200 dark:border-ds-800"
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
  ButtonGroupItem,
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
  BentoGrid,
  BentoGridItem,
  HiOutlineChartBarSquare,
  HiOutlineTicket,
  Preview: ({ children }: { children: ReactNode }) => (
    <div className="not-prose my-6 border bg-card border-border ds-rounded flex flex-col p-6 md:p-8 gap-4 items-start">
      {children}
    </div>
  ),
  pre: CustomPre,
};

function extractMarkdownFromDom(root: HTMLElement): string {
  const lines: string[] = [];

  for (const node of Array.from(root.children)) {
    const tag = node.tagName.toLowerCase();
    if (node.getAttribute('data-ai-toolbar') === 'true') continue;

    if (tag === 'h1') {
      lines.push(`# ${node.textContent?.trim() ?? ''}\n`);
    } else if (tag === 'h2') {
      lines.push(`\n## ${node.textContent?.trim() ?? ''}\n`);
    } else if (tag === 'h3') {
      lines.push(`\n### ${node.textContent?.trim() ?? ''}\n`);
    } else if (tag === 'h4') {
      lines.push(`\n#### ${node.textContent?.trim() ?? ''}\n`);
    } else if (tag === 'p') {
      lines.push(`${node.textContent?.trim() ?? ''}\n`);
    } else if (tag === 'ul' || tag === 'ol') {
      const items = Array.from(node.querySelectorAll(':scope > li'));
      for (const li of items) {
        lines.push(`- ${li.textContent?.trim() ?? ''}`);
      }
      lines.push('');
    } else if (node.querySelector('pre')) {
      const pre = node.querySelector('pre');
      const lang = pre?.getAttribute('data-language') || 'tsx';
      const code = pre?.textContent?.trim() ?? '';
      if (code) {
        lines.push(`\`\`\`${lang}\n${code}\n\`\`\`\n`);
      }
    } else if (node.querySelector('table')) {
      const rows = Array.from(node.querySelectorAll('tr'));
      rows.forEach((tr, rowIdx) => {
        const cells = Array.from(tr.querySelectorAll('th, td')).map((c) =>
          (c.textContent?.trim() ?? '').replace(/\|/g, '\\|').replace(/\s+/g, ' ')
        );
        if (cells.length > 0) {
          lines.push(`| ${cells.join(' | ')} |`);
          if (rowIdx === 0) {
            lines.push(`| ${cells.map(() => '---').join(' | ')} |`);
          }
        }
      });
      lines.push('');
    }
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

export function MdxWrapper({ Component }: { Component: MdxComponent }) {
  const [title, setTitle] = useState('Dashkit UI');
  const [description, setDescription] = useState('Copy-paste React 19 & Tailwind CSS v4 components with native context for AI coding agents.');
  const [copiedPage, setCopiedPage] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleCopyForAi = async () => {
    if (!containerRef.current) return;
    try {
      const markdown = extractMarkdownFromDom(containerRef.current);
      await navigator.clipboard.writeText(markdown);
      setCopiedPage(true);
      setTimeout(() => setCopiedPage(false), 2000);
    } catch (err) {
      console.error('Failed to copy page markdown: ', err);
    }
  };

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
    <div className="prose prose-sm md:prose-base md:prose-pre:text-base prose-neutral dark:prose-invert max-w-none! w-full prose-h1:font-bold prose-h1:tracking-tight prose-h2:font-semibold prose-h2:tracking-tight prose-headings:scroll-mt-24" ref={containerRef}>
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
      <div
        data-ai-toolbar="true"
        className="not-prose mb-6 flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-border"
      >
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
            AI Context:
          </span>
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity font-mono"
          >
            /llms.txt
          </a>
          <a
            href="/llms-full.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity font-mono"
          >
            /llms-full.txt
          </a>
          <a
            href="/registry.json"
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground hover:opacity-80 transition-opacity font-mono"
          >
            /registry.json
          </a>
        </div>
        <Button
          size="sm"
          variant="outlined"
          rounded={false}
          leftIcon={copiedPage ? <FiCheck className="text-ds-success-600" /> : <FiCopy />}
          onClick={handleCopyForAi}
        >
          {copiedPage ? 'Copied Markdown' : 'Copy Page for AI'}
        </Button>
      </div>
      <Component components={components} />
    </div>
  );
}


