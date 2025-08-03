import { FaFlag } from "react-icons/fa";

export const GameHeader = () => {
  return (
    <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <FaFlag className="text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Flag Color Challenge
              </h1>
              <p className="mt-1 text-blue-100/80 text-sm">
                Test your geography knowledge
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse delay-200"></div>
          <p className="ml-2 text-white/90 text-sm font-medium">
            Guess countries based on their flag colors
          </p>
        </div>
      </div>
    </div>
  );
};