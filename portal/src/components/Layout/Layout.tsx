import { FC } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import type { LayoutProps } from './Layout.types';

export const Layout: FC<LayoutProps> = ({ children, showFooter = true }) => (
  <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
    <Navbar />
    <main>{children}</main>
    {showFooter && <Footer />}
  </div>
);
