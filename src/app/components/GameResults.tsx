import { FaCheck, FaExclamationCircle, FaGamepad } from "react-icons/fa";
import { CountryCard } from "./ui/CountryCard";
import { getFlagByCountry } from "../utils/flagUtils";

interface GameResultsProps {
  gameState: "playing" | "finished" | "resigned";
  isEasyMode: boolean;
  matchingCountries: string[];
  guessedCountries: string[];
  onStartNewRound: () => void;
}

export const GameResults = ({ 
  gameState, 
  isEasyMode, 
  matchingCountries, 
  guessedCountries, 
  onStartNewRound 
}: GameResultsProps) => {
  if (gameState === "finished") {
    return (
      <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fade-in">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FaCheck className="text-3xl text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">
          Congratulations!
        </h3>
        <p className="text-green-700 mb-4">
          You have successfully guessed{" "}
          {isEasyMode ? "a country" : "all countries"} with these colors.
        </p>
        <button
          onClick={onStartNewRound}
          className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
        >
          <FaGamepad className="mr-2" />
          Play Again
        </button>
      </div>
    );
  }

  if (gameState === "resigned") {
    return (
      <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-6 animate-fade-in">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
            <FaExclamationCircle className="text-2xl text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 ml-3">
            Challenge complete
          </h3>
        </div>
        <p className="text-gray-600 mb-4 text-center">
          Here are all the countries with these flag colors:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {matchingCountries.map((country, index) => {
            const flag = getFlagByCountry(country);
            return (
              <CountryCard
                key={index}
                country={country}
                countryCode={flag?.countryCode || ""}
                isGuessed={guessedCountries.includes(country)}
              />
            );
          })}
        </div>
        <button
          onClick={onStartNewRound}
          className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
        >
          <FaGamepad className="mr-2" />
          Start New Challenge
        </button>
      </div>
    );
  }

  return null;
};