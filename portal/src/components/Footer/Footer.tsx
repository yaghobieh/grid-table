import { FC } from 'react';
import {
  Typography,
  Flex,
  Divider,
  Button,
  BearIcons,
} from '@forgedevstack/bear';
import { FOOTER_LINKS } from '@/constants';
import { useI18n } from '@/i18n';
import { FOOTER_LINK_ICONS } from './Footer.const';

export const Footer: FC = () => {
  const { t } = useI18n();

  return (
    <footer className="py-16" style={{ borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-6">
        <Flex direction={{ base: 'column', md: 'row' }} align="center" justify="between" gap={8}>
          {/* Logo */}
          <Flex align="center" gap={3}>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
            >
              <BearIcons.TableIcon size="xs" color="#fff" />
            </div>
            <div>
              <Typography variant="h5" className="font-bold">{t.nav.gridTable}</Typography>
              <Typography variant="caption" style={{ color: 'var(--text-muted)' }}>{t.footer.partOfForgeStack}</Typography>
            </div>
          </Flex>

          {/* Links as Bear Buttons with leftIcon */}
          <Flex align="center" gap={3} wrap="wrap" justify="center">
            {FOOTER_LINKS.map((link, idx) => (
              <a key={idx} href={link.href} target="_blank" rel="noopener noreferrer">
                <Button
                  variant="gridGhost"
                  size="sm"
                  leftIcon={FOOTER_LINK_ICONS[link.label] || <BearIcons.ExternalLinkIcon size="xs" />}
                >
                  {link.label}
                </Button>
              </a>
            ))}
          </Flex>

          {/* Meta */}
          <Flex align="center" gap={4}>
            <Typography variant="caption" style={{ color: 'var(--text-muted)' }}>{t.footer.mitLicense}</Typography>
            <Divider orientation="vertical" className="h-4" />
            <Typography variant="caption" style={{ color: 'var(--text-muted)' }}>
              {t.footer.builtWith} <span style={{ color: 'var(--grid-accent)' }}>Bear UI</span>
            </Typography>
          </Flex>
        </Flex>

        <Divider className="my-8" style={{ opacity: 0.1 }} />

        <div className="text-center">
          <Typography variant="caption" style={{ color: 'var(--text-muted)', opacity: 0.7 }}>
            {t.footer.ecosystemText}{' '}
            <a href="https://forgedevstack.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--grid-accent)' }}>
              ForgeStack
            </a>{' '}
            ecosystem.
          </Typography>
        </div>
      </div>
    </footer>
  );
};
