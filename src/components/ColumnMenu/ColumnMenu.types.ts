export interface ColumnMenuProps {
  open: boolean;
  onToggle: () => void;
  onAutosize: () => void;
  onPinLeft: () => void;
  onPinRight: () => void;
  onHide: () => void;
  autosizeLabel: string;
  pinLeftLabel: string;
  pinRightLabel: string;
  hideLabel: string;
}

export interface ColumnMenuItem {
  id: string;
  label: string;
  onClick: () => void;
}
