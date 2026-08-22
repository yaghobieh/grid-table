import type { FilterTreeGroup } from '@/types/filter.types';
import type { FILTER_BUILDER_DEFAULT_TRANSLATIONS } from './FilterBuilder.const';

export type FilterBuilderTranslations = typeof FILTER_BUILDER_DEFAULT_TRANSLATIONS;

export interface FilterBuilderProps {
  value: FilterTreeGroup | null;
  fields: Array<{ id: string; label: string }>;
  onChange: (value: FilterTreeGroup | null) => void;
  onApply?: (value: FilterTreeGroup | null) => void;
  className?: string;
  translations?: Partial<FilterBuilderTranslations>;
}

export interface FilterBuilderRuleProps {
  field: string;
  op: string;
  value: unknown;
  fieldOptions: Array<{ value: string; label: string }>;
  translations: FilterBuilderTranslations;
  onFieldChange: (field: string) => void;
  onOpChange: (op: string) => void;
  onValueChange: (value: string) => void;
}
