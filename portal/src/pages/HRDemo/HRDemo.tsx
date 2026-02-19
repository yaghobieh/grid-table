import { FC, useState, useMemo } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
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
import { HR_DATA, buildHierarchy } from '@/data/hr.data';
import type { Employee } from '@/data/hr.data';
import { DEFAULT_HR_ROWS } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { INDENT_PX, DEPT_OPTIONS, STATUS_OPTIONS } from './HRDemo.const';
import { StatusBadge, DeptTag, ExpandToggle } from './helpers';

export const HRDemo: FC = () => {
  const { t } = useI18n();
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([1]));

  const orderedData = useMemo(() => buildHierarchy(HR_DATA), []);

  const visibleData = useMemo(() => {
    const result: Employee[] = [];
    const ancestorsExpanded = (emp: Employee): boolean => {
      if (emp.managerId === null) return true;
      const parent = HR_DATA.find((e) => e.id === emp.managerId);
      if (!parent) return true;
      if (!expandedIds.has(parent.id)) return false;
      return ancestorsExpanded(parent);
    };
    for (const emp of orderedData) {
      if (ancestorsExpanded(emp)) result.push(emp);
    }
    return result;
  }, [orderedData, expandedIds]);

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const expandAll = () => setExpandedIds(new Set(HR_DATA.filter((e) => e.directReports > 0).map((e) => e.id)));
  const collapseAll = () => setExpandedIds(new Set());

  const columns: ColumnDefinition<Employee>[] = [
    {
      id: 'name', accessor: 'name', header: 'Employee', sortable: true, filterable: true, width: 280, sticky: 'left',
      render: (_val: unknown, row: Record<string, unknown>) => {
        const emp = row as Employee;
        return (
          <ExpandToggle
            isExpanded={expandedIds.has(emp.id)}
            hasChildren={emp.directReports > 0}
            onToggle={() => toggleExpand(emp.id)}
            indentPx={emp.level * INDENT_PX}
            name={emp.name}
            childCount={emp.directReports}
          />
        );
      },
    },
    { id: 'title', accessor: 'title', header: 'Title', sortable: true, filterable: true, width: 200 },
    { id: 'department', accessor: 'department', header: 'Department', sortable: true, filterable: true, filterType: 'select', filterOptions: [...DEPT_OPTIONS], width: 140, render: (val: unknown) => <DeptTag dept={String(val)} /> },
    { id: 'status', accessor: 'status', header: 'Status', sortable: true, filterable: true, filterType: 'select', filterOptions: [...STATUS_OPTIONS], width: 110, render: (val: unknown) => <StatusBadge status={String(val)} /> },
    { id: 'location', accessor: 'location', header: 'Location', sortable: true, filterable: true, width: 140 },
    { id: 'email', accessor: 'email', header: 'Email', sortable: true, width: 220, render: (val: unknown) => <a href={`mailto:${val}`} className="hover:underline" style={{ color: 'var(--grid-accent)' }}>{String(val)}</a> },
    { id: 'startDate', accessor: 'startDate', header: 'Start Date', sortable: true, width: 120, render: (val: unknown) => new Date(String(val)).toLocaleDateString() },
    { id: 'salary', accessor: 'salary', header: 'Salary', sortable: true, align: 'right', width: 120, render: (val: unknown) => `$${Number(val).toLocaleString()}` },
  ];

  return (
    <Layout>
      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <Flex align="center" justify="between" className="mb-6">
          <div>
            <Flex align="center" gap={3} className="mb-2">
              <Link to="/demos"><Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>{t.common.demos}</Button></Link>
              <Badge variant="info">{t.demos.hr.title}</Badge>
              <Badge variant="secondary" className="text-xs">{DEFAULT_HR_ROWS} {t.hrDemo.employees}</Badge>
            </Flex>
            <Typography variant="h2" className="text-2xl font-bold">{t.hrDemo.title}</Typography>
            <Typography variant="body2" className="opacity-50">{t.hrDemo.description}</Typography>
          </div>
          <Flex gap={3}>
            <Button variant="gridGhost" size="sm" onClick={expandAll} leftIcon={<BearIcons.MaximizeIcon size="xs" />}>{t.hrDemo.expandAll}</Button>
            <Button variant="ghost" size="sm" onClick={collapseAll} leftIcon={<BearIcons.MinimizeIcon size="xs" />}>{t.hrDemo.collapseAll}</Button>
          </Flex>
        </Flex>

        <div className="dark">
          <GridTable
            data={visibleData}
            columns={columns}
            enableRowSelection enableDragDrop enableColumnResize
            showPagination={false} showFilter showGlobalFilter stickyHeader
            tableEffects={{ hover: true, sort: true, row: true }}
            defaultExpandedIds={[1]}
            themeMode="dark"
            dimensions={{ maxHeight: 'calc(100vh - 260px)' }}
          />
        </div>
      </div>
    </Layout>
  );
};
