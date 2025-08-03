import React from "react";
import { FaArrowRight } from "react-icons/fa";

interface GuessInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  suggestions: string[];
  onSelectSuggestion: (country: string) => void;
}

export const GuessInput = ({ 
  value, 
  onChange, 
  onSubmit, 
  suggestions, 
  onSelectSuggestion 
}: GuessInputProps) => {
  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex relative group">
        <div className="relative flex-grow">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="block w-full px-6 py-4 border-2 border-gray-200 rounded-l-2xl shadow-lg focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-black placeholder-gray-400 bg-white/80 backdrop-blur-sm transition-all duration-300 group-hover:shadow-xl"
            placeholder="✨ Enter a country name..."
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-[100] left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm shadow-2xl max-h-60 rounded-2xl py-2 text-base ring-1 ring-black/10 overflow-auto focus:outline-none sm:text-sm text-black border border-gray-200">
              {suggestions.map((country, index) => (
                <li
                  key={index}
                  className="cursor-pointer select-none relative py-3 px-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 mx-2 rounded-xl"
                  onClick={() => onSelectSuggestion(country)}
                >
                  <div className="flex items-center">
                    <span className="font-semibold text-gray-900 truncate">
                      {country}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-4 border-2 border-transparent text-sm font-bold rounded-r-2xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <FaArrowRight className="mr-2" />
          Guess
        </button>
      </div>
    </form>
  );
};