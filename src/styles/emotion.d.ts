import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      point_01: string;
      point_02: string;

      main_01: string;
      main_02: string;
      main_04: string;

      secondary_01: string;

      danger: string;

      white: string;
      kakao: string;
      naver: string;
    };
  }
}
