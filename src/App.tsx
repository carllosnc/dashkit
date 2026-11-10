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

const TITLE = "Dashkit | Build Modern Interfaces Faster";
const DESCRIPTION = "Copy-paste 55+ customizable React 19 & Tailwind CSS v4 components straight into your project. Total code ownership, dynamic semantic tokens, and native context for AI coding agents.";
const TAGLINE = "Build Modern Interfaces Faster";
const OG_DESCRIPTION = "Copy-paste 55+ customizable React 19 & Tailwind CSS v4 components straight into your project with total code ownership and native AI context.";

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
      <main className="relative flex flex-col items-center justify-center text-center px-6 py-16 md:py-20 overflow-hidden">
        <div className="mb-6 animate-in fade-in slide-in-from-top-4 duration-1000 delay-100 fill-mode-both">
          <Badge
            color="primary"
            variant="soft"
            content="v1.0 • 55+ Components • AI-Ready"
          />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground max-w-4xl leading-tight mb-6">
          {TAGLINE}
        </h1>

        <p className="text-base md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
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

        {/* Tech Stack Badges */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Chip variant="tonal" icon={<SiReact className="w-3.5 h-3.5 text-[#61DAFB]" />} label="React 19" />
          <Chip variant="tonal" icon={<SiTailwindcss className="w-3.5 h-3.5 text-[#06B6D4]" />} label="Tailwind CSS v4" />
          <Chip variant="tonal" icon={<SiFramer className="w-3.5 h-3.5 text-foreground" />} label="Framer Motion" />
          <Chip variant="tonal" icon={<SiTypescript className="w-3.5 h-3.5 text-[#3178C6]" />} label="TypeScript" />
        </div>
      </main>

      <Divider variant='dashed' />
      <HomeExamples />

      <Footer />
    </div>
  )
}

export default App
