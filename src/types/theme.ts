export type ThemeId =
  | 'cyberpunk'
  | 'matrix'
  | 'modern-dark'
  | 'clean-light'
  | 'royal-bengali'
  | 'sunset-amber'
  | 'midnight-amoled';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  previewBg: string;
  previewAccent: string;
  previewCard: string;
  badgeColor: string;
  isDark: boolean;
}
