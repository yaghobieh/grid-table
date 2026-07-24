export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
  rating: number;
  status: string;
  [key: string]: unknown;
}

export interface Task {
  id: number;
  title: string;
  assignee: string;
  priority: string;
  status: string;
  dueDate: string;
  effort: number;
  [key: string]: unknown;
}

export interface TreeEmployee {
  id: number;
  name: string;
  title: string;
  department: string;
  salary: number;
  children?: TreeEmployee[];
  [key: string]: unknown;
}

export interface FeatureLinkItem {
  id: string;
  path: string;
}
