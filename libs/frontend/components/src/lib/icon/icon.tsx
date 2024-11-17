import parse from 'html-react-parser';
import React from 'react';
/* eslint-disable-next-line */
export interface IconProps {
  src: string;
}

export function Icon({ src }: IconProps) {
  const svg = React.useMemo(() => parse(src), [src]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{svg}</>;
}

export default Icon;
