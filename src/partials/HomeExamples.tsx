import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../dashkit/Tabs/Tabs';
import { Button } from '../dashkit/Button/Button';
import { useTheme } from './ThemeContext';
import { THEME_PRESETS, type ThemePreset } from './themeConfig';
import { ColumnOne } from './home-examples/ColumnOne';
import { ColumnTwo } from './home-examples/ColumnTwo';
import { ColumnThree } from './home-examples/ColumnThree';
import { ColumnFour } from './home-examples/ColumnFour';

export function HomeExamples() {
  const { preset, setPreset } = useTheme();
  const activePreset =
    THEME_PRESETS.find(p => p.id === preset) ?? THEME_PRESETS[0];

  return (
    <>
      {/* Live Theme Preset Switcher Bar */}
      <div className="w-full max-w-[1600px] mx-auto px-4 pt-6 pb-2">
        <div className="flex flex-row items-center justify-between gap-3 px-4 py-2 bg-card/80 backdrop-blur-sm border border-border ds-border-width ds-card-shadow ds-rounded-lg">
          {/* Official Dashkit Tabs (variant="pills") */}
          <div className="shrink-0">
            <Tabs
              variant="pills"
              value={preset}
              onValueChange={(val) => setPreset(val as ThemePreset)}
            >
              <TabsList>
                {THEME_PRESETS.map(item => (
                  <TabsTrigger
                    key={item.id}
                    value={item.id}
                    className="gap-2 px-3 py-1.5 text-xs"
                  >
                    <span
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: item.accentHex }}
                    />
                    <span>{item.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Preset Metadata & Docs Action */}
          <div className="flex items-center gap-3 shrink-0 ml-auto">
            <span className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
              <span className="text-foreground/80">{activePreset.tagline}</span>
              <span className="opacity-40">/</span>
              <span>{activePreset.radius}</span>
            </span>

            <Button
              asChild
              size="sm"
              variant="outlined"
              rightIcon={<FiArrowUpRight size={13} />}
            >
              <Link to="/docs/customization">Tokens</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Tabbed View (< 768px) */}
      <div className="block md:hidden w-full max-w-md mx-auto px-4 py-6">
        <Tabs defaultValue="forms">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="forms">Forms</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="settings">Config</TabsTrigger>
            <TabsTrigger value="activity">Feeds</TabsTrigger>
          </TabsList>
          <TabsContent value="forms">
            <ColumnOne />
          </TabsContent>
          <TabsContent value="charts">
            <ColumnTwo />
          </TabsContent>
          <TabsContent value="settings">
            <ColumnThree />
          </TabsContent>
          <TabsContent value="activity">
            <ColumnFour />
          </TabsContent>
        </Tabs>
      </div>

      {/* Desktop Multi-column Grid (>= 768px) */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-[1600px] mx-auto px-4 py-8 items-start">
        <ColumnOne />
        <ColumnTwo />
        <ColumnThree />
        <ColumnFour />
      </div>
    </>
  );
}
