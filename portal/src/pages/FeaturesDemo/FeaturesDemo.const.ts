import type { Product, Task, TreeEmployee, FeatureLinkItem } from './FeaturesDemo.types';

export const PRODUCT_DATA: Product[] = [
  { id: 1, name: 'MacBook Pro 16"', category: 'Laptops', price: 2499, stock: 45, rating: 4.8, status: 'In Stock' },
  { id: 2, name: 'iPhone 15 Pro', category: 'Phones', price: 999, stock: 120, rating: 4.7, status: 'In Stock' },
  { id: 3, name: 'AirPods Pro 2', category: 'Audio', price: 249, stock: 200, rating: 4.6, status: 'In Stock' },
  { id: 4, name: 'iPad Air M2', category: 'Tablets', price: 599, stock: 0, rating: 4.5, status: 'Out of Stock' },
  { id: 5, name: 'Apple Watch Ultra', category: 'Wearables', price: 799, stock: 30, rating: 4.4, status: 'Low Stock' },
  { id: 6, name: 'Studio Display', category: 'Displays', price: 1599, stock: 15, rating: 4.3, status: 'Low Stock' },
  { id: 7, name: 'Magic Keyboard', category: 'Accessories', price: 299, stock: 500, rating: 4.2, status: 'In Stock' },
  { id: 8, name: 'Mac Mini M2', category: 'Desktops', price: 599, stock: 85, rating: 4.6, status: 'In Stock' },
  { id: 9, name: 'HomePod 2', category: 'Audio', price: 299, stock: 60, rating: 4.1, status: 'In Stock' },
  { id: 10, name: 'AirTag 4-Pack', category: 'Accessories', price: 99, stock: 300, rating: 4.3, status: 'In Stock' },
];

export const TASK_DATA: Task[] = [
  { id: 1, title: 'Design login page', assignee: 'Alice', priority: 'High', status: 'Done', dueDate: '2026-02-10', effort: 5 },
  { id: 2, title: 'API authentication', assignee: 'Bob', priority: 'Critical', status: 'In Progress', dueDate: '2026-02-15', effort: 8 },
  { id: 3, title: 'Database migration', assignee: 'Charlie', priority: 'Medium', status: 'Todo', dueDate: '2026-02-20', effort: 13 },
  { id: 4, title: 'Unit tests for auth', assignee: 'Diana', priority: 'High', status: 'In Progress', dueDate: '2026-02-18', effort: 8 },
  { id: 5, title: 'Deploy staging env', assignee: 'Edward', priority: 'Low', status: 'Todo', dueDate: '2026-02-25', effort: 3 },
  { id: 6, title: 'Write API docs', assignee: 'Fiona', priority: 'Medium', status: 'Done', dueDate: '2026-02-12', effort: 5 },
  { id: 7, title: 'Performance audit', assignee: 'George', priority: 'High', status: 'In Progress', dueDate: '2026-02-22', effort: 8 },
  { id: 8, title: 'Mobile responsive', assignee: 'Hannah', priority: 'Critical', status: 'Todo', dueDate: '2026-02-28', effort: 13 },
];

export const TREE_DATA: TreeEmployee[] = [
  {
    id: 1, name: 'Sarah Chen', title: 'CEO', department: 'Executive', salary: 250000,
    children: [
      {
        id: 2, name: 'Mike Ross', title: 'CTO', department: 'Engineering', salary: 200000,
        children: [
          { id: 5, name: 'Lisa Park', title: 'Lead Dev', department: 'Engineering', salary: 150000 },
          { id: 6, name: 'Tom Wright', title: 'Sr. Engineer', department: 'Engineering', salary: 130000 },
          { id: 7, name: 'Anna Kim', title: 'Jr. Engineer', department: 'Engineering', salary: 90000 },
        ],
      },
      {
        id: 3, name: 'Rachel Green', title: 'VP Design', department: 'Design', salary: 180000,
        children: [
          { id: 8, name: 'Jake Miller', title: 'Lead Designer', department: 'Design', salary: 120000 },
          { id: 9, name: 'Mia Torres', title: 'UX Designer', department: 'Design', salary: 100000 },
        ],
      },
      {
        id: 4, name: 'David Lee', title: 'CFO', department: 'Finance', salary: 190000,
        children: [
          { id: 10, name: 'Nina Patel', title: 'Controller', department: 'Finance', salary: 110000 },
        ],
      },
    ],
  },
];

export const PRIORITY_COLORS: Record<string, string> = {
  Critical: '#ef4444',
  High: '#f97316',
  Medium: '#eab308',
  Low: '#22c55e',
};

export const STATUS_COLORS: Record<string, string> = {
  'In Stock': '#22c55e',
  'Low Stock': '#f97316',
  'Out of Stock': '#ef4444',
};

export const TASK_STATUS_COLORS: Record<string, string> = {
  Done: '#22c55e',
  'In Progress': '#3b82f6',
  Todo: '#64748b',
};

export const SECTION_GAP_PX = 48;

export const FEATURE_LINKS: FeatureLinkItem[] = [
  { id: 'enterprise-grid', path: '/demos/enterprise-grid' },
  { id: 'infinite-scroll', path: '/demos/infinite-scroll' },
  { id: 'pinned-row-groups', path: '/demos/pinned-row-groups' },
  { id: 'saved-views', path: '/demos/saved-views' },
];
