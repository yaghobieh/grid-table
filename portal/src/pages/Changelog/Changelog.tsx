import { FC } from 'react';
import {
  Typography,
  Container,
  Flex,
  Badge,
  Card,
  CardBody,
  BearIcons,
  GradientText,
} from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { VERSIONS } from '@/constants';
import { useI18n } from '@/i18n';
import { CURRENT_VERSION } from '@/constants/numbers.const';

const GRADIENT: [string, string] = ['#22c55e', '#16a34a'];

export const Changelog: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <Container style={{ maxWidth: '56rem' }} className="py-16">
        <div className="text-center mb-12">
          <Badge variant="success" className="mb-4 px-3 py-1 text-xs font-mono">
            v{CURRENT_VERSION}
          </Badge>
          <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold mb-4">
            <GradientText colors={GRADIENT}>{t.changelog.title}</GradientText>
          </Typography>
          <Typography style={{ color: 'var(--text-secondary)' }} className="text-lg">
            {t.changelog.description}
          </Typography>
        </div>

        <div className="relative">
          <div
            className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
            style={{ backgroundColor: 'var(--border-color)' }}
          />

          <div className="space-y-8">
            {VERSIONS.map((ver, idx) => {
              const isCurrent = idx === 0;
              return (
                <div key={ver.version} className="relative pl-14 md:pl-20">
                  <div
                    className="absolute left-4 md:left-6 w-4 h-4 rounded-full border-2"
                    style={{
                      borderColor: isCurrent ? '#22c55e' : 'var(--border-color)',
                      backgroundColor: isCurrent ? '#22c55e' : 'var(--bg-primary)',
                      top: '1.5rem',
                    }}
                  />

                  <Card variant="ghost" padding="lg" radius="xl" className={isCurrent ? 'ring-1 ring-green-500/20' : ''}>
                    <CardBody>
                      <Flex align="center" gap={3} className="mb-3">
                        <Badge variant={isCurrent ? 'success' : 'secondary'} className="font-mono text-sm px-3">
                          v{ver.version}
                        </Badge>
                        <Typography variant="caption" style={{ color: 'var(--text-muted)' }}>
                          {new Date(ver.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </Typography>
                        {isCurrent && (
                          <Badge variant="info" className="text-xs">
                            {t.changelog.latest}
                          </Badge>
                        )}
                      </Flex>

                      <ul className="space-y-2">
                        {(t.changelog.versions[ver.version]?.highlights ?? []).map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <BearIcons.CheckIcon size="xs" color="#22c55e" className="mt-0.5 flex-shrink-0" />
                            <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>
                              {h}
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </CardBody>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </Layout>
  );
};
