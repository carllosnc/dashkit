/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import { buildLlmsFiles, CATEGORIES, generateLlmsTxt, generateLlmsFullTxt } from '../generate-llms';

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

  it('should include all registered components in the catalog', () => {
    const llmsContent = generateLlmsTxt();
    const llmsFullContent = generateLlmsFullTxt();

    let totalCatalogComponents = 0;
    for (const cat of CATEGORIES) {
      for (const comp of cat.components) {
        totalCatalogComponents++;
        expect(llmsContent).toContain(`[${comp.name}](llms-full.txt#${comp.slug})`);
        expect(llmsFullContent).toContain(`## ${comp.name}`);
        expect(llmsFullContent).toContain(`bunx carllosnc/dashkit add ${comp.slug}`);
      }
    }

    expect(totalCatalogComponents).toBe(55);
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
