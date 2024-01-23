import { useState, useEffect } from "react";

const useCalculateWPM = () => {
  const [grossWPM, setGrossWPM] = useState(0);
  const [netWPM, setNetWPM] = useState(0);

  const calculateGrossWPM = (elapsedSeconds, uncorrectedErrors, typedLettersAmount) => {
    if (!typedLettersAmount || !elapsedSeconds) {
      console.error("Missing data for calculations");
      return;
    } else {
      const newGrossWPM = typedLettersAmount / 5 / (elapsedSeconds / 60);
      setGrossWPM(newGrossWPM);
      return newGrossWPM;
    }
  };

  const calculateNetWPM = (elapsedSeconds, uncorrectedErrors, typedLettersAmount) => {
    if (!typedLettersAmount || !elapsedSeconds) {
      console.error("Missing data for calculations");
      return;
    } else {
      const newGrossWPM = calculateGrossWPM(elapsedSeconds, uncorrectedErrors, typedLettersAmount);
      const newNetWPM = newGrossWPM - uncorrectedErrors * (elapsedSeconds / 60); //do poprawy, zle liczy
      setNetWPM(newNetWPM);
      return newNetWPM;
    }
  };

  return { grossWPM, netWPM, calculateGrossWPM, calculateNetWPM };
};

export default useCalculateWPM;
