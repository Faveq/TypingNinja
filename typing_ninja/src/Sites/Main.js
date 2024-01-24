import React, { useState, useEffect } from "react";
import TypingArea from "../Components/TypingArea/TypingArea";
import "../Styles/Main.css";
import WordsAmountSelection from "../Components/WordsAmountSelection";
import Summary from "../Components/Summary/Summary";

const Main = (props) => {
  const [allWords, setAllWords] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [wordsAmount, setWordsAmount] = useState(10);
  const [wordsToPass, setWordsToPass] = useState([]);
  const [uncorrectedErrorsAmount, setUncorrectedErrorsAmount] = useState(-1);
  const [typedLettersAmount, setTypedLettersAmount] = useState(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [typingFinished, setTypingFinished] = useState(false);

  useEffect(() => {
    setDataReady(false);
    const fetchData = async () => {
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

  const randomizeWords = () => {
    if (allWords) {
      let tempArray = [];
      for (let i = 0; i < wordsAmount; i++) {
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
      setDataReady(false);
      setWordsAmount(passedWordsAmount);
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
    setTypingFinished(true)
  };

  return (
    <div className="app">
      <div className={typingFinished ? "summary show" : "summary hide"}>
        <Summary elapsedSeconds = {elapsedSeconds} uncorrectedErrorsAmount = {uncorrectedErrorsAmount} typedLettersAmount={typedLettersAmount}/>
      </div>
      <div className={!typingFinished ? "typing-area show" : "typing-area hide"}>
        <WordsAmountSelection className="words-amount-selection"
          currentWordsAmount={wordsAmount}
          passNewWordsAmount={handleNewWordsAmount}
        />
        {dataReady ? (
          <TypingArea
            words={wordsToPass}
            defaultWords={wordsToPass}
            handleTypingStats={handleTypingStats}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
export default Main;
