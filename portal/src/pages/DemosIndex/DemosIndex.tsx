import { FC } from 'react';
import { useDemoNavigation } from '@/hooks';
import {
  Typography,
  Container,
  Flex,
  Card,
  CardBody,
  Badge,
  GradientText,
  BearIcons,
} from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { DEMOS } from '@/constants';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { DEMO_ICONS, TAG_VARIANT, GRADIENT_PRIMARY } from './DemosIndex.const';

const ICON_BG = 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.08))';

export const DemosIndex: FC = () => {
  const { t } = useI18n();
  const { openDemo } = useDemoNavigation();

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <Container style={{ maxWidth: '80rem' }}>
          <div className="text-center mb-12">
            <Flex align="center" justify="center" gap={3} className="mb-4">
              <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold">
                <GradientText colors={GRADIENT_PRIMARY}>{t.demosIndex.title}</GradientText>
              </Typography>
              <Badge variant="info" className="text-xs">{CURRENT_VERSION}</Badge>
            </Flex>
            <Typography className="opacity-50 max-w-2xl mx-auto text-lg">
              {t.demosIndex.description}
            </Typography>
          </div>

          <div
            className="mb-12 rounded-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(59,130,246,0.06))',
              border: '1px solid rgba(34,197,94,0.15)',
              padding: '24px 32px',
            }}
          >
            <Flex align="center" gap={3} className="mb-4">
              <Badge variant="success" className="text-xs px-3">{t.tags.new}</Badge>
              <Typography variant="h3" className="text-lg font-bold">
                {t.demosIndex.whatsNew} v{CURRENT_VERSION}
              </Typography>
            </Flex>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '8px 24px',
              }}
            >
              {t.demosIndex.releaseHighlights.map((h, i) => (
                <Flex key={i} align="center" gap={2}>
                  <span style={{ color: '#22c55e', fontSize: 14, flexShrink: 0 }}>✓</span>
                  <Typography variant="body2" className="opacity-70" style={{ fontSize: '0.85rem' }}>
                    {h}
                  </Typography>
                </Flex>
              ))}
            </div>
            <div className="mt-4">
              <Flex
                align="center"
                gap={2}
                style={{ cursor: 'pointer' }}
                onClick={() => openDemo('/demos/features')}
              >
                <Typography variant="body2" style={{ color: 'var(--grid-accent)' }} className="font-medium">
                  {t.demosIndex.seeAllFeatures}
                </Typography>
                <BearIcons.ArrowRightIcon size="xs" color="var(--grid-accent)" />
              </Flex>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 20,
            }}
          >
            {DEMOS.map((demo) => {
              const demoT = t.demos[demo.id as keyof typeof t.demos];
              return (
                <div key={demo.id} className="block h-full" style={{ cursor: 'pointer' }} onClick={() => openDemo(demo.path)}>
                  <Card variant="ghost" interactive padding="lg" radius="xl" className="h-full" style={{ transition: 'transform 0.15s, box-shadow 0.15s' }}>
                    <CardBody>
                      <Flex align="center" justify="between" className="mb-4">
                        <div
                          className="flex items-center justify-center"
                          style={{
                            width: 48,
                            height: 48,
                            borderRadius: 12,
                            background: ICON_BG,
                          }}
                        >
                          {DEMO_ICONS[demo.icon]}
                        </div>
                        {demo.tag && (
                          <Badge
                            variant={(TAG_VARIANT[demo.tag] ?? 'secondary') as 'success'}
                            className="text-xs px-2"
                          >
                            {t.tags[demo.tag.toLowerCase() as keyof typeof t.tags] ?? demo.tag}
                          </Badge>
                        )}
                      </Flex>
                      <Typography variant="h3" className="text-base font-bold mb-1">
                        {demoT?.title ?? demo.title}
                      </Typography>
                      <Typography className="opacity-50 text-sm leading-relaxed" style={{ minHeight: 44 }}>
                        {demoT?.description ?? demo.description}
                      </Typography>
                      <Flex align="center" gap={2} className="mt-3">
                        <Typography variant="body2" style={{ color: 'var(--grid-accent)', fontSize: '0.8rem' }} className="font-medium">
                          {t.demosIndex.viewDemo}
                        </Typography>
                        <BearIcons.ArrowRightIcon size="xs" color="var(--grid-accent)" />
                      </Flex>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </Container>
      </div>
    </Layout>
  );
};
