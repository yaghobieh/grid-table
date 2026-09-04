import type { ReactNode } from 'react';
import { RANGE_LIVE_REGION_CLASS } from '@constants/rangeAnnounce.const';
import type { RangeLiveRegionProps } from './RangeLiveRegion.types';

export function RangeLiveRegion(props: RangeLiveRegionProps): ReactNode {
  return (
    <div className={RANGE_LIVE_REGION_CLASS} aria-live="polite" aria-atomic="true">
      {props.message}
    </div>
  );
}
