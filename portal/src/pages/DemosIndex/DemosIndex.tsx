import { FC } from 'react';
import { Typography, Container } from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { HomeDemoCard } from '@/pages/Home/helpers/HomeDemoCard';
import { DEMOS } from '@/constants';
import { useI18n } from '@/i18n';

export const DemosIndex: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="pt-24 pb-20">
        <Container style={{ maxWidth: '80rem' }}>
          <div className="text-center mb-12">
            <Typography variant="h1" className="text-4xl md:text-5xl font-extrabold mb-4">
              {t.demosIndex.title}
            </Typography>
            <Typography className="opacity-50 max-w-2xl mx-auto text-lg">
              {t.demosIndex.description}
            </Typography>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {DEMOS.map((demo) => (
              <HomeDemoCard key={demo.id} demo={demo} />
            ))}
          </div>
        </Container>
      </div>
    </Layout>
  );
};
