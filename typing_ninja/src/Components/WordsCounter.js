import React from "react";

const WordsCounter = (props) => {
  const { wordsTypedCount, allWordsCount, className } = props;

  return (
    <p className={className}>
      {wordsTypedCount}/{allWordsCount}
    </p>
  );
};

export default WordsCounter;
