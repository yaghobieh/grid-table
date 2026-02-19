import { FC, useMemo } from 'react';
import type { SparklineProps } from './Sparkline.types';

export const Sparkline: FC<SparklineProps> = ({
  data,
  width = 100,
  height = 30,
  color = '#22c55e',
  negativeColor = '#ef4444',
}) => {
  const { path, isNegative, gradientId } = useMemo(() => {
    if (data.length < 2) return { path: '', isNegative: false, gradientId: '' };

    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const padding = 2;
    const w = width - padding * 2;
    const h = height - padding * 2;
    const neg = data[data.length - 1] < data[0];

    const points = data.map((val, i) => {
      const x = padding + (i / (data.length - 1)) * w;
      const y = padding + h - ((val - min) / range) * h;
      return `${x},${y}`;
    });

    const id = `spark-${Math.random().toString(36).slice(2, 8)}`;

    return {
      path: `M${points.join(' L')}`,
      isNegative: neg,
      gradientId: id,
    };
  }, [data, width, height]);

  const strokeColor = isNegative ? negativeColor : color;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {path && (
        <>
          <path d={path} fill="none" stroke={strokeColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
          <path
            d={`${path} L${width - 2},${height - 2} L2,${height - 2} Z`}
            fill={`url(#${gradientId})`}
          />
        </>
      )}
    </svg>
  );
};
