import { FaCheck } from "react-icons/fa";
import { CountryCard } from "./ui/CountryCard";
import { getFlagByCountry } from "../utils/flagUtils";

interface CountryGridProps {
  countries: string[];
  title: string;
  showContinent?: boolean;
}

export const CountryGrid = ({ countries, title, showContinent = false }: CountryGridProps) => {
  if (countries.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="text-gray-700 text-sm font-medium mb-4 flex items-center">
        <FaCheck className="text-green-500 mr-2" />
        {title} ({countries.length})
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {countries.map((country, index) => {
          const flag = getFlagByCountry(country);
          return (
            <CountryCard
              key={index}
              country={country}
              countryCode={flag?.countryCode || ""}
              continent={flag?.continent}
              showContinent={showContinent}
            />
          );
        })}
      </div>
    </div>
  );
};