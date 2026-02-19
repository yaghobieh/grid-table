import { FC } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Typography,
  Container,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  Badge,
  GradientText,
  BearIcons,
} from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { DEMOS } from '@/constants';
import { useI18n } from '@/i18n';
import { DEMO_ICONS, TAG_VARIANT, GRADIENT_PRIMARY } from './DemosIndex.const';

export const DemosIndex: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <Container style={{ maxWidth: '72rem' }}>
          <div className="text-center mb-16">
            <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold mb-4">
              <GradientText colors={GRADIENT_PRIMARY}>{t.demosIndex.title}</GradientText>
            </Typography>
            <Typography className="opacity-50 max-w-xl mx-auto text-lg">
              {t.demosIndex.description}
            </Typography>
          </div>

          <Grid cols={{ base: 1, md: 2 }} gap={8}>
            {DEMOS.map((demo) => {
              const demoT = t.demos[demo.id as keyof typeof t.demos];
              return (
                <GridItem key={demo.id}>
                  <Link to={demo.path} className="block h-full">
                    <Card variant="ghost" interactive padding="xl" radius="2xl" className="h-full">
                      <CardBody>
                        <Flex align="center" justify="between" className="mb-6">
                          <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.08))' }}
                          >
                            {DEMO_ICONS[demo.icon]}
                          </div>
                          {demo.tag && (
                            <Badge
                              variant={(TAG_VARIANT[demo.tag] ?? 'secondary') as 'success'}
                              className="text-xs px-3"
                            >
                              {t.tags[demo.tag.toLowerCase() as keyof typeof t.tags] ?? demo.tag}
                            </Badge>
                          )}
                        </Flex>
                        <Typography variant="h3" className="text-xl font-bold mb-2">
                          {demoT?.title ?? demo.title}
                        </Typography>
                        <Typography className="opacity-60 leading-relaxed">
                          {demoT?.description ?? demo.description}
                        </Typography>
                        <Flex align="center" gap={2} className="mt-4">
                          <Typography variant="body2" style={{ color: 'var(--grid-accent)' }} className="font-medium">
                            {t.demosIndex.viewDemo}
                          </Typography>
                          <BearIcons.ArrowRightIcon size="xs" color="var(--grid-accent)" />
                        </Flex>
                      </CardBody>
                    </Card>
                  </Link>
                </GridItem>
              );
            })}
          </Grid>
        </Container>
      </div>
    </Layout>
  );
};
