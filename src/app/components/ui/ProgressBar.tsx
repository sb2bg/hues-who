interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
}

export const ProgressBar = ({ 
  progress, 
  className = "w-32 h-2", 
  color = "from-emerald-400 via-blue-500 to-purple-600" 
}: ProgressBarProps) => {
  return (
    <div className={`bg-gray-200/60 backdrop-blur-sm rounded-full overflow-hidden shadow-inner ${className}`}>
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-700 ease-out shadow-sm relative`}
        style={{ width: `${progress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"></div>
      </div>
    </div>
  );
};