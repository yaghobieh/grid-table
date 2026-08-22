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
import { Layout } from '@/components/Layout';
import { HomeSectionHashTitle } from '@/components/HomeSectionHashTitle';
import {
  STATS,
  FEATURES,
  DEMOS,
  QUICK_START_CODE,
} from '@/constants';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { useTypewriter } from '@/hooks';
import {
  FEATURE_ICONS,
  DEMO_ICONS,
  SHOWCASE_CARDS,
  ECO_PACKAGES,
} from './Home.const';

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
        id="built-for-every-data-scenario"
        className="py-24 relative overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Decorative radial */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(34,197,94,0.06), transparent 60%)' }} />

        <Container className="relative z-10" style={{ maxWidth: '72rem' }}>
          <div className="text-center mb-16">
            <Typography variant="overline" className="mb-2 block" style={{ color: 'var(--grid-accent)', opacity: 0.7 }}>
              {t.home.seeItInAction}
            </Typography>
            <HomeSectionHashTitle sectionId="built-for-every-data-scenario" className="mb-4">
              <Typography variant="h2" className="text-3xl md:text-5xl font-extrabold">
                {t.home.showcaseTitle}
              </Typography>
            </HomeSectionHashTitle>
            <Typography style={{ color: 'var(--text-secondary)' }} className="max-w-xl mx-auto text-lg">
              {t.home.showcaseDescription}
            </Typography>
          </div>

          {/* Desktop: 2×2 grid  ·  Mobile: stacked */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SHOWCASE_CARDS.map((card) => {
              const sc = t.home.showcase[card.id as keyof typeof t.home.showcase];
              return (
                <div
                  key={card.id}
                  className="group relative rounded-2xl overflow-hidden transition-transform duration-300 hover:-translate-y-1"
                  style={{ border: '1px solid var(--border-color)' }}
                >
                  {/* Gradient header bar */}
                  <div
                    className="px-6 py-5 flex items-center gap-4"
                    style={{ background: card.gradient }}
                  >
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}>
                      {card.icon}
                    </div>
                    <div>
                      <Typography variant="h4" className="font-bold text-white">{sc?.title ?? card.id}</Typography>
                      <Typography variant="body2" className="text-white/70 text-sm">{sc?.description ?? ''}</Typography>
                    </div>
                  </div>

                  {/* Faux preview area */}
                  <div className="px-6 py-5" style={{ backgroundColor: 'var(--bg-primary)' }}>
                    {/* Simulated table rows */}
                    <div className="space-y-2">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all"
                          style={{
                            backgroundColor: 'var(--bg-tertiary)',
                            opacity: 1 - i * 0.15,
                            animationDelay: `${i * 0.1}s`,
                          }}
                        >
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: card.highlight, opacity: 0.6 }} />
                          <div className="flex-1 h-2.5 rounded" style={{ backgroundColor: 'var(--border-color)', width: `${85 - i * 15}%` }} />
                          <div className="w-12 h-2.5 rounded" style={{ backgroundColor: 'var(--border-color)' }} />
                        </div>
                      ))}
                    </div>

                    {/* Bottom accent */}
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((j) => (
                          <div key={j} className="w-2 h-2 rounded-full" style={{ backgroundColor: card.highlight, opacity: 0.3 + j * 0.15 }} />
                        ))}
                      </div>
                      <Typography variant="caption" className="font-mono" style={{ color: card.highlight, opacity: 0.7 }}>
                        {card.id === 'finance' ? 'LIVE' : card.id === 'hr' ? 'TREE' : card.id === 'effects' ? 'FX' : 'LAZY'}
                      </Typography>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section id="demos-and-examples" className="py-20">
        <Container style={{ maxWidth: '72rem' }}>
          <div className="text-center mb-12">
            <HomeSectionHashTitle sectionId="demos-and-examples" className="mb-4">
              <Typography variant="h2" className="text-3xl md:text-4xl font-bold">
                {t.home.demosAndExamples}
              </Typography>
            </HomeSectionHashTitle>
            <Typography style={{ color: 'var(--text-secondary)' }}>{t.home.exploreExamples}</Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {DEMOS.map((demo) => {
              const demoT = t.demos[demo.id as keyof typeof t.demos];
              const previewKey = demo.id as keyof typeof t.home.demoPreview;
              const previewText = t.home.demoPreview[previewKey] ?? '';
              return (
                <Link key={demo.id} to={demo.path} className="block group">
                  <Card variant="ghost" interactive padding="none" radius="2xl" className="h-full overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                    <CardBody className="p-0">
                      {/* Visual preview header */}
                      <div
                        className="relative px-6 py-8"
                        style={{
                          background: `linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(22,163,74,0.04) 100%)`,
                        }}
                      >
                        {/* Browser dots */}
                        <Flex align="center" gap={1} className="absolute top-3 left-4">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ef4444', opacity: 0.5 }} />
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#eab308', opacity: 0.5 }} />
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22c55e', opacity: 0.5 }} />
                        </Flex>

                        {/* Demo icon + simulated preview */}
                        <Flex direction="column" align="center" gap={3} className="mt-2">
                          <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
                          >
                            {DEMO_ICONS[demo.icon]}
                          </div>

                          {/* Preview text */}
                          <Typography variant="caption" className="font-mono text-center px-4 py-1.5 rounded-lg" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '11px', maxWidth: '100%' }}>
                            {previewText}
                          </Typography>
                        </Flex>
                      </div>

                      {/* Card body */}
                      <div className="px-6 py-5">
                        <Flex align="center" justify="between" className="mb-2">
                          <Typography variant="h4" className="font-bold">{demoT?.title ?? demo.id}</Typography>
                          {demo.tag && (
                            <Badge variant={demo.tag === 'New' ? 'info' : demo.tag === 'Popular' ? 'success' : 'secondary'} className="text-xs">
                              {t.tags[demo.tag.toLowerCase() as keyof typeof t.tags] ?? demo.tag}
                            </Badge>
                          )}
                        </Flex>
                        <Typography variant="body2" style={{ color: 'var(--text-secondary)' }} className="mb-3">
                          {demoT?.description ?? ''}
                        </Typography>
                        <Typography variant="caption" className="font-semibold" style={{ color: 'var(--grid-accent)' }}>
                          {t.home.viewLive}
                        </Typography>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section
        id="feature-rich-data-grid"
        className="py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <Container style={{ maxWidth: '72rem' }}>
          <div className="mb-12 text-center px-2">
            <Typography variant="overline" className="mb-3 block" style={{ color: 'var(--grid-accent)', opacity: 0.7 }}>{t.home.everythingYouNeed}</Typography>
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-2">
              <HomeSectionHashTitle sectionId="feature-rich-data-grid" className="inline-flex">
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
