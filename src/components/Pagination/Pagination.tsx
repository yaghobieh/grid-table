import type { ReactNode } from 'react';
import { useMemo, useCallback } from 'react';
import type { PaginationProps } from './Pagination.types';
import { useTableContext } from '@/context';
import { EMPTY_STRING, FIVE, ONE, ZERO } from '@/constants';
import { getPaginationDerivedState } from './Pagination.utils';

export function Pagination(props: PaginationProps): ReactNode {
  const {
    page,
    pageSize,
    totalItems,
    totalPages,
    pageSizeOptions = [10, 20, 50, 100],
    showFirstLast = true,
    showPageNumbers = true,
    maxPageButtons = FIVE,
    className = EMPTY_STRING,
    style,
    onPageChange,
    onPageSizeChange,
  } = props;
  const { state } = useTableContext();
  const { translations } = state;

  const { canGoPrevious, canGoNext, startItem, endItem } = getPaginationDerivedState({ page, pageSize, totalItems, totalPages });

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

  if (totalItems === ZERO) {
    return null;
  }

  return (
    <div
      className={`grid-pagination ${className}`}
      style={style}
      role="navigation"
      aria-label="Pagination"
    >
      <div className="grid-pagination-info">
        <div className="grid-pagination-range">
          {startItem}-{endItem} {translations.of} {totalItems}
        </div>

        <div className="grid-pagination-size">
          <label htmlFor="page-size">
            {translations.rowsPerPage}:
          </label>
          <select
            id="page-size"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-2 py-1 text-sm rounded"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid-pagination-controls">
        {showFirstLast && (
          <button
            onClick={handleFirstPage}
            disabled={!canGoPrevious}
            className="p-2 rounded text-theme-secondary"
            aria-label={translations.first}
          >
            &lt;&lt;
          </button>
        )}

        <button
          onClick={handlePreviousPage}
          disabled={!canGoPrevious}
          className="p-2 rounded text-theme-secondary"
          aria-label={translations.previous}
        >
          &lt;
        </button>

        {showPageNumbers && (
          <div className="grid-pagination-pages">
            {pageNumbers.map((pageNum, index) =>
              pageNum === 'ellipsis' ? (
                <span key={`ellipsis-${index}`} className="px-2 text-theme-muted">
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`min-w-[32px] h-8 px-2 rounded text-sm ${pageNum === page ? 'active' : ''}`}
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
          className="p-2 rounded text-theme-secondary"
          aria-label={translations.next}
        >
          &gt;
        </button>

        {showFirstLast && (
          <button
            onClick={handleLastPage}
            disabled={!canGoNext}
            className="p-2 rounded text-theme-secondary"
            aria-label={translations.last}
          >
            &gt;&gt;
          </button>
        )}
      </div>
    </div>
  );
}

