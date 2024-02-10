import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import TypingArea from "../Components/TypingArea/TypingArea";
import "../Styles/Main.css";
import WordsAmountSelection from "../Components/WordsAmountSelection";
import Summary from "../Components/Summary/Summary";
import "bootstrap/dist/css/bootstrap.min.css";

const Main = (props) => {
  const [cookies, setCookie] = useCookies(["wordsAmountCookie"]);
  const [allWords, setAllWords] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [wordsToPass, setWordsToPass] = useState([]);
  const [uncorrectedErrorsAmount, setUncorrectedErrorsAmount] = useState(-1);
  const [typedLettersAmount, setTypedLettersAmount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [typingFinished, setTypingFinished] = useState(false);
  const [isFirstRestart, setIsFirstRestart] = useState(true);

  useEffect(() => {
    if (!cookies.wordsAmountCookie) {
      setCookie("wordsAmountCookie", 10, { path: "/" });
    }
    const fetchData = async () => {
      setDataReady(false);
      try {
        const response = await fetch("/Words.json");
        const data = await response.json();

        if (data && Array.isArray(data)) {
          setAllWords(data);
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error during files download:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (allWords.length > 0) {
      randomizeWords();
    }
  }, [dataReady, allWords]);

  useEffect(() => {
    const handleTabKey = (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        restartTest();
      }
    };

    window.addEventListener("keydown", handleTabKey);

    return () => {
      window.removeEventListener("keydown", handleTabKey);
    };
  }, [cookies.wordsAmountCookie, allWords, typingFinished]);

  const restartTest = () => {
    if (isFirstRestart) {
      setIsFirstRestart(false);
    }
    if (typingFinished) {
      setTypingFinished(false);
    }
    randomizeWords();
  };

  const randomizeWords = () => {
 
    if (allWords) {
      let tempArray = [];
      for (let i = 0; i < cookies.wordsAmountCookie; i++) {
        const randomIndex =
          Math.floor(Math.random() * allWords.length) % allWords.length;
        tempArray[i] = allWords[randomIndex];
      }
      setWordsToPass(tempArray);
      setDataReady(true);
    } else {
      console.error("Invalid or empty allWords array");
    }
  };

  const handleNewWordsAmount = (passedWordsAmount) => {
    if (passedWordsAmount !== 0) {
      setCookie("wordsAmountCookie", passedWordsAmount, { path: "/" });
      setDataReady(false);
    }
  };

  const handleTypingStats = (
    _elapsedSeconds,
    _uncorrectedErrorsAmount,
    _typedLettersAmount
  ) => {
    setElapsedSeconds(_elapsedSeconds);
    setUncorrectedErrorsAmount(_uncorrectedErrorsAmount);
    setTypedLettersAmount(_typedLettersAmount);
    setTypingFinished(true);
  };

  return dataReady ? (
    <div className="main-content container offset-md-3 offset-sm-1">
      <div className={typingFinished ? "summary show" : "summary hide"}>
        <Summary
          elapsedSeconds={elapsedSeconds}
          uncorrectedErrorsAmount={uncorrectedErrorsAmount}
          typedLettersAmount={typedLettersAmount}
        />
      </div>
      <div
        className={
          !typingFinished
            ? "typing-test-div show col-md-8 col-sm-12 "
            : "typing-test-div hide"
        }
      >
        <WordsAmountSelection
          className="words-amount-selection"
          currentWordsAmount={cookies.wordsAmountCookie}
          passNewWordsAmount={handleNewWordsAmount}
        />

        <TypingArea
          className="col-md-8 col-sm-12 "
          key={wordsToPass.join()}
          words={wordsToPass}
          defaultWords={wordsToPass}
          handleTypingStats={handleTypingStats}
          clickSound={cookies.clickSoundCookie}
        />
      </div>
      <div className="restart-div col-md-8 col-sm-12">
        <img
          src={process.env.PUBLIC_URL + "/Images/restart.png"}
          alt="Restart"
          className="restart-image"
          onClick={() => restartTest()}
        />
        <p
          className={isFirstRestart ? "restart-hint" : "restart-hint invisible"}
        >
          Tab for restart
        </p>
      </div>
    </div>
  ) : (
    <div className="container offset-md-3">
      <div className="loading-div col-md-9 col-sm-12">
        <div
          className="spinner-border text-primary col-md-9 col-sm-12"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};
export default Main;
