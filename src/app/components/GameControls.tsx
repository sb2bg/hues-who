import { FaRedo, FaTimes } from "react-icons/fa";

interface GameControlsProps {
  isEasyMode: boolean;
  onToggleMode: () => void;
  onNewRound: () => void;
  onGiveUp: () => void;
}

export const GameControls = ({ 
  isEasyMode, 
  onToggleMode, 
  onNewRound, 
  onGiveUp 
}: GameControlsProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center space-x-4">
        <div
          onClick={onToggleMode}
          className={`relative inline-flex h-8 w-16 cursor-pointer rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            isEasyMode ? "bg-green-400" : "bg-red-400"
          }`}
        >
          <div
            className={`${
              isEasyMode ? "translate-x-8" : "translate-x-0"
            } inline-block h-8 w-8 transform rounded-full bg-white shadow-lg ring-1 transition duration-300 ease-in-out`}
          />
        </div>
        <span className="text-sm text-gray-600 font-medium">
          {isEasyMode
            ? "EASY - Find one matching country"
            : "HARD - Find all matching countries"}
        </span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={onNewRound}
          className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-300 hover:border-indigo-500 rounded-md px-3 py-1.5 transition duration-200"
        >
          <FaRedo className="text-xs" />
          <span>New Round</span>
        </button>
        <button
          onClick={onGiveUp}
          className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-800 border border-red-300 hover:border-red-500 rounded-md px-3 py-1.5 transition duration-200"
        >
          <FaTimes className="text-xs" />
          <span>Give Up</span>
        </button>
      </div>
    </div>
  );
};