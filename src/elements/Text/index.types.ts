import fontTheme from '@/styles/fontTheme';
import globalTheme from '@/styles/globalTheme';

export interface TextProps {
  variant: keyof typeof fontTheme;
  fontColor: keyof typeof globalTheme.colors;
}
