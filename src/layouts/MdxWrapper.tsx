import type { ComponentType, ReactNode } from 'react';
import { Button } from '../components/Button/Button';
import { FiDownload, FiArrowRight } from 'react-icons/fi';

type MdxComponent = ComponentType<{ components?: Record<string, unknown> }>;

const components = {
  Button,
  FiDownload,
  FiArrowRight,
  Preview: ({ children }: { children: ReactNode }) => (
    <div className="not-prose flex gap-4 p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
      {children}
    </div>
  ),
};

export function MdxWrapper({ Component }: { Component: MdxComponent }) {
  return (
    <div className="prose prose-neutral dark:prose-invert max-w-3xl">
      <Component components={components} />
    </div>
  );
}

