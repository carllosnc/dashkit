import { Button } from './components/Button'
import { FiDownload, FiArrowRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center min-h-screen">
      <h1 className="text-4xl font-bold tracking-tight">Hello World</h1>
      <div className="flex gap-4">
        <Button variant="filled" leftIcon={<FiDownload />}>
          Download
        </Button>
        <Link to="/docs/button" tabIndex={-1}>
          <Button variant="outlined" rightIcon={<FiArrowRight />}>
            Button Docs
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default App
