import fontTheme from '@/styles/fontTheme';
import globalTheme from '@/styles/globalTheme';

export interface TextProps {
  /**
   * 폰트 종류를 설정합니다.
   *
   * @default body_02
   */
  variant: keyof typeof fontTheme;

  fontColor: keyof typeof globalTheme.colors;
}
