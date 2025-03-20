import { useState, useEffect } from "react";

interface ProgressIndicatorProps {
  start: boolean;
  onComplete: () => void;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  start,
  onComplete,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!start) return; // Only start when triggered

    setProgress(0); // Reset progress each time

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete(); // Trigger burnCD
          return 100;
        }
        return prev + 5; // Increase faster
      });
    }, 50); // Speed of progress

    return () => clearInterval(interval);
  }, [start, onComplete]);

  return (
    <div
      style={{
        width: "100%",
        height: "20px",
        backgroundColor: "#e0e0e0",
        overflow: "hidden",
        padding: 2,
      }}
    >
      <span
        style={{
          display: "block",
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "navy",
          transition: "width 0.05s linear",
        }}
      />
    </div>
  );
};

export default ProgressIndicator;
