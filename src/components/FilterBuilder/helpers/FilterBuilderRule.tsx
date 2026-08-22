import type { ReactNode } from 'react';
import { Button, Flex, Input, Select } from '@forgedevstack/bear';
import { EMPTY_STRING } from '@constants/strings.const';
import { TWO } from '@constants/numbers.const';
import type { FilterBuilderRuleProps } from '../FilterBuilder.types';
import { FILTER_BUILDER_RULE_CLASS, FILTER_BUILDER_RULE_OP_OPTIONS } from '../FilterBuilder.const';
import { FILTER_BUILDER_OP_ICONS } from './FilterBuilderOpIcons';

export function FilterBuilderRule(props: FilterBuilderRuleProps): ReactNode {
  const { field, op, value, fieldOptions, translations, onFieldChange, onOpChange, onValueChange } = props;

  return (
    <Flex gap={TWO} className={FILTER_BUILDER_RULE_CLASS}>
      <Select value={field} onChange={onFieldChange} options={fieldOptions} />
      <Flex gap={TWO}>
        {FILTER_BUILDER_RULE_OP_OPTIONS.map((item) => {
          const icon = FILTER_BUILDER_OP_ICONS[item.value];
          const label = translations[item.labelKey];
          return (
            <Button
              key={item.value}
              size="sm"
              variant={op === item.value ? 'primary' : 'ghost'}
              icon={icon}
              aria-label={label}
              onClick={() => onOpChange(item.value)}
            >
              {icon ? EMPTY_STRING : label}
            </Button>
          );
        })}
      </Flex>
      <Input
        value={String(value ?? EMPTY_STRING)}
        onChange={(event) => onValueChange(event.target.value)}
        placeholder={translations.valuePlaceholder}
      />
    </Flex>
  );
}
