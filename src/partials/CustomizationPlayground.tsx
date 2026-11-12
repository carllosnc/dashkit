import { useState } from 'react';
import { useTheme } from './ThemeContext';
import {
  THEME_PRESETS,
  BASE_COLORS,
  PRIMARY_COLORS,
  type BaseColor,
  type PrimaryColor,
} from './themeConfig';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../dashkit/Card';
import { Badge } from '../dashkit/Badge';
import { Button } from '../dashkit/Button/Button';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../dashkit/Table/Table';
import { FiCheck, FiCopy, FiRotateCcw, FiSun, FiMoon } from 'react-icons/fi';

export function CustomizationPlayground() {
  const {
    theme,
    toggleTheme,
    baseColor,
    setBaseColor,
    primaryColor,
    setPrimaryColor,
    preset,
    setPreset,
  } = useTheme();

  const [copiedCss, setCopiedCss] = useState(false);

  const activePreset =
    THEME_PRESETS.find(p => p.id === preset) ?? THEME_PRESETS[0];

  const handleCopyCss = async () => {
    try {
      await navigator.clipboard.writeText(activePreset.cssSnippet);
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    } catch (err) {
      console.error('Failed to copy CSS snippet:', err);
    }
  };

  return (
    <div className="not-prose my-8 flex flex-col gap-6">
      {/* 1. Preset Switcher Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <CardTitle>Interactive Theme Presets</CardTitle>
              <CardDescription>
                Select a preset below to transform the entire documentation site and inspect its live CSS tokens.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outlined"
                leftIcon={theme === 'dark' ? <FiSun size={14} /> : <FiMoon size={14} />}
                onClick={toggleTheme}
              >
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button
                size="sm"
                variant="soft"
                leftIcon={<FiRotateCcw size={14} />}
                onClick={() => setPreset('default')}
                disabled={preset === 'default' && baseColor === 'zinc' && primaryColor === 'blue'}
              >
                Reset
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex flex-col gap-6">
          {/* Preset Option Cards (Stacked List) */}
          <div className="flex flex-col gap-3">
            {THEME_PRESETS.map(item => {
              const isSelected = preset === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPreset(item.id)}
                  className={`w-full text-left p-4 ds-rounded-lg border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'border-primary bg-primary/5 ring-2 ring-primary/30 shadow-sm'
                      : 'border-border bg-card hover:bg-muted/40 hover:border-border/80'
                  }`}
                >
                  <span
                    className="size-3.5 rounded-full shrink-0 ring-2 ring-background"
                    style={{ backgroundColor: item.accentHex }}
                  />
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2.5">
                      <span className="font-semibold text-sm text-foreground">
                        {item.label}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        · {item.tagline}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Palette Fine-Tuning */}
          <div className="flex flex-col gap-5 pt-3 border-t border-border">
            <div className="space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Primary Brand Palette (`data-primary=&quot;{primaryColor}&quot;`)
              </span>
              <div className="flex flex-wrap gap-2">
                {PRIMARY_COLORS.map(c => {
                  const isSelected = primaryColor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setPrimaryColor(c.id as PrimaryColor)}
                      title={c.label}
                      aria-label={`Select ${c.label} primary color`}
                      className={`size-7 rounded-full flex items-center justify-center transition-transform cursor-pointer ${
                        isSelected
                          ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110'
                          : 'opacity-85 hover:opacity-100 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.color }}
                    >
                      {isSelected && <FiCheck size={12} className="text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Base Neutral Palette (`data-base=&quot;{baseColor}&quot;`)
              </span>
              <div className="flex flex-wrap gap-2">
                {BASE_COLORS.map(c => {
                  const isSelected = baseColor === c.id;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setBaseColor(c.id as BaseColor)}
                      title={c.label}
                      aria-label={`Select ${c.label} base color`}
                      className={`px-2.5 py-1 text-xs font-medium ds-rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'border-primary bg-primary/10 text-foreground'
                          : 'border-border bg-card text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <span
                        className="size-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Dynamic Core Variables Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <CardTitle>
                Active Design Tokens — {activePreset.label} Preset
              </CardTitle>
              <CardDescription>
                Real-time CSS custom properties currently powering the interface in Light and Dark modes.
              </CardDescription>
            </div>
            <Badge variant="soft" color="primary" content={`--radius: ${activePreset.radius}`} />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Token Variable</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Light Value (`:root`)</TableHead>
                <TableHead>Dark Value (`.dark`)</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activePreset.tokens.map(token => (
                <TableRow key={token.variable}>
                  <TableCell className="font-mono text-xs font-semibold text-foreground">
                    {token.variable}
                  </TableCell>
                  <TableCell>
                    <Badge variant="soft" color="base" content={token.category} />
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    <span className="inline-flex items-center gap-2">
                      {token.lightPreviewColor && (
                        <span
                          className="size-3.5 ds-rounded-sm border border-border shrink-0"
                          style={{ backgroundColor: token.lightPreviewColor }}
                        />
                      )}
                      <span>{token.lightValue}</span>
                    </span>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    <span className="inline-flex items-center gap-2">
                      {token.darkPreviewColor && (
                        <span
                          className="size-3.5 ds-rounded-sm border border-border shrink-0"
                          style={{ backgroundColor: token.darkPreviewColor }}
                        />
                      )}
                      <span>{token.darkValue}</span>
                    </span>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {token.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* 3. Dynamic Radius Scale & Generated CSS */}
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Proportional Radius Scale</CardTitle>
            <CardDescription>
              All component corner tokens derive automatically from{' '}
              <code className="font-mono text-xs text-foreground">
                --radius: {activePreset.radius}
              </code>
              .
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {(
              [
                ['--radius-sm', activePreset.radiusScale.sm, 'ds-rounded-sm'],
                ['--radius-md', activePreset.radiusScale.md, 'ds-rounded-md'],
                ['--radius-lg', activePreset.radiusScale.lg, 'ds-rounded-lg'],
                ['--radius-xl', activePreset.radiusScale.xl, 'ds-rounded-xl'],
                ['--radius-2xl', activePreset.radiusScale['2xl'], 'ds-rounded-2xl'],
              ] as const
            ).map(([tokenName, computedText, radiusClass]) => (
              <div
                key={tokenName}
                className="flex items-center justify-between gap-3 p-2.5 border border-border bg-background ds-rounded"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`size-8 bg-primary/15 border-2 border-primary ${radiusClass}`}
                  />
                  <div>
                    <div className="font-mono text-xs font-semibold text-foreground">
                      {tokenName}
                    </div>
                    <div className="font-mono text-[11px] text-muted-foreground">
                      {computedText}
                    </div>
                  </div>
                </div>
                <Badge variant="soft" color="base" content={radiusClass} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>Preset Source — `{activePreset.presetFile}`</CardTitle>
                <CardDescription>
                  Self-contained CSS token delta for <strong>{activePreset.label}</strong>. Copy into <code className="font-mono text-xs">src/dashkit/dashkit.css</code> or import from <code className="font-mono text-xs">{activePreset.presetFile}</code>.
                </CardDescription>
              </div>
              <Button
                size="sm"
                variant="outlined"
                leftIcon={copiedCss ? <FiCheck size={14} /> : <FiCopy size={14} />}
                onClick={handleCopyCss}
              >
                {copiedCss ? 'Copied' : 'Copy CSS'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <pre className="p-4 bg-ds-950 text-ds-100 font-mono text-xs overflow-x-auto ds-rounded border border-border leading-relaxed">
              <code>{activePreset.cssSnippet}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
