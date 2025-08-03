import { FaGlobeAmericas } from "react-icons/fa";
import { ProgressBar } from "./ui/ProgressBar";
import { calculateProgress } from "../utils/gameUtils";

interface ContinentStatsProps {
  continentStats: { [key: string]: { total: number; found: number } };
}

export const ContinentStats = ({ continentStats }: ContinentStatsProps) => {
  return (
    <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <FaGlobeAmericas className="mr-2 text-indigo-500" />
        Completion by Continent
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.keys(continentStats).map((continent) => {
          const { found, total } = continentStats[continent];
          const progress = calculateProgress(found, total);
          
          return (
            <div
              key={continent}
              className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
            >
              <span className="text-sm font-medium text-gray-700">
                {continent}
              </span>
              <div className="flex items-center">
                <span className="text-sm font-semibold text-indigo-600 mr-2">
                  {found}/{total}
                </span>
                <ProgressBar 
                  progress={progress} 
                  className="w-24 h-2" 
                  color="bg-indigo-500" 
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};