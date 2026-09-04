import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { Release115Row } from './Release115Demo.types';

export const RELEASE_115_DEMO_DATA: Release115Row[] = [
  { id: 1, region: 'EU', product: 'Bear', quarter: 'Q1', amount: 120, notes: 'Wrapped notes grow the row when auto height is on.' },
  { id: 2, region: 'EU', product: 'Grid', quarter: 'Q1', amount: 90, notes: 'Comment this cell' },
  { id: 3, region: 'US', product: 'Bear', quarter: 'Q1', amount: 150, notes: 'Pinned start stays logical in RTL.' },
  { id: 4, region: 'US', product: 'Grid', quarter: 'Q2', amount: 80, notes: 'Fill with Ctrl/Cmd+D' },
  { id: 5, region: 'APAC', product: 'Bear', quarter: 'Q2', amount: 60, notes: 'Drop Region on the group zone' },
  { id: 6, region: 'APAC', product: 'Grid', quarter: 'Q2', amount: 110, notes: 'Pivot uses sum of amount' },
];

export const RELEASE_115_DEMO_COLUMNS: ColumnDefinition<Release115Row>[] = [
  { id: 'region', accessor: 'region', header: 'Region', sortable: true, width: 120 },
  { id: 'product', accessor: 'product', header: 'Product', sortable: true, width: 120 },
  { id: 'quarter', accessor: 'quarter', header: 'Quarter', width: 110 },
  { id: 'amount', accessor: 'amount', header: 'Amount', align: 'right', width: 110, editable: { type: 'number' } },
  { id: 'notes', accessor: 'notes', header: 'Notes', width: 260, editable: true },
];

export const RELEASE_115_DEMO_SOURCE = `import { useState } from 'react';
import { GridTable } from '@forgedevstack/grid-table';

export function Release115Grid({ data, columns }) {
  const [groups, setGroups] = useState([]);
  const [comments, setComments] = useState({});

  return (
    <GridTable
      data={data}
      columns={columns}
      rowGroups={groups}
      onRowGroupsChange={setGroups}
      rowGroupDropZone
      pivot={{
        enabled: false,
        rowFields: ['region'],
        columnFields: ['quarter'],
        valueFields: [{ field: 'amount', type: 'sum', label: 'Amount' }],
      }}
      cellComments={{
        enabled: true,
        comments,
        onCommentChange: (rowId, columnId, comment) => {
          const key = \`\${rowId}:\${columnId}\`;
          setComments((prev) => {
            const next = { ...prev };
            if (comment) next[key] = comment;
            else delete next[key];
            return next;
          });
        },
      }}
      rowHeight={{ auto: true, resizable: true }}
      rangeSelection={{ enabled: true, fillHandle: true }}
      enableCellEdit
    />
  );
}
`;
