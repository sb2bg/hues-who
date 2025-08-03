import { getColorStyle } from "../../utils/colorUtils";

interface ColorChipProps {
  color: string;
  className?: string;
}

export const ColorChip = ({ color, className = "" }: ColorChipProps) => {
  return (
    <span
      className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize shadow-sm inline-flex items-center ${className}`}
      style={getColorStyle(color)}
    >
      {color}
    </span>
  );
};