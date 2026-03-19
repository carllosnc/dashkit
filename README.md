<p align="center">
  <img src="public/logo.svg" alt="Dashkit UI Logo" width="120" />
</p>

<p align="center">
  <a href="https://github.com/carllosnc/dashkit/actions/workflows/ci.yml">
    <img src="https://github.com/carllosnc/dashkit/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
</p>

# Dashkit UI

A premium, highly customizable React component library designed specifically for modern web applications and developer tools. Dashkit focuses on developer experience, bringing together best-in-class tooling, robust test coverage, and a beautiful neutral-toned aesthetic.

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
git clone https://github.com/carllosnc/dashkit.git
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

## Dashkit CLI

Dashkit comes with a powerful CLI to add components directly to your project without installing the entire library as a dependency.

### Installation

To add a component to your project, run:

```bash
bunx carllosnc/dashkit add <component-name>
```

### Examples

**Add the Card component (includes Badge and Button):**
```bash
bunx carllosnc/dashkit add card
```

**Custom Output Directory:**
```bash
bunx carllosnc/dashkit add card -o src/components/ui
```

### Available Components
`accordion`, `badge`, `button`, `card`, `checkbox`, `drawer`, `dropdown`, `imageexpander`, `input`, `modal`, `otpinput`, `radio`, `select`, `switch`, `tabs`, `toast`.

## How to Register a New Component

Follow these steps to add a new component and make it available via the CLI:

1. **Create the component**: Add your component code in `src/components/[ComponentName]/[ComponentName].tsx`.
2. **Add to Registry**: Open `scripts/registry.ts` and add a new entry to the `registry` object:
   ```ts
   "component-name": {
     name: "Component",
     files: ["src/components/ComponentName/ComponentName.tsx"],
     dependencies: ["framer-motion", "clsx", "tailwind-merge"],
     registryDependencies: ["other-component"] 
   }
   ```
3. **Build CLI**: Run `bun run build:cli` to include your changes in the distribution.
4. **Update Docs**: Create a corresponding `.mdx` file in `src/pages/` and add the route in `main.tsx`.

## Project Structure

- `src/components/` - The core reusable UI components.
- `src/layouts/` - Shared layouts for the main app and documentation pages.
- `src/pages/` - Interactive documentation in MDX.
- `scripts/` - CLI logic and component registry.

## CI / CD
Dashkit uses **GitHub Actions** to automatically lint, type-check, build, and test on every Pull Request and commit pushed to the `main` branch.

## License
Dashkit is released under the [MIT License](LICENSE).

---

Dashkit is created and maintained by [CarllosNC](https://github.com/carllosnc).

