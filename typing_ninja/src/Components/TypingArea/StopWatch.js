import { useState, useEffect } from "react";

const useStopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevElapsedTime) => {
          return prevElapsedTime + 0.1;
        });
      }, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  return { elapsedTime, isRunning, startStop, reset };
};

export default useStopwatch;
