import type { ReactNode } from 'react';
import { useId } from 'react';
import { HUNDRED, ONE, TWO, TWENTY, ZERO } from '@constants/numbers.const';
import type { SparklineProps } from './Sparkline.types';
import { SPARKLINE_COLOR, SPARKLINE_NEGATIVE_COLOR } from './Sparkline.const';

export function Sparkline(props: SparklineProps): ReactNode {
  const { data, width = HUNDRED, height = TWENTY, color = SPARKLINE_COLOR, negativeColor = SPARKLINE_NEGATIVE_COLOR } = props;
  const gradientId = useId();

  if (data.length < TWO) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || ONE;
  const innerWidth = width - TWO * TWO;
  const innerHeight = height - TWO * TWO;
  const falling = data[data.length - ONE] < data[ZERO];
  const stroke = falling ? negativeColor : color;
  const points = data.map((value, index) => {
    const x = TWO + (index / (data.length - ONE)) * innerWidth;
    const y = TWO + innerHeight - ((value - min) / range) * innerHeight;
    return `${x},${y}`;
  });
  const path = `M${points.join(' L')}`;

  return (
    <svg className="gt-sparkline" width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden>
      <path d={path} fill="none" stroke={stroke} strokeWidth={ONE} strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${path} L${width - TWO},${height - TWO} L${TWO},${height - TWO} Z`} fill={stroke} opacity="0.18" />
      <title id={gradientId}>{data.join(',')}</title>
    </svg>
  );
}
