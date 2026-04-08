<p align="center">
  <img src="public/logo.svg" alt="Dashkit UI Logo" width="120" /><br />
  <br />
  <a href="https://github.com/carllosnc/dashkit/actions/workflows/ci.yml">
    <img src="https://github.com/carllosnc/dashkit/actions/workflows/ci.yml/badge.svg" alt="CI" />
  </a>
</p>

# Dashkit UI

Dashkit is a professional-grade React component library built with **Tailwind CSS v4** for developers who value **low dependency counts** and **total code ownership**.

### Why Dashkit?
- **Zero Baggage**: No runtime libraries. Just React and Tailwind.
- **Copy-Paste Ownership**: You don't install a package; you own the source. Add components directly via CLI.
- **Modern Stack**: Built with React 19, Vite, and Bun for blazing speed.
- **Sharp Aesthetics**: High-contrast design with native dark mode support.

## Getting Started

### Installation
Clone the repo and install dependencies:
```bash
git clone https://github.com/carllosnc/dashkit.git
bun install
bun run dev
```

## Dashkit CLI

Add components directly to your project without overhead.

### Installation
```bash
bunx carllosnc/dashkit add <component-name>
```

### Examples
```bash
# Add Card (includes Badge and Button)
bunx carllosnc/dashkit add card

# Custom Output Directory
bunx carllosnc/dashkit add card -o src/components/ui
```

## License
MIT [LICENSE](LICENSE).

---
Created and maintained by [CarllosNC](https://github.com/carllosnc).

