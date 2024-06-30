import * as React from "react";
const CustomSvg = ({
  style,
  color,
  title,
  d,
  stroke,
  strokeLine,
  strokeWidth,
  viewBox,
}: SvgPros) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={style} viewBox={viewBox}>
      <title>{title}</title>
      <path
        fill={color}
        stroke={stroke}
        strokeLinecap={strokeLine}
        strokeLinejoin={strokeLine}
        strokeWidth={strokeWidth}
        d={d}
      />
    </svg>
  );
};
export default CustomSvg;
