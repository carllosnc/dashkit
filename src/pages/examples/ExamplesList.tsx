import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiArrowLeft, FiLogIn, FiSettings, FiGrid, FiLayers, FiLayout, FiCreditCard } from 'react-icons/fi';
import { Divider } from '../../components/dashkit/Divider/Divider';
import { Header } from '../../partials/Header';
import { Footer } from '../../partials/Footer';

const examples = [
  {
    title: 'Login Page',
    description: 'A premium split-screen login page with social authentication, brand positioning, and responsive design.',
    href: '/examples/login',
    icon: <FiLogIn size={20} />,
    color: 'text-ds-500',
    bg: 'bg-ds-50 dark:bg-ds-900',
  },
  {
    title: 'Complex Settings Form',
    description: 'A comprehensive user profile and settings form featuring multi-column layouts, various input types, and section-based organization.',
    href: '/examples/complex-form',
    icon: <FiSettings size={20} />,
    color: 'text-ds-500',
    bg: 'bg-ds-50 dark:bg-ds-900',
  },
  {
    title: 'Admin Dashboard',
    description: 'A full-featured project management interface demonstrating cards, statistics, data filtering, and complex interactive overlays.',
    href: '/examples/dashboard',
    icon: <FiGrid size={20} />,
    color: 'text-ds-500',
    bg: 'bg-ds-50 dark:bg-ds-900',
  },
  {
    title: 'Sidebar Dashboard',
    description: 'A modern SaaS-style dashboard layout featuring a fixed sidebar, collapsible navigation, and dense data visualizations.',
    href: '/examples/sidebar-dashboard',
    icon: <FiLayout size={20} />,
    color: 'text-ds-500',
    bg: 'bg-ds-50 dark:bg-ds-900',
  },
  {
    title: 'Secure Payment Page',
    description: 'A modern checkout interface featuring multi-method payment selection (Credit Card & Crypto), billing forms, and order summary.',
    href: '/examples/payment',
    icon: <FiCreditCard size={20} />,
    color: 'text-ds-500',
    bg: 'bg-ds-50 dark:bg-ds-900',
  },
  {
    title: 'All Components Showcase',
    description: 'A comprehensive display of every component in the Dashkit UI library, including variants, states, and interactive examples.',
    href: '/examples/all-components',
    icon: <FiLayers size={20} />,
    color: 'text-ds-500',
    bg: 'bg-ds-50 dark:bg-ds-900',
  }
];

export const ExamplesList = () => {
  return (
    <div className="min-h-screen ds-page font-sans flex flex-col">
      <Helmet>
        <title>Interface Examples | Dashkit UI</title>
        <meta name="description" content="Explore real-world layout patterns and advanced interface designs built entirely with Dashkit UI's modular component system." />
      </Helmet>
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-20">
        <header className="mb-10">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-ds-500 hover:text-ds-900 dark:text-ds-400 dark:hover:text-white mb-6">
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
                  <div className={`size-10 rounded-[var(--radius-md)] ${example.bg} ${example.color} flex items-center justify-center shrink-0 border border-ds-200 dark:border-ds-800`}>
                    {example.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground hover:underline">
                    {example.title}
                  </h3>
                </div>
                <p className="text-muted-foreground max-w-2xl leading-relaxed">
                  {example.description}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <FiArrowRight className="size-6 text-ds-300 dark:text-ds-700 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};


