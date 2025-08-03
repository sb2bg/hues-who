import { FaFlag } from "react-icons/fa";

export const GameHeader = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-6 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <FaFlag className="text-2xl" />
          <h1 className="text-2xl font-bold">Flag Color Challenge</h1>
        </div>
      </div>
      <p className="mt-2 opacity-90">
        Guess countries based on their flag colors
      </p>
    </div>
  );
};