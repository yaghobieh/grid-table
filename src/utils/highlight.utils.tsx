import type { ReactNode } from 'react';

export function highlightMatch(text: string, term: string): ReactNode {
  if (!term.trim()) return text;
  const parts = text.split(new RegExp(`(${escapeRegex(term)})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === term.toLowerCase() ? (
      <mark key={i} className="grid-cell-highlight">
        {part}
      </mark>
    ) : (
      part
    )
  );
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
