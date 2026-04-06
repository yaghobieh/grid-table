export const THEME_PLAYGROUND_DEMO_SOURCE = `import { GridTable } from '@forgedevstack/grid-table';
import '@forgedevstack/grid-table/grid-table.css';
import { BearProvider } from '@forgedevstack/bear';
import '@forgedevstack/bear/styles.css';

export function App() {
  return (
    <BearProvider defaultMode="dark">
      <GridTable data={[]} columns={[]} showPagination={false} />
    </BearProvider>
  );
}

// Use the portal routes:
//   /theme-builder — visual theme editor + CSS variable export
//   /playground    — toggle GridTable props and copy generated JSX`;
