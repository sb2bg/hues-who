interface ProgressBarProps {
  progress: number;
  className?: string;
  color?: string;
}

export const ProgressBar = ({ 
  progress, 
  className = "w-32 h-2", 
  color = "from-green-400 to-indigo-500" 
}: ProgressBarProps) => {
  return (
    <div className={`bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};