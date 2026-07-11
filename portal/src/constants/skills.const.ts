export interface GridTableSkillEntry {
  name: string;
  slug: string;
  description: string;
  invoke: string;
}

export interface AiModelPromptFormat {
  id: string;
  label: string;
  format: (prompt: string, skillInvoke?: string) => string;
}

export const GRID_TABLE_SKILLS: GridTableSkillEntry[] = [
  {
    name: 'grid-table-code-review',
    slug: 'grid-table-code-review',
    description: 'Structured review — hooks, types, const files, portal demos, and GridTable props.',
    invoke: 'Run /grid-table-code-review on GridRow',
  },
  {
    name: 'grid-component-workflow',
    slug: 'grid-component-workflow',
    description: 'Component folder layout, barrel exports, portal demo pages, and navigation.',
    invoke: 'Use grid-component-workflow to add a new demo page',
  },
  {
    name: 'grid-code-quality',
    slug: 'grid-code-quality',
    description: 'Types in type files, constants in const files, no magic numbers or raw strings.',
    invoke: 'Check grid-code-quality before merging',
  },
  {
    name: 'grid-release-workflow',
    slug: 'grid-release-workflow',
    description: 'Version bumps, CHANGELOG, build verification, portal sanity, and publish steps.',
    invoke: 'Prepare 1.1.1 per grid-release-workflow',
  },
];

export const SKILLS_INSTALL_CMD = 'Skills live in grid-table/.cursor/skills/ — open the Grid Table repo in Cursor to use them.';

export const SKILLS_EXAMPLE_PROMPTS = [
  'Add a finance demo with sparklines and live tickers.',
  'Wire savedViews with syncUrl for shareable table presets.',
  'Run /grid-table-code-review on useSavedViews.',
  'Add exportScope prop demo with filtered vs selected rows.',
  'Prepare Grid Table 1.1.1 release per grid-release-workflow.',
];

export const AI_MODEL_PROMPT_FORMATS: AiModelPromptFormat[] = [
  {
    id: 'cursor',
    label: 'Cursor',
    format: (prompt) => prompt,
  },
  {
    id: 'claude',
    label: 'Claude',
    format: (prompt) =>
      `You are helping on a Grid Table (React data grid) project. Follow grid-code-quality and use @forgedevstack/grid-table.\n\nTask: ${prompt}`,
  },
  {
    id: 'chatgpt',
    label: 'ChatGPT',
    format: (prompt) =>
      `Context: Grid Table React data grid (@forgedevstack/grid-table). Use TypeScript, types in *.types.ts, constants in *.const.ts.\n\nRequest: ${prompt}`,
  },
];

export function formatSkillInvoke(skill: GridTableSkillEntry, modelId: string): string {
  const model = AI_MODEL_PROMPT_FORMATS.find((m) => m.id === modelId) ?? AI_MODEL_PROMPT_FORMATS[0];
  return model.format(skill.invoke, skill.invoke);
}

export function formatExamplePrompt(prompt: string, modelId: string): string {
  const model = AI_MODEL_PROMPT_FORMATS.find((m) => m.id === modelId) ?? AI_MODEL_PROMPT_FORMATS[0];
  return model.format(prompt);
}
