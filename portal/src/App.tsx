import { CompassProvider, Routes } from '@forgedevstack/forge-compass/react';
import { Home } from './pages/Home';
import { FinanceDemo } from './pages/FinanceDemo';
import { HRDemo } from './pages/HRDemo';
import { BasicDemo } from './pages/BasicDemo';
import { FeaturesDemo } from './pages/FeaturesDemo';
import { ThemePlaygroundDemo } from './pages/ThemePlaygroundDemo';
import { AccessibilityDemo } from './pages/AccessibilityDemo';
import { MasterDetailDemo } from './pages/MasterDetailDemo';
import { PersistedStateDemo } from './pages/PersistedStateDemo';
import { ServerDrivenDemo } from './pages/ServerDrivenDemo';
import { ColumnGroupingDemo } from './pages/ColumnGroupingDemo';
import { VirtualizationDemo } from './pages/VirtualizationDemo';
import { PinnedRowGroupsDemo } from './pages/PinnedRowGroupsDemo';
import { ColumnFormulaEngineDemo } from './pages/ColumnFormulaEngineDemo';
import { SavedViewsDemo } from './pages/SavedViewsDemo';
import { AdvancedFilterBuilderDemo } from './pages/AdvancedFilterBuilderDemo';
import { EnterpriseGridDemo } from './pages/EnterpriseGridDemo';
import { InfiniteScrollDemo } from './pages/InfiniteScrollDemo';
import { Release114Demo } from './pages/Release114Demo';
import { DemosIndex } from './pages/DemosIndex';
import { ThemeBuilder } from './pages/ThemeBuilder';
import { DocsPage } from './pages/DocsPage';
import { Changelog } from './pages/Changelog';
import { Skills } from './pages/Skills';
import { Playground } from './pages/Playground';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/demos', name: 'demos', component: DemosIndex },
  { path: '/demos/finance', name: 'demos-finance', component: FinanceDemo },
  { path: '/demos/hr', name: 'demos-hr', component: HRDemo },
  { path: '/demos/basic', name: 'demos-basic', component: BasicDemo },
  { path: '/demos/features', name: 'demos-features', component: FeaturesDemo },
  { path: '/demos/enterprise-grid', name: 'demos-enterprise-grid', component: EnterpriseGridDemo },
  { path: '/demos/release-1-1-4', name: 'demos-release-1-1-4', component: Release114Demo },
  { path: '/demos/infinite-scroll', name: 'demos-infinite-scroll', component: InfiniteScrollDemo },
  { path: '/demos/theme-playground', name: 'demos-theme-playground', component: ThemePlaygroundDemo },
  { path: '/demos/accessibility', name: 'demos-accessibility', component: AccessibilityDemo },
  { path: '/demos/master-detail', name: 'demos-master-detail', component: MasterDetailDemo },
  { path: '/demos/persisted-state', name: 'demos-persisted-state', component: PersistedStateDemo },
  { path: '/demos/server-driven', name: 'demos-server-driven', component: ServerDrivenDemo },
  { path: '/demos/pinned-row-groups', name: 'demos-pinned-row-groups', component: PinnedRowGroupsDemo },
  { path: '/demos/column-formula-engine', name: 'demos-column-formula-engine', component: ColumnFormulaEngineDemo },
  { path: '/demos/saved-views', name: 'demos-saved-views', component: SavedViewsDemo },
  { path: '/demos/advanced-filter-builder', name: 'demos-advanced-filter-builder', component: AdvancedFilterBuilderDemo },
  { path: '/demos/column-grouping', name: 'demos-column-grouping', component: ColumnGroupingDemo },
  { path: '/demos/virtualization', name: 'demos-virtualization', component: VirtualizationDemo },
  { path: '/theme-builder', name: 'theme-builder', component: ThemeBuilder },
  { path: '/playground', name: 'playground', component: Playground },
  { path: '/changelog', name: 'changelog', component: Changelog },
  { path: '/skills', name: 'skills', component: Skills },
  { path: '/docs/:slug', name: 'docs', component: DocsPage },
  { path: '/docs', name: 'docs-index', component: DocsPage },
];

export const App = () => (
  <CompassProvider routes={routes}>
    <Routes />
  </CompassProvider>
);
