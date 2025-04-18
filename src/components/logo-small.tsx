import React, { type ComponentPropsWithoutRef } from 'react';

const LogoSmall = ({
  className,
  ...props
}: ComponentPropsWithoutRef<'svg'>) => {
  return (
    <svg
      width="146"
      height="28"
      viewBox="0 0 146 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M36.3438 0.695984L29.7677 14.472L23.1438 2.13598H21.7518L15.1758 14.328L8.64775 0.695984H0.631752L14.0717 27.624H14.9837L22.4718 13.896L29.9597 27.624H30.8237L44.2637 0.695984H36.3438Z"
        className="fill-neutral-700"
      />
      <path
        d="M80.0781 0.695984L73.5021 14.472L66.8781 2.13598H65.4861L58.9101 14.328L52.3821 0.695984H44.3661L57.8061 27.624H58.7181L66.2061 13.896L73.6941 27.624H74.5581L87.9981 0.695984H80.0781Z"
        className="fill-neutral-700"
      />
      <path
        d="M123.812 0.695984L117.236 14.472L110.613 2.13598H109.221L102.645 14.328L96.1165 0.695984H88.1005L101.54 27.624H102.452L109.941 13.896L117.428 27.624H118.292L131.732 0.695984H123.812Z"
        className="fill-neutral-700"
      />

      <path
        d="M140.32 27.768C143.344 27.768 145.168 26.184 145.168 23.352C145.168 20.616 143.344 19.08 140.32 19.08C137.392 19.08 135.52 20.616 135.52 23.352C135.52 26.184 137.392 27.768 140.32 27.768Z"
        className="fill-red-500"
      />
    </svg>
  );
};

export default LogoSmall;
