import { FC } from "react";

interface DownArrowIconProps {
  color?: string;
}

const DownArrowIcon: FC<DownArrowIconProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="17.0169"
        y1="1.14907"
        x2="7.82438"
        y2="8.86252"
        stroke={color}
        stroke-width="3"
      />
      <line
        x1="0.964181"
        y1="1.31065"
        x2="10.1567"
        y2="9.0241"
        stroke={color}
        stroke-width="3"
      />
    </svg>
  );
};

export default DownArrowIcon;
