[![CI](https://github.com/carllosnc/dashkit/actions/workflows/ci.yml/badge.svg)](https://github.com/carllosnc/dashkit/actions/workflows/ci.yml)

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

## Shadcn Registry

Dashkit supports the [shadcn/ui](https://ui.shadcn.com/) CLI, allowing you to easily add components from this library to other projects.

### Add to your project
To add a component from Dashkit to your project, run:

```bash
bunx shadcn@latest add https://raw.githubusercontent.com/carllosnc/dashkit/master/registry.json:[component-name]
```

## How to Register a New Component

Follow these steps to add a new component and make it available via the CLI registry:

1. **Create the component**: Add your component code in `src/components/[ComponentName]/[ComponentName].tsx`.
2. **Add to Registry Index**: Open `registry.json` and add a new entry to the `items` array:
   ```json
   {
     "name": "[component-name]",
     "type": "registry:ui",
     "dependencies": ["clsx", "tailwind-merge"],
     "files": [
       {
         "path": "src/components/[ComponentName]/[ComponentName].tsx",
         "type": "registry:ui",
         "target": "components/ui/[component-name].tsx"
       }
     ]
   }
   ```
3. **Create Component JSON**: Create a new file at `registry/[component-name].json` containing the component's metadata and the full source code as a string in the `content` field.
4. **Update Docs**: Create a corresponding `.mdx` file in `src/pages/` and add the route in `main.tsx`.

## Project Structure

- `src/components/` - The core reusable UI components.
- `src/layouts/` - Shared layouts for the main app and documentation pages.
- `src/pages/` - Interactive documentation in MDX.
- `registry/` - JSON definitions for Shadcn CLI support.
- `registry.json` - Main index for the Shadcn registry.

## CI / CD
Dashkit uses **GitHub Actions** to automatically lint, type-check, build, and test on every Pull Request and commit pushed to the `main` branch.

## License
Dashkit is released under the [MIT License](LICENSE).

---

Dashkit is created and maintained by [CarllosNC](https://github.com/carllosnc).

