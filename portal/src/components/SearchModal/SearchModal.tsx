import { FC, useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Typography, BearIcons } from '@forgedevstack/bear';
import { useDemoNavigation } from '@/hooks';
import { SEARCH_ITEMS } from './SearchModal.const';
import type { SearchItem } from './SearchModal.const';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

export const SearchModal: FC<SearchModalProps> = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIdx, setActiveIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openDemo } = useDemoNavigation();

  const results = useMemo<SearchItem[]>(() => {
    if (!query.trim()) return SEARCH_ITEMS.slice(0, 8);
    const q = query.toLowerCase();
    return SEARCH_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.includes(q)),
    );
  }, [query]);

  const goTo = useCallback(
    (path: string) => {
      openDemo(path);
      onClose();
      setQuery('');
    },
    [openDemo, onClose],
  );

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
    if (!open) {
      setQuery('');
      setActiveIdx(0);
    }
  }, [open]);

  useEffect(() => {
    setActiveIdx(0);
  }, [query]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[activeIdx]) {
        goTo(results[activeIdx].path);
      } else if (e.key === 'Escape') {
        onClose();
      }
    },
    [results, activeIdx, goTo, onClose],
  );

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-xl overflow-hidden shadow-2xl"
        style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <BearIcons.SearchIcon size="sm" style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search docs, demos, pages..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
          <kbd
            className="hidden sm:inline-flex items-center px-2 py-0.5 text-xs rounded"
            style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)', border: '1px solid var(--border-color)' }}
          >
            ESC
          </kbd>
        </div>

        <div className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <Typography variant="body2" style={{ color: 'var(--text-muted)' }}>
                No results found
              </Typography>
            </div>
          )}

          {results.map((item, idx) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors"
              style={{
                backgroundColor: idx === activeIdx ? 'var(--bg-tertiary)' : 'transparent',
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => goTo(item.path)}
            >
              <BearIcons.SearchIcon size="xs" style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <div className="flex-1 min-w-0">
                <Typography variant="body2" className="truncate font-medium">
                  {item.title}
                </Typography>
              </div>
              <Typography variant="caption" style={{ color: 'var(--text-muted)' }} className="flex-shrink-0">
                {item.section}
              </Typography>
              {idx === activeIdx && (
                <BearIcons.ArrowRightIcon size="xs" style={{ color: '#22c55e', flexShrink: 0 }} />
              )}
            </button>
          ))}
        </div>

        <div
          className="flex items-center justify-between px-4 py-2 text-xs"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <span>↑↓ Navigate</span>
          <span>↵ Open</span>
          <span>ESC Close</span>
        </div>
      </div>
    </div>
  );
};
