/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import { buildLlmsFiles, CATEGORIES, generateLlmsTxt, generateLlmsFullTxt, toHeadingAnchor } from '../generate-llms';
import { registry } from '../registry';

function stripCodeBlocks(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, '');
}

describe('LLMs Documentation Generator', () => {
  it('should generate valid llms.txt, llms-full.txt, and registry.json files', () => {
    const { llmsPath, llmsFullPath, registryJsonPath } = buildLlmsFiles();

    expect(fs.existsSync(llmsPath)).toBe(true);
    expect(fs.existsSync(llmsFullPath)).toBe(true);
    expect(fs.existsSync(registryJsonPath)).toBe(true);

    const llmsContent = fs.readFileSync(llmsPath, 'utf8');
    const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf8');
    const registryJson = JSON.parse(fs.readFileSync(registryJsonPath, 'utf8'));

    expect(llmsContent.length).toBeGreaterThan(1000);
    expect(llmsFullContent.length).toBeGreaterThan(10000);
    expect(registryJson.totalComponents).toBeGreaterThanOrEqual(55);
    expect(registryJson.components.button.name).toBe('Button');
    expect(Array.isArray(registryJson.components.button.exports)).toBe(true);
  });

  it('should keep CATEGORIES in strict 1-to-1 sync with registry keys', () => {
    const registrySlugs = Object.keys(registry);
    const categorySlugs = CATEGORIES.flatMap((cat) => cat.components.map((comp) => comp.slug));

    for (const regSlug of registrySlugs) {
      expect(categorySlugs).toContain(regSlug);
    }

    for (const catSlug of categorySlugs) {
      expect(registrySlugs).toContain(catSlug);
    }

    expect(new Set(categorySlugs).size).toBe(registrySlugs.length);
  });

  it('should include all registered components in the catalog', () => {
    const llmsContent = generateLlmsTxt();
    const llmsFullContent = generateLlmsFullTxt();

    let totalCatalogComponents = 0;
    for (const cat of CATEGORIES) {
      for (const comp of cat.components) {
        totalCatalogComponents++;
        const anchor = toHeadingAnchor(comp.name);
        expect(llmsContent).toContain(`[${comp.name}](llms-full.txt#${anchor})`);
        expect(llmsFullContent).toContain(`## ${comp.name}`);
        expect(llmsFullContent).toContain(`bunx carllosnc/dashkit add ${comp.slug}`);
      }
    }

    expect(totalCatalogComponents).toBe(55);
  });

  it('should resolve every catalog link anchor in llms.txt to an existing heading in llms-full.txt', () => {
    const llmsContent = generateLlmsTxt();
    const llmsFullWithoutCode = stripCodeBlocks(generateLlmsFullTxt());

    const fullHeadingAnchors = new Set<string>();
    for (const match of llmsFullWithoutCode.matchAll(/^(#{1,6})\s+(.+)$/gm)) {
      fullHeadingAnchors.add(toHeadingAnchor(match[2]));
    }

    const linkAnchors = [...llmsContent.matchAll(/\(llms-full\.txt#([^)]+)\)/g)].map((m) => m[1]);
    expect(linkAnchors.length).toBe(55);

    for (const anchor of linkAnchors) {
      expect(fullHeadingAnchors.has(anchor), `Broken anchor link: #${anchor}`).toBe(true);
    }
  });

  it('should maintain a single H1, valid heading hierarchy, and collision-free H1/H2 anchors in llms-full.txt', () => {
    const llmsFullWithoutCode = stripCodeBlocks(generateLlmsFullTxt());
    const headings = [...llmsFullWithoutCode.matchAll(/^(#{1,6})\s+(.+)$/gm)].map((m) => ({
      level: m[1].length,
      text: m[2].trim(),
      anchor: toHeadingAnchor(m[2]),
    }));

    const h1Headings = headings.filter((h) => h.level === 1);
    expect(h1Headings).toHaveLength(1);
    expect(h1Headings[0].text).toContain('Dashkit UI');

    // Verify heading levels never skip downward (e.g. H2 -> H4)
    let prevLevel = 1;
    for (const h of headings) {
      expect(
        h.level <= prevLevel + 1,
        `Invalid heading jump from H${prevLevel} to H${h.level} at "${h.text}"`
      ).toBe(true);
      prevLevel = h.level;
    }

    // All H1 and H2 anchors (document sections + 55 components) must be globally unique
    const topLevelAnchors = new Set<string>();
    for (const h of headings.filter((item) => item.level <= 2)) {
      expect(topLevelAnchors.has(h.anchor), `Duplicate H${h.level} anchor: #${h.anchor}`).toBe(false);
      topLevelAnchors.add(h.anchor);
    }
  });

  it('should not contain emojis in generated outputs', () => {
    const llmsContent = generateLlmsTxt();
    const llmsFullContent = generateLlmsFullTxt();

    const emojiRegex = /\p{Extended_Pictographic}/u;

    expect(emojiRegex.test(llmsContent)).toBe(false);
    expect(emojiRegex.test(llmsFullContent)).toBe(false);
  });

  it('should include Markdown props tables in llms-full.txt', () => {
    const llmsFullContent = generateLlmsFullTxt();
    expect(llmsFullContent).toContain('| Property | Type | Default | Description |');
  });

  it('should include editable tokens, dynamic theme attributes, and composition cheat sheet in llms.txt', () => {
    const llmsContent = generateLlmsTxt();
    expect(llmsContent).toContain('--ds-primary');
    expect(llmsContent).toContain('--radius');
    expect(llmsContent).toContain('data-base');
    expect(llmsContent).toContain('data-primary');
    expect(llmsContent).toContain('3-Tier AI Customization Protocol');
    expect(llmsContent).toContain('Component API Patterns (Compound vs. Prop-Driven)');
  });
});
