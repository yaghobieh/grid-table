import type { ReactNode } from 'react';
import { useState } from 'react';
import { Button, Input } from '@forgedevstack/bear';
import { EMPTY_STRING } from '@constants/strings.const';
import { CELL_COMMENT_INDICATOR_CLASS, CELL_COMMENT_POPOVER_CLASS } from '@constants/cellComments.const';
import type { CellCommentProps } from './CellComment.types';
import { CELL_COMMENT_POPOVER_OPEN_CLASS, CELL_COMMENT_TEXTAREA_ROWS } from './CellComment.const';

export function CellComment(props: CellCommentProps): ReactNode {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(props.comment);

  return (
    <div className={CELL_COMMENT_INDICATOR_CLASS}>
      <Button
        type="button"
        variant="ghost"
        size="xs"
        aria-label={props.label}
        onClick={(event) => {
          event.stopPropagation();
          setDraft(props.comment);
          setOpen(!open);
        }}
      />
      {open && (
        <div className={`${CELL_COMMENT_POPOVER_CLASS} ${CELL_COMMENT_POPOVER_OPEN_CLASS}`} onClick={(event) => event.stopPropagation()}>
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            aria-label={props.label}
            multiline
            rows={CELL_COMMENT_TEXTAREA_ROWS}
          />
          <Button
            size="xs"
            onClick={() => {
              props.onSave(draft);
              setOpen(false);
            }}
          >
            {props.saveLabel}
          </Button>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => {
              props.onClear();
              setDraft(EMPTY_STRING);
              setOpen(false);
            }}
          >
            {props.clearLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
