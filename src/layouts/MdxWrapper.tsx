import { useState, useRef, type ComponentType, type ReactNode } from 'react';
import { Button } from '../components/Button/Button';
import { FiDownload, FiArrowRight, FiCopy, FiCheck } from 'react-icons/fi';

type MdxComponentProps = { components?: Record<string, unknown> };
type MdxComponent = ComponentType<MdxComponentProps>;

const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
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
      className="absolute top-3 right-3 p-2 rounded-md transition-all duration-200 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 z-10 opacity-0 group-hover:opacity-100 focus:opacity-100"
      aria-label="Copy code"
    >
      {isCopied ? <FiCheck size={14} className="text-emerald-400" /> : <FiCopy size={14} />}
    </button>
  );
};

const CustomPre = ({ children, ...props }: any) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [text, setText] = useState('');

  // Extract text after mount to handle hydrated content
  const handleRef = (node: HTMLPreElement | null) => {
    (preRef as any).current = node;
    if (node) {
      // Use a small timeout or requestAnimationFrame to ensure Shiki has finished rendering
      // although textContent should be available immediately from the DOM structure
      setText(node.textContent || '');
    }
  };

  return (
    <div className="relative group overflow-hidden rounded-lg">
      <pre ref={handleRef} {...props}>
        {children}
      </pre>
      {text && <CopyButton text={text} />}
    </div>
  );
};

const components = {
  Button,
  FiDownload,
  FiArrowRight,
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
