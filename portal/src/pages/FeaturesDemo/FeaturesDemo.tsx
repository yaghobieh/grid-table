import { FC, useState } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Typography,
  Flex,
  Badge,
  BearIcons,
} from '@forgedevstack/bear';
import { GridTable } from '@forgedevstack/grid-table';
import type { ColumnDefinition } from '@forgedevstack/grid-table';
import { Layout } from '@/components/Layout';
import { PRODUCT_DATA, TASK_DATA, TREE_DATA, PRIORITY_COLORS, STATUS_COLORS, TASK_STATUS_COLORS } from './FeaturesDemo.const';
import type { Product, Task, TreeEmployee } from './FeaturesDemo.types';

const SECTION_GAP = 48;

const StatusDot: FC<{ color: string; label: string }> = ({ color, label }) => (
  <Flex align="center" gap={2}>
    <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color, display: 'inline-block' }} />
    <span>{label}</span>
  </Flex>
);

// ── Product columns (Context Menu + Status Bar + Export) ──
const productColumns: ColumnDefinition<Product>[] = [
  { id: 'name', accessor: 'name', header: 'Product', sortable: true, filterable: true, width: 200, sticky: 'left' },
  { id: 'category', accessor: 'category', header: 'Category', sortable: true, filterable: true, width: 120 },
  { id: 'price', accessor: 'price', header: 'Price', sortable: true, align: 'right', width: 100, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
  { id: 'stock', accessor: 'stock', header: 'Stock', sortable: true, align: 'right', width: 80 },
  { id: 'rating', accessor: 'rating', header: 'Rating', sortable: true, align: 'center', width: 80, render: (v: unknown) => `${v} ★` },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, width: 120, render: (v: unknown) => <StatusDot color={STATUS_COLORS[String(v)] ?? '#64748b'} label={String(v)} /> },
];

// ── Task columns (Row Reorder + Undo/Redo + Keyboard Nav) ──
const taskColumns: ColumnDefinition<Task>[] = [
  { id: 'title', accessor: 'title', header: 'Task', sortable: true, filterable: true, width: 220, editable: true },
  { id: 'assignee', accessor: 'assignee', header: 'Assignee', sortable: true, width: 100, editable: true },
  { id: 'priority', accessor: 'priority', header: 'Priority', sortable: true, width: 100, render: (v: unknown) => <Badge variant="secondary" className="text-xs" style={{ borderLeft: `3px solid ${PRIORITY_COLORS[String(v)] ?? '#888'}` }}>{String(v)}</Badge> },
  { id: 'status', accessor: 'status', header: 'Status', sortable: true, width: 120, render: (v: unknown) => <StatusDot color={TASK_STATUS_COLORS[String(v)] ?? '#64748b'} label={String(v)} /> },
  { id: 'dueDate', accessor: 'dueDate', header: 'Due Date', sortable: true, width: 110, render: (v: unknown) => new Date(String(v)).toLocaleDateString() },
  { id: 'effort', accessor: 'effort', header: 'Effort (pts)', sortable: true, align: 'right', width: 100 },
];

// ── Tree columns ──
const treeColumns: ColumnDefinition<TreeEmployee>[] = [
  { id: 'name', accessor: 'name', header: 'Name', sortable: true, width: 200 },
  { id: 'title', accessor: 'title', header: 'Title', width: 150 },
  { id: 'department', accessor: 'department', header: 'Department', sortable: true, width: 120 },
  { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 120, render: (v: unknown) => `$${Number(v).toLocaleString()}` },
];

// ── Frozen row for product totals ──
const productTotal: Product = {
  id: 9999,
  name: 'TOTAL',
  category: '',
  price: PRODUCT_DATA.reduce((s, r) => s + r.price, 0),
  stock: PRODUCT_DATA.reduce((s, r) => s + r.stock, 0),
  rating: +(PRODUCT_DATA.reduce((s, r) => s + r.rating, 0) / PRODUCT_DATA.length).toFixed(1),
  status: '',
};

export const FeaturesDemo: FC = () => {
  const [tasks, setTasks] = useState(TASK_DATA);
  const { navigate } = useNavigate();

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-2">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={() => navigate('/demos')}>Demos</Button>
          <Badge variant="info">v1.0.7 Features</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-1">What's New in v1.0.7</Typography>
        <Typography variant="body2" className="opacity-50 mb-8">
          Context menu, status bar, multi-format export, keyboard navigation, row reorder, tree data, undo/redo, frozen rows, print mode, and more.
        </Typography>

        {/* ── 1. Context Menu + Status Bar + Multi-Export ── */}
        <section style={{ marginBottom: SECTION_GAP }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">Context Menu, Status Bar & Export</Typography>
            <Badge variant="success" className="text-xs">NEW</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            Right-click any cell for quick actions. Footer shows row count and aggregations. Export to CSV, Excel, JSON, or PDF.
          </Typography>
          <div className="dark">
            <GridTable
              data={PRODUCT_DATA}
              columns={productColumns}
              enableRowSelection
              showPagination={false}
              showGlobalFilter
              stickyHeader
              themeMode="dark"
              tableEffects={{ hover: true }}
              contextMenu={{ enabled: true, showCopy: true, showFilter: true, showPin: true, showHide: true }}
              statusBar={{
                enabled: true,
                showRowCount: true,
                showSelectedCount: true,
                aggregations: [
                  { columnId: 'price', type: 'avg', label: 'Avg Price', format: (v: number) => `$${Math.round(v).toLocaleString()}` },
                  { columnId: 'stock', type: 'sum', label: 'Total Stock' },
                  { columnId: 'rating', type: 'avg', label: 'Avg Rating', format: (v: number) => v.toFixed(1) },
                ],
              }}
              enableExport={['csv', 'excel', 'pdf']}
              enableCopy
              printConfig={{ enabled: true, title: 'Product Inventory' }}
              frozenRows={{ bottom: [productTotal] }}
            />
          </div>
        </section>

        {/* ── 2. Row Reorder + Undo/Redo + Keyboard Nav ── */}
        <section style={{ marginBottom: SECTION_GAP }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">Row Reorder, Undo/Redo & Keyboard Navigation</Typography>
            <Badge variant="success" className="text-xs">NEW</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            Drag rows to reorder. Edit cells inline with undo/redo (Ctrl+Z/Y). Navigate with arrow keys, Enter to edit, Escape to cancel.
          </Typography>
          <div className="dark">
            <GridTable
              data={tasks}
              columns={taskColumns}
              showPagination={false}
              showGlobalFilter
              stickyHeader
              themeMode="dark"
              tableEffects={{ hover: true }}
              enableCellEdit
              onCellEdit={(rowId, columnId, newValue) => {
                setTasks(prev => prev.map(t => t.id === rowId ? { ...t, [columnId]: newValue } : t));
              }}
              rowReorder={{ enabled: true }}
              onRowReorder={(reordered) => setTasks(reordered as Task[])}
              undoRedo={{ enabled: true, maxHistory: 30 }}
              keyboardNavigation={{ enabled: true, enableEditOnEnter: true }}
              statusBar={{
                enabled: true,
                showRowCount: true,
                aggregations: [
                  { columnId: 'effort', type: 'sum', label: 'Total Effort' },
                  { columnId: 'effort', type: 'avg', label: 'Avg Effort', format: (v: number) => v.toFixed(1) },
                ],
              }}
            />
          </div>
        </section>

        {/* ── 3. Tree Data ── */}
        <section style={{ marginBottom: SECTION_GAP }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">Tree Data — Hierarchical Rows</Typography>
            <Badge variant="success" className="text-xs">NEW</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            Render nested data with expand/collapse toggle arrows and automatic indentation.
          </Typography>
          <div className="dark">
            <GridTable
              data={TREE_DATA}
              columns={treeColumns}
              showPagination={false}
              showGlobalFilter={false}
              stickyHeader
              themeMode="dark"
              tableEffects={{ hover: true }}
              treeData={{ enabled: true, childrenField: 'children', expandAll: true, indentSize: 24 }}
              statusBar={{
                enabled: true,
                showRowCount: true,
                aggregations: [
                  { columnId: 'salary', type: 'sum', label: 'Total Payroll', format: (v: number) => `$${v.toLocaleString()}` },
                ],
              }}
            />
          </div>
        </section>

        {/* ── 4. Frozen Rows + Print ── */}
        <section style={{ marginBottom: SECTION_GAP }}>
          <Flex align="center" gap={2} className="mb-3">
            <Typography variant="h3" className="text-lg font-semibold">Frozen Rows & Print Mode</Typography>
            <Badge variant="success" className="text-xs">NEW</Badge>
          </Flex>
          <Typography variant="body2" className="opacity-50 mb-4">
            Pin summary rows to the bottom of the table. Click the print icon in the toolbar to generate a styled printable view.
          </Typography>
          <div className="dark">
            <GridTable
              data={PRODUCT_DATA}
              columns={productColumns}
              showPagination={false}
              showGlobalFilter
              stickyHeader
              themeMode="dark"
              tableEffects={{ hover: true }}
              frozenRows={{
                bottom: [productTotal],
              }}
              printConfig={{ enabled: true, title: 'Product Report' }}
              enableExport={['pdf']}
            />
          </div>
        </section>
      </div>
    </Layout>
  );
};
