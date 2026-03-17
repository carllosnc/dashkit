# Dashkit UI

A premium, highly customizable React component library designed specifically for modern web applications and developer tools. Dashkit focuses on developer experience, bringing together best-in-class tooling, robust test coverage, and a beautiful neutral-toned aesthetic.

**Status:** Active Development
- `Button` component is designed, tested, and shipped.
- `Input` & `Card` components are WIP.

## Tech Stack

Dashkit is built with modern, blazingly-fast technologies:

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Typography**: [Inter Variable Font](https://rsms.me/inter/)
- **Routing**: [React Router v7](https://reactrouter.com/)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Package Manager**: [Bun](https://bun.sh/)

## Getting Started

### Prerequisites
Make sure you have [Bun](https://bun.sh/) installed on your machine.

### Installation

Clone the repository and install dependencies using Bun:
```bash
git clone https://github.com/your-username/dashkit.git
cd dashkit
bun install
```

### Running the Development Server

To spin up your local environment and view the component sandbox & documentation:
```bash
bun run dev
```
Navigate to `http://localhost:5173/` in your browser.

## Testing and Linting

Dashkit has a full testing suite configured with Vitest and JSDOM. 

**Run standard tests once:**
```bash
bun run test
```

**Run tests in watch-mode (restarts on save):**
```bash
bun run test:watch
```

**Run ESLint:**
```bash
bun run lint
```

## Project Structure

- `src/components/` - The core reusable UI components.
- `src/layouts/` - Shared layouts for the main app and documentation pages.
- `src/pages/` - Interactive documentation and functional test pages.
- `src/setupTests.ts` - Vitest setup definitions.

## CI / CD
Dashkit uses **GitHub Actions** to automatically lint, type-check, build, and test on every Pull Request and commit pushed to the `main` branch.
