import { FC, useState, useEffect, useCallback } from 'react';
import { Link } from '@forgedevstack/forge-compass/react';
import {
  Button,
  Typography,
  Flex,
  Badge,
  BearIcons,
  Dropdown,
  useBear,
  Marquee,
} from '@forgedevstack/bear';
import { BrandMark } from '@/components/BrandMark';
import { NAV_ITEMS } from '@/constants';
import { NAV_BRAND_MARK_PX } from '@/constants/brand.const';
import { CURRENT_VERSION } from '@/constants/numbers.const';
import { useI18n } from '@/i18n';
import type { Locale } from '@/i18n';
import { SearchModal } from '@/components/SearchModal';

const LOCALE_META: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '🇺🇸', label: 'English' },
  es: { flag: '🇪🇸', label: 'Español' },
  he: { flag: '🇮🇱', label: 'עברית' },
};

const GITHUB_URL = 'https://github.com/yaghobieh/grid-table';
const NPM_URL = 'https://www.npmjs.com/package/@forgedevstack/grid-table';

export const Navbar: FC = () => {
  const { mode, toggleMode } = useBear();
  const { t, locale, setLocale } = useI18n();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const localeDropdownItems = (Object.keys(LOCALE_META) as Locale[]).map((loc) => ({
    key: loc,
    label: `${LOCALE_META[loc].flag}  ${LOCALE_META[loc].label}`,
    onClick: () => setLocale(loc),
  }));

  return (
    <>
      <nav
        className="sticky top-0 z-50 backdrop-blur-md"
        style={{
          backgroundColor: mode === 'dark' ? 'rgba(10, 10, 20, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center">
          <Flex align="center" gap={4} className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-3">
              <BrandMark alt={t.nav.gridTable} sizePx={NAV_BRAND_MARK_PX} />
              <Typography variant="h5" className="font-bold">{t.nav.gridTable}</Typography>
            </Link>
            <Badge variant="success" className="hidden md:inline-flex text-xs font-mono">
              v{CURRENT_VERSION}
            </Badge>
          </Flex>

          <Flex align="center" gap={6} className="hidden md:flex flex-1 justify-center">
            {NAV_ITEMS.map((item) =>
              item.external ? (
                <a key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
                  <Typography variant="body2" className="hover:opacity-100 opacity-60 transition-opacity cursor-pointer whitespace-nowrap">
                    {t.nav[item.id as keyof typeof t.nav] ?? item.label}
                  </Typography>
                </a>
              ) : (
                <Link key={item.id} to={item.href}>
                  <Typography variant="body2" className="hover:opacity-100 opacity-60 transition-opacity cursor-pointer whitespace-nowrap">
                    {t.nav[item.id as keyof typeof t.nav] ?? item.label}
                  </Typography>
                </Link>
              ),
            )}
          </Flex>

          <Flex align="center" gap={2} className="flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              leftIcon={<BearIcons.SearchIcon size="sm" className="mr-1" style={{ color: 'var(--text-primary)' }} />}
              onClick={() => setSearchOpen(true)}
              className="hidden md:inline-flex"
              style={{ border: '1px solid var(--border-color)', borderRadius: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}
            >
              <span className="font-mono">⌘K</span>
            </Button>

            <a href={NPM_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                icon={<BearIcons.PackageIcon size="sm" style={{ color: 'var(--text-primary)' }} />}
                aria-label="npm"
              />
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="sm"
                icon={<BearIcons.GithubIcon size="sm" style={{ color: 'var(--text-primary)' }} />}
                aria-label="GitHub"
              />
            </a>
            <Dropdown
              trigger={
                <Button variant="ghost" size="sm" leftIcon={<BearIcons.GlobeIcon size="sm" className="mr-1" style={{ color: 'var(--text-primary)' }} />} className="font-mono text-xs">
                  {LOCALE_META[locale].flag}
                </Button>
              }
              items={localeDropdownItems}
              placement="bottom-end"
              size="sm"
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMode}
              aria-label={t.nav.toggleTheme}
              icon={
                mode === 'dark' ? (
                  <BearIcons.SunIcon size="sm" style={{ color: 'var(--text-primary)' }} />
                ) : (
                  <BearIcons.MoonIcon size="sm" style={{ color: 'var(--text-primary)' }} />
                )
              }
            />
            <Link to="/theme-builder" className="hidden sm:inline-flex">
              <Button variant="gridGhost" size="sm" leftIcon={<BearIcons.PaletteIcon size="sm" className="mr-1.5" style={{ color: 'var(--text-primary)' }} />} className="border" style={{ borderColor: 'var(--border-color)', gap: '0.5rem' }}>
                {t.nav.themeBuilder}
              </Button>
            </Link>
            <Link to="/docs/getting-started" className="hidden sm:inline-flex">
              <Button variant="grid" size="sm" leftIcon={<BearIcons.BookOpenIcon size="sm" className="mr-1.5" style={{ color: 'var(--text-primary)' }} />} style={{ gap: '0.5rem' }}>
                {t.nav.getStarted}
              </Button>
            </Link>
          </Flex>
        </div>
      </nav>

      <div
        className="w-full overflow-hidden border-b"
        style={{
          borderColor: 'var(--border-color)',
          backgroundColor: mode === 'dark' ? 'rgba(10, 10, 20, 0.55)' : 'rgba(255, 255, 255, 0.75)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-2">
          <Marquee speed={48} pauseOnHover gradient gap={40}>
            {t.home.marqueeItems.map((line) => (
              <Typography
                key={line}
                variant="body2"
                className="whitespace-nowrap font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {line}
              </Typography>
            ))}
          </Marquee>
        </div>
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};
