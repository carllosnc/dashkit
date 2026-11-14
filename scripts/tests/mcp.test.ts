/** @vitest-environment node */
import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import { handleMcpMessage, MCP_PROTOCOL_VERSION, MCP_SERVER_INFO } from '../mcp';

const tempDirs: string[] = [];

async function createTempProjectDir(): Promise<string> {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'dashkit-mcp-test-'));
  tempDirs.push(dir);
  await fs.writeJson(path.join(dir, 'package.json'), {
    name: 'mcp-test-app',
    version: '1.0.0',
    dependencies: {
      react: '^19.0.0',
      'react-dom': '^19.0.0'
    }
  });
  await fs.ensureDir(path.join(dir, 'src'));
  await fs.writeFile(path.join(dir, 'src', 'index.css'), '@import "tailwindcss";\n', 'utf-8');
  return dir;
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fs.remove(dir)));
});

describe('Dashkit MCP Server', () => {
  it('handles initialize handshake and ping', async () => {
    const initRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: { protocolVersion: MCP_PROTOCOL_VERSION }
    });

    expect(initRes).toEqual({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: MCP_PROTOCOL_VERSION,
        capabilities: {
          tools: {},
          resources: {},
          prompts: {}
        },
        serverInfo: MCP_SERVER_INFO
      }
    });

    const notificationRes = await handleMcpMessage({
      jsonrpc: '2.0',
      method: 'notifications/initialized'
    });
    expect(notificationRes).toBeNull();

    const pingRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 2,
      method: 'ping'
    });
    expect(pingRes?.result).toEqual({});
  });

  it('lists tools and executes search_components, list_components, and get_component_info', async () => {
    const toolsRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/list'
    });
    const tools = (toolsRes?.result as { tools: Array<{ name: string }> }).tools;
    expect(tools.map((t) => t.name)).toEqual([
      'search_components',
      'list_components',
      'get_component_info',
      'add_component',
      'init_project'
    ]);

    const searchRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'search_components',
        arguments: { query: 'button', limit: 5 }
      }
    });
    const searchPayload = JSON.parse(
      (searchRes?.result as { content: Array<{ text: string }> }).content[0].text
    );
    expect(searchPayload.total).toBeGreaterThan(0);
    expect(searchPayload.components.some((c: { slug: string }) => c.slug === 'button')).toBe(true);

    const aliasSearchRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 41,
      method: 'tools/call',
      params: {
        name: 'search_components',
        arguments: { query: 'kbar', limit: 5 }
      }
    });
    const aliasPayload = JSON.parse(
      (aliasSearchRes?.result as { content: Array<{ text: string }> }).content[0].text
    );
    expect(aliasPayload.components.some((c: { slug: string }) => c.slug === 'commandpalette')).toBe(true);

    const listRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 5,
      method: 'tools/call',
      params: {
        name: 'list_components',
        arguments: {}
      }
    });
    const listPayload = JSON.parse(
      (listRes?.result as { content: Array<{ text: string }> }).content[0].text
    );
    expect(listPayload.total).toBeGreaterThanOrEqual(50);

    const infoRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 6,
      method: 'tools/call',
      params: {
        name: 'get_component_info',
        arguments: { component: 'button', includeSource: true }
      }
    });
    const infoPayload = JSON.parse(
      (infoRes?.result as { content: Array<{ text: string }> }).content[0].text
    );
    expect(infoPayload.slug).toBe('button');
    expect(infoPayload.sourceFiles['src/dashkit/Button/Button.tsx']).toContain('Button');
  });

  it('scaffolds project initialization and components via init_project and add_component', async () => {
    const tempDir = await createTempProjectDir();

    const initRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 7,
      method: 'tools/call',
      params: {
        name: 'init_project',
        arguments: {
          cwd: tempDir,
          componentsDir: 'src/components/ui',
          cssDir: 'src',
          install: false,
          aiRules: false
        }
      }
    });

    expect((initRes?.result as { isError?: boolean }).isError).not.toBe(true);
    expect(await fs.pathExists(path.join(tempDir, 'dashkit.json'))).toBe(true);
    expect(await fs.pathExists(path.join(tempDir, 'src', 'dashkit.css'))).toBe(true);

    const addRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 8,
      method: 'tools/call',
      params: {
        name: 'add_component',
        arguments: {
          cwd: tempDir,
          components: ['badge'],
          install: false
        }
      }
    });

    expect((addRes?.result as { isError?: boolean }).isError).not.toBe(true);
    expect(await fs.pathExists(path.join(tempDir, 'src/components/ui/dashkit/Badge/Badge.tsx'))).toBe(true);
    expect(await fs.pathExists(path.join(tempDir, 'src/components/ui/dashkit/index.ts'))).toBe(true);
  });

  it('lists and reads static and dynamic resources and prompts', async () => {
    const resourcesRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 9,
      method: 'resources/list'
    });
    const resources = (resourcesRes?.result as { resources: Array<{ uri: string }> }).resources;
    expect(resources.some((r) => r.uri === 'dashkit://registry')).toBe(true);
    expect(resources.some((r) => r.uri === 'dashkit://component/button')).toBe(true);

    const readThemeRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 10,
      method: 'resources/read',
      params: { uri: 'dashkit://theme' }
    });
    const themeContents = (readThemeRes?.result as { contents: Array<{ text: string }> }).contents;
    expect(themeContents[0].text).toContain('--ds-primary');

    const readComponentRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 11,
      method: 'resources/read',
      params: { uri: 'dashkit://component/button' }
    });
    const compContents = (readComponentRes?.result as { contents: Array<{ text: string }> }).contents;
    expect(compContents[0].text).toContain('src/dashkit/Button/Button.tsx');

    const promptsRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 12,
      method: 'prompts/list'
    });
    const prompts = (promptsRes?.result as { prompts: Array<{ name: string }> }).prompts;
    expect(prompts.map((p) => p.name)).toContain('dashkit-system');

    const promptGetRes = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 13,
      method: 'prompts/get',
      params: { name: 'dashkit-system' }
    });
    const messages = (promptGetRes?.result as { messages: Array<{ content: { text: string } }> }).messages;
    expect(messages[0].content.text.length).toBeGreaterThan(50);
  });

  it('returns JSON-RPC errors for unknown methods and missing resources', async () => {
    const unknownMethod = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 14,
      method: 'unknown/method'
    });
    expect(unknownMethod?.error?.code).toBe(-32601);

    const missingResource = await handleMcpMessage({
      jsonrpc: '2.0',
      id: 15,
      method: 'resources/read',
      params: { uri: 'dashkit://component/does-not-exist' }
    });
    expect(missingResource?.error?.code).toBe(-32602);
  });
});
