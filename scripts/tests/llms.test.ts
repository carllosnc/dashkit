/** @vitest-environment node */
import { describe, it, expect } from 'vitest';
import fs from 'fs';
import { buildLlmsFiles, CATEGORIES, generateLlmsTxt, generateLlmsFullTxt } from '../generate-llms';

describe('LLMs Documentation Generator', () => {
  it('should generate valid llms.txt and llms-full.txt files', () => {
    const { llmsPath, llmsFullPath } = buildLlmsFiles();

    expect(fs.existsSync(llmsPath)).toBe(true);
    expect(fs.existsSync(llmsFullPath)).toBe(true);

    const llmsContent = fs.readFileSync(llmsPath, 'utf8');
    const llmsFullContent = fs.readFileSync(llmsFullPath, 'utf8');

    expect(llmsContent.length).toBeGreaterThan(1000);
    expect(llmsFullContent.length).toBeGreaterThan(10000);
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
});
