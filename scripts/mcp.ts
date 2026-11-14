import fs from 'fs-extra';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { registry, type ComponentConfig } from './registry';
import { handleAdd, handleInit } from './commands';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const packageRoot = path.resolve(__dirname, '..');

export const MCP_PROTOCOL_VERSION = '2024-11-05';
export const MCP_SERVER_INFO = {
  name: '@dashkit/mcp',
  version: '1.0.0'
} as const;

export interface JsonRpcRequest {
  jsonrpc?: string;
  id?: string | number | null;
  method: string;
  params?: Record<string, unknown>;
}

export interface JsonRpcResponse {
  jsonrpc: '2.0';
  id: string | number | null;
  result?: unknown;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export interface RegistryComponentMetadata {
  slug: string;
  name: string;
  category: string;
  description: string;
  installCommand: string;
  files: string[];
  dependencies: string[];
  registryDependencies: string[];
  exports: string[];
  propsDefinitions: string[];
}

interface RegistryJsonFile {
  name: string;
  totalComponents: number;
  components: Record<string, RegistryComponentMetadata>;
}

const PROMPT_DEFINITIONS = [
  {
    name: 'dashkit-system',
    description: 'Core Dashkit AI system prompt with 3-tier customization protocol and component conventions.',
    file: 'prompts/system-prompt.md'
  },
  {
    name: 'dashkit-dashboard',
    description: 'Prompt template for building analytics and operational dashboards with Dashkit.',
    file: 'prompts/templates/dashboard.md'
  },
  {
    name: 'dashkit-data-table',
    description: 'Prompt template for building searchable, paginated data tables with Dashkit.',
    file: 'prompts/templates/data-table.md'
  },
  {
    name: 'dashkit-settings-form',
    description: 'Prompt template for building validated settings and configuration forms with Dashkit.',
    file: 'prompts/templates/settings-form.md'
  }
] as const;

const STATIC_RESOURCES = [
  {
    uri: 'dashkit://registry',
    name: 'Dashkit Component Registry',
    description: 'Machine-readable JSON index of all Dashkit components, props, exports, and dependencies.',
    mimeType: 'application/json',
    file: 'public/registry.json'
  },
  {
    uri: 'dashkit://llms.txt',
    name: 'Dashkit LLMs Index',
    description: 'Concise markdown overview of Dashkit components and CLI usage.',
    mimeType: 'text/plain',
    file: 'public/llms.txt'
  },
  {
    uri: 'dashkit://llms-full.txt',
    name: 'Dashkit Full Documentation',
    description: 'Complete Dashkit component reference and examples for LLMs.',
    mimeType: 'text/plain',
    file: 'public/llms-full.txt'
  },
  {
    uri: 'dashkit://theme',
    name: 'Dashkit Global Theme CSS',
    description: 'Semantic design tokens, light/dark variables, and Tailwind v4 theme definitions.',
    mimeType: 'text/css',
    file: 'src/dashkit/dashkit.css'
  }
] as const;

const MCP_TOOLS = [
  {
    name: 'search_components',
    description: 'Search Dashkit components by keyword, category, or use case.',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query matching component slug, name, category, or description.'
        },
        category: {
          type: 'string',
          description: 'Optional category filter (e.g., "Data Display & Metrics", "Forms & Inputs").'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return (default: 10).'
        }
      }
    }
  },
  {
    name: 'list_components',
    description: 'List all available Dashkit components, optionally filtered by category.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Optional category name to filter components.'
        }
      }
    }
  },
  {
    name: 'get_component_info',
    description: 'Get detailed metadata, TypeScript props, dependencies, exports, and source code for a Dashkit component.',
    inputSchema: {
      type: 'object',
      required: ['component'],
      properties: {
        component: {
          type: 'string',
          description: 'Component slug or name (e.g., "button", "StatsCard", "table").'
        },
        includeSource: {
          type: 'boolean',
          description: 'Include full source code of the component files (default: true).'
        }
      }
    }
  },
  {
    name: 'add_component',
    description: 'Scaffold and install one or more Dashkit components and their registry dependencies into a target project.',
    inputSchema: {
      type: 'object',
      required: ['components'],
      properties: {
        components: {
          type: 'array',
          items: { type: 'string' },
          description: 'List of component slugs or names to install (e.g., ["button", "card"]).'
        },
        outputDir: {
          type: 'string',
          description: 'Target components directory (defaults to dashkit.json or project auto-detection).'
        },
        force: {
          type: 'boolean',
          description: 'Overwrite existing component files (default: false).'
        },
        includeTests: {
          type: 'boolean',
          description: 'Include *.test.tsx files when scaffolding (default: false).'
        },
        install: {
          type: 'boolean',
          description: 'Automatically install missing npm dependencies (default: false).'
        },
        cwd: {
          type: 'string',
          description: 'Target project working directory (defaults to current working directory).'
        }
      }
    }
  },
  {
    name: 'init_project',
    description: 'Initialize Dashkit in a target project (installs dashkit.css, utils, dashkit.json, and AI rules).',
    inputSchema: {
      type: 'object',
      properties: {
        componentsDir: {
          type: 'string',
          description: 'Directory to store Dashkit components.'
        },
        cssDir: {
          type: 'string',
          description: 'Directory to store dashkit.css.'
        },
        force: {
          type: 'boolean',
          description: 'Overwrite existing dashkit.css and utility files (default: false).'
        },
        install: {
          type: 'boolean',
          description: 'Automatically install base npm dependencies (default: false).'
        },
        aiRules: {
          type: 'boolean',
          description: 'Generate AGENTS.md AI assistant instructions (default: true).'
        },
        cwd: {
          type: 'string',
          description: 'Target project working directory (defaults to current working directory).'
        }
      }
    }
  }
] as const;

async function loadRegistryMetadata(): Promise<Record<string, RegistryComponentMetadata>> {
  const registryJsonPath = path.join(packageRoot, 'public', 'registry.json');
  if (await fs.pathExists(registryJsonPath)) {
    const parsed = (await fs.readJson(registryJsonPath)) as RegistryJsonFile;
    if (parsed && parsed.components) {
      return parsed.components;
    }
  }

  const fallback: Record<string, RegistryComponentMetadata> = {};
  for (const [slug, config] of Object.entries(registry) as Array<[string, ComponentConfig]>) {
    fallback[slug] = {
      slug,
      name: config.name,
      category: 'Uncategorized',
      description: '',
      installCommand: `bunx carllosnc/dashkit add ${slug}`,
      files: config.files,
      dependencies: config.dependencies ?? [],
      registryDependencies: config.registryDependencies ?? [],
      exports: [],
      propsDefinitions: []
    };
  }
  return fallback;
}

function findComponentEntry(
  components: Record<string, RegistryComponentMetadata>,
  query: string
): RegistryComponentMetadata | undefined {
  const normalized = query.trim().toLowerCase();
  if (components[normalized]) {
    return components[normalized];
  }

  return Object.values(components).find(
    (entry) =>
      entry.slug.toLowerCase() === normalized ||
      entry.name.toLowerCase() === normalized
  );
}

async function readComponentFiles(files: string[]): Promise<Record<string, string>> {
  const contents: Record<string, string> = {};
  for (const relPath of files) {
    const absPath = path.join(packageRoot, relPath);
    if (await fs.pathExists(absPath)) {
      contents[relPath] = await fs.readFile(absPath, 'utf-8');
    }
  }
  return contents;
}

async function withCapturedExecution<T>(
  cwd: string | undefined,
  fn: () => Promise<T>
): Promise<{ result: T; logs: string[] }> {
  const logs: string[] = [];
  const originalLog = console.log;
  const originalInfo = console.info;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalCwd = process.cwd();

  const capture = (...args: unknown[]) => {
    logs.push(args.map((arg) => (typeof arg === 'string' ? arg : JSON.stringify(arg))).join(' '));
  };

  console.log = capture;
  console.info = capture;
  console.warn = capture;
  console.error = capture;

  try {
    if (cwd) {
      if (!(await fs.pathExists(cwd))) {
        throw new Error(`Target working directory does not exist: ${cwd}`);
      }
      process.chdir(cwd);
    }

    const result = await fn();
    return { result, logs };
  } finally {
    console.log = originalLog;
    console.info = originalInfo;
    console.warn = originalWarn;
    console.error = originalError;
    if (process.cwd() !== originalCwd) {
      process.chdir(originalCwd);
    }
  }
}

const COMPONENT_SEARCH_ALIASES: Record<string, string[]> = {
  commandpalette: ['kbar', 'cmd+k', 'ctrl+k', 'command menu', 'quick actions', 'spotlight'],
  taginput: ['multiselect', 'multi-select', 'tags', 'chips input', 'autocomplete'],
  fileupload: ['dropzone', 'upload', 'drag and drop', 'file picker', 'attachment'],
  table: ['datagrid', 'data grid', 'virtual scroll', 'virtualized', 'rows'],
  combobox: ['autocomplete', 'searchable select', 'typeahead'],
  modal: ['dialog', 'popup', 'alertdialog'],
  drawer: ['sheet', 'slide-over', 'panel'],
  toast: ['notification', 'snackbar', 'alert'],
  dropdown: ['menu', 'context menu', 'actions menu'],
  datepicker: ['calendar', 'date'],
  statscard: ['kpi', 'metric', 'analytics card'],
  systemlogs: ['terminal', 'console', 'logs', 'audit trail'],
  radiocard: ['radio group', 'selection card', 'choice card', 'option card', 'preset selector']
};

function scoreComponentMatch(item: RegistryComponentMetadata, query: string): number {
  const slug = item.slug.toLowerCase();
  const name = item.name.toLowerCase();
  if (slug === query || name === query) return 100;
  if (slug.startsWith(query) || name.startsWith(query)) return 80;
  if (slug.includes(query) || name.includes(query)) return 60;
  if (item.exports.some((exp) => exp.toLowerCase().includes(query))) return 50;
  if (item.description.toLowerCase().includes(query)) return 40;
  if (item.category.toLowerCase().includes(query)) return 30;
  const aliases = COMPONENT_SEARCH_ALIASES[slug] ?? [];
  if (aliases.some((alias) => alias.includes(query) || query.includes(alias))) return 25;
  return 0;
}

async function executeTool(
  name: string,
  args: Record<string, unknown> = {}
): Promise<{ content: Array<{ type: 'text'; text: string }>; isError?: boolean }> {
  const components = await loadRegistryMetadata();

  switch (name) {
    case 'search_components': {
      const query = typeof args.query === 'string' ? args.query.trim().toLowerCase() : '';
      const category = typeof args.category === 'string' ? args.category.trim().toLowerCase() : '';
      const limit = typeof args.limit === 'number' && args.limit > 0 ? args.limit : 10;

      const filtered = Object.values(components).filter((item) => {
        if (category && !item.category.toLowerCase().includes(category)) {
          return false;
        }
        if (!query) return true;
        return scoreComponentMatch(item, query) > 0;
      });

      if (query) {
        filtered.sort((a, b) => scoreComponentMatch(b, query) - scoreComponentMatch(a, query));
      }

      const matches = filtered
        .slice(0, limit)
        .map((item) => ({
          slug: item.slug,
          name: item.name,
          category: item.category,
          description: item.description,
          exports: item.exports,
          dependencies: item.dependencies,
          registryDependencies: item.registryDependencies,
          installCommand: item.installCommand
        }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ total: matches.length, components: matches }, null, 2)
          }
        ]
      };
    }

    case 'list_components': {
      const category = typeof args.category === 'string' ? args.category.trim().toLowerCase() : '';
      const items = Object.values(components)
        .filter((item) => !category || item.category.toLowerCase().includes(category))
        .map((item) => ({
          slug: item.slug,
          name: item.name,
          category: item.category,
          description: item.description
        }));

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ total: items.length, components: items }, null, 2)
          }
        ]
      };
    }

    case 'get_component_info': {
      const componentQuery = typeof args.component === 'string' ? args.component : '';
      if (!componentQuery.trim()) {
        return {
          isError: true,
          content: [{ type: 'text', text: 'Missing required argument: component' }]
        };
      }

      const entry = findComponentEntry(components, componentQuery);
      if (!entry) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Component "${componentQuery}" not found in Dashkit registry.` }]
        };
      }

      const includeSource = args.includeSource !== false;
      const sourceFiles = includeSource ? await readComponentFiles(entry.files) : undefined;

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ ...entry, ...(sourceFiles ? { sourceFiles } : {}) }, null, 2)
          }
        ]
      };
    }

    case 'add_component': {
      const componentList = Array.isArray(args.components)
        ? args.components.filter((c): c is string => typeof c === 'string' && c.trim().length > 0)
        : [];

      if (componentList.length === 0) {
        return {
          isError: true,
          content: [{ type: 'text', text: 'Missing required argument: components (non-empty string array).' }]
        };
      }

      const cwd = typeof args.cwd === 'string' ? args.cwd : undefined;
      const output = typeof args.outputDir === 'string' ? args.outputDir : '';
      const force = args.force === true;
      const tests = args.includeTests === true;
      const install = args.install === true;

      const { logs } = await withCapturedExecution(cwd, async () => {
        await handleAdd(componentList, {
          output,
          install,
          force,
          tests
        });
      });

      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'ok',
                components: componentList,
                logs
              },
              null,
              2
            )
          }
        ]
      };
    }

    case 'init_project': {
      const cwd = typeof args.cwd === 'string' ? args.cwd : undefined;
      const { logs } = await withCapturedExecution(cwd, async () => {
        await handleInit({
          yes: true,
          json: true,
          componentsDir: typeof args.componentsDir === 'string' ? args.componentsDir : undefined,
          cssDir: typeof args.cssDir === 'string' ? args.cssDir : undefined,
          force: args.force === true,
          install: args.install === true,
          aiRules: args.aiRules !== false
        });
      });

      return {
        content: [
          {
            type: 'text',
            text: logs.join('\n') || JSON.stringify({ status: 'ok' })
          }
        ]
      };
    }

    default:
      return {
        isError: true,
        content: [{ type: 'text', text: `Unknown tool: ${name}` }]
      };
  }
}

async function readResourceByUri(
  uri: string
): Promise<{ uri: string; mimeType: string; text: string } | null> {
  const staticMatch = STATIC_RESOURCES.find((res) => res.uri === uri);
  if (staticMatch) {
    const absPath = path.join(packageRoot, staticMatch.file);
    if (!(await fs.pathExists(absPath))) {
      return null;
    }
    return {
      uri,
      mimeType: staticMatch.mimeType,
      text: await fs.readFile(absPath, 'utf-8')
    };
  }

  if (uri.startsWith('dashkit://component/')) {
    const slug = uri.slice('dashkit://component/'.length).trim();
    const components = await loadRegistryMetadata();
    const entry = findComponentEntry(components, slug);
    if (!entry) return null;

    const files = await readComponentFiles(entry.files);
    const sections = [
      `# ${entry.name} (${entry.slug})`,
      `Category: ${entry.category}`,
      entry.description ? `\n${entry.description}\n` : '',
      `Exports: ${entry.exports.join(', ') || 'N/A'}`,
      `Dependencies: ${entry.dependencies.join(', ') || 'None'}`,
      `Registry Dependencies: ${entry.registryDependencies.join(', ') || 'None'}`,
      ...Object.entries(files).map(
        ([filePath, content]) => `\n## ${filePath}\n\`\`\`tsx\n${content}\n\`\`\``
      )
    ];

    return {
      uri,
      mimeType: 'text/markdown',
      text: sections.join('\n')
    };
  }

  return null;
}

export async function handleMcpMessage(request: JsonRpcRequest): Promise<JsonRpcResponse | null> {
  const hasId = request.id !== undefined && request.id !== null;
  const id = request.id ?? null;

  if (request.method === 'notifications/initialized' || !hasId) {
    return null;
  }

  try {
    switch (request.method) {
      case 'initialize':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            protocolVersion: MCP_PROTOCOL_VERSION,
            capabilities: {
              tools: {},
              resources: {},
              prompts: {}
            },
            serverInfo: MCP_SERVER_INFO
          }
        };

      case 'ping':
        return {
          jsonrpc: '2.0',
          id,
          result: {}
        };

      case 'tools/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            tools: MCP_TOOLS
          }
        };

      case 'tools/call': {
        const params = request.params ?? {};
        const toolName = typeof params.name === 'string' ? params.name : '';
        const toolArgs =
          params.arguments && typeof params.arguments === 'object' && !Array.isArray(params.arguments)
            ? (params.arguments as Record<string, unknown>)
            : {};

        const result = await executeTool(toolName, toolArgs);
        return {
          jsonrpc: '2.0',
          id,
          result
        };
      }

      case 'resources/list': {
        const components = await loadRegistryMetadata();
        const dynamicResources = Object.values(components).map((comp) => ({
          uri: `dashkit://component/${comp.slug}`,
          name: `${comp.name} Component`,
          description: comp.description || `Source code and metadata for ${comp.name}`,
          mimeType: 'text/markdown'
        }));

        return {
          jsonrpc: '2.0',
          id,
          result: {
            resources: [
              ...STATIC_RESOURCES.map(({ uri, name, description, mimeType }) => ({
                uri,
                name,
                description,
                mimeType
              })),
              ...dynamicResources
            ]
          }
        };
      }

      case 'resources/read': {
        const uri = typeof request.params?.uri === 'string' ? request.params.uri : '';
        const resource = await readResourceByUri(uri);
        if (!resource) {
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: `Resource not found: ${uri}`
            }
          };
        }

        return {
          jsonrpc: '2.0',
          id,
          result: {
            contents: [resource]
          }
        };
      }

      case 'prompts/list':
        return {
          jsonrpc: '2.0',
          id,
          result: {
            prompts: PROMPT_DEFINITIONS.map(({ name, description }) => ({
              name,
              description
            }))
          }
        };

      case 'prompts/get': {
        const promptName = typeof request.params?.name === 'string' ? request.params.name : '';
        const prompt = PROMPT_DEFINITIONS.find((p) => p.name === promptName);
        if (!prompt) {
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32602,
              message: `Prompt not found: ${promptName}`
            }
          };
        }

        const absPath = path.join(packageRoot, prompt.file);
        if (!(await fs.pathExists(absPath))) {
          return {
            jsonrpc: '2.0',
            id,
            error: {
              code: -32603,
              message: `Prompt file missing on disk: ${prompt.file}`
            }
          };
        }

        const text = await fs.readFile(absPath, 'utf-8');
        return {
          jsonrpc: '2.0',
          id,
          result: {
            description: prompt.description,
            messages: [
              {
                role: 'user',
                content: {
                  type: 'text',
                  text
                }
              }
            ]
          }
        };
      }

      default:
        return {
          jsonrpc: '2.0',
          id,
          error: {
            code: -32601,
            message: `Method not found: ${request.method}`
          }
        };
    }
  } catch (error) {
    return {
      jsonrpc: '2.0',
      id,
      error: {
        code: -32603,
        message: error instanceof Error ? error.message : 'Internal server error'
      }
    };
  }
}

export async function startMcpServer(): Promise<void> {
  const rl = readline.createInterface({
    input: process.stdin,
    crlfDelay: Infinity
  });

  await new Promise<void>((resolve) => {
    rl.on('line', async (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      try {
        const request = JSON.parse(trimmed) as JsonRpcRequest;
        const response = await handleMcpMessage(request);
        if (response) {
          process.stdout.write(`${JSON.stringify(response)}\n`);
        }
      } catch {
        const parseError: JsonRpcResponse = {
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32700,
            message: 'Parse error'
          }
        };
        process.stdout.write(`${JSON.stringify(parseError)}\n`);
      }
    });

    rl.on('close', () => {
      resolve();
    });
  });
}
