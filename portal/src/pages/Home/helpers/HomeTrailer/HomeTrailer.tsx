import type { FC } from 'react';
import { TorchPlayer, TorchProvider } from '@forgedevstack/torch';
import { GRID_ACCENT_HEX, TRAILER_POSTER_SRC, TRAILER_SRC } from '@/constants/brand.const';
import { useI18n } from '@/i18n';
import { HOME_TRAILER_CLASS, HOME_TRAILER_PLAYER_SIZE } from './HomeTrailer.const';

export const HomeTrailer: FC = () => {
  const { t } = useI18n();

  return (
    <div className={HOME_TRAILER_CLASS}>
      <TorchProvider config={{ accentColor: GRID_ACCENT_HEX }}>
        <TorchPlayer
          src={TRAILER_SRC}
          poster={TRAILER_POSTER_SRC}
          size={HOME_TRAILER_PLAYER_SIZE}
          centerOverlay
          title={t.home.trailerTitle}
          autoGeneratePoster
        />
      </TorchProvider>
    </div>
  );
};
