"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Flag,
  getRandomCountry,
  getAllCountries,
  getCountriesWithColors,
  getFlagByCountry,
} from "../utils/flagUtils";
import { includesCaseInsensitive, initializeContinentStats, updateContinentStats } from "../utils/gameUtils";
import { GameHeader } from "./GameHeader";
import { GameControls } from "./GameControls";
import { ColorDisplay } from "./ColorDisplay";
import { ContinentStats } from "./ContinentStats";
import { GuessInput } from "./GuessInput";
import { GameResults } from "./GameResults";
import { CountryGrid } from "./CountryGrid";
import { FeedbackPanel } from "./FeedbackPanel";

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

  // New state variables for continent tracking
  const [continentStats, setContinentStats] = useState<{
    [key: string]: { total: number; found: number };
  }>({});

  const startNewRound = useCallback(() => {
    setIsLoading(true);
    const newFlag = getRandomCountry();
    const newMatchingCountries = getCountriesWithColors(newFlag.colors);

    const { stats } = initializeContinentStats(newMatchingCountries, getFlagByCountry);

    setCurrentFlag(newFlag);
    setMatchingCountries(newMatchingCountries);
    setContinentStats(stats);
    setGuessedCountries([]);
    setGameState("playing");
    setFeedback(null);
    setUserGuess("");
    setSuggestions([]);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setAllCountries(getAllCountries());
    startNewRound();
    setIsLoading(false);
  }, [startNewRound]);


  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();

    const match = includesCaseInsensitive(matchingCountries, userGuess);

    if (match && !includesCaseInsensitive(guessedCountries, userGuess)) {
      setGuessedCountries([...guessedCountries, match]);

      // Update continent stats
      const flag = getFlagByCountry(match);
      if (flag && flag.continent) {
        setContinentStats((prevStats) => updateContinentStats(prevStats, flag.continent));
      }

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
    if (gameState === "finished") {
      setGameState("playing");
    }
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      <div className="max-w-4xl mx-auto bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 relative">
        <GameHeader />

        <div className="p-8 relative overflow-visible">
          <GameControls
            isEasyMode={isEasyMode}
            onToggleMode={toggleGameMode}
            onNewRound={startNewRound}
            onGiveUp={() => setGameState("resigned")}
          />

          <ColorDisplay
            colors={currentFlag.colors}
            guessedCount={guessedCountries.length}
            totalCount={matchingCountries.length}
          />

          {gameState === "playing" && (
            <ContinentStats continentStats={continentStats} />
          )}

          {gameState === "playing" && (
            <GuessInput
              value={userGuess}
              onChange={handleInputChange}
              onSubmit={handleGuess}
              suggestions={suggestions}
              onSelectSuggestion={selectCountry}
            />
          )}

          <GameResults
            gameState={gameState}
            isEasyMode={isEasyMode}
            matchingCountries={matchingCountries}
            guessedCountries={guessedCountries}
            onStartNewRound={startNewRound}
          />

          {guessedCountries.length > 0 && gameState === "playing" && (
            <CountryGrid
              countries={guessedCountries}
              title="Correct Guesses"
              showContinent={true}
            />
          )}

          {feedback && <FeedbackPanel feedback={feedback} />}

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
