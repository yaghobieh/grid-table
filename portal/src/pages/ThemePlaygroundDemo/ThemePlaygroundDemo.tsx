import type { FC } from 'react';
import { useNavigate } from '@forgedevstack/forge-compass/react';
import { useDemoNavigation } from '@/hooks';
import { Button, Typography, Flex, Card, CardBody, Badge, BearIcons } from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import { DemoCodeSection } from '@/components/DemoCodeSection';
import { THEME_PLAYGROUND_DEMO_SOURCE } from './ThemePlaygroundDemo.const';

export const ThemePlaygroundDemo: FC = () => {
  const { t } = useI18n();
  const { navigate } = useNavigate();
  const { openDemosIndex } = useDemoNavigation();

  return (
    <Layout>
      <div className="max-w-[900px] mx-auto px-6 py-8">
        <Flex align="center" gap={3} className="mb-4">
          <Button variant="ghost" size="xs" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />} onClick={openDemosIndex}>{t.common.demos}</Button>
          <Badge variant="warning">{t.tags.interactive}</Badge>
        </Flex>
        <Typography variant="h2" className="text-2xl font-bold mb-2">{t.themePlaygroundPage.title}</Typography>
        <Typography variant="body2" className="opacity-50 mb-8">
          {t.themePlaygroundPage.description}
        </Typography>

        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="ghost" interactive padding="lg" radius="xl" onClick={() => navigate('/theme-builder')}>
            <CardBody>
              <Flex align="center" gap={2} className="mb-2">
                <BearIcons.PaletteIcon size="md" color="var(--grid-accent)" />
                <Typography variant="h3" className="text-lg font-bold">{t.themePlaygroundPage.cardThemeTitle}</Typography>
              </Flex>
              <Typography variant="body2" className="opacity-60">{t.themePlaygroundPage.cardThemeDescription}</Typography>
              <Typography variant="body2" className="mt-3 font-medium" style={{ color: 'var(--grid-accent)' }}>{t.themePlaygroundPage.cardThemeCta}</Typography>
            </CardBody>
          </Card>
          <Card variant="ghost" interactive padding="lg" radius="xl" onClick={() => navigate('/playground')}>
            <CardBody>
              <Flex align="center" gap={2} className="mb-2">
                <BearIcons.CodeIcon size="md" color="var(--grid-accent)" />
                <Typography variant="h3" className="text-lg font-bold">{t.themePlaygroundPage.cardPlayTitle}</Typography>
              </Flex>
              <Typography variant="body2" className="opacity-60">{t.themePlaygroundPage.cardPlayDescription}</Typography>
              <Typography variant="body2" className="mt-3 font-medium" style={{ color: 'var(--grid-accent)' }}>{t.themePlaygroundPage.cardPlayCta}</Typography>
            </CardBody>
          </Card>
        </div>

        <DemoCodeSection title={t.demoCodeTitles.themePlayground} code={THEME_PLAYGROUND_DEMO_SOURCE} />
      </div>
    </Layout>
  );
};
