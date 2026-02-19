import { createContext, useContext, useState, useCallback, FC, ReactNode, useMemo } from 'react';
import type { Locale, TranslationStrings } from './types';
import { en } from './en';
import { es } from './es';

// ── Locale map ───────────────────────────────────────
const TRANSLATIONS: Record<Locale, TranslationStrings> = { en, es };

// ── Storage key ──────────────────────────────────────
const LOCALE_STORAGE_KEY = 'grid-table-locale';

// ── Default locale ───────────────────────────────────
const DEFAULT_LOCALE: Locale = 'en';

// ── Context ──────────────────────────────────────────
interface I18nContextValue {
  locale: Locale;
  t: TranslationStrings;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

// ── Provider ─────────────────────────────────────────
interface I18nProviderProps {
  children: ReactNode;
  defaultLocale?: Locale;
}

export const I18nProvider: FC<I18nProviderProps> = ({ children, defaultLocale }) => {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (defaultLocale) return defaultLocale;
    try {
      const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
      if (stored === 'en' || stored === 'es') return stored;
    } catch { /* noop */ }
    return DEFAULT_LOCALE;
  });

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try { localStorage.setItem(LOCALE_STORAGE_KEY, newLocale); } catch { /* noop */ }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'es' : 'en');
  }, [locale, setLocale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    t: TRANSLATIONS[locale],
    setLocale,
    toggleLocale,
  }), [locale, setLocale, toggleLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

// ── Hook ─────────────────────────────────────────────
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside <I18nProvider>');
  return ctx;
}
