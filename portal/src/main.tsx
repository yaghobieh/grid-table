import React from 'react';
import ReactDOM from 'react-dom/client';
import '@forgedevstack/bear/styles.css';
import '@forgedevstack/grid-table/grid-table.css';
import '@forgedevstack/torch/styles.css';
import '@forgedevstack/rail/styles.css';
import { BearProvider } from '@forgedevstack/bear';
import { I18nProvider } from './i18n';
import { App } from './App';
import { gridTheme, gridVariants } from './config/bear-theme';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BearProvider
      defaultMode="dark"
      theme={gridTheme}
      customVariants={gridVariants}
      persistPreference
      storageKey="grid-table-theme"
    >
      <I18nProvider>
        <App />
      </I18nProvider>
    </BearProvider>
  </React.StrictMode>
);
