import Image from "next/image";
import { FaCheck } from "react-icons/fa";

interface CountryCardProps {
  country: string;
  countryCode: string;
  continent?: string;
  isGuessed?: boolean;
  showContinent?: boolean;
}

export const CountryCard = ({ 
  country, 
  countryCode, 
  continent, 
  isGuessed = false,
  showContinent = false 
}: CountryCardProps) => {
  return (
    <div
      className={`bg-white p-3 rounded-lg shadow-sm transition-all duration-300 ${
        isGuessed
          ? "border-2 border-green-400"
          : "border border-gray-200"
      } hover:shadow-md`}
    >
      <div className="aspect-video relative overflow-hidden rounded-md shadow-sm mb-2">
        <Image
          src={`/flags/${countryCode}.svg`}
          alt={`Flag of ${country}`}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-2">
        <p className="text-center text-gray-800 font-medium text-sm truncate">
          {country}
          {isGuessed && (
            <span className="ml-1 inline-flex items-center justify-center text-xs text-green-700 bg-green-100 rounded-full h-4 w-4">
              <FaCheck className="text-xs" />
            </span>
          )}
        </p>
        {showContinent && continent && (
          <p className="text-center text-xs text-gray-500">
            {continent}
          </p>
        )}
      </div>
    </div>
  );
};