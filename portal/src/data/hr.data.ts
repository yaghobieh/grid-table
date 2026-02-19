export interface Employee {
  id: number;
  name: string;
  title: string;
  department: string;
  email: string;
  location: string;
  status: 'active' | 'on-leave' | 'remote';
  startDate: string;
  salary: number;
  managerId: number | null;
  level: number;
  directReports: number;
  [key: string]: unknown;
}

export const HR_DATA: Employee[] = [
  // C-Suite (level 0)
  { id: 1, name: 'Sarah Chen', title: 'CEO', department: 'Executive', email: 'sarah.chen@company.com', location: 'San Francisco', status: 'active', startDate: '2018-03-15', salary: 350000, managerId: null, level: 0, directReports: 4 },

  // VPs (level 1)
  { id: 2, name: 'James Rodriguez', title: 'VP Engineering', department: 'Engineering', email: 'james.r@company.com', location: 'San Francisco', status: 'active', startDate: '2019-01-20', salary: 280000, managerId: 5, level: 1, directReports: 3 },
  { id: 3, name: 'Emily Watson', title: 'VP Product', department: 'Product', email: 'emily.w@company.com', location: 'New York', status: 'active', startDate: '2019-06-10', salary: 260000, managerId: 1, level: 1, directReports: 2 },
  { id: 4, name: 'Michael Kim', title: 'VP Sales', department: 'Sales', email: 'michael.k@company.com', location: 'Chicago', status: 'active', startDate: '2020-02-01', salary: 240000, managerId: 1, level: 1, directReports: 3 },
  { id: 5, name: 'Lisa Patel', title: 'VP HR', department: 'HR', email: 'lisa.p@company.com', location: 'San Francisco', status: 'active', startDate: '2019-09-15', salary: 220000, managerId: 1, level: 1, directReports: 2 },

  // Directors (level 2) — reports to James (VP Eng)
  { id: 6, name: 'David Park', title: 'Director, Frontend', department: 'Engineering', email: 'david.p@company.com', location: 'San Francisco', status: 'active', startDate: '2020-03-20', salary: 210000, managerId: 2, level: 2, directReports: 4 },
  { id: 7, name: 'Anna Müller', title: 'Director, Backend', department: 'Engineering', email: 'anna.m@company.com', location: 'Berlin', status: 'remote', startDate: '2020-07-10', salary: 200000, managerId: 2, level: 2, directReports: 3 },
  { id: 8, name: 'Carlos Mendez', title: 'Director, Platform', department: 'Engineering', email: 'carlos.m@company.com', location: 'Austin', status: 'active', startDate: '2021-01-15', salary: 195000, managerId: 2, level: 2, directReports: 2 },

  // Directors (level 2) — reports to Emily (VP Product)
  { id: 9, name: 'Priya Sharma', title: 'Director, Design', department: 'Product', email: 'priya.s@company.com', location: 'New York', status: 'active', startDate: '2021-04-05', salary: 185000, managerId: 3, level: 2, directReports: 3 },
  { id: 10, name: 'Robert Taylor', title: 'Director, PM', department: 'Product', email: 'robert.t@company.com', location: 'Seattle', status: 'on-leave', startDate: '2020-11-12', salary: 190000, managerId: 3, level: 2, directReports: 2 },

  // Directors (level 2) — reports to Michael (VP Sales)
  { id: 11, name: 'Jennifer Lee', title: 'Director, Enterprise', department: 'Sales', email: 'jennifer.l@company.com', location: 'Chicago', status: 'active', startDate: '2021-02-28', salary: 180000, managerId: 4, level: 2, directReports: 2 },
  { id: 12, name: 'Thomas Brown', title: 'Director, SMB', department: 'Sales', email: 'thomas.b@company.com', location: 'Boston', status: 'active', startDate: '2021-06-15', salary: 170000, managerId: 4, level: 2, directReports: 2 },
  { id: 13, name: 'Maria Garcia', title: 'Director, Marketing', department: 'Sales', email: 'maria.g@company.com', location: 'Los Angeles', status: 'remote', startDate: '2021-09-01', salary: 175000, managerId: 4, level: 2, directReports: 1 },

  // Directors (level 2) — reports to Lisa (VP HR)
  { id: 14, name: 'Kevin O\'Brien', title: 'Director, Talent', department: 'HR', email: 'kevin.o@company.com', location: 'San Francisco', status: 'active', startDate: '2021-05-20', salary: 165000, managerId: 5, level: 2, directReports: 2 },
  { id: 15, name: 'Sandra Liu', title: 'Director, People Ops', department: 'HR', email: 'sandra.l@company.com', location: 'Remote', status: 'remote', startDate: '2022-01-10', salary: 160000, managerId: 5, level: 2, directReports: 1 },

  // Senior Engineers (level 3) — reports to David (Dir Frontend)
  { id: 16, name: 'Alex Thompson', title: 'Senior Frontend Engineer', department: 'Engineering', email: 'alex.t@company.com', location: 'San Francisco', status: 'active', startDate: '2021-08-15', salary: 175000, managerId: 6, level: 3, directReports: 0 },
  { id: 17, name: 'Nina Petrov', title: 'Senior Frontend Engineer', department: 'Engineering', email: 'nina.p@company.com', location: 'Remote', status: 'remote', startDate: '2022-02-01', salary: 170000, managerId: 6, level: 3, directReports: 0 },
  { id: 18, name: 'Ryan Mitchell', title: 'Frontend Engineer', department: 'Engineering', email: 'ryan.m@company.com', location: 'San Francisco', status: 'active', startDate: '2022-06-20', salary: 140000, managerId: 6, level: 3, directReports: 0 },
  { id: 19, name: 'Yuki Tanaka', title: 'Frontend Engineer', department: 'Engineering', email: 'yuki.t@company.com', location: 'Tokyo', status: 'active', startDate: '2023-01-10', salary: 135000, managerId: 6, level: 3, directReports: 0 },

  // Senior Engineers (level 3) — reports to Anna (Dir Backend)
  { id: 20, name: 'Marcus Weber', title: 'Senior Backend Engineer', department: 'Engineering', email: 'marcus.w@company.com', location: 'Berlin', status: 'active', startDate: '2021-10-05', salary: 170000, managerId: 7, level: 3, directReports: 0 },
  { id: 21, name: 'Olga Ivanova', title: 'Senior Backend Engineer', department: 'Engineering', email: 'olga.i@company.com', location: 'London', status: 'active', startDate: '2022-03-15', salary: 165000, managerId: 7, level: 3, directReports: 0 },
  { id: 22, name: 'Hassan Ali', title: 'Backend Engineer', department: 'Engineering', email: 'hassan.a@company.com', location: 'Dubai', status: 'remote', startDate: '2022-09-01', salary: 145000, managerId: 7, level: 3, directReports: 0 },

  // Platform Engineers (level 3) — reports to Carlos (Dir Platform)
  { id: 23, name: 'Sofia Rossi', title: 'DevOps Engineer', department: 'Engineering', email: 'sofia.r@company.com', location: 'Milan', status: 'active', startDate: '2022-04-10', salary: 155000, managerId: 8, level: 3, directReports: 0 },
  { id: 24, name: 'Jake Wilson', title: 'SRE', department: 'Engineering', email: 'jake.w@company.com', location: 'Austin', status: 'active', startDate: '2022-07-25', salary: 160000, managerId: 8, level: 3, directReports: 0 },

  // Designers (level 3) — reports to Priya (Dir Design)
  { id: 25, name: 'Chloe Martin', title: 'Senior Product Designer', department: 'Product', email: 'chloe.m@company.com', location: 'New York', status: 'active', startDate: '2022-01-18', salary: 150000, managerId: 9, level: 3, directReports: 0 },
  { id: 26, name: 'Ethan Clarke', title: 'UX Researcher', department: 'Product', email: 'ethan.c@company.com', location: 'New York', status: 'active', startDate: '2022-05-08', salary: 130000, managerId: 9, level: 3, directReports: 0 },
  { id: 27, name: 'Aisha Khan', title: 'Product Designer', department: 'Product', email: 'aisha.k@company.com', location: 'Remote', status: 'remote', startDate: '2023-02-20', salary: 125000, managerId: 9, level: 3, directReports: 0 },

  // PMs (level 3) — reports to Robert (Dir PM)
  { id: 28, name: 'Benjamin Fox', title: 'Senior PM', department: 'Product', email: 'ben.f@company.com', location: 'Seattle', status: 'active', startDate: '2022-03-01', salary: 165000, managerId: 10, level: 3, directReports: 0 },
  { id: 29, name: 'Laura Zhang', title: 'Product Manager', department: 'Product', email: 'laura.z@company.com', location: 'Seattle', status: 'active', startDate: '2022-08-14', salary: 145000, managerId: 10, level: 3, directReports: 0 },

  // Sales (level 3) — reports to Jennifer (Dir Enterprise)
  { id: 30, name: 'Chris Adams', title: 'Enterprise AE', department: 'Sales', email: 'chris.a@company.com', location: 'Chicago', status: 'active', startDate: '2022-04-22', salary: 120000, managerId: 11, level: 3, directReports: 0 },
  { id: 31, name: 'Rachel Moore', title: 'Enterprise AE', department: 'Sales', email: 'rachel.m@company.com', location: 'New York', status: 'active', startDate: '2022-10-01', salary: 115000, managerId: 11, level: 3, directReports: 0 },

  // Sales (level 3) — reports to Thomas (Dir SMB)
  { id: 32, name: 'Daniel Cruz', title: 'SMB AE', department: 'Sales', email: 'daniel.c@company.com', location: 'Boston', status: 'active', startDate: '2023-01-15', salary: 95000, managerId: 12, level: 3, directReports: 0 },
  { id: 33, name: 'Megan Wright', title: 'SDR', department: 'Sales', email: 'megan.w@company.com', location: 'Boston', status: 'on-leave', startDate: '2023-04-05', salary: 72000, managerId: 12, level: 3, directReports: 0 },

  // Marketing (level 3)
  { id: 34, name: 'Jordan Blake', title: 'Content Marketing', department: 'Sales', email: 'jordan.b@company.com', location: 'Los Angeles', status: 'active', startDate: '2023-02-10', salary: 85000, managerId: 13, level: 3, directReports: 0 },

  // HR (level 3)
  { id: 35, name: 'Amy Nelson', title: 'Technical Recruiter', department: 'HR', email: 'amy.n@company.com', location: 'San Francisco', status: 'active', startDate: '2022-06-15', salary: 110000, managerId: 14, level: 3, directReports: 0 },
];

/** Build flat tree: sort by managerId hierarchy, track open state */
export function buildHierarchy(data: Employee[]): Employee[] {
  const sorted: Employee[] = [];
  const byManager = new Map<number | null, Employee[]>();

  for (const emp of data) {
    const arr = byManager.get(emp.managerId) ?? [];
    arr.push(emp);
    byManager.set(emp.managerId, arr);
  }

  function addChildren(parentId: number | null) {
    const children = byManager.get(parentId) ?? [];
    for (const child of children) {
      sorted.push(child);
      addChildren(child.id);
    }
  }

  addChildren(null);
  return sorted;
}
