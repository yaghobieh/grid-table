import type { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Badge,
  Card,
  CardBody,
  Flex,
  Typography,
} from '@forgedevstack/bear';
import { EMPTY_STRING } from '@/constants/strings.const';
import { useI18n } from '@/i18n';
import { DEMO_ICONS } from '../../Home.const';
import {
  DEFAULT_DEMO_TAG_VARIANT,
  DEMO_CARD_HEADER_GRADIENT,
  DEMO_CARD_ICON_GRADIENT,
  DEMO_DOT_GREEN,
  DEMO_DOT_OPACITY,
  DEMO_DOT_RED,
  DEMO_DOT_YELLOW,
  DEMO_PREVIEW_FONT_SIZE_PX,
  DEMO_TAG_VARIANT,
  HOME_DEMO_CARD_CLASS,
} from './HomeDemoCard.const';
import type { HomeDemoCardProps } from './HomeDemoCard.types';

export const HomeDemoCard: FC<HomeDemoCardProps> = (props) => {
  const { demo } = props;
  const { t } = useI18n();
  const demoT = t.demos[demo.id];
  const previewKey = demo.id as keyof typeof t.home.demoPreview;
  const previewText = t.home.demoPreview[previewKey] ?? EMPTY_STRING;
  const tagVariant = demo.tag
    ? (DEMO_TAG_VARIANT[demo.tag] ?? DEFAULT_DEMO_TAG_VARIANT)
    : DEFAULT_DEMO_TAG_VARIANT;
  const tagLabel = demo.tag
    ? (t.tags[demo.tag.toLowerCase() as keyof typeof t.tags] ?? demo.tag)
    : EMPTY_STRING;

  return (
    <Link to={demo.path} className={`block group h-full ${HOME_DEMO_CARD_CLASS}`}>
      <Card variant="ghost" interactive padding="none" radius="2xl" className="h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
        <CardBody className="p-0">
          <div
            className="relative px-6 py-8"
            style={{
              background: DEMO_CARD_HEADER_GRADIENT,
            }}
          >
            <Flex align="center" gap={1} className="absolute top-3 left-4">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DEMO_DOT_RED, opacity: DEMO_DOT_OPACITY }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DEMO_DOT_YELLOW, opacity: DEMO_DOT_OPACITY }} />
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: DEMO_DOT_GREEN, opacity: DEMO_DOT_OPACITY }} />
            </Flex>
            <Flex direction="column" align="center" gap={3} className="mt-2">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: DEMO_CARD_ICON_GRADIENT }}
              >
                {DEMO_ICONS[demo.icon]}
              </div>
              {previewText ? (
                <Typography variant="caption" className="font-mono text-center px-4 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: `${DEMO_PREVIEW_FONT_SIZE_PX}px`, maxWidth: '100%' }}>
                  {previewText}
                </Typography>
              ) : null}
            </Flex>
          </div>
          <div className="px-6 py-5">
            <Flex align="center" justify="between" className="mb-2">
              <Typography variant="h4" className="font-bold">{demoT?.title ?? demo.id}</Typography>
              {demo.tag ? (
                <Badge variant={tagVariant} className="text-xs">
                  {tagLabel}
                </Badge>
              ) : null}
            </Flex>
            <Typography variant="body2" style={{ color: 'var(--text-secondary)' }} className="mb-3">
              {demoT?.description ?? EMPTY_STRING}
            </Typography>
            <Typography variant="caption" className="font-semibold" style={{ color: 'var(--grid-accent)' }}>
              {t.home.viewLive}
            </Typography>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
};
