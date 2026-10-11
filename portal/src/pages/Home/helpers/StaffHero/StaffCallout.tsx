import type { FC } from 'react';

export interface StaffCalloutProps {
  label: string;
}

export const StaffCallout: FC<StaffCalloutProps> = (props) => {
  const { label } = props;
  return (
    <div className="staff-callout">
      <svg className="staff-callout-arrow" viewBox="0 0 72 48" aria-hidden>
        <path d="M8 40 C 22 36, 34 22, 46 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        <path d="M36 8 L50 8 L42 20" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="staff-callout-label">{label}</p>
    </div>
  );
};
