import { Button } from '../components/Button';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function ButtonDocs() {
  return (
    <div className="max-w-4xl mx-auto p-12 text-left">
      <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline mb-8 inline-block">
        &larr; Back to Home
      </Link>

      <h1 className="text-4xl font-bold mb-4">Button Component</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-12">
        A highly customizable button component supporting icons and multiple variants.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
            Variants
          </h2>
          <div className="flex gap-4 p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <Button variant="filled">Filled Variant</Button>
            <Button variant="outlined">Outlined Variant</Button>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
            With Icons
          </h2>
          <div className="flex gap-4 p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <Button variant="filled" leftIcon={<FiDownload />}>
              Download Data
            </Button>
            <Button variant="outlined" rightIcon={<FiArrowRight />}>
              Next Step
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
