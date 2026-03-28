import { Badge } from './components/Badge/Badge'
import { TypingEffect } from './partials/TypingEffect'
import { Button } from './components/Button/Button'
import { Header } from './partials/Header'
import { FiArrowRight, FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Footer } from './partials/Footer'

const AVAILABLE_COMPONENTS = ["badge", "button", "button-group", "area-chart", "divider", "datepicker", "table", "card", "input", "icon-button", "skeleton", "tabs", "sidebar", "modal", "drawer", "float-action-menu", "tooltip", "dock"];
const TITLE = "Dashkit UI | Lean, Simpler React Component Library";
const DESCRIPTION = "A leaner, simpler React component library focused on low dependency counts and total code ownership.";
const TAGLINE_MAIN = "Base components";
const TAGLINE_SUB = "with zero baggage.";
const OG_DESCRIPTION = "Build professional tools with zero baggage. No heavy abstractions, just clean code.";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground font-sans">
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={OG_DESCRIPTION} />
        <meta property="og:image" content="/og.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={OG_DESCRIPTION} />
        <meta name="twitter:image" content="/og.png" />
      </Helmet>

      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100 fill-mode-both">
          <Badge
            color="warning"
            variant="soft"
            content="Dashkit is currently under construction"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-[1.05] mb-8">
          {TAGLINE_MAIN} <br className="hidden md:block" />
          <span className="text-ds-400 dark:text-ds-600">{TAGLINE_SUB}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          {DESCRIPTION}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center mb-12">
          <Link to="/docs" tabIndex={-1}>
            <Button variant="filled" rightIcon={<FiArrowRight />}>
              Get Started
            </Button>
          </Link>
          <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer">
            <Button variant="outlined" leftIcon={<FiGithub />}>
              View on GitHub
            </Button>
          </a>
        </div>

        {/* CLI Reference */}
        <div className="mb-16 flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-both">
          <code className="text-[14px] md:text-[18px] font-mono text-ds-600 dark:text-ds-300 flex items-center gap-2 md:gap-3">
            <span className="text-ds-400 select-none">$</span>
            <span>bunx carllosnc/dashkit add</span>
            <TypingEffect
              words={AVAILABLE_COMPONENTS}
              className="text-blue-600 min-w-[80px] md:min-w-[100px]"
              cursorClassName="bg-primary"
            />
          </code>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Instant installation via CLI
          </p>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-6 opacity-40">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <div className="size-1.5 rounded-full bg-foreground/80" />
            React
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <div className="size-1.5 rounded-full bg-foreground/60" />
            Tailwind CSS
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <div className="size-1.5 rounded-full bg-foreground/40" />
            Framer Motion
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <div className="size-1.5 rounded-full bg-foreground/20" />
            TypeScript
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
