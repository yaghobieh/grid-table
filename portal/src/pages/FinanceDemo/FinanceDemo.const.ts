// ── Finance sector badge colors ──────────────────────
export const SECTOR_BADGE_VARIANT: Record<string, string> = {
  Technology: 'info',
  Finance: 'success',
  Consumer: 'warning',
  Healthcare: 'secondary',
  Energy: 'error',
  Entertainment: 'info',
  Automotive: 'warning',
  Industrial: 'secondary',
};

// ── Sector filter options ────────────────────────────
export const SECTOR_OPTIONS = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Consumer', label: 'Consumer' },
  { value: 'Healthcare', label: 'Healthcare' },
  { value: 'Energy', label: 'Energy' },
  { value: 'Entertainment', label: 'Entertainment' },
  { value: 'Automotive', label: 'Automotive' },
  { value: 'Industrial', label: 'Industrial' },
] as const;

// ── Price formatting thresholds ──────────────────────
export const VOLUME_MILLION = 1_000_000;
export const VOLUME_THOUSAND = 1_000;
