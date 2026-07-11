import { FC, useState, useCallback } from 'react';
import { Button, Typography, Flex, Badge, Card, CardBody, CodeBlock } from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { useI18n } from '@/i18n';
import {
  AI_MODEL_PROMPT_FORMATS,
  GRID_TABLE_SKILLS,
  SKILLS_EXAMPLE_PROMPTS,
  SKILLS_INSTALL_CMD,
  formatExamplePrompt,
  formatSkillInvoke,
} from '@/constants/skills.const';

const CopyPromptButton: FC<{ text: string; label?: string }> = ({ text, label }) => {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <Button size="sm" variant="outline" onClick={handleCopy}>
      {copied ? t.skillsPage.copied : (label ?? t.skillsPage.copy)}
    </Button>
  );
};

export const Skills: FC = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Flex align="center" gap={3} className="mb-4">
          <Badge variant="success">{t.skillsPage.badge}</Badge>
        </Flex>
        <Typography variant="h1" className="text-3xl font-bold mb-3">
          {t.skillsPage.title}
        </Typography>
        <Typography variant="body1" className="opacity-70 mb-10">
          {t.skillsPage.description}
        </Typography>

        <section className="mb-10">
          <Typography variant="h4" className="text-lg font-semibold mb-3">
            {t.skillsPage.installTitle}
          </Typography>
          <Typography variant="body2" className="opacity-60 mb-4">
            {t.skillsPage.installDescription}
          </Typography>
          <CodeBlock code={SKILLS_INSTALL_CMD} language="bash" showLineNumbers={false} />
        </section>

        <section className="mb-10">
          <Typography variant="h4" className="text-lg font-semibold mb-4">
            {t.skillsPage.includedTitle}
          </Typography>
          <div className="space-y-3">
            {GRID_TABLE_SKILLS.map((skill) => (
              <Card key={skill.slug} variant="ghost" padding="md" radius="lg">
                <CardBody>
                  <Flex align="center" justify="between" className="mb-1">
                    <Typography variant="body2" className="font-mono font-semibold" style={{ color: 'var(--grid-accent)' }}>
                      {skill.name}
                    </Typography>
                    <Typography variant="caption" className="opacity-50">skill</Typography>
                  </Flex>
                  <Typography variant="body2" className="opacity-60 mb-3">
                    {skill.description}
                  </Typography>
                  <Typography variant="caption" className="font-mono block mb-3 opacity-70">
                    {skill.invoke}
                  </Typography>
                  <Flex gap={2} wrap="wrap">
                    {AI_MODEL_PROMPT_FORMATS.map((model) => (
                      <CopyPromptButton
                        key={`${skill.slug}-${model.id}`}
                        text={formatSkillInvoke(skill, model.id)}
                        label={`${t.skillsPage.copyFor} ${model.label}`}
                      />
                    ))}
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <Typography variant="h4" className="text-lg font-semibold mb-4">
            {t.skillsPage.examplesTitle}
          </Typography>
          <div className="space-y-3">
            {SKILLS_EXAMPLE_PROMPTS.map((prompt) => (
              <Card key={prompt} variant="ghost" padding="md" radius="lg">
                <CardBody>
                  <Typography variant="body2" className="mb-3">
                    {prompt}
                  </Typography>
                  <Flex gap={2} wrap="wrap">
                    {AI_MODEL_PROMPT_FORMATS.map((model) => (
                      <CopyPromptButton
                        key={`${prompt}-${model.id}`}
                        text={formatExamplePrompt(prompt, model.id)}
                        label={`${t.skillsPage.copyFor} ${model.label}`}
                      />
                    ))}
                  </Flex>
                </CardBody>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};
