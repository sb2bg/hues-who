import { ColorChip } from "./ui/ColorChip";
import { ProgressBar } from "./ui/ProgressBar";
import { calculateProgress } from "../utils/gameUtils";

interface ColorDisplayProps {
  colors: string[];
  guessedCount: number;
  totalCount: number;
}

export const ColorDisplay = ({ colors, guessedCount, totalCount }: ColorDisplayProps) => {
  const progress = calculateProgress(guessedCount, totalCount);

  return (
    <div className="bg-indigo-50 rounded-2xl p-6 mb-6 shadow-inner">
      <h2 className="text-indigo-800 text-sm font-semibold uppercase tracking-wide mb-3">
        Find countries with these colors:
      </h2>
      <div className="flex flex-wrap gap-2">
        {colors.map((color, index) => (
          <ColorChip key={index} color={color} />
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-indigo-700 font-medium">
          <span className="bg-white px-2 py-1 rounded-md shadow-sm">
            {guessedCount}/{totalCount} countries found
          </span>
        </div>

        <div className="inline-flex items-center text-sm text-gray-600">
          <span>Progress:</span>
          <ProgressBar progress={progress} className="w-32 h-2 ml-2" />
        </div>
      </div>
    </div>
  );
};