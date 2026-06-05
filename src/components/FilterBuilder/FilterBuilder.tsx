import type { ReactNode } from 'react';
import clsx from 'clsx';
import { Button, Flex, Input, Select, Typography } from '@forgedevstack/bear';
import type { FilterBuilderProps } from './FilterBuilder.types';
import type { FilterTreeGroup, FilterTreeRule } from '@/types/filter.types';
import {
  FILTER_BUILDER_DEFAULT_RULE_OP,
  FILTER_BUILDER_DEFAULT_TRANSLATIONS,
  FILTER_BUILDER_EMPTY_GROUP,
  FILTER_BUILDER_GROUP_OP_OPTIONS,
  FILTER_BUILDER_RULE_OP_OPTIONS,
} from './FilterBuilder.const';
import { isFilterTreeGroup } from '@/utils/filterTree.utils';
import { EMPTY_STRING } from '@constants/strings.const';

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
        { field: fields[0]?.id ?? EMPTY_STRING, op: FILTER_BUILDER_DEFAULT_RULE_OP, value: EMPTY_STRING },
      ],
    });
  };

  const clearRules = () => {
    onChange(null);
  };

  return (
    <div className={clsx('gt-filter-builder', className)}>
      <Flex align="center" justify="between" className="gt-filter-builder__header">
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

      <div className="gt-filter-builder__rules">
        {rules.map((rule, index) => (
          <Flex key={`${rule.field}-${index}`} gap={2} className="gt-filter-builder__rule">
            <Select
              value={rule.field}
              onChange={(field) => updateRule(index, { field })}
              options={fields.map((item) => ({ value: item.id, label: item.label }))}
            />
            <Select
              value={rule.op}
              onChange={(op) => updateRule(index, { op: op as FilterTreeRule['op'] })}
              options={FILTER_BUILDER_RULE_OP_OPTIONS.map((item) => ({
                value: item.value,
                label: t[item.labelKey],
              }))}
            />
            <Input
              value={String(rule.value ?? EMPTY_STRING)}
              onChange={(event) => updateRule(index, { value: event.target.value })}
              placeholder={t.valuePlaceholder}
            />
          </Flex>
        ))}
      </div>

      <Flex gap={2} className="gt-filter-builder__actions">
        <Button size="sm" variant="outline" onClick={addRule}>{t.addRule}</Button>
        <Button size="sm" variant="ghost" onClick={clearRules}>{t.clear}</Button>
        {onApply && (
          <Button size="sm" variant="primary" onClick={() => onApply(group)}>{t.apply}</Button>
        )}
      </Flex>
    </div>
  );
}
