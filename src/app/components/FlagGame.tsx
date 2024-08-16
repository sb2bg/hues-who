"use client";

import React, { useState, useEffect } from "react";
import {
  Flag,
  getRandomCountry,
  getAllCountries,
  getCountriesWithColors,
  getFlagByCountry,
} from "../utils/flagUtils";
import Image from "next/image";

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

  useEffect(() => {
    setAllCountries(getAllCountries());
    startNewRound();
  }, []);

  const startNewRound = () => {
    const newFlag = getRandomCountry();
    const newMatchingCountries = getCountriesWithColors(newFlag.colors);
    setCurrentFlag(newFlag);
    setMatchingCountries(newMatchingCountries);
    setGuessedCountries([]);
    setGameState("playing");
    setFeedback(null);
    setUserGuess("");
    setSuggestions([]);
  };

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

  if (!currentFlag)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-1 flex justify-between">
            <span>Flag Color Guessing Game</span>
            <div>
              <button
                onClick={startNewRound}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-2 py-1"
              >
                Start New Round
              </button>
              <button
                onClick={() => setGameState("resigned")}
                className="text-xs font-medium text-gray-500 hover:text-gray-700 border border-gray-300 rounded-md px-2 py-1 ml-2"
              >
                Give Up
              </button>
            </div>
          </div>
          <h1 className="block mt-1 text-lg leading-tight font-medium text-black">
            Guess the country by its flag colors!
          </h1>

          <div className="mt-4 flex items-center">
            <span className="mr-2 text-sm text-gray-600">Game Mode</span>
            <button
              onClick={toggleGameMode}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                isEasyMode
                  ? "bg-green-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {isEasyMode ? "Easy" : "Normal"}
            </button>
            <span className="ml-2 text-sm text-gray-600">
              {isEasyMode
                ? "Guess one country"
                : "Guess ALL countries with these colors"}
            </span>
          </div>

          <div className="mt-4">
            <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide flex items-center flex-wrap gap-2">
              Colors in the flag
              {currentFlag.colors.map((color, index) => (
                <span
                  key={index}
                  className="px-2 py-1 rounded-full text-xs font-medium capitalize inline-flex items-center border border-black"
                  style={{
                    backgroundColor: getColorName(color),
                    color: getTextColor(color),
                  }}
                >
                  {color}
                </span>
              ))}
            </h2>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            <span className="font-medium text-gray-700">
              {matchingCountries.length}
            </span>{" "}
            countries to guess |
            <span className="font-medium text-gray-700">
              {" "}
              {guessedCountries.length}
            </span>{" "}
            guessed
          </div>

          {gameState === "playing" && (
            <form onSubmit={handleGuess} className="mt-6">
              <div className="flex relative">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={userGuess}
                    onChange={handleInputChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm text-black"
                    placeholder="Enter country name"
                  />
                  {suggestions.length > 0 && (
                    <ul className="absolute z-50 left-0 right-0 mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm text-black">
                      {suggestions.map((country, index) => (
                        <li
                          key={index}
                          className="cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-600 hover:text-white"
                          onClick={() => selectCountry(country)}
                        >
                          {country}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Guess
                </button>
              </div>
            </form>
          )}

          {gameState === "finished" && (
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                Congratulations! You have guessed{" "}
                {isEasyMode ? "a country" : "all countries"}.
              </p>
              <button
                onClick={startNewRound}
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start New Round
              </button>
            </div>
          )}

          {gameState === "resigned" && (
            <div className="mt-6">
              <p className="text-sm text-gray-500">
                The correct countries were:
              </p>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {matchingCountries.map((country, index) => (
                  <div key={index}>
                    <Image
                      src={`/flags/${
                        getFlagByCountry(country)?.countryCode
                      }.svg`}
                      alt={`Flag of ${country}`}
                      className="border border-gray-300 shadow-sm mt-2 mx-auto"
                      width={128}
                      height={128}
                    />
                    <p className="text-center text-black text-sm">{country}</p>
                  </div>
                ))}
              </div>
              <button
                onClick={startNewRound}
                className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start New Round
              </button>
            </div>
          )}

          {guessedCountries.length > 0 && (
            <div className="mt-10">
              <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide">
                Guessed Countries:
              </h3>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {guessedCountries.map((country, index) => (
                  <div key={index}>
                    <Image
                      src={`/flags/${
                        getFlagByCountry(country)?.countryCode
                      }.svg`}
                      alt={`Flag of ${country}`}
                      className="border border-gray-300 shadow-sm mt-2 mx-auto"
                      width={128}
                      height={128}
                    />
                    <p className="text-center text-black text-sm">{country}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {feedback && (
            <div className="mt-6 bg-gray-50 rounded-md p-4">
              <h3 className="text-gray-500 text-xs font-medium uppercase tracking-wide mb-2">
                Feedback for {feedback.flag.countryName}:
              </h3>
              <Image
                src={`/flags/${feedback.flag.countryCode}.svg`}
                alt={`Flag of ${feedback.flag.countryName}`}
                className="mb-2 rounded shadow-sm"
                width={128}
                height={128}
              />
              <div className="text-sm">
                <p>
                  <span className="font-medium text-green-600">
                    Correct colors:
                  </span>{" "}
                  <span className="text-black">
                    {feedback.correct.join(", ") || "None"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-yellow-600">
                    Missing colors:
                  </span>{" "}
                  <span className="text-black">
                    {feedback.missing.join(", ") || "None"}
                  </span>
                </p>
                <p>
                  <span className="font-medium text-red-600">
                    Extraneous colors:
                  </span>{" "}
                  <span className="text-black">
                    {feedback.incorrect.join(", ") || "None"}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlagGame;
