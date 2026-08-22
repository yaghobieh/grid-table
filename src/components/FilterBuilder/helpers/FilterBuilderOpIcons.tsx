import type { ReactNode } from 'react';
import { BearIcons } from '@forgedevstack/bear';
import { FILTER_OP_GREATER_THAN, FILTER_OP_LESS_THAN } from '@constants/filterOperators.const';
import type { FilterTreeRule } from '@/types/filter.types';

export const FILTER_BUILDER_OP_ICONS: Partial<Record<FilterTreeRule['op'], ReactNode>> = {
  [FILTER_OP_GREATER_THAN]: <BearIcons.ChevronUpIcon size="xs" />,
  [FILTER_OP_LESS_THAN]: <BearIcons.ChevronDownIcon size="xs" />,
};
