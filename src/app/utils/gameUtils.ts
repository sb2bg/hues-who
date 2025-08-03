export const includesCaseInsensitive = (arr: string[], value: string) => {
  return arr.find((item) => item.toLowerCase() === value.toLowerCase());
};

export const calculateProgress = (current: number, total: number): number => {
  return (current / total) * 100;
};

export const initializeContinentStats = (countries: string[], getFlagByCountry: (country: string) => any) => {
  const continentMap: { [key: string]: string[] } = {};
  const stats: { [key: string]: { total: number; found: number } } = {};

  countries.forEach((country) => {
    const flag = getFlagByCountry(country);
    if (flag && flag.continent) {
      if (!continentMap[flag.continent]) {
        continentMap[flag.continent] = [];
      }
      continentMap[flag.continent].push(country);
    }
  });

  Object.keys(continentMap).forEach((continent) => {
    stats[continent] = {
      total: continentMap[continent].length,
      found: 0,
    };
  });

  return { continentMap, stats };
};

export const updateContinentStats = (
  prevStats: { [key: string]: { total: number; found: number } },
  continent: string
) => {
  const newStats = { ...prevStats };
  if (newStats[continent]) {
    newStats[continent] = {
      ...newStats[continent],
      found: newStats[continent].found + 1,
    };
  }
  return newStats;
};