import { css } from '@emotion/react';

export const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    font: inherit;
    color: inherit;
  }

  *,
  :after,
  :before {
    box-sizing: border-box;
  }

  :root {
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    -moz-tab-size: 4;
    tab-size: 4;

    /* react-toastify css */
    --toastify-color-info: #2ebbb1;
    --toastify-color-success: #42be52;
    --toastify-color-warning: #d2b334;
    --toastify-color-error: #ba6344;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  button {
    background: none;
    border: 0;
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  body {
    overflow-y: overlay;

    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #708488;
      border-radius: 0.25rem;
    }
  }
`;
