import type { ReactNode } from 'react';
import type { RowData } from '@/types';
import { readColumnValue } from '@/utils/responsiveColumns.utils';
import { renderDetailValue } from '@/utils/responsiveDetails.utils';
import type { ResponsiveDetailsProps } from './ResponsiveDetails.types';
import { RESPONSIVE_DETAILS_CLASS, RESPONSIVE_DETAILS_ROW_CLASS } from './ResponsiveDetails.const';

export function ResponsiveDetails<T extends RowData>(props: ResponsiveDetailsProps<T>): ReactNode {
  const { columns, row, label } = props;
  return (
    <div className={RESPONSIVE_DETAILS_CLASS}>
      <strong>{label}</strong>
      {columns.map((column) => {
        const header = typeof column.header === 'function' ? column.id : column.header;
        const value = readColumnValue(row, column);
        return (
          <div key={column.id} className={RESPONSIVE_DETAILS_ROW_CLASS}>
            <span>{header}</span>
            <span>{renderDetailValue(column, row, value)}</span>
          </div>
        );
      })}
    </div>
  );
}
