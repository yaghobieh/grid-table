import type { DragEvent, ReactNode } from 'react';
import { useState } from 'react';
import { Chip, Typography } from '@forgedevstack/bear';
import type { RowData } from '@/types';
import { EMPTY_STRING } from '@constants/strings.const';
import { ZERO } from '@constants/numbers.const';
import {
  GROUP_DROP_ZONE_ACTIVE_CLASS,
  GROUP_DROP_ZONE_CHIPS_CLASS,
  GROUP_DROP_ZONE_CLASS,
  GROUP_DROP_ZONE_HINT_CLASS,
  GROUP_DROP_ZONE_MIME,
} from '@constants/groupDropZone.const';
import { addRowGroupField, removeRowGroupField } from '@/utils/rowGroupsDrop.utils';
import type { GroupDropZoneProps } from './GroupDropZone.types';

export function GroupDropZone<T extends RowData>(props: GroupDropZoneProps<T>): ReactNode {
  const [isActive, setIsActive] = useState(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsActive(false);
    const columnId = event.dataTransfer.getData(GROUP_DROP_ZONE_MIME);
    if (!columnId) return;
    props.onChange(addRowGroupField(props.groups, columnId));
  };

  return (
    <div
      className={`${GROUP_DROP_ZONE_CLASS}${isActive ? ` ${GROUP_DROP_ZONE_ACTIVE_CLASS}` : EMPTY_STRING}`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsActive(true);
      }}
      onDragLeave={() => setIsActive(false)}
      onDrop={handleDrop}
    >
      <Typography variant="caption">{props.label}</Typography>
      <div className={GROUP_DROP_ZONE_CHIPS_CLASS}>
        {props.groups.map((group) => {
          const column = props.columns.find((item) => item.id === group.by || item.accessor === group.by);
          const label = column && typeof column.header === 'string' ? column.header : group.by;
          return (
            <Chip key={group.by} size="sm" onDelete={() => props.onChange(removeRowGroupField(props.groups, group.by))}>
              {label}
            </Chip>
          );
        })}
      </div>
      {props.groups.length === ZERO && (
        <span className={GROUP_DROP_ZONE_HINT_CLASS}>{props.hint}</span>
      )}
    </div>
  );
}
