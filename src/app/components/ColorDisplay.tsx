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
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 mb-6 shadow-lg border border-indigo-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-200/30 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
      <div className="relative z-10">
        <h2 className="text-indigo-800 text-sm font-semibold uppercase tracking-wide mb-4">
          🎯 Find countries with these colors:
        </h2>
        <div className="flex flex-wrap gap-3">
          {colors.map((color, index) => (
            <ColorChip key={index} color={color} className="transform hover:scale-105 transition-transform duration-200" />
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <div className="text-sm text-indigo-700 font-medium">
            <span className="bg-white/70 backdrop-blur-sm px-3 py-2 rounded-xl shadow-sm border border-white">
              {guessedCount}/{totalCount} countries found
            </span>
          </div>

          <div className="inline-flex items-center text-sm text-gray-600">
            <span className="mr-3 font-medium">Progress:</span>
            <ProgressBar progress={progress} className="w-40 h-3 ml-2" />
            <span className="ml-3 text-indigo-600 font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};