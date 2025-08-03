import Image from "next/image";
import { FaCheck, FaTimes, FaExclamationCircle } from "react-icons/fa";
import { ColorChip } from "./ui/ColorChip";
import { Flag } from "../utils/flagUtils";

interface FeedbackPanelProps {
  feedback: {
    flag: Flag;
    correct: string[];
    incorrect: string[];
    missing: string[];
  };
}

export const FeedbackPanel = ({ feedback }: FeedbackPanelProps) => {
  return (
    <div className="mt-8 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-gray-700 font-medium flex items-center">
          Feedback for your guess:{" "}
          <span className="ml-2 font-bold text-indigo-700">
            {feedback.flag.countryName}
          </span>
        </h3>
      </div>
      <div className="p-4 flex flex-col sm:flex-row items-center">
        <div className="w-full sm:w-32 sm:h-24 relative rounded overflow-hidden shadow-sm mb-4 sm:mb-0 sm:mr-6">
          <Image
            src={`/flags/${feedback.flag.countryCode}.svg`}
            alt={`Flag of ${feedback.flag.countryName}`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 128px"
          />
        </div>
        <div className="flex-1 text-sm space-y-2">
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-green-100 text-green-800 mr-2">
              <FaCheck className="text-xs" />
            </span>
            <span className="font-medium text-green-700">
              Correct colors:{" "}
            </span>
            <span className="ml-2 text-gray-800">
              {feedback.correct.length > 0 ? (
                feedback.correct.map((color, idx) => (
                  <ColorChip 
                    key={idx} 
                    color={color} 
                    className="inline-block px-2 py-0.5 text-xs ml-1" 
                  />
                ))
              ) : (
                <span className="text-gray-500">None</span>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 mr-2">
              <FaExclamationCircle className="text-xs" />
            </span>
            <span className="font-medium text-amber-700">
              Missing colors:{" "}
            </span>
            <span className="ml-2 text-gray-800">
              {feedback.missing.length > 0 ? (
                feedback.missing.map((color, idx) => (
                  <ColorChip 
                    key={idx} 
                    color={color} 
                    className="inline-block px-2 py-0.5 text-xs ml-1" 
                  />
                ))
              ) : (
                <span className="text-gray-500">None</span>
              )}
            </span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-800 mr-2">
              <FaTimes className="text-xs" />
            </span>
            <span className="font-medium text-red-700">
              Extra colors:{" "}
            </span>
            <span className="ml-2 text-gray-800">
              {feedback.incorrect.length > 0 ? (
                feedback.incorrect.map((color, idx) => (
                  <ColorChip 
                    key={idx} 
                    color={color} 
                    className="inline-block px-2 py-0.5 text-xs ml-1" 
                  />
                ))
              ) : (
                <span className="text-gray-500">None</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};