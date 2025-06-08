export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  description?: string;
  isExternal?: boolean;
}

export interface NavigationConfig {
  mainNavItems: NavItem[];
  footerSections: FooterSection[];
}

export interface FooterSection {
  title: string;
  links: NavItem[];
}
