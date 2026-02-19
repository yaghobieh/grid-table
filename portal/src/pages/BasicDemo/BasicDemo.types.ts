export interface BasicUser {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive';
  department: string;
  joinDate: string;
  salary: number;
  [key: string]: unknown;
}
