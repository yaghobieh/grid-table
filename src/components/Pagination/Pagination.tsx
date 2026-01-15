import type { ReactNode } from 'react';
import { useMemo, useCallback } from 'react';
import type { PaginationProps } from './types';
import { useTableContext } from '../../context';
import { ONE, FIVE } from '../../constants';

export function Pagination({
  page,
  pageSize,
  totalItems,
  totalPages,
  pageSizeOptions = [10, 20, 50, 100],
  showFirstLast = true,
  showPageNumbers = true,
  maxPageButtons = FIVE,
  className = '',
  style,
  onPageChange,
  onPageSizeChange,
}: PaginationProps): ReactNode {
  const { state } = useTableContext();
  const { translations } = state;

  const canGoPrevious = page > ONE;
  const canGoNext = page < totalPages;

  const startItem = (page - ONE) * pageSize + ONE;
  const endItem = Math.min(page * pageSize, totalItems);

  const handleFirstPage = useCallback(() => {
    onPageChange(ONE);
  }, [onPageChange]);

  const handlePreviousPage = useCallback(() => {
    if (canGoPrevious) {
      onPageChange(page - ONE);
    }
  }, [canGoPrevious, page, onPageChange]);

  const handleNextPage = useCallback(() => {
    if (canGoNext) {
      onPageChange(page + ONE);
    }
  }, [canGoNext, page, onPageChange]);

  const handleLastPage = useCallback(() => {
    onPageChange(totalPages);
  }, [onPageChange, totalPages]);

  const handlePageSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onPageSizeChange(Number(event.target.value));
    },
    [onPageSizeChange]
  );

  const pageNumbers = useMemo(() => {
    if (!showPageNumbers || totalPages <= ONE) return [];

    const pages: (number | 'ellipsis')[] = [];
    const halfMax = Math.floor(maxPageButtons / 2);
    let start = Math.max(ONE, page - halfMax);
    let end = Math.min(totalPages, page + halfMax);

    if (page <= halfMax) {
      end = Math.min(totalPages, maxPageButtons);
    }
    if (page > totalPages - halfMax) {
      start = Math.max(ONE, totalPages - maxPageButtons + ONE);
    }

    if (start > ONE) {
      pages.push(ONE);
      if (start > 2) {
        pages.push('ellipsis');
      }
    }

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    if (end < totalPages) {
      if (end < totalPages - ONE) {
        pages.push('ellipsis');
      }
      pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages, showPageNumbers, maxPageButtons]);

  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={`grid-pagination flex flex-wrap items-center justify-between gap-4 px-4 py-3 border-t border-theme-border ${className}`}
      style={style}
      role="navigation"
      aria-label="Pagination"
    >
      <div className="grid-pagination-info flex items-center gap-4">
        <div className="grid-pagination-range text-sm text-theme-secondary">
          {startItem}-{endItem} {translations.of} {totalItems}
        </div>

        <div className="grid-pagination-size flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm text-theme-muted">
            {translations.rowsPerPage}:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 text-sm rounded border border-theme-border bg-theme-primary text-theme-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid-pagination-controls flex items-center gap-1">
        {showFirstLast && (
          <button
            onClick={handleFirstPage}
            disabled={!canGoPrevious}
            className="p-2 rounded hover:bg-theme-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-secondary"
            aria-label={translations.first}
          >
            &lt;&lt;
          </button>
        )}

        <button
          onClick={handlePreviousPage}
          disabled={!canGoPrevious}
          className="p-2 rounded hover:bg-theme-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-secondary"
          aria-label={translations.previous}
        >
          &lt;
        </button>

        {showPageNumbers && (
          <div className="grid-pagination-pages flex items-center gap-1">
            {pageNumbers.map((pageNum, index) =>
              pageNum === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-theme-muted">
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`min-w-[32px] h-8 px-2 rounded text-sm transition-colors ${
                    pageNum === page
                      ? 'bg-accent-primary text-white'
                      : 'hover:bg-theme-hover text-theme-secondary'
                  }`}
                  aria-current={pageNum === page ? 'page' : undefined}
                >
                  {pageNum}
                </button>
              )
            )}
          </div>
        )}

        <button
          onClick={handleNextPage}
          disabled={!canGoNext}
          className="p-2 rounded hover:bg-theme-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-secondary"
          aria-label={translations.next}
        >
          &gt;
        </button>

        {showFirstLast && (
          <button
            onClick={handleLastPage}
            disabled={!canGoNext}
            className="p-2 rounded hover:bg-theme-hover disabled:opacity-50 disabled:cursor-not-allowed text-theme-secondary"
            aria-label={translations.last}
          >
            &gt;&gt;
          </button>
        )}
      </div>
    </div>
  );
}

