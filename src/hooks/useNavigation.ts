import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const useNavigation = () => {
  const pathname = usePathname();

  // Aktif link kontrolü için memoized function
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
