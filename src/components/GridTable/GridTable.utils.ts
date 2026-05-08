import type { TableEffects } from '@/types';

function isEffectEnabled(config: boolean | Record<string, unknown> | undefined): boolean {
  if (config === true) return true;
  if (config && typeof config === 'object' && config.enabled !== false) return true;
  return false;
}

export function resolveTableEffects(tableEffects?: TableEffects) {
  if (!tableEffects) return { sort: false, row: false, hover: false, className: '' };
  return {
    sort: isEffectEnabled(tableEffects.sort as boolean | Record<string, unknown> | undefined),
    row: isEffectEnabled(tableEffects.row as boolean | Record<string, unknown> | undefined),
    hover: isEffectEnabled(tableEffects.hover as boolean | Record<string, unknown> | undefined),
    className: tableEffects.className ?? '',
  };
}
