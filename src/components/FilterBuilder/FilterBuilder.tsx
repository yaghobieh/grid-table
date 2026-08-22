import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Button, Flex, Select, Typography } from '@forgedevstack/bear';
import type { FilterBuilderProps } from './FilterBuilder.types';
import type { FilterTreeGroup, FilterTreeRule } from '@/types/filter.types';
import {
  FILTER_BUILDER_ACTIONS_CLASS,
  FILTER_BUILDER_CLASS,
  FILTER_BUILDER_DEFAULT_TRANSLATIONS,
  FILTER_BUILDER_EMPTY_GROUP,
  FILTER_BUILDER_GROUP_OP_OPTIONS,
  FILTER_BUILDER_HEADER_CLASS,
  FILTER_BUILDER_RULES_CLASS,
} from './FilterBuilder.const';
import { isFilterTreeGroup } from '@/utils/filterTree.utils';
import { EMPTY_STRING } from '@constants/strings.const';
import { FILTER_OP_CONTAINS } from '@constants/filterOperators.const';
import { TWO, ZERO } from '@constants/numbers.const';
import { FilterBuilderRule } from './helpers';

export function FilterBuilder(props: FilterBuilderProps): ReactNode {
  const { value, fields, onChange, onApply, className = EMPTY_STRING, translations: translationsProp } = props;
  const t = { ...FILTER_BUILDER_DEFAULT_TRANSLATIONS, ...translationsProp };
  const group = value ?? FILTER_BUILDER_EMPTY_GROUP;
  const rules = group.rules.filter((rule): rule is FilterTreeRule => !isFilterTreeGroup(rule));

  const updateRule = (index: number, patch: Partial<FilterTreeRule>) => {
    const nextRules = rules.map((rule, ruleIndex) => (ruleIndex === index ? { ...rule, ...patch } : rule));
    onChange({ ...group, rules: nextRules });
  };

  const addRule = () => {
    onChange({
      ...group,
      rules: [
        ...rules,
        { field: fields[ZERO]?.id ?? EMPTY_STRING, op: FILTER_OP_CONTAINS, value: EMPTY_STRING },
      ],
    });
  };

  const clearRules = () => {
    onChange(null);
  };

  return (
    <div className={clsx(FILTER_BUILDER_CLASS, className)}>
      <Flex align="center" justify="between" className={FILTER_BUILDER_HEADER_CLASS}>
        <Typography variant="body2">{t.title}</Typography>
        <Select
          value={group.op}
          onChange={(next) => onChange({ ...group, op: next as FilterTreeGroup['op'] })}
          options={FILTER_BUILDER_GROUP_OP_OPTIONS.map((item) => ({
            value: item.value,
            label: t[item.labelKey],
          }))}
        />
      </Flex>

      <div className={FILTER_BUILDER_RULES_CLASS}>
        {rules.map((rule, index) => (
          <FilterBuilderRule
            key={`${rule.field}-${index}`}
            field={rule.field}
            op={rule.op}
            value={rule.value}
            fieldOptions={fields.map((item) => ({ value: item.id, label: item.label }))}
            translations={t}
            onFieldChange={(field) => updateRule(index, { field })}
            onOpChange={(nextOp) => updateRule(index, { op: nextOp as FilterTreeRule['op'] })}
            onValueChange={(nextValue) => updateRule(index, { value: nextValue })}
          />
        ))}
      </div>

      <Flex gap={TWO} className={FILTER_BUILDER_ACTIONS_CLASS}>
        <Button size="sm" variant="outline" onClick={addRule}>{t.addRule}</Button>
        <Button size="sm" variant="ghost" onClick={clearRules}>{t.clear}</Button>
        {onApply && (
          <Button size="sm" variant="primary" onClick={() => onApply(group)}>{t.apply}</Button>
        )}
      </Flex>
    </div>
  );
}
