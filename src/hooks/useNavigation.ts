import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useNavigation = () => {
  const pathname = usePathname();

  const isActiveLink = useMemo(() => {
    return (href: string): boolean => {
      if (href === '/') {
        return pathname === href;
      }
      return pathname.startsWith(href);
    };
  }, [pathname]);

  return { isActiveLink };
};
