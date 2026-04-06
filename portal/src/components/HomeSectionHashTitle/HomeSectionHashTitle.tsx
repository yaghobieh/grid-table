import type { FC, ReactNode, KeyboardEvent } from 'react';
import { useState } from 'react';
import { Typography } from '@forgedevstack/bear';

type HomeSectionHashTitleProps = {
  sectionId: string;
  children: ReactNode;
  className?: string;
};

export const HomeSectionHashTitle: FC<HomeSectionHashTitleProps> = ({ sectionId, children, className }) => {
  const [showHash, setShowHash] = useState(false);
  const hash = `#${sectionId}`;

  const commitHash = () => {
    const url = `${window.location.pathname}${window.location.search}${hash}`;
    window.history.pushState(null, '', url);
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      commitHash();
    }
  };

  return (
    <div className={`relative inline-flex flex-col items-center ${className ?? ''}`}>
      <span
        role="link"
        tabIndex={0}
        className="cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[var(--grid-accent)]"
        onMouseEnter={() => setShowHash(true)}
        onMouseLeave={() => setShowHash(false)}
        onClick={commitHash}
        onKeyDown={onKeyDown}
      >
        {children}
      </span>
      {showHash && (
        <Typography variant="caption" className="mt-1 font-mono opacity-80" style={{ color: 'var(--grid-accent)' }}>
          {hash}
        </Typography>
      )}
    </div>
  );
};
