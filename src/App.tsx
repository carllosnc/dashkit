import { Badge } from './dashkit/Badge/Badge'
import { Button } from './dashkit/Button/Button'
import { Chip } from './dashkit/Chip/Chip'
import { CopyField } from './dashkit/CopyField/CopyField'
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
            color="primary"
            variant="soft"
            content="v1.0 • Modern React Dashboard UI"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-tight mb-8">
          {TAGLINE_MAIN} <br className="hidden md:block" />
          <span className="text-muted-foreground">{TAGLINE_SUB}</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12">
          {DESCRIPTION}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button asChild variant="filled" rightIcon={<FiArrowRight />}>
            <Link to="/docs">Get Started</Link>
          </Button>
          <Button asChild variant="outlined" leftIcon={<FiGithub />}>
            <a href="https://github.com/carllosnc/dashkit" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </a>
          </Button>
        </div>

        <div className="mt-6 w-full max-w-xs">
          <CopyField value="bunx carllosnc/dashkit init" />
        </div>

        {/* CLI Emulator */}
        <CliEmulator />

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap justify-center gap-3">
          <Chip variant="tonal" icon={<SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />} label="React 19" />
          <Chip variant="tonal" icon={<SiTailwindcss className="w-3.5 h-3.5 text-[#06B6D4]" />} label="Tailwind CSS v4" />
          <Chip variant="tonal" icon={<SiFramer className="w-3.5 h-3.5 text-foreground" />} label="Framer Motion" />
          <Chip variant="tonal" icon={<SiTypescript className="w-3.5 h-3.5 text-[#3178C6]" />} label="TypeScript" />
        </div>
      </main>

      <Divider variant='dashed' />

      {/* Showcase Section Header */}
      <section className="text-center pt-20 px-6 max-w-4xl mx-auto">
        <div className="inline-flex mb-4">
          <Badge variant="soft" color="primary" content="Production-Ready Blocks" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          Pre-built Dashboard Blocks
        </h2>
        <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
          Functional, interactive interfaces crafted entirely with Dashkit primitives — zero ad-hoc styling.
        </p>
      </section>

      <HomeExamples />

      <Footer />
    </div>
  )
}

export default App
