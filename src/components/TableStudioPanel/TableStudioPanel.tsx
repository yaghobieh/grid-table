import type { ReactNode } from 'react';
import { useState, useCallback } from 'react';
import { Typography } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import { generateSampleData } from '@/utils/generateSampleData';
import { TEN } from '@/constants';
import type { TableStudioPanelProps } from './TableStudioPanel.types';

const DEFAULT_ROW_COUNT = TEN;

export function TableStudioPanel<T extends RowData = RowData>({
  data,
  columns,
  propsSnapshot,
  onDataChange,
  open = true,
  onOpenChange,
}: TableStudioPanelProps<T>): ReactNode {
  const [activeTab, setActiveTab] = useState<'data' | 'props' | 'generate'>('data');
  const [generateCount, setGenerateCount] = useState(DEFAULT_ROW_COUNT);

  const handleGenerate = useCallback(() => {
    if (!onDataChange) return;
    const count = Math.min(100, Math.max(1, generateCount));
    const generated = generateSampleData(columns, count) as T[];
    onDataChange(generated);
    setActiveTab('data');
  }, [columns, generateCount, onDataChange]);

  const panelContent = (
    <>
      <div
        style={{
          display: 'flex',
          borderBottom: '1px solid var(--gt-border-color, rgba(0,0,0,0.08))',
          padding: '0.25rem 0',
          gap: 2,
        }}
      >
        {(['data', 'props', 'generate'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '0.5rem 0.5rem',
              border: 'none',
              borderRadius: 4,
              background: activeTab === tab ? 'var(--gt-bg-tertiary)' : 'transparent',
              color: 'var(--gt-text-primary)',
              cursor: 'pointer',
              fontWeight: activeTab === tab ? 600 : 400,
              fontSize: 12,
              textTransform: 'capitalize',
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: 'auto', padding: '0.75rem' }}>
        {activeTab === 'data' && (
          <>
            <Typography variant="subtitle2" component="h3" style={{ marginBottom: '0.5rem' }}>
              Data ({data.length} rows)
            </Typography>
            <pre
              style={{
                margin: 0,
                fontSize: 11,
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                color: 'var(--gt-text-primary)',
              }}
            >
              {JSON.stringify(data, null, 2)}
            </pre>
          </>
        )}
        {activeTab === 'props' && (
          <>
            <Typography variant="subtitle2" component="h3" style={{ marginBottom: '0.5rem' }}>
              Props
            </Typography>
            <dl style={{ margin: 0, fontSize: 13, color: 'var(--gt-text-primary)' }}>
              {Object.entries(propsSnapshot).map(([key, value]) => (
                <div key={key} style={{ marginBottom: '0.5rem' }}>
                  <dt style={{ fontWeight: 600, marginBottom: 2 }}>{key}</dt>
                  <dd style={{ margin: 0, color: 'var(--gt-text-secondary)' }}>
                    {typeof value === 'object' && value !== null
                      ? JSON.stringify(value)
                      : String(value)}
                  </dd>
                </div>
              ))}
            </dl>
          </>
        )}
        {activeTab === 'generate' && (
          <>
            <Typography variant="subtitle2" component="h3" style={{ marginBottom: '0.5rem' }}>
              Generate sample data
            </Typography>
            <p style={{ fontSize: 12, color: 'var(--gt-text-secondary)', marginBottom: '0.75rem' }}>
              Create rows from column definitions. Uses placeholders for common fields (name, email, id, etc.).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: 12, fontWeight: 500 }}>
                Rows
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={generateCount}
                  onChange={(e) => setGenerateCount(Number(e.target.value) || 1)}
                  style={{
                    display: 'block',
                    marginTop: 4,
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: 4,
                    border: '1px solid var(--gt-border-color)',
                    background: 'var(--gt-bg-primary)',
                    color: 'var(--gt-text-primary)',
                  }}
                />
              </label>
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!onDataChange}
                style={{
                  padding: '8px 12px',
                  borderRadius: 6,
                  border: 'none',
                  background: onDataChange ? 'var(--gt-accent-primary)' : 'var(--gt-bg-tertiary)',
                  color: onDataChange ? '#fff' : 'var(--gt-text-muted)',
                  cursor: onDataChange ? 'pointer' : 'not-allowed',
                  fontWeight: 500,
                  fontSize: 13,
                }}
              >
                Generate data
              </button>
              {!onDataChange && (
                <span style={{ fontSize: 11, color: 'var(--gt-text-muted)' }}>
                  Table must use studio with controllable data to generate.
                </span>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );

  const width = 320;
  const isCollapsed = !open;

  return (
    <>
      <button
        type="button"
        onClick={() => onOpenChange?.(!open)}
        className="grid-table-studio-toggle"
        style={{
          position: 'fixed',
          right: open ? width : 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 10001,
          width: 24,
          height: 48,
          border: '1px solid var(--gt-border-color, rgba(0,0,0,0.08))',
          borderRight: 'none',
          borderRadius: '8px 0 0 8px',
          background: 'var(--gt-bg-secondary, #f5f5f5)',
          color: 'var(--gt-text-primary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 14,
          boxShadow: ' -2px 0 8px rgba(0,0,0,0.08)',
        }}
        aria-label={open ? 'Close studio panel' : 'Open studio panel'}
      >
        {open ? '›' : '‹'}
      </button>
      <aside
        className="grid-table-studio-panel"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: isCollapsed ? 0 : width,
          minWidth: isCollapsed ? 0 : 280,
          borderLeft: '1px solid var(--gt-border-color, rgba(0,0,0,0.08))',
          backgroundColor: 'var(--gt-bg-secondary, #f5f5f5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          zIndex: 10000,
          boxShadow: isCollapsed ? 'none' : '-4px 0 12px rgba(0,0,0,0.08)',
          transition: 'width 0.2s ease, box-shadow 0.2s ease',
        }}
        aria-label="Table studio panel"
      >
        {!isCollapsed && panelContent}
      </aside>
    </>
  );
}
