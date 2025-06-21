import IconProps from '../IconProps';
import React from 'react';
function ColorBallIcon({ className = undefined, fill = 'none' }: IconProps) {
  return (
    <svg
      width='12'
      height='12'
      viewBox='0 0 12 12'
      fill={fill}
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle cx='6' cy='6' r='6' fill='#FAC240' />
    </svg>
  );
}

export default ColorBallIcon;
