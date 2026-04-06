import type { FC, ReactNode } from 'react';
import { Typography, CodeBlock } from '@forgedevstack/bear';

export type DemoCodeSectionProps = {
  title: string;
  code: string;
  language?: string;
  description?: ReactNode;
};

export const DemoCodeSection: FC<DemoCodeSectionProps> = (props) => {
  const { title, code, language = 'tsx', description } = props;
  return (
    <section className="mt-8">
      <Typography variant="h4" className="text-base font-semibold mb-2">{title}</Typography>
      {description ? (
        <Typography variant="body2" className="opacity-60 mb-3 leading-relaxed">{description}</Typography>
      ) : null}
      <CodeBlock code={code} language={language} copyable showLineNumbers />
    </section>
  );
};
