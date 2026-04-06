import type { FC } from 'react';
import { Flex, Badge } from '@forgedevstack/bear';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import type { Product, Task, TreeEmployee } from './FeaturesDemo.types';
import {
  PRODUCT_DATA,
  PRIORITY_COLORS,
  STATUS_COLORS,
  TASK_STATUS_COLORS,
} from './FeaturesDemo.const';

const StatusDot: FC<{ color: string; label: string }> = (props) => {
  const { color, label } = props;
  return (
    <Flex align="center" gap={2}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
      <span>{label}</span>
    </Flex>
  );
};

export const productColumns: ColumnDefinition<Product>[] = [
  { id: 'name', accessor: 'name', header: 'Product', sortable: true, filterable: true, width: 200, sticky: 'left' },
  { id: 'category', accessor: 'category', header: 'Category', sortable: true, filterable: true, width: 120 },
  { id: 'price', accessor: 'price', header: 'Price', sortable: true, align: 'right', width: 100, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
  { id: 'stock', accessor: 'stock', header: 'Stock', sortable: true, align: 'right', width: 80 },
  { id: 'rating', accessor: 'rating', header: 'Rating', sortable: true, align: 'center', width: 80, render: (v: unknown) => `${v} ★` },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, width: 120, render: (v: unknown) => <StatusDot color={STATUS_COLORS[String(v)] ?? '#64748b'} label={String(v)} /> },
];

export const taskColumns: ColumnDefinition<Task>[] = [
  { id: 'title', accessor: 'title', header: 'Task', sortable: true, filterable: true, width: 220, editable: true },
  { id: 'assignee', accessor: 'assignee', header: 'Assignee', sortable: true, width: 100, editable: true },
  { id: 'priority', accessor: 'priority', header: 'Priority', sortable: true, width: 100, render: (v: unknown) => <Badge variant="secondary" className="text-xs" style={{ borderLeft: `3px solid ${PRIORITY_COLORS[String(v)] ?? '#888'}` }}>{String(v)}</Badge> },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, width: 120, render: (v: unknown) => <StatusDot color={TASK_STATUS_COLORS[String(v)] ?? '#64748b'} label={String(v)} /> },
  { id: 'dueDate', accessor: 'dueDate', header: 'Due Date', sortable: true, width: 110, render: (v: unknown) => new Date(String(v)).toLocaleDateString() },
  { id: 'effort', accessor: 'effort', header: 'Effort (pts)', sortable: true, align: 'right', width: 100 },
];

export const treeColumns: ColumnDefinition<TreeEmployee>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, width: 200 },
  { id: 'title', accessor: 'title', header: 'Title', width: 150 },
  { id: 'department', accessor: 'department', header: 'Department', sortable: true, width: 120 },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 120, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
];

export const productTotal: Product = {
  id: 9999,
  name: 'TOTAL',
  category: '',
  price: PRODUCT_DATA.reduce((s, r) => s + r.price, 0),
  stock: PRODUCT_DATA.reduce((s, r) => s + r.stock, 0),
  rating: +(PRODUCT_DATA.reduce((s, r) => s + r.rating, 0) / PRODUCT_DATA.length).toFixed(1),
  status: '',
};
