import globalTheme from '@/styles/globalTheme';

export interface BasicButtonProps {
  variant: 'solid' | 'outline';
  color: keyof typeof globalTheme.colors;
  fontColor: keyof typeof globalTheme.colors;
  loading: boolean;
}

export type BasicButtonStyleProps = Omit<BasicButtonProps, 'loading'>;
