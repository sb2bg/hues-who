import countries from "./codes.json";
// defined as [{"code": string, "name": string, "colors": string[]}, ...]

export interface Flag {
  countryName: string;
  countryCode: string;
  colors: string[];
}

export function getAllCountries() {
  return Object.values(countries).map((country) => country.name);
}

export function getRandomCountry() {
  const country = countries[Math.floor(Math.random() * countries.length)];

  return {
    countryName: country.name,
    countryCode: country.id,
    colors: country.colors,
  };
}

export const getCountriesWithColors = (colors: string[]): string[] => {
  return countries
    .filter((country) => {
      return (
        colors.length === country.colors.length &&
        colors.every((color) => country.colors.includes(color)) &&
        country.colors.every((color) => colors.includes(color))
      );
    })
    .map((country) => country.name);
};

export const getFlagByCountry = (countryName: string) => {
  const country = countries.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (country) {
    return {
      countryName: country.name,
      countryCode: country.id,
      colors: country.colors,
    };
  }

  return null;
};
