import { Link } from 'react-router-dom';
import { ThemeToggle } from '../../components/ThemeToggle';
import { Navbar } from '../../components/Navbar/Navbar';
import { IconButton } from '../../components/IconButton/IconButton';
import { FiGithub, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Badge } from '../../components/Badge/Badge';

const examples = [
  {
    title: 'Login Page',
    description: 'A premium split-screen login page with social authentication, brand positioning, and responsive design.',
    href: '/examples/login',
    image: '/examples/login-bg.png',
    tags: ['Auth', 'Split Screen', 'Form']
  }
];

export const ExamplesList = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#030303] font-sans flex flex-col">
      {/* Navigation */}
      <Navbar 
        logo={<img src="/logo.svg" alt="Dashkit UI Logo" className="h-6 dark:invert" />}
        links={[
          { label: 'Documentation', href: '/docs' },
          { label: 'Examples', href: '/examples', active: true }
        ]}
        actions={
          <>
            <ThemeToggle />
            <IconButton 
              icon={<FiGithub size={20} />} 
              href="https://github.com/carllosnc/dashkit" 
              target="_blank" 
              rel="noopener noreferrer" 
              variant="ghost"
              className="text-base-400 hover:text-base-900 dark:hover:text-white"
            />
          </>
        }
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-20">
        <header className="mb-16">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-base-500 hover:text-base-900 dark:text-base-400 dark:hover:text-white mb-6 transition-colors">
            <FiArrowLeft size={16} />
            Back to Home
          </Link>
          <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold tracking-tight text-base-950 dark:text-white">
              Component Examples
            </h1>
            <p className="text-lg text-base-500 dark:text-base-400 max-w-3xl leading-relaxed">
              Explore real-world layout patterns and advanced interface designs built entirely with Dashkit UI's modular component system.
            </p>
          </div>
        </header>

        <hr className="border-base-200 dark:border-base-800" />

        <div className="flex flex-col mx-auto">
          {examples.map((example) => (
            <Link
              key={example.href}
              to={example.href}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 transition-all"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4">
                  <h3 className="text-2xl font-bold text-base-950 dark:text-white group-hover:text-blue-500 dark:group-hover:text-sky-400 transition-colors">
                    {example.title}
                  </h3>
                  <div className="flex gap-2">
                    {example.tags.map(tag => (
                      <Badge key={tag} content={tag} color="info" variant="solid" className="text-[10px] py-0 h-5" />
                    ))}
                  </div>
                </div>
                <p className="text-base-500 dark:text-base-400 max-w-2xl leading-relaxed">
                  {example.description}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <span className="text-sm font-bold uppercase tracking-widest text-base-400 opacity-0 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-300">
                  View Example
                </span>
                <FiArrowRight className="size-6 text-base-300 dark:text-base-700 group-hover:text-blue-500 dark:group-hover:text-sky-400 transition-all duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};
