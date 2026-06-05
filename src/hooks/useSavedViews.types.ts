import type { SavedViewDefinition, SavedViewsConfig, TableViewSnapshot } from '@/types';

export interface UseSavedViewsReturn {
  views: SavedViewDefinition[];
  activeViewId: string | null;
  setActiveViewId: (viewId: string) => void;
  applySnapshot: (snapshot: TableViewSnapshot) => void;
  captureCurrentSnapshot: () => TableViewSnapshot;
  saveCurrentAsView: (id: string, label: string) => void;
}

export type UseSavedViewsConfig = SavedViewsConfig;
