import { Button } from './components/Button/Button'
import { FiArrowRight, FiGithub, FiLayers } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
          <FiLayers className="text-neutral-900 dark:text-white" />
          Dashkit UI
        </div>
        <div className="flex items-center gap-6">
          <Link to="/docs/button" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Documentation
          </Link>
          <a href="#" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors">
            Components
          </a>
          <a href="#" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors">
            <FiGithub size={20} />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-5xl md:text-5xl tracking-tight text-neutral-900 dark:text-white max-w-4xl leading-[1.1] mb-6">
          Build beautiful dashboards <br className="hidden md:block" />
          at the speed of light.
        </h1>

        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mb-12">
          A premium, highly-customizable React component library designed specifically for modern web applications and developer tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/docs/button" tabIndex={-1}>
            <Button variant="filled" rightIcon={<FiArrowRight />}>
              Get Started
            </Button>
          </Link>
          <Button variant="outlined" leftIcon={<FiGithub />} className="bg-white dark:bg-neutral-900">
            View on GitHub
          </Button>
        </div>
      </main>
    </div>
  )
}

export default App
