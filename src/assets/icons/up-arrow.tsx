import { FC } from "react";

interface UpArrowIconProps {
  color?: string;
}

const UpArrowIcon: FC<UpArrowIconProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="10"
      viewBox="0 0 20 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="1.03582"
        y1="9.02403"
        x2="10.2284"
        y2="1.31058"
        stroke={color}
        stroke-width="3"
      />
      <line
        x1="17.0886"
        y1="8.86245"
        x2="7.89602"
        y2="1.14899"
        stroke={color}
        stroke-width="3"
      />
    </svg>
  );
};

export default UpArrowIcon;
