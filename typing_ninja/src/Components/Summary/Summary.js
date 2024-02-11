import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import useCalculateWPM from "./CalculateWPM";
import "../../Styles/Summary.css";

const Summary = (props) => {
  const { elapsedSeconds, uncorrectedErrorsAmount, typedLettersAmount } = props;
  const { grossWPM, netWPM, calculateGrossWPM, calculateNetWPM } =
    useCalculateWPM();

  const [recordSet, setRecordSet] = useState(false);
  const [cookies, setCookie] = useCookies(["wpmRecordCookie"]);


  useEffect(() => {
    if (elapsedSeconds > 0) {
      calculateGrossWPM(elapsedSeconds, typedLettersAmount);
      calculateNetWPM(
        elapsedSeconds,
        uncorrectedErrorsAmount,
        typedLettersAmount
      );
      setRecordSet(false);
    }
    return () => {};
  }, [props]);

  useEffect(() => {
    if (
      (netWPM > cookies.wpmRecordCookie || !cookies.wpmRecordCookie) &&
      netWPM > 0
    ) {
      setCookie("wpmRecordCookie", parseInt(netWPM), { path: "/" });
      setRecordSet(true);
    }
  }, [netWPM]);

  return (
    <div>
      <h1 className="summary-text net-wpm" title="netWPM">
        {recordSet ? (
          <img
            src={process.env.PUBLIC_URL + "/Images/crown-icon.png"}
            className="crown-icon"
            alt="crown"
          ></img>
        ) : (
          ""
        )}
        {parseInt(netWPM) > 0 ? parseInt(netWPM) : "invalid"} WPM
      </h1>
      <h4 className="pb">
        {" "}
        Personal record:{" "}
        {cookies.wpmRecordCookie < 0 ? "0" : cookies.wpmRecordCookie}
      </h4>
      <br />
      <h6 className="summary-text gross-wpm">
        Gross WPM: {parseInt(grossWPM)}
      </h6>
    </div>
  );
};

export default Summary;
