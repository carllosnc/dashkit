import { Badge } from './dashkit/Badge/Badge'
import { Button } from './dashkit/Button/Button'
import { Header } from './partials/Header'
import { FiArrowRight, FiGithub } from 'react-icons/fi'
import { SiReact, SiTailwindcss, SiFramer, SiTypescript } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Footer } from './partials/Footer'
import { HomeExamples } from './partials/HomeExamples'
import { Divider } from './dashkit/Divider/Divider'
import { CliEmulator } from './partials/CliEmulator'

const TITLE = "Dashkit | Dashboard components";
const DESCRIPTION = "A minimal dashboard component library for React, engineered for extreme performance, clean code ownership, and zero-bloat development.";
const TAGLINE_MAIN = "Modern Dashboard UI";
const TAGLINE_SUB = "Engineered for speed.";
const OG_DESCRIPTION = "Build professional dashboard tools with precision. High-performance React components with zero-dependency baggage and total code ownership.";

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
      <main className="relative flex flex-col items-center justify-center text-center px-6 py-14 overflow-hidden">
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

        <div className="flex flex-col sm:flex-row gap-4 items-center">
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

        {/* CLI Emulator */}
        <CliEmulator />

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SiReact className="w-4 h-4 text-[#61DAFB]" />
            React
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SiTailwindcss className="w-4 h-4 text-[#06B6D4]" />
            Tailwind CSS
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SiFramer className="w-4 h-4 text-foreground" />
            Framer Motion
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <SiTypescript className="w-4 h-4 text-[#3178C6]" />
            TypeScript
          </div>
        </div>
      </main>

      <Divider variant='dashed' />
      <HomeExamples />

      <Footer />
    </div>
  )
}

export default App
