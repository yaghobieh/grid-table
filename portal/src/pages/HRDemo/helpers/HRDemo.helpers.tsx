import { FC } from 'react';
import { Badge, Flex, BearIcons } from '@forgedevstack/bear';
import { STATUS_VARIANT, STATUS_LABEL, DEPT_COLOR } from '../HRDemo.const';

// ── Status badge for employee status ─────────────────
export const StatusBadge: FC<{ status: string }> = ({ status }) => (
  <Badge variant={(STATUS_VARIANT[status] ?? 'secondary') as 'success'} className="text-xs">
    {STATUS_LABEL[status] ?? status}
  </Badge>
);

// ── Department tag with color accent ─────────────────
export const DeptTag: FC<{ dept: string }> = ({ dept }) => (
  <span
    className="px-2 py-0.5 rounded text-xs font-medium"
    style={{ backgroundColor: `${DEPT_COLOR[dept] ?? '#64748b'}18`, color: DEPT_COLOR[dept] ?? '#64748b' }}
  >
    {dept}
  </span>
);

// ── Expand/Collapse toggle for tree rows ─────────────
export const ExpandToggle: FC<{
  isExpanded: boolean;
  hasChildren: boolean;
  onToggle: () => void;
  indentPx: number;
  name: string;
  childCount: number;
}> = ({ isExpanded, hasChildren, onToggle, indentPx, name, childCount }) => (
  <Flex align="center" gap={2} style={{ paddingLeft: indentPx }}>
    {hasChildren ? (
      <button
        onClick={(e) => { e.stopPropagation(); onToggle(); }}
        className="w-5 h-5 flex items-center justify-center rounded hover:bg-white/10 transition-colors"
      >
        <BearIcons.ChevronRightIcon
          size="xs"
          style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
        />
      </button>
    ) : <span className="w-5" />}
    <span className="font-semibold">{name}</span>
    {hasChildren && <span className="text-xs opacity-40 ml-1">({childCount})</span>}
  </Flex>
);
