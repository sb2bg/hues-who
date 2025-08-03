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
      <div className="flex relative">
        <div className="relative flex-grow">
          <input
            type="text"
            value={value}
            onChange={onChange}
            className="block w-full px-4 py-3 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm text-black placeholder-gray-400"
            placeholder="Enter a country name..."
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-xl max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm text-black">
              {suggestions.map((country, index) => (
                <li
                  key={index}
                  className="cursor-pointer select-none relative py-2.5 pl-4 pr-9 hover:bg-indigo-50 transition duration-150"
                  onClick={() => onSelectSuggestion(country)}
                >
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900 truncate">
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
          className="inline-flex items-center justify-center px-4 py-3 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
        >
          <FaArrowRight className="mr-2" />
          Guess
        </button>
      </div>
    </form>
  );
};