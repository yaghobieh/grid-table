// ── Role badge variant map ───────────────────────────
export const ROLE_VARIANT: Record<string, string> = {
  admin: 'error',
  user: 'info',
  guest: 'secondary',
};

// ── Status dot colors ────────────────────────────────
export const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e',
  inactive: '#ef4444',
};

// ── Role filter options ──────────────────────────────
export const ROLE_OPTIONS = [
  { value: 'admin', label: 'Admin' },
  { value: 'user', label: 'User' },
  { value: 'guest', label: 'Guest' },
] as const;

// ── Loading simulation duration ms ───────────────────
export const LOADING_SIMULATION_MS = 2000;
