import { FC, useMemo, useState } from 'react';
import { Link, useRoute, useNavigate } from '@forgedevstack/forge-compass/react';
import {
  Typography,
  Flex,
  Card,
  CardBody,
  Badge,
  BearIcons,
  CodeBlock,
  Sidebar,
  Button,
  Drawer,
} from '@forgedevstack/bear';
import { Layout } from '@/components/Layout';
import { DOC_SECTIONS, API_SECTIONS } from '@/constants';
import { DOC_CONTENT_MAP } from '@/constants/docs.const';
import { DOC_MAX_CONTENT_WIDTH_PX } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import { DOC_ICON_MAP } from './DocsPage.const';
import type { DocSidebarItem } from './DocsPage.types';

// ── Build sidebar items for Bear Sidebar ─────────────
const buildSidebarItems = (): DocSidebarItem[] =>
  DOC_SECTIONS.map((section) => ({
    id: section.id,
    label: section.title,
    icon: DOC_ICON_MAP[section.icon],
    href: section.path,
  }));

// ── Simple Markdown Renderer ─────────────────────────
const MarkdownContent: FC<{ content: string }> = ({ content }) => {
  const blocks = useMemo(() => parseMarkdown(content), [content]);

  return (
    <div className="docs-content space-y-4">
      {blocks.map((block, i) => (
        <div key={i}>{block}</div>
      ))}
    </div>
  );
};

function parseMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n');
  const nodes: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().replace(/^```/, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      nodes.push(
        <CodeBlock
          key={nodes.length}
          code={codeLines.join('\n')}
          language={lang || 'tsx'}
          copyable
          showLineNumbers
        />
      );
      continue;
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').map((s) => s.trim()).filter(Boolean);
      i += 2; // skip header + divider
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes('|')) {
        rows.push(lines[i].split('|').map((s) => s.trim()).filter(Boolean));
        i++;
      }
      nodes.push(
        <div key={nodes.length} className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border-color)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                {headers.map((h, hi) => (
                  <th key={hi} className="px-4 py-2 text-left font-semibold" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <Typography variant="body2" className="font-semibold">{h}</Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2" style={{ color: 'var(--text-primary)' }}>
                      <Typography variant="body2">{renderInlineCode(cell)}</Typography>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Heading
    if (line.startsWith('## ')) {
      nodes.push(
        <Typography key={nodes.length} variant="h3" className="text-2xl font-bold mt-8 mb-4" style={{ color: 'var(--text-primary)' }}>
          {line.replace('## ', '')}
        </Typography>
      );
      i++;
      continue;
    }
    if (line.startsWith('### ')) {
      nodes.push(
        <Typography key={nodes.length} variant="h4" className="text-lg font-bold mt-6 mb-2" style={{ color: 'var(--text-primary)' }}>
          {line.replace('### ', '')}
        </Typography>
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith('- ')) {
      nodes.push(
        <Flex key={nodes.length} align="start" gap={2} className="ml-2">
          <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: 'var(--grid-accent)' }} />
          <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>{renderInlineCode(line.replace('- ', ''))}</Typography>
        </Flex>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Paragraph
    nodes.push(
      <Typography key={nodes.length} variant="body1" className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {renderInlineCode(line)}
      </Typography>
    );
    i++;
  }

  return nodes;
}

function renderInlineCode(text: string): React.ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded text-xs font-mono"
          style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--grid-accent)' }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    // Bold
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      if (bp.startsWith('**') && bp.endsWith('**')) {
        return <strong key={`${i}-${j}`}>{bp.slice(2, -2)}</strong>;
      }
      // Link
      const linkMatch = bp.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        const before = bp.substring(0, bp.indexOf('['));
        const after = bp.substring(bp.indexOf(')') + 1);
        return (
          <span key={`${i}-${j}`}>
            {before}
            <Link to={linkMatch[2]} style={{ color: 'var(--grid-accent)' }} className="hover:underline">
              {linkMatch[1]}
            </Link>
            {after}
          </span>
        );
      }
      return bp;
    });
  });
}

// ── API Reference Component ──────────────────────────
const ApiReference: FC = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-12">
      <Typography variant="h3" className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{t.docsPage.apiReference}</Typography>
      <Typography style={{ color: 'var(--text-secondary)' }}>
        {t.docsPage.apiDescription}
      </Typography>

      {API_SECTIONS.map((section) => (
        <div key={section.id}>
          <Typography variant="h4" className="text-xl font-bold mb-2 mt-8" style={{ color: 'var(--text-primary)' }}>{section.title}</Typography>
          <Typography style={{ color: 'var(--text-muted)' }} className="mb-4">{section.description}</Typography>

          <div className="overflow-x-auto rounded-lg" style={{ border: '1px solid var(--border-color)' }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <th className="px-4 py-3 text-left font-semibold" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <Typography variant="body2" className="font-semibold">{t.docsPage.prop}</Typography>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <Typography variant="body2" className="font-semibold">{t.docsPage.type}</Typography>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <Typography variant="body2" className="font-semibold">{t.docsPage.default}</Typography>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold" style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>
                    <Typography variant="body2" className="font-semibold">{t.docsPage.description}</Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {section.props.map((prop) => (
                  <tr key={prop.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td className="px-4 py-2.5">
                      <Flex align="center" gap={2}>
                        <code className="text-xs font-mono" style={{ color: 'var(--grid-accent)' }}>{prop.name}</code>
                        {prop.required && <Badge variant="error" className="text-[10px] px-1">{t.docsPage.required}</Badge>}
                      </Flex>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>{prop.type}</code>
                    </td>
                    <td className="px-4 py-2.5">
                      <code className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{prop.default}</code>
                    </td>
                    <td className="px-4 py-2.5">
                      <Typography variant="body2" style={{ color: 'var(--text-secondary)' }}>{prop.description}</Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Main DocsPage ────────────────────────────────────
export const DocsPage: FC = () => {
  const { t } = useI18n();
  const route = useRoute();
  const { navigate } = useNavigate();

  // Extract slug from route params or path
  const currentSlug = (route?.params as Record<string, string>)?.slug || 'getting-started';
  const isApiRef = currentSlug === 'api-reference';
  const content = DOC_CONTENT_MAP[currentSlug];
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const sidebarItems = useMemo(() => buildSidebarItems(), []);

  const handleSidebarClick = (item: DocSidebarItem) => {
    const section = DOC_SECTIONS.find((s) => s.id === item.id);
    if (section) {
      navigate(section.path);
      setMobileNavOpen(false);
    }
  };

  return (
    <Layout>
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <Flex gap={8}>
            {/* ── Desktop Sidebar (Bear Sidebar) ── */}
            <div className="hidden lg:block flex-shrink-0 sticky top-24 self-start">
              <Sidebar
                items={sidebarItems}
                activeItemId={currentSlug}
                onItemClick={handleSidebarClick}
                activeVariant="indicator"
                width={260}
                header={
                  <Flex align="center" gap={2} className="px-2">
                    <BearIcons.BookOpenIcon size="xs" color="var(--grid-accent)" />
                    <Typography variant="body2" className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {t.docsPage.documentation}
                    </Typography>
                  </Flex>
                }
                style={{ backgroundColor: 'transparent', border: 'none' }}
              />
            </div>

            {/* ── Content ────────────────── */}
            <main className="flex-1 min-w-0" style={{ maxWidth: DOC_MAX_CONTENT_WIDTH_PX }}>
              {/* Mobile nav toggle */}
              <div className="lg:hidden mb-6">
                <Button
                  variant="gridGhost"
                  size="sm"
                  leftIcon={<BearIcons.MenuIcon size="xs" />}
                  onClick={() => setMobileNavOpen(true)}
                  className="w-full"
                  style={{ borderColor: 'var(--border-color)', border: '1px solid var(--border-color)' }}
                >
                  <Flex align="center" justify="between" className="w-full">
                    <Typography variant="body2" style={{ color: 'var(--text-primary)' }}>
                      {DOC_SECTIONS.find((s) => s.id === currentSlug)?.title || t.docsPage.selectSection}
                    </Typography>
                    <BearIcons.ChevronDownIcon size="xs" />
                  </Flex>
                </Button>
              </div>

              {/* Mobile Drawer */}
              <Drawer
                isOpen={mobileNavOpen}
                onClose={() => setMobileNavOpen(false)}
                side="left"
                size="sm"
              >
                <div className="p-4">
                  <Flex align="center" gap={2} className="mb-6">
                    <BearIcons.BookOpenIcon size="xs" color="var(--grid-accent)" />
                    <Typography variant="h5" className="font-bold">{t.docsPage.documentation}</Typography>
                  </Flex>

                  <div className="space-y-1">
                    {DOC_SECTIONS.map((section) => {
                      const isActive = section.id === currentSlug;
                      return (
                        <Link
                          key={section.id}
                          to={section.path}
                          onClick={() => setMobileNavOpen(false)}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all"
                          style={{
                            backgroundColor: isActive ? 'var(--bg-tertiary)' : 'transparent',
                            color: isActive ? 'var(--grid-accent)' : 'var(--text-primary)',
                          }}
                        >
                          {DOC_ICON_MAP[section.icon]}
                          <Typography variant="body2" className={isActive ? 'font-semibold' : ''}>
                            {section.title}
                          </Typography>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Drawer>

              {isApiRef ? (
                <ApiReference />
              ) : content ? (
                <MarkdownContent content={content} />
              ) : (
                <div className="text-center py-20">
                  <BearIcons.FileTextIcon size="lg" className="mx-auto mb-4" style={{ color: 'var(--text-muted)', opacity: 0.3 }} />
                  <Typography variant="h4" className="font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{t.docsPage.pageNotFound}</Typography>
                  <Typography className="mb-4" style={{ color: 'var(--text-muted)' }}>
                    {t.docsPage.pageNotFoundDesc}
                  </Typography>
                  <Link to="/docs/getting-started">
                    <Button variant="grid" size="sm" leftIcon={<BearIcons.ArrowLeftIcon size="xs" />}>
                      {t.docsPage.goToGettingStarted}
                    </Button>
                  </Link>
                </div>
              )}
            </main>
          </Flex>
        </div>
      </div>
    </Layout>
  );
};
