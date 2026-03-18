import { Button } from './components/Button/Button'
import { FiArrowRight, FiGithub, FiLayers } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { ThemeToggle } from './components/ThemeToggle'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#030303] font-sans selection:bg-neutral-200 dark:selection:bg-neutral-800">
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-neutral-100/50 dark:bg-neutral-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-neutral-100/30 dark:bg-neutral-800/10 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-[#030303]/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-neutral-900 dark:text-white group cursor-default">
          <div className="p-1.5 rounded-lg bg-neutral-900 dark:bg-white group-hover:scale-110">
            <FiLayers className="text-white dark:text-black size-5" />
          </div>
          Dashkit UI
        </div>
        <div className="flex items-center gap-8">
          <Link to="/docs" className="text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            Documentation
          </Link>
          <a href="#" className="hidden sm:block text-sm font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white">
            Components
          </a>
          <div className="flex items-center gap-4 pl-4 border-l border-neutral-200 dark:border-neutral-800">
            <ThemeToggle />
            <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <FiGithub size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-950 dark:text-white max-w-4xl leading-[1.05] mb-8">
          Build beautiful dashboards <br className="hidden md:block" />
          <span className="text-neutral-400 dark:text-neutral-600">at the speed of light.</span>
        </h1>

        <p className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mb-12">
          A premium, highly-customizable React component library designed specifically for modern web applications and developer tools.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link to="/docs" tabIndex={-1}>
            <Button variant="filled" rightIcon={<FiArrowRight />} className="h-12 px-8 text-base">
              Get Started
            </Button>
          </Link>
          <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer">
            <Button variant="outlined" leftIcon={<FiGithub />} className="h-12 px-8 text-base bg-white dark:bg-neutral-950">
              View on GitHub
            </Button>
          </a>
        </div>

      </main>
    </div>
  )
}

export default App
