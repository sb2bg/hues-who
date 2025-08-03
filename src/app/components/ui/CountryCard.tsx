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
      className={`bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl ${
        isGuessed
          ? "border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50"
          : "border border-gray-200 hover:border-indigo-300"
      }`}
    >
      <div className="aspect-video relative overflow-hidden rounded-xl shadow-md mb-3 ring-1 ring-black/5">
        <Image
          src={`/flags/${countryCode}.svg`}
          alt={`Flag of ${country}`}
          className="object-cover transition-transform duration-300 hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="space-y-1">
        <p className="text-center text-gray-800 font-semibold text-sm truncate">
          {country}
          {isGuessed && (
            <span className="ml-2 inline-flex items-center justify-center text-xs text-emerald-700 bg-emerald-100 rounded-full h-5 w-5 animate-bounce">
              <FaCheck className="text-xs" />
            </span>
          )}
        </p>
        {showContinent && continent && (
          <p className="text-center text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
            {continent}
          </p>
        )}
      </div>
    </div>
  );
};