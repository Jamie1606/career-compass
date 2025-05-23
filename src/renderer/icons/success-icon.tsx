import { IconProps } from "../types/icon-definition";

export default function SuccessIcon({ width, height, className, fill = "black" }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={fill} className={className}>
      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
    </svg>
  );
}
