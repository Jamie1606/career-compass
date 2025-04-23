import { IconProps } from "../types/icon-definition";

export default function LeftIcon({ width, height, fill = "black", className }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={height} viewBox="0 -960 960 960" width={width} fill={fill} className={className}>
      <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
    </svg>
  );
}
