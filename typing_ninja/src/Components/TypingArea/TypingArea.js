import React, { useRef, useState, useEffect, useContext } from "react";
import Word from "../Word";
import "../../Styles/Word.css";
import "../../Styles/TypingArea.css";
import "../../Styles/Input.css";
import "../../Styles/WordsCounter.css";
import Input from "../Input";
import WordsCounter from "../WordsCounter";
import useStopwatch from "./StopWatch";
import Context from "../Context";

const TypingArea = (props) => {
  const [words, setWords] = useState(props.words);
  const [defaultWords, setDefaultWords] = useState(props.words);
  const [input, setInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const [uncorrectedErrorsAmount, setUncorrectedErrorsAmount] = useState(-1);
  const [typedLettersAmount, setTypedLettersAmount] = useState(0);
  const [typingFinished, setTypingFinished] = useState(false);
  const { elapsedTime, isRunning, startStop, reset } = useStopwatch();
  const clickSoundIndex = useContext(Context);
  const [clickSound, setClickSound] = useState();
  const [isFirstClick, setIsFirstClick] = useState(true);

  const inputRef = useRef(null);
  const { handleTypingStats, className } = props;

  const clickSoundsPaths = [
    "none_sound.wav",
    "osu_sound.wav",
    "click_sound.wav",
  ];

  useEffect(() => {
    window.addEventListener("keydown", handleFocus);
    if (!clickSound) {
      setClickSound(new Audio(process.env.PUBLIC_URL + "Sounds/" + clickSoundsPaths[clickSoundIndex]));
    }
  
    return () => {
      window.removeEventListener("keydown", handleFocus);
    };
  }, [clickSoundIndex, clickSound]);

  const changeHandler = (event) => {
    if (activeWordIndex < words.length) {
      setInput(event.target.value);
      checkWord(event);
    }
  };

  useEffect(() => {
    if (clickSoundIndex <= clickSoundsPaths.length) {
      setClickSound(new Audio(process.env.PUBLIC_URL + "Sounds/" + clickSoundsPaths[clickSoundIndex]));
    }
  }, [clickSoundIndex]);

  useEffect(() => {
    let allWords = document.getElementsByClassName("word");
    let tempErrorsAmount = 0;

    if (activeWordIndex === words.length) {
      Array.from(allWords).forEach((word) => {
        Array.from(word.children).forEach((letter) => {
          if (!letter.classList.contains("correct")) {
            tempErrorsAmount++;
          }
        });
      });
      setUncorrectedErrorsAmount(tempErrorsAmount);
    }
  }, [typingFinished]);

  useEffect(() => {
    if (typingFinished) {
      handleTypingStats(
        elapsedTime,
        uncorrectedErrorsAmount,
        typedLettersAmount
      );
    }
    return () => {};
  }, [uncorrectedErrorsAmount]);

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

  const handleFocus = () => {
    if (document.activeElement !== inputRef.current) {
      inputRef.current.focus();
    }
  };

  const playSound = () => {
    clickSound.play();
  };

  const handleTypingFinish = () => {
    startStop();
    setTypingFinished(true);
  };

  const handleNextWord = () => {
    if (activeWordIndex < words.length - 1) {
      setActiveWordIndex((prevIndex) => prevIndex + 1);
    } else if (activeWordIndex === words.length - 1) {
      handleTypingFinish();
      setActiveWordIndex((prevIndex) => prevIndex + 1);
    }
    setInput("");
  };

  const checkWord = (event) => {
    const currentTypedChar = event.target.value.slice(-1);
    const currentWordChar =
      words[activeWordIndex][event.target.value.length - 1];
    const activeWord = document.getElementsByClassName("active")[0];
    const letterIndex = event.target.value.length - 1;

    if (
      activeWordIndex === words.length - 1 &&
      words[activeWordIndex] === event.target.value
    ) {
      handleNextWord();
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

  const onKeyPress = (event) => {
    const wordElement = document.getElementsByClassName("active")[0];

    if (isFirstClick) {
      startStop();
      setIsFirstClick(false);
    }

    if (
      event.key !== "Backspace" &&
      event.key !== "Shift" &&
      event.key !== "Tab"
    ) {
      setTypedLettersAmount((typedLettersAmount) => typedLettersAmount + 1);
      playSound();
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
          className={
            index === activeWordIndex && !typingFinished
              ? "word active"
              : "word"
          }
          defaultWordLength={defaultWords[index].length}
          misspelled={input !== defaultWords[activeWordIndex]}
          activeLetterIndex={input.length}
          isWordActive={index === activeWordIndex && !typingFinished}
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
