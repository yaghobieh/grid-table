import { useBear } from '@forgedevstack/bear';

export function useGridTableThemeMode(): 'light' | 'dark' {
  const { mode } = useBear();
  return mode === 'light' ? 'light' : 'dark';
}
