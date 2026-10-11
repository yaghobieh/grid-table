import type { Translations } from '@/types';
import { DEFAULT_TRANSLATIONS } from '@constants/defaults.const';

export const GRID_LOCALE_IDS = ['en', 'es', 'he'] as const;

export type GridLocaleId = (typeof GRID_LOCALE_IDS)[number];

const SPANISH: Partial<Translations> = {
  empty: 'No hay datos',
  loading: 'Cargando...',
  search: 'Buscar...',
  filter: 'Filtrar',
  sort: 'Ordenar',
  sortAsc: 'Orden ascendente',
  sortDesc: 'Orden descendente',
  clearSort: 'Quitar orden',
  clearFilter: 'Quitar filtro',
  clearAll: 'Quitar todo',
  apply: 'Aplicar',
  cancel: 'Cancelar',
  columns: 'Columnas',
  showColumns: 'Mostrar columnas',
  hideColumn: 'Ocultar columna',
  resetColumns: 'Restablecer columnas',
  rowsPerPage: 'Filas por página',
  of: 'de',
  page: 'Página',
  first: 'Primera',
  previous: 'Anterior',
  next: 'Siguiente',
  last: 'Última',
  selected: 'seleccionadas',
  noResults: 'Sin resultados',
  errorLoading: 'Error al cargar',
  retry: 'Reintentar',
  info: 'Mostrando {from} a {to} de {total}',
  toolPanel: 'Columnas',
  pinLeft: 'Fijar a la izquierda',
  pinRight: 'Fijar a la derecha',
  unpin: 'Soltar',
  responsiveDetails: 'Más columnas',
};

const HEBREW: Partial<Translations> = {
  empty: 'אין נתונים',
  loading: 'טוען...',
  search: 'חיפוש...',
  filter: 'סינון',
  sort: 'מיון',
  sortAsc: 'מיון עולה',
  sortDesc: 'מיון יורד',
  clearSort: 'נקה מיון',
  clearFilter: 'נקה סינון',
  clearAll: 'נקה הכל',
  apply: 'החל',
  cancel: 'ביטול',
  columns: 'עמודות',
  showColumns: 'הצג עמודות',
  hideColumn: 'הסתר עמודה',
  resetColumns: 'אפס עמודות',
  rowsPerPage: 'שורות בעמוד',
  of: 'מתוך',
  page: 'עמוד',
  first: 'ראשון',
  previous: 'הקודם',
  next: 'הבא',
  last: 'אחרון',
  selected: 'נבחרו',
  noResults: 'אין תוצאות',
  errorLoading: 'שגיאה בטעינה',
  retry: 'נסה שוב',
  info: 'מציג {from} עד {to} מתוך {total}',
  toolPanel: 'עמודות',
  pinLeft: 'נעץ לשמאל',
  pinRight: 'נעץ לימין',
  unpin: 'שחרר',
  responsiveDetails: 'עמודות נוספות',
};

export const GRID_LOCALES: Record<GridLocaleId, Partial<Translations>> = {
  en: DEFAULT_TRANSLATIONS,
  es: SPANISH,
  he: HEBREW,
};

export function resolveGridLocale(locale?: GridLocaleId): Partial<Translations> {
  if (!locale) return {};
  return GRID_LOCALES[locale];
}
