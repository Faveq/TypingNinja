import React, { useRef, useState, useEffect } from 'react';
import Word from './Word';
import '../Styles/Word.css';
import '../Styles/TypingArea.css';
import '../Styles/Input.css';
import Input from './Input';

const TypingArea = (props) => {
  const [words, setWords] = useState(props.words)
  const [defaultWords, setDefaultWords] = useState(props.words)
  const [input, setInput] = useState('');
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const inputRef = useRef(null)

  useEffect(() => {
    window.addEventListener('keydown', handleFocus);

    return () => {
      window.removeEventListener('keydown', handleFocus);
    };
  }, []);

  const changeHandler = (event) => {
    setInput(event.target.value);
    check(event);
  };

  const check = (event) => {
    const currentTypedChar = event.target.value.slice(-1);
    const currentWordChar = words[activeWordIndex][event.target.value.length - 1];
    const wordElement = document.getElementsByClassName("active")[0];
    const letterIndex = event.target.value.length - 1;

    if (currentTypedChar === currentWordChar) {
      if (wordElement && wordElement.children[letterIndex]) {
        wordElement.children[letterIndex].classList.remove("incorrect");
        wordElement.children[letterIndex].classList.add("correct");
      }
    } else {
      if (wordElement && wordElement.children[letterIndex]) {
        wordElement.children[letterIndex].classList.remove("correct");
        wordElement.children[letterIndex].classList.add("incorrect");
      }else
      {
        updateWord(event.target.value.substring(wordElement.children.length), false)
      }
    }
  };

  const updateWord = (value, deleting) =>
  {   
    if(deleting)
    {
      const newWords = [...words];
      newWords[activeWordIndex] = newWords[activeWordIndex].substring(0, value.length - 1)
      setWords(newWords)
    }else{
      const newWords = [...words];
      newWords[activeWordIndex] += value
      setWords(newWords)
    }
  }

  const handleNextWord = () => {
    setActiveWordIndex((prevIndex) => prevIndex + 1);
    setInput('');
    
  };

  const handleFocus = () =>{
    if (document.activeElement !== inputRef.current) {
      inputRef.current.focus()
    }
  }

  const onKeyPress = (event) =>
  {     
      
        const wordElement = document.getElementsByClassName("active")[0];
          if (event.key === " ") {
            if (!input.endsWith(" ")) {
              event.preventDefault();
              handleNextWord();
            }
          }else if (event.key === "Backspace" && event.target.value.length > 0 && event.target.value.length <= defaultWords[activeWordIndex].length) {
            wordElement.children[event.target.value.length - 1].classList.remove("correct", "incorrect")
          }else if(event.key === "Backspace" && event.target.value.length > defaultWords[activeWordIndex].length)
          {
            updateWord(event.target.value, true)
          }

    
  }

  return (
    <div className="typing-area">
      {words.map((word, index) => (
        <Word
          key={index}
          word={word}
          className={index === activeWordIndex  ? 'word active' : 'word'}
          defaultWordLength={defaultWords[index].length}
          misspelled={input !== defaultWords[activeWordIndex]}
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





