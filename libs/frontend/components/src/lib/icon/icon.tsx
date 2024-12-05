import parse from 'html-react-parser';
import React from 'react';
/* eslint-disable-next-line */
export interface IconProps {
  src: string;
  size?: number;
  color?: string;
  stroke?: number;
}

export function Icon({ src, size, color = 'inherit', stroke }: IconProps) {
  const replaceAttributes = (src: string, attribute: string, value: string) => {
    const regex = new RegExp(`${attribute}="[^"]*"`, 'g');
    if (regex.test(src)) {
      return src.replace(regex, `${attribute}="${value}"`);
    }
    return src.replace(/<svg/, `<svg ${attribute}="${value}"`);
  };

  const svg = React.useMemo(() => {
    let updatedSrc = src;

    if (size) {
      updatedSrc = updatedSrc.replace(/width="[^"]*"/, `width="${size}"`);
      if (!/width="[^"]*"/.test(updatedSrc)) {
        updatedSrc = updatedSrc.replace(/<svg/, `<svg width="${size}"`);
      }

      updatedSrc = updatedSrc.replace(/height="[^"]*"/, `height="${size}"`);
      if (!/height="[^"]*"/.test(updatedSrc)) {
        updatedSrc = updatedSrc.replace(/<svg/, `<svg height="${size}"`);
      }
    }

    if (color) {
      updatedSrc = updatedSrc.replace(/color="[^"]*"/, `color="${color}"`);
      if (!/color="[^"]*"/.test(updatedSrc)) {
        updatedSrc = updatedSrc.replace(/<svg/, `<svg color="${color}"`);
      }
    }

    if (stroke) {
      updatedSrc = replaceAttributes(
        updatedSrc,
        'stroke-width',
        String(stroke)
      );
    }
    return parse(updatedSrc);
  }, [src, size, color, stroke]);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{svg}</>;
}

export default Icon;
