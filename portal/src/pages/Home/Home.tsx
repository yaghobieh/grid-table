import { FC, useEffect } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Typography,
  Container,
  Flex,
  Card,
  CardBody,
  Badge,
  CodeBlock,
  BearIcons,
  Carousel,
} from '@forgedevstack/bear';
import { BrandMark } from '@/components/BrandMark';
import { Layout } from '@/components/Layout';
import { HomeSectionHashTitle } from '@/components/HomeSectionHashTitle';
import {
  STATS,
  FEATURES,
  QUICK_START_CODE,
} from '@/constants';
import { HERO_BRAND_MARK_PX } from '@/constants/brand.const';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { useTypewriter } from '@/hooks';
import {
  FEATURE_ICONS,
  ECO_PACKAGES,
  SHOWCASE_SECTION_ID,
  DEMOS_SECTION_ID,
  FEATURES_SECTION_ID,
} from './Home.const';
import { HomeDemosRail, HomeTrailer } from './helpers';

export const Home: FC = () => {
  const { t } = useI18n();
  const { displayed: typewriterText } = useTypewriter({ texts: t.home.typewriterTexts, loop: true });

  useEffect(() => {
    const id = window.location.hash?.replace(/^#/, '');
    if (!id) return;
    window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }, []);

  const statLabels = [t.stats.features, t.stats.dependencies, t.stats.bundleSize, t.stats.typescript];

  return (
    <Layout>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        {/* Animated mesh bg — CSS only */}
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(34,197,94,0.15), transparent)',
          }}
        />

        <Container className="relative z-10 text-center" style={{ maxWidth: '72rem' }}>
          <Flex justify="center" className="mb-6">
            <BrandMark alt={t.nav.gridTable} sizePx={HERO_BRAND_MARK_PX} />
          </Flex>
          <Flex justify="center" className="mb-6">
            <Badge variant="success" className="px-4 py-1.5 text-sm">
              <Flex align="center" gap={3}>
                <BearIcons.ZapIcon size="sm" />
                v{CURRENT_VERSION} — {t.home.badgeText}
              </Flex>
            </Badge>
          </Flex>

          <Typography variant="h1" className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            {t.home.title}
          </Typography>

          <Typography variant="h2" className="text-2xl md:text-3xl font-medium mb-2" style={{ color: 'var(--text-primary)', opacity: 0.85 }}>
            {t.home.subtitle}
          </Typography>

          {/* Typewriter */}
          <div className="text-lg max-w-2xl mx-auto mb-6" style={{ minHeight: '2rem' }}>
            <span className="font-medium" style={{ color: 'var(--grid-accent)', opacity: 0.8 }}>
              {typewriterText}
              <span className="animate-pulse ml-0.5">|</span>
            </span>
          </div>

          <Flex justify="center" gap={8} wrap="wrap" className="mb-12">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <Typography variant="body1" className="text-3xl font-bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>{statLabels[index]}</Typography>
              </div>
            ))}
          </Flex>

          <Flex justify="center" gap={4} wrap="wrap" className="mb-12">
            <Link to="/demos">
              <Button variant="grid" size="lg" spotlight leftIcon={<BearIcons.PlayIcon size="sm" className="mr-2" />} style={{ gap: '0.5rem' }}>
                {t.home.viewDemos}
              </Button>
            </Link>
            <Link to="/docs/getting-started">
              <Button variant="outline" size="lg" leftIcon={<BearIcons.BookOpenIcon size="sm" className="mr-2" />} style={{ gap: '0.5rem' }}>
                {t.home.documentation}
              </Button>
            </Link>
            <Link to="/theme-builder">
              <Button variant="gridGhost" size="lg" leftIcon={<BearIcons.PaletteIcon size="sm" className="mr-2" />} className="border" style={{ borderColor: 'var(--border-color)', gap: '0.5rem' }}>
                {t.home.themeBuilder}
              </Button>
            </Link>
          </Flex>

          {/* Quick start code */}
          <Flex justify="center" className="mb-16">
            <div className="w-full max-w-2xl text-left">
              <CodeBlock
                code={QUICK_START_CODE}
                title="App.tsx"
                language="typescript"
                copyable
                showLineNumbers
              />
            </div>
          </Flex>
        </Container>
      </section>

      <section
        id={SHOWCASE_SECTION_ID}
        className="py-24 relative overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(34,197,94,0.06), transparent 60%)' }} />

        <Container className="relative z-10" style={{ maxWidth: '72rem' }}>
          <div className="text-center mb-12">
            <Typography variant="overline" className="mb-2 block" style={{ color: 'var(--grid-accent)', opacity: 0.7 }}>
              {t.home.seeItInAction}
            </Typography>
            <HomeSectionHashTitle sectionId={SHOWCASE_SECTION_ID} className="mb-4">
              <Typography variant="h2" className="text-3xl md:text-5xl font-extrabold">
                {t.home.showcaseTitle}
              </Typography>
            </HomeSectionHashTitle>
            <Typography style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto text-lg">
              {t.home.showcaseDescription}
            </Typography>
          </div>
          <HomeTrailer />
        </Container>
      </section>

      <section id={DEMOS_SECTION_ID} className="py-20">
        <Container style={{ maxWidth: '72rem' }}>
          <div className="text-center mb-12">
            <HomeSectionHashTitle sectionId={DEMOS_SECTION_ID} className="mb-4">
              <Typography variant="h2" className="text-3xl md:text-4xl font-bold">
                {t.home.demosAndExamples}
              </Typography>
            </HomeSectionHashTitle>
            <Typography style={{ color: 'var(--text-secondary)' }}>{t.home.exploreExamples}</Typography>
          </div>
          <HomeDemosRail />
        </Container>
      </section>

      <section
        id={FEATURES_SECTION_ID}
        className="py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <Container style={{ maxWidth: '72rem' }}>
          <div className="mb-12 text-center px-2">
            <Typography variant="overline" className="mb-3 block" style={{ color: 'var(--grid-accent)', opacity: 0.7 }}>{t.home.everythingYouNeed}</Typography>
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
              <HomeSectionHashTitle sectionId={FEATURES_SECTION_ID} className="inline-flex">
                <Typography variant="h2" className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-center">
                  {t.home.featureRichDataGrid}
                </Typography>
              </HomeSectionHashTitle>
              <span className="hidden sm:inline select-none opacity-40" style={{ color: 'var(--text-secondary)' }} aria-hidden>·</span>
              <Typography variant="body2" className="text-center sm:text-start max-w-[min(36rem,100%)] sm:max-w-xl leading-snug md:whitespace-nowrap" style={{ color: 'var(--text-secondary)' }}>
                {t.home.builtForReal}
              </Typography>
            </div>
          </div>

          <Carousel
            slidesToShow={4}
            gap={16}
            autoPlay={3600}
            loop
            transition="slide"
            transitionDuration={420}
            showArrows
            indicator="dots"
            pauseOnHover
            activeColor="var(--grid-accent)"
            className="w-full"
            style={{ minHeight: 300 }}
          >
            {FEATURES.map((feature) => {
              const featureT = t.features[feature.icon];
              return (
                <div key={feature.icon} className="h-full px-0.5">
                  <Card variant="ghost" interactive padding="lg" radius="2xl" className="h-full border transition-shadow hover:shadow-lg" style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-primary)', minHeight: 260 }}>
                    <CardBody className="h-full">
                      <Flex direction="column" align="center" gap={4} className="h-full text-center">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                        style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.1))' }}
                      >
                        {FEATURE_ICONS[feature.icon] || <BearIcons.ZapIcon size="md" color="var(--grid-accent)" />}
                      </div>
                      <div className="flex flex-col gap-2 min-h-0">
                        <Typography variant="h4" className="font-bold leading-snug">{featureT?.title ?? feature.title}</Typography>
                        <Typography variant="body2" style={{ color: 'var(--text-secondary)' }} className="leading-relaxed text-sm md:text-base">{featureT?.description ?? feature.description}</Typography>
                      </div>
                      </Flex>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </Carousel>
        </Container>
      </section>

      <section className="py-20">
        <Container style={{ maxWidth: '72rem' }}>
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ border: '1px solid var(--border-color)' }}
          >
            {/* Gradient bg */}
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(22,163,74,0.02) 50%, rgba(34,197,94,0.06) 100%)' }}
            />

            <div className="relative px-8 py-12 md:py-16">
              {/* Header */}
              <div className="text-center mb-10">
                <Typography variant="overline" className="mb-2 block" style={{ color: 'var(--grid-accent)', opacity: 0.7 }}>
                  {t.home.forgeStackEcosystem}
                </Typography>
                <Typography variant="h2" className="text-3xl md:text-4xl font-bold mb-3">
                  {t.home.worksWith}
                </Typography>
                <Typography style={{ color: 'var(--text-secondary)' }} className="max-w-lg mx-auto">
                  {t.home.ecosystemBanner}
                </Typography>
              </div>

              {/* Package pills */}
              <Flex justify="center" gap={3} wrap="wrap" className="mb-8">
                {ECO_PACKAGES.map((pkg) => (
                  <div
                    key={pkg.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-transform hover:scale-105"
                    style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}
                  >
                    {pkg.icon}
                    <Typography variant="body2" className="font-semibold text-sm">{pkg.name}</Typography>
                  </div>
                ))}
              </Flex>

              {/* CTA */}
              <Flex justify="center">
                <a href="https://forgedevstack.com" target="_blank" rel="noopener noreferrer">
                  <Button variant="grid" size="lg" leftIcon={<BearIcons.ExternalLinkIcon size="xs" />}>
                    {t.home.visitForgeStack}
                  </Button>
                </a>
              </Flex>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};
