import type { TableDensity } from '@/types/features.types';
import {
  BEAR_DENSITY_COMPACT,
  DENSITY_COMFORTABLE,
  DENSITY_COMPACT,
} from '@constants/density.const';

export function mapBearDensity(bearDensity: string | undefined): TableDensity {
  if (bearDensity === BEAR_DENSITY_COMPACT) return DENSITY_COMPACT;
  return DENSITY_COMFORTABLE;
}

export function resolveTableDensity(
  explicit: TableDensity | undefined,
  bearDensity: string | undefined,
): TableDensity {
  if (explicit) return explicit;
  return mapBearDensity(bearDensity);
}
