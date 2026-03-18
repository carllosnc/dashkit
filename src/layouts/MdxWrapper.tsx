import { useState, useRef, type ComponentType, type ReactNode } from 'react';
import { Button } from '../components/Button/Button';
import { FiDownload, FiArrowRight, FiCopy, FiCheck } from 'react-icons/fi';

type MdxComponentProps = { components?: Record<string, unknown> };
type MdxComponent = ComponentType<MdxComponentProps>;

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

const CustomPre = ({ children, ...props }: { children: ReactNode }) => {
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <div className="relative group mt-6 first:mt-0 overflow-hidden">
      <pre ref={preRef} {...props} className="m-0!">
        {children}
      </pre>
      <CopyButton preRef={preRef} />
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

