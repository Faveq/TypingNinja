import React, { useEffect, useState } from "react";
import useCalculateWPM from "./CalculateWPM";
import "../../Styles/Summary.css"

const Summary = (props) => {
  const { elapsedSeconds, uncorrectedErrorsAmount, typedLettersAmount } = props;
  const { grossWPM, netWPM, calculateGrossWPM, calculateNetWPM } =
    useCalculateWPM();

  useEffect(() => {
    if (elapsedSeconds > 0) {
      calculateGrossWPM(elapsedSeconds, typedLettersAmount);
      calculateNetWPM(
        elapsedSeconds,
        uncorrectedErrorsAmount,
        typedLettersAmount
      );
    }
    return () => {};
  }, [props]);

  return (
    <div>
      <h1 className="summary-text" title="netWPM">{parseInt(netWPM) > 0 ? parseInt(netWPM) : "invalid"} WPM</h1>
      <h5 className="summary-text">Gross WPM: {parseInt(grossWPM)}</h5>
    </div>
  );
};

export default Summary;
