import type { FC } from 'react';
import { BRAND_MARK_SRC } from '@/constants/brand.const';
import { BRAND_MARK_CLASS } from './BrandMark.const';
import type { BrandMarkProps } from './BrandMark.types';

export const BrandMark: FC<BrandMarkProps> = (props) => {
  const { alt, sizePx } = props;

  return (
    <img
      src={BRAND_MARK_SRC}
      alt={alt}
      width={sizePx}
      height={sizePx}
      className={BRAND_MARK_CLASS}
    />
  );
};
