import { Button } from './dashkit/Button/Button'
import { CopyField } from './dashkit/CopyField/CopyField'
import { Header } from './partials/Header'
import { FiArrowRight, FiGithub } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Footer } from './partials/Footer'
import { HomeExamples } from './partials/HomeExamples'
import { Divider } from './dashkit/Divider/Divider'

const TITLE = "Dashkit | Ship modern interfaces in minutes";
const DESCRIPTION = "Ready-to-use components you can copy straight into your project. Fully customizable, accessible by default, and yours to own.";
const TAGLINE = "Ship modern interfaces in minutes";
const OG_DESCRIPTION = "Ready-to-use components you can copy straight into your project. Fully customizable, accessible by default, and yours to own.";

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
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight mb-5">
          {TAGLINE}
        </h1>

        <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed text-balance mb-10">
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
      </main>

      <Divider variant='dashed' />
      <HomeExamples />

      <Footer />
    </div>
  )
}

export default App
