export interface CellCommentProps {
  comment: string;
  label: string;
  saveLabel: string;
  clearLabel: string;
  onSave: (comment: string) => void;
  onClear: () => void;
}
