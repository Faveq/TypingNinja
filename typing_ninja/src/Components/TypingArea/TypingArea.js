import React, { useRef, useState, useEffect } from "react";
import Word from "../Word";
import "../../Styles/Word.css";
import "../../Styles/TypingArea.css";
import "../../Styles/Input.css";
import "../../Styles/WordsCounter.css";
import Input from "../Input";
import WordsCounter from "../WordsCounter";
import useStopwatch from "./StopWatch";
import useCalculateWPM from "./CalculateWPM";

const TypingArea = (props) => {
  const [words, setWords] = useState(props.words);
  const [defaultWords, setDefaultWords] = useState(props.words);
  const [input, setInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [uncorrectedErrorsAmount, setUncorrectedErrorsAmount] = useState(0);
  const [typedLettersAmount, setTypedLettersAmount] = useState(0);
  const { elapsedTime, isRunning, startStop, reset } = useStopwatch();
  const { grossWPM, netWPM, calculateGrossWPM, calculateNetWPM } =
    useCalculateWPM();
  const inputRef = useRef(null);
  const [typingFinished, setTypingFinished] = useState(false);

  useEffect(() => {
    window.addEventListener("keydown", handleFocus);

    return () => {
      window.removeEventListener("keydown", handleFocus);
    };
  }, []);

  const changeHandler = (event) => {
    setInput(event.target.value);     
    checkWord(event);
  };

  const checkWord = (event) => {
    const currentTypedChar = event.target.value.slice(-1);
    const currentWordChar =
      words[activeWordIndex][event.target.value.length - 1];
    const activeWord = document.getElementsByClassName("active")[0];
    const letterIndex = event.target.value.length - 1;

    if (activeWordIndex === 0 && event.target.value.length === 1) {
      startStop();
    } else if (
      activeWordIndex === words.length - 1 &&
      words[activeWordIndex] === event.target.value
    ) {
      handleTypingFinish();
    }

    if (currentTypedChar === currentWordChar) {
      if (activeWord && activeWord.children[letterIndex]) {
        activeWord.children[letterIndex].classList.remove("incorrect");
        activeWord.children[letterIndex].classList.add("correct");
      }
    } else {
      if (activeWord && activeWord.children[letterIndex]) {
        activeWord.children[letterIndex].classList.remove("correct");
        activeWord.children[letterIndex].classList.add("incorrect");
      } else {
        updateWord(
          event.target.value.substring(activeWord.children.length),
          false
        );
      }
    }
  };

  const handleTypingFinish = () => {
    startStop();
    setTypingFinished(true);
  };

  useEffect(() => {
    if(activeWordIndex === words.length - 1)
    {
      console.log(elapsedTime)
      console.log(uncorrectedErrorsAmount)
      console.log(typedLettersAmount)
      console.log(calculateGrossWPM(elapsedTime, uncorrectedErrorsAmount, typedLettersAmount));
      console.log(calculateNetWPM(elapsedTime, uncorrectedErrorsAmount, typedLettersAmount));
    }

    return () => {
    };
  }, [uncorrectedErrorsAmount]);

  useEffect(() => {
    let allWords = document.getElementsByClassName("word");
    let tempErrorsAmount = 0
    if (activeWordIndex === words.length - 1) {
      Array.from(allWords).forEach((word) => {
        Array.from(word.children).forEach((letter) => {
          if(!letter.classList.contains('correct'))
          {
            tempErrorsAmount++
          }
        });
      });
    }
    setUncorrectedErrorsAmount(tempErrorsAmount)
  }, [typingFinished]);

  const updateWord = (value, deleting) => {
    if (deleting) {
      const newWords = [...words];
      newWords[activeWordIndex] = newWords[activeWordIndex].substring(
        0,
        value.length - 1
      );
      setWords(newWords);
    } else {
      const newWords = [...words];
      newWords[activeWordIndex] += value;
      setWords(newWords);
    }
  };

  const handleNextWord = () => {
    setActiveWordIndex((prevIndex) => prevIndex + 1);
    setInput("");
  };

  const handleFocus = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onKeyPress = (event) => {
    const wordElement = document.getElementsByClassName("active")[0];

    if(event.key !== "Backspace" && event.key !== " ")
    {
      setTypedLettersAmount(typedLettersAmount => typedLettersAmount + 1)
    }

    if (event.key === " ") {
      if (!input.endsWith(" ")) {
        event.preventDefault();
        handleNextWord();
      }
    } else if (
      event.key === "Backspace" &&
      event.target.value.length > 0 &&
      event.target.value.length <= defaultWords[activeWordIndex].length
    ) {
      wordElement.children[event.target.value.length - 1].classList.remove(
        "correct",
        "incorrect"
      );
    } else if (
      event.key === "Backspace" &&
      event.target.value.length > defaultWords[activeWordIndex].length
    ) {
      updateWord(event.target.value, true);
    }
  };

  return (
    <div className="typing-area">
      <WordsCounter
        className="words-counter"
        wordsTypedCount={activeWordIndex}
        allWordsCount={words.length}
      />
      {words.map((word, index) => (
        <Word
          key={index}
          word={word}
          className={index === activeWordIndex ? "word active" : "word"}
          defaultWordLength={defaultWords[index].length}
          misspelled={input !== defaultWords[activeWordIndex]}
          activeLetterIndex={input.length}
          isWordActive={index === activeWordIndex}
        />
      ))}

      <Input
        ref={inputRef}
        type="text"
        className="letter-input"
        value={input}
        onChange={changeHandler}
        onKeyPress={onKeyPress}
      />
    </div>
  );
};

export default TypingArea;
