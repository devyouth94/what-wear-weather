import { SVGAttributes } from 'react';

// 네비게이션 아이콘
export const IconMain = () => {
  return (
    <svg width="30" height="24" viewBox="0 0 30 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 24V15.5294H18V24H25.5V12.7059H30L15 0L0 12.7059H4.5V24H12Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const IconExplore = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.5 11.125C11.7375 11.125 11.125 11.7375 11.125 12.5C11.125 13.2625 11.7375 13.875 12.5 13.875C13.2625 13.875 13.875 13.2625 13.875 12.5C13.875 11.7375 13.2625 11.125 12.5 11.125ZM12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM15.2375 15.2375L5 20L9.7625 9.7625L20 5L15.2375 15.2375Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const IconMypage = () => {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M13 0.5C6.1 0.5 0.5 6.1 0.5 13C0.5 19.9 6.1 25.5 13 25.5C19.9 25.5 25.5 19.9 25.5 13C25.5 6.1 19.9 0.5 13 0.5ZM13 4.25C15.075 4.25 16.75 5.925 16.75 8C16.75 10.075 15.075 11.75 13 11.75C10.925 11.75 9.25 10.075 9.25 8C9.25 5.925 10.925 4.25 13 4.25ZM13 22C9.875 22 7.1125 20.4 5.5 17.975C5.5375 15.4875 10.5 14.125 13 14.125C15.4875 14.125 20.4625 15.4875 20.5 17.975C18.8875 20.4 16.125 22 13 22Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const IconUpload = () => {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 12C0 5.37258 5.37258 0 12 0H36C42.6274 0 48 5.37258 48 12V36C48 42.6274 42.6274 48 36 48H12C5.37258 48 0 42.6274 0 36V12Z"
        fill="#F6F1E9"
      />
      <path
        d="M24 28C26.2091 28 28 26.2091 28 24C28 21.7909 26.2091 20 24 20C21.7909 20 20 21.7909 20 24C20 26.2091 21.7909 28 24 28Z"
        fill="#2C3639"
      />
      <path
        d="M20.25 11.5L17.9625 14H14C12.625 14 11.5 15.125 11.5 16.5V31.5C11.5 32.875 12.625 34 14 34H34C35.375 34 36.5 32.875 36.5 31.5V16.5C36.5 15.125 35.375 14 34 14H30.0375L27.75 11.5H20.25ZM24 30.25C20.55 30.25 17.75 27.45 17.75 24C17.75 20.55 20.55 17.75 24 17.75C27.45 17.75 30.25 20.55 30.25 24C30.25 27.45 27.45 30.25 24 30.25Z"
        fill="#2C3639"
      />
    </svg>
  );
};

export const IconCancel = () => {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12.5" cy="12.5" r="12.5" fill="#2C3639" fillOpacity="0.8" />
      <path
        d="M19 8.20857L17.7914 7L13 11.7914L8.20857 7L7 8.20857L11.7914 13L7 17.7914L8.20857 19L13 14.2086L17.7914 19L19 17.7914L14.2086 13L19 8.20857Z"
        fill="#F6F1E9"
      />
    </svg>
  );
};

export const IconDrawer = ({ ...props }: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_22_1103)">
        <path
          d="M3.75 22.5H26.25V20H3.75V22.5ZM3.75 16.25H26.25V13.75H3.75V16.25ZM3.75 7.5V10H26.25V7.5H3.75Z"
          fill="#F6F1E9"
        />
      </g>
      <defs>
        <clipPath id="clip0_22_1103">
          <rect width="30" height="30" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const IconClose = ({ ...props }: SVGAttributes<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23.75 8.0125L21.9875 6.25L15 13.2375L8.0125 6.25L6.25 8.0125L13.2375 15L6.25 21.9875L8.0125 23.75L15 16.7625L21.9875 23.75L23.75 21.9875L16.7625 15L23.75 8.0125Z"
        fill="#F6F1E9"
      />
    </svg>
  );
};
