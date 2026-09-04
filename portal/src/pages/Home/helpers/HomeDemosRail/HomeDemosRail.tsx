import type { FC } from 'react';
import { Rail, RailSlide } from '@forgedevstack/rail';
import { Autoplay, Navigation, Pagination } from '@forgedevstack/rail/modules';
import { DEMOS } from '@/constants';
import { HomeDemoCard } from '../HomeDemoCard';
import {
  HOME_DEMOS_AUTOPLAY_MS,
  HOME_DEMOS_BREAKPOINTS,
  HOME_DEMOS_RAIL_CLASS,
  HOME_DEMOS_RAIL_HEIGHT_PX,
  HOME_DEMOS_RAIL_SLIDES_MOBILE,
} from './HomeDemosRail.const';

export const HomeDemosRail: FC = () => (
  <Rail
    className={HOME_DEMOS_RAIL_CLASS}
    modules={[Navigation, Pagination, Autoplay]}
    slidesPerView={HOME_DEMOS_RAIL_SLIDES_MOBILE}
    breakpoints={HOME_DEMOS_BREAKPOINTS}
    navigation
    pagination={{ clickable: true }}
    autoplay={{ delay: HOME_DEMOS_AUTOPLAY_MS, pauseOnMouseEnter: true }}
    grabCursor
    loop
    style={{ height: HOME_DEMOS_RAIL_HEIGHT_PX }}
  >
    {DEMOS.map((demo) => (
      <RailSlide key={demo.id}>
        <HomeDemoCard demo={demo} />
      </RailSlide>
    ))}
  </Rail>
);
