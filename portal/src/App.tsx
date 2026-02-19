import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { Home } from './pages/Home';
import { FinanceDemo } from './pages/FinanceDemo';
import { HRDemo } from './pages/HRDemo';
import { BasicDemo } from './pages/BasicDemo';
import { DemosIndex } from './pages/DemosIndex';
import { ThemeBuilder } from './pages/ThemeBuilder';
import { DocsPage } from './pages/DocsPage';
import { Changelog } from './pages/Changelog';
import { Playground } from './pages/Playground';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/demos', name: 'demos', component: DemosIndex },
  { path: '/demos/finance', name: 'demos-finance', component: FinanceDemo },
  { path: '/demos/hr', name: 'demos-hr', component: HRDemo },
  { path: '/demos/basic', name: 'demos-basic', component: BasicDemo },
  { path: '/theme-builder', name: 'theme-builder', component: ThemeBuilder },
  { path: '/playground', name: 'playground', component: Playground },
  { path: '/changelog', name: 'changelog', component: Changelog },
  { path: '/docs/:slug', name: 'docs', component: DocsPage },
  { path: '/docs', name: 'docs-index', component: DocsPage },
];

export const App = () => (
  <CompassProvider routes={routes}>
    <Routes />
  </CompassProvider>
);
