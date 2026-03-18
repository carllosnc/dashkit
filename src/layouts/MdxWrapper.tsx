import React, { useState, useRef, type ComponentType, type ReactNode, type ElementType } from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { FiDownload, FiArrowRight, FiCopy, FiCheck, FiSearch, FiLock } from 'react-icons/fi';

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

  // Cast props to Div attributes but maintain data-* attributes
  // In MDX, most props passed to 'pre' are standard or safe for 'div' wrappers
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
  Input,
  FiDownload,
  FiArrowRight,
  FiSearch,
  FiLock,
  Preview: ({ children }: { children: ReactNode }) => (
    <div className="not-prose flex gap-4 p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      {children}
    </div>
  ),
  pre: CustomPre,
};

export function MdxWrapper({ Component }: { Component: MdxComponent }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Component components={components} />
    </div>
  );
}
