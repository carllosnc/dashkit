import { TypingEffect } from './components/TypingEffect/TypingEffect'
import { Button } from './components/Button/Button'
import { FiArrowRight, FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { ThemeToggle } from './components/ThemeToggle'
import { Helmet } from 'react-helmet-async'
import { Footer } from './components/Footer'

const AVAILABLE_COMPONENTS = ["badge", "button", "card", "input", "skeleton", "tabs", "modal", "drawer"];

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#030303] font-sans">
      <Helmet>
        <title>Dashkit UI | Premium React Dashboard Component Library</title>
        <meta name="description" content="Dashkit is a premium, highly-customizable React library built with Tailwind CSS and Framer Motion, designed for high-performance dashboards." />
        <meta property="og:title" content="Dashkit UI | Premium React Dashboard Component Library" />
        <meta property="og:description" content="Build beautiful dashboards at the speed of light with Dashkit UI." />
      </Helmet>
      {/* Background Effect */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-base-100/50 dark:bg-base-900/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[30%] h-[50%] rounded-full bg-base-100/30 dark:bg-base-800/10 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-base-200 dark:border-base-800 bg-white/70 dark:bg-[#030303]/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center group cursor-default">
          <img src="/logo.svg" alt="Dashkit UI Logo" className="h-6 dark:invert" />
        </div>
        <div className="flex items-center gap-8">
          <Link to="/docs" className="text-sm font-medium text-base-600 hover:text-base-900 dark:text-base-400 dark:hover:text-white">
            Documentation
          </Link>
          <div className="flex items-center gap-4 pl-4 border-l border-base-200 dark:border-base-800">
            <ThemeToggle />
            <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer" className="text-base-400 hover:text-base-900 dark:hover:text-white">
              <FiGithub size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-base-950 dark:text-white max-w-4xl leading-[1.05] mb-8">
          Build beautiful dashboards <br className="hidden md:block" />
          <span className="text-base-400 dark:text-base-600">at the speed of light.</span>
        </h1>

        <p className="text-lg md:text-xl text-base-500 dark:text-base-400 max-w-2xl mb-12">
          A premium, highly-customizable React library built with Tailwind CSS and Framer Motion, designed for high-performance dashboards.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-12">
          <Link to="/docs" tabIndex={-1}>
            <Button variant="filled" rightIcon={<FiArrowRight />} className="h-12 px-8 text-base">
              Get Started
            </Button>
          </Link>
          <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer">
            <Button variant="outlined" leftIcon={<FiGithub />} className="h-12 px-8 text-base bg-white dark:bg-base-950">
              View on GitHub
            </Button>
          </a>
        </div>

        {/* CLI Reference */}
        <div className="mb-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
          <code className="text-[18px] font-mono text-base-600 dark:text-base-300 flex items-center gap-3">
            <span className="text-base-400 select-none">$</span>
            <span>bunx carllosnc/dashkit add</span>
            <TypingEffect
              words={AVAILABLE_COMPONENTS}
              className="text-blue-500 dark:text-sky-400 min-w-[100px]"
              cursorClassName="bg-blue-500 dark:bg-sky-400"
            />
          </code>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-base-400 dark:text-base-500">
            Instant installation via CLI
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-6 opacity-60">
          <div className="flex items-center gap-2 text-sm font-medium text-base-600 dark:text-base-400">
            <div className="size-1.5 rounded-full bg-sky-400" />
            React
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-base-600 dark:text-base-400">
            <div className="size-1.5 rounded-full bg-teal-400" />
            Tailwind CSS
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-base-600 dark:text-base-400">
            <div className="size-1.5 rounded-full bg-violet-400" />
            Framer Motion
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-base-600 dark:text-base-400">
            <div className="size-1.5 rounded-full bg-amber-400" />
            TypeScript
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default App
