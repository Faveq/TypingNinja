import React, { useState, useEffect } from "react";
import TypingArea from "../Components/TypingArea/TypingArea";
import "../Styles/Main.css";
import WordsAmountSelection from "../Components/WordsAmountSelection";

const Main = (props) => {
  const [allWords, setAllWords] = useState([]);
  const [dataReady, setDataReady] = useState(false);
  const [wordsAmount, setWordsAmount] = useState(10);
  const [wordsToPass, setWordsToPass] = useState([]);

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
  }, [allWords, wordsAmount]);


  const randomizeWords = () => {
    if (allWords && allWords.length > 0) {
      let tempArray = [];
      for (let i = 0; i < wordsAmount; i++) {
        const randomIndex = Math.floor(Math.random() * allWords.length) % allWords.length;
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
      setWordsAmount(passedWordsAmount)
    }
  };

  return (
    <div>
      <WordsAmountSelection
        currentWordsAmount={wordsAmount}
        passNewWordsAmount={handleNewWordsAmount}
      />
      <br />
      <br />
      <br />
      {dataReady ? (
        <TypingArea words={wordsToPass} defaultWords={wordsToPass} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default Main;
