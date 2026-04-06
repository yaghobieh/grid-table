import { useCallback } from 'react';
import { useNavigate, useRoute } from '@forgedevstack/forge-compass/react';

function isDemoDetailPath(path: string): boolean {
  return path.startsWith('/demos/') && path.length > '/demos/'.length;
}

export function useDemoNavigation() {
  const { navigate } = useNavigate();
  const route = useRoute();
  const currentPath = route?.path ?? '';

  const openDemo = useCallback(
    (to: string) => {
      if (to === '/demos' && isDemoDetailPath(currentPath)) {
        navigate('/demos', { replace: true });
        return;
      }
      if (isDemoDetailPath(to) && isDemoDetailPath(currentPath)) {
        navigate(to, { replace: true });
      } else {
        navigate(to);
      }
    },
    [navigate, currentPath],
  );

  const openDemosIndex = useCallback(() => {
    navigate('/demos', { replace: true });
  }, [navigate]);

  return { openDemo, openDemosIndex };
}
