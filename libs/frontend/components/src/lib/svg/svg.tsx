import { ReactSVG } from 'react-svg';
/* eslint-disable-next-line */
export interface SvgProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

export function SVG(props: SvgProps) {
  return (
    <ReactSVG
      src={props.src}
      className={props.className}
      style={{ width: props.width, height: props.height }}
    />
  );
}

export default SVG;
