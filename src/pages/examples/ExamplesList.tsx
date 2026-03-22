import { Link } from 'react-router-dom';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Divider } from '../../components/Divider/Divider';
import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';

const examples = [
  {
    title: 'Login Page',
    description: 'A premium split-screen login page with social authentication, brand positioning, and responsive design.',
    href: '/examples/login',
  },
  {
    title: 'Complex Settings Form',
    description: 'A comprehensive user profile and settings form featuring multi-column layouts, various input types, and section-based organization.',
    href: '/examples/complex-form',
  },
  {
    title: 'Admin Dashboard',
    description: 'A full-featured project management interface demonstrating cards, statistics, data filtering, and complex interactive overlays.',
    href: '/examples/dashboard',
  }
];

export const ExamplesList = () => {
  return (
    <div className="min-h-screen ds-page font-sans flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-20">
        <header className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white mb-6 transition-colors">
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Component Examples
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
              Explore real-world layout patterns and advanced interface designs built entirely with Dashkit UI's modular component system.
            </p>
          </div>
        </header>

        <Divider />

        <div className="flex flex-col">
          {examples.map((example) => (
            <Link
              key={example.href}
              to={example.href}
              className="group flex flex-col md:flex-row md:items-center justify-between py-6 transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 dark:group-hover:text-sky-400 transition-colors">
                    {example.title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  {example.description}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <FiArrowRight className="size-6 text-neutral-300 dark:text-neutral-700 group-hover:text-blue-500 dark:group-hover:text-sky-400 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};


