interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  color?: string;
}

export default function ProgressBar({ value, max = 100, label, color = 'bg-blue-500' }: ProgressBarProps) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);

  return (
    <div className="w-full">
      {(label || true) && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">{label}</span>
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{percentage}%</span>
        </div>
      )}
      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
