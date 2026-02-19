export interface NavItem {
  id: string;
  label: string;
  href: string;
  isLink?: boolean;
  external?: boolean;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface VersionInfo {
  version: string;
  date: string;
  highlights: string[];
}

export interface DemoMeta {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
  tag?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface ThemeExportConfig {
  mode: 'light' | 'dark';
  backgroundColor: string;
  foregroundColor: string;
  accentColor: string;
  borderColor: string;
  headerBg: string;
  headerText: string;
  rowHoverBg: string;
  fontFamily: string;
  fontSize: number;
  borderRadius: number;
  spacing: number;
  stripedRows: boolean;
}

export interface DocSection {
  id: string;
  title: string;
  path: string;
  icon: string;
}

export interface ApiProp {
  name: string;
  type: string;
  default: string;
  description: string;
  required?: boolean;
}

export interface ApiSection {
  id: string;
  title: string;
  description: string;
  props: ApiProp[];
}

export interface ThemePreset {
  id: string;
  label: string;
  mode: 'light' | 'dark';
  backgroundColor: string;
  foregroundColor: string;
  accentColor: string;
  borderColor: string;
  headerBg: string;
  headerText: string;
  rowHoverBg: string;
}
