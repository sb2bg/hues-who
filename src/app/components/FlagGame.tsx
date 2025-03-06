"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Flag,
  getRandomCountry,
  getAllCountries,
  getCountriesWithColors,
  getFlagByCountry,
} from "../utils/flagUtils";
import Image from "next/image";
import {
  FaFlag,
  FaCheck,
  FaTimes,
  FaExclamationCircle,
  FaGamepad,
  FaRedo,
  FaArrowRight,
} from "react-icons/fa";

const FlagGame = () => {
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [matchingCountries, setMatchingCountries] = useState<string[]>([]);
  const [userGuess, setUserGuess] = useState("");
  const [guessedCountries, setGuessedCountries] = useState<string[]>([]);
  const [gameState, setGameState] = useState<
    "playing" | "finished" | "resigned"
  >("playing");
  const [feedback, setFeedback] = useState<{
    flag: Flag;
    correct: string[];
    incorrect: string[];
    missing: string[];
  } | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [allCountries, setAllCountries] = useState<string[]>([]);
  const [isEasyMode, setIsEasyMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const startNewRound = useCallback(() => {
    setIsLoading(true);
    const newFlag = getRandomCountry();
    const newMatchingCountries = getCountriesWithColors(newFlag.colors);
    setCurrentFlag(newFlag);
    setMatchingCountries(newMatchingCountries);
    setGuessedCountries([]);
    setGameState("playing");
    setFeedback(null);
    setUserGuess("");
    setSuggestions([]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setAllCountries(getAllCountries());
    if (gameState !== "resigned") {
      startNewRound();
    }
    setIsLoading(false);
  }, [startNewRound, gameState]);

  const includesCaseInsensitive = (arr: string[], value: string) => {
    return arr.find((item) => item.toLowerCase() === value.toLowerCase());
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    const match = includesCaseInsensitive(matchingCountries, userGuess);

    if (match && !includesCaseInsensitive(guessedCountries, userGuess)) {
      setGuessedCountries([...guessedCountries, match]);
      setUserGuess("");
      setFeedback(null);
      setSuggestions([]);

      if (
        isEasyMode ||
        guessedCountries.length + 1 === matchingCountries.length
      ) {
        setGameState("finished");
      }
    } else {
      const guessedFlag = getFlagByCountry(userGuess);
      if (guessedFlag) {
        const correct = guessedFlag.colors.filter((color) =>
          currentFlag!.colors.includes(color)
        );
        const incorrect = guessedFlag.colors.filter(
          (color) => !currentFlag!.colors.includes(color)
        );
        const missing = currentFlag!.colors.filter(
          (color) => !guessedFlag.colors.includes(color)
        );
        setFeedback({ flag: guessedFlag, correct, incorrect, missing });
      }
    }
    setUserGuess("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserGuess(value);
    if (value) {
      const filtered = allCountries.filter((country) =>
        country.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  };

  const selectCountry = (country: string) => {
    setUserGuess(country);
    setSuggestions([]);
  };

  const toggleGameMode = () => {
    setIsEasyMode(!isEasyMode);
    startNewRound();
  };

  const getColorName = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: "#FF0000",
      blue: "#0000FF",
      "light blue": "#ADD8E6",
      green: "#008000",
      yellow: "#FFFF00",
      white: "#FFFFFF",
      black: "#000000",
      orange: "#FFA500",
      purple: "#800080",
      brown: "#A52A2A",
      pink: "#FFC0CB",
      gray: "#808080",
      maroon: "#800000",
    };
    return colorMap[color.toLowerCase()] || color;
  };

  const getTextColor = (color: string) => {
    const colorMap: { [key: string]: string } = {
      red: "#FFFFFF",
      blue: "#FFFFFF",
      "light blue": "#000000",
      green: "#FFFFFF",
      yellow: "#000000",
      white: "#000000",
      black: "#FFFFFF",
      orange: "#000000",
      purple: "#FFFFFF",
      brown: "#FFFFFF",
      pink: "#000000",
      gray: "#FFFFFF",
      maroon: "#FFFFFF",
    };
    return colorMap[color.toLowerCase()] || "#000000";
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );

  if (!currentFlag)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="text-indigo-600 font-bold text-xl">Loading game...</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
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

        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4">
              <div
                onClick={toggleGameMode}
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
                onClick={startNewRound}
                className="flex items-center space-x-1 text-sm font-medium text-indigo-600 hover:text-indigo-800 border border-indigo-300 hover:border-indigo-500 rounded-md px-3 py-1.5 transition duration-200"
              >
                <FaRedo className="text-xs" />
                <span>New Round</span>
              </button>
              <button
                onClick={() => setGameState("resigned")}
                className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-800 border border-red-300 hover:border-red-500 rounded-md px-3 py-1.5 transition duration-200"
              >
                <FaTimes className="text-xs" />
                <span>Give Up</span>
              </button>
            </div>
          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 mb-6 shadow-inner">
            <h2 className="text-indigo-800 text-sm font-semibold uppercase tracking-wide mb-3">
              Find countries with these colors:
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentFlag.colors.map((color, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 rounded-full text-sm font-medium capitalize shadow-sm inline-flex items-center"
                  style={{
                    backgroundColor: getColorName(color),
                    color: getTextColor(color),
                    border:
                      color.toLowerCase() === "white"
                        ? "1px solid #e5e7eb"
                        : "none",
                  }}
                >
                  {color}
                </span>
              ))}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <div className="text-sm text-indigo-700 font-medium">
                <span className="bg-white px-2 py-1 rounded-md shadow-sm">
                  {guessedCountries.length}/{matchingCountries.length} countries
                  found
                </span>
              </div>

              <div className="inline-flex items-center text-sm text-gray-600">
                <span>Progress:</span>
                <div className="w-32 h-2 bg-gray-200 rounded-full ml-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-indigo-500 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${
                        (guessedCountries.length / matchingCountries.length) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {gameState === "playing" && (
            <form onSubmit={handleGuess} className="mb-8">
              <div className="flex relative">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={userGuess}
                    onChange={handleInputChange}
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
                          onClick={() => selectCountry(country)}
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
          )}

          {gameState === "finished" && (
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
                onClick={startNewRound}
                className="mt-2 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-200"
              >
                <FaGamepad className="mr-2" />
                Play Again
              </button>
            </div>
          )}

          {gameState === "resigned" && (
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
                {matchingCountries.map((country, index) => (
                  <div
                    key={index}
                    className={`bg-white p-3 rounded-lg shadow-sm transition-all duration-300 ${
                      guessedCountries.includes(country)
                        ? "border-2 border-green-400"
                        : "border border-gray-200"
                    }`}
                  >
                    <div className="aspect-video relative overflow-hidden rounded-md shadow-sm mb-2">
                      <Image
                        src={`/flags/${
                          getFlagByCountry(country)?.countryCode
                        }.svg`}
                        alt={`Flag of ${country}`}
                        className="object-cover"
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <p className="text-center text-gray-800 font-medium text-sm truncate">
                      {country}
                      {guessedCountries.includes(country) && (
                        <span className="ml-1 inline-flex items-center justify-center text-xs text-green-700 bg-green-100 rounded-full h-4 w-4">
                          <FaCheck className="text-xs" />
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
              <button
                onClick={startNewRound}
                className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                <FaGamepad className="mr-2" />
                Start New Challenge
              </button>
            </div>
          )}

          {guessedCountries.length > 0 && gameState === "playing" && (
            <div className="mt-10">
              <h3 className="text-gray-700 text-sm font-medium mb-4 flex items-center">
                <FaCheck className="text-green-500 mr-2" />
                Correct Guesses ({guessedCountries.length})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {guessedCountries.map((country, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="aspect-video relative">
                      <Image
                        src={`/flags/${
                          getFlagByCountry(country)?.countryCode
                        }.svg`}
                        alt={`Flag of ${country}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <div className="p-2">
                      <p className="text-center text-gray-800 font-medium text-sm">
                        {country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {feedback && (
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
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ml-1"
                            style={{
                              backgroundColor: getColorName(color),
                              color: getTextColor(color),
                              border:
                                color.toLowerCase() === "white"
                                  ? "1px solid #e5e7eb"
                                  : "none",
                            }}
                          >
                            {color}
                          </span>
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
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ml-1"
                            style={{
                              backgroundColor: getColorName(color),
                              color: getTextColor(color),
                              border:
                                color.toLowerCase() === "white"
                                  ? "1px solid #e5e7eb"
                                  : "none",
                            }}
                          >
                            {color}
                          </span>
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
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ml-1"
                            style={{
                              backgroundColor: getColorName(color),
                              color: getTextColor(color),
                              border:
                                color.toLowerCase() === "white"
                                  ? "1px solid #e5e7eb"
                                  : "none",
                            }}
                          >
                            {color}
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 text-center text-xs text-gray-500">
            <p>Test your knowledge of flags from around the world!</p>
            <p className="mt-1">
              © {new Date().getFullYear()} Flag Color Challenge
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlagGame;
