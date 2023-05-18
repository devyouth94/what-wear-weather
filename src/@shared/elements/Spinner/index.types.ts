import globalTheme from '@/styles/globalTheme';

export interface SpinnerProps {
  color: keyof typeof globalTheme.colors;
  size: number;
}
