// ── HR status badge variants ─────────────────────────
export const STATUS_VARIANT: Record<string, string> = {
  active: 'success',
  'on-leave': 'warning',
  remote: 'info',
};

// ── HR status display labels ─────────────────────────
export const STATUS_LABEL: Record<string, string> = {
  active: 'Active',
  'on-leave': 'On Leave',
  remote: 'Remote',
};

// ── Department color map ─────────────────────────────
export const DEPT_COLOR: Record<string, string> = {
  Executive: '#eab308',
  Engineering: '#22c55e',
  Product: '#38bdf8',
  Sales: '#f97316',
  HR: '#a78bfa',
};

// ── Tree indent depth in px ──────────────────────────
export const INDENT_PX = 24;

// ── Filter options ───────────────────────────────────
export const DEPT_OPTIONS = [
  { value: 'Executive', label: 'Executive' },
  { value: 'Engineering', label: 'Engineering' },
  { value: 'Product', label: 'Product' },
  { value: 'Sales', label: 'Sales' },
  { value: 'HR', label: 'HR' },
] as const;

export const STATUS_OPTIONS = [
  { value: 'active', label: 'Active' },
  { value: 'on-leave', label: 'On Leave' },
  { value: 'remote', label: 'Remote' },
] as const;
