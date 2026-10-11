export const STAFF_PAGE_SIZE = 10;

export const STAFF_OFFICES = ['Tokyo', 'London', 'San Francisco', 'New York', 'Edinburgh'] as const;

export const STAFF_OFFICE_COLOR: Record<string, string> = {
  Tokyo: '#60a5fa',
  London: '#5eead4',
  'San Francisco': '#86efac',
  'New York': '#c4b5fd',
  Edinburgh: '#f9a8d4',
};

export interface StaffMember {
  id: number;
  name: string;
  position: string;
  office: (typeof STAFF_OFFICES)[number];
  extension: number;
  startDate: string;
  salary: number;
  trend: number[];
  [key: string]: unknown;
}

const PEOPLE: Array<[string, string]> = [
  ['Airi Satou', 'Accountant'],
  ['Angelica Ramos', 'Chief Executive Officer (CEO)'],
  ['Ashton Cox', 'Junior Technical Author'],
  ['Bradley Greer', 'Software Engineer'],
  ['Brenden Wagner', 'Software Engineer'],
  ['Brielle Williamson', 'Integration Specialist'],
  ['Bruno Nash', 'Software Engineer'],
  ['Caesar Vance', 'Pre-Sales Support'],
  ['Cara Stevens', 'Sales Assistant'],
  ['Cedric Kelly', 'Senior JavaScript Developer'],
  ['Charde Marshall', 'Regional Director'],
  ['Colleen Hurst', 'Javascript Developer'],
  ['Dai Rios', 'Personnel Lead'],
  ['Donna Snider', 'Customer Support'],
  ['Doris Wilder', 'Sales Assistant'],
  ['Finn Camacho', 'Support Engineer'],
  ['Fiona Green', 'Chief Operating Officer (COO)'],
  ['Garrett Winters', 'Accountant'],
  ['Gavin Joyce', 'Developer'],
  ['Gavin Cortez', 'Team Leader'],
  ['Gloria Little', 'Systems Administrator'],
  ['Haley Kennedy', 'Senior Marketing Designer'],
  ['Hermione Butler', 'Regional Director'],
  ['Herrod Chandler', 'Sales Assistant'],
  ['Hope Fuentes', 'Secretary'],
  ['Howard Hatfield', 'Office Manager'],
  ['Jackson Bradshaw', 'Director'],
  ['Jena Gaines', 'Office Manager'],
  ['Jenette Caldwell', 'Development Lead'],
  ['Jennifer Acosta', 'Junior Javascript Developer'],
  ['Jennifer Chang', 'Regional Director'],
  ['Jonas Alexander', 'Developer'],
  ['Lael Greer', 'Team Leader'],
  ['Martena Mccray', 'Post-Sales support'],
  ['Michael Bruce', 'Javascript Developer'],
  ['Michael Silva', 'Marketing Designer'],
  ['Michelle House', 'Integration Specialist'],
  ['Olivia Liang', 'Support Engineer'],
  ['Paul Byrd', 'Chief Financial Officer (CFO)'],
  ['Prescott Bartlett', 'Technical Author'],
  ['Quinn Flynn', 'Support Lead'],
  ['Rhona Davidson', 'Integration Specialist'],
  ['Sakura Yamamoto', 'Support Engineer'],
  ['Serge Baldwin', 'Data Coordinator'],
  ['Shad Decker', 'Regional Director'],
  ['Shou Itou', 'Office Manager'],
  ['Sonya Frost', 'Software Engineer'],
  ['Suki Burks', 'Developer'],
  ['Tatyana Fitzpatrick', 'Regional Director'],
  ['Thor Walton', 'Developer'],
  ['Tiger Nixon', 'System Architect'],
  ['Timothy Mooney', 'Office Manager'],
  ['Unity Butler', 'Marketing Designer'],
  ['Vivian Harrell', 'Financial Controller'],
  ['Yuri Berry', 'Chief Marketing Officer (CMO)'],
  ['Zenaida Frank', 'Software Engineer'],
  ['Zorita Serrano', 'Software Engineer'],
];

function trendFor(seed: number): number[] {
  return Array.from({ length: 8 }, (_, index) => 40 + ((seed * (index + 3)) % 50));
}

export const STAFF_ROWS: StaffMember[] = PEOPLE.map(([name, position], index) => ({
  id: index + 1,
  name,
  position,
  office: STAFF_OFFICES[index % STAFF_OFFICES.length],
  extension: 1000 + index * 17,
  startDate: `${String((index % 27) + 1).padStart(2, '0')}.${String((index % 12) + 1).padStart(2, '0')}.20${String(8 + (index % 12)).padStart(2, '0')}`,
  salary: 80000 + (index % 17) * 12500,
  trend: trendFor(index + 1),
}));
