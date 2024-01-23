import React from 'react'

const Word = props =>{
    const {className, word, defaultWordLength, misspelled, activeLetterIndex, isWordActive} = props

    return(    
    <div className={misspelled ? className + ' misspelled' : className}>
    {word.split('').map((letter, key) =>( 
      <div key={key} className={key > defaultWordLength - 1 ? 'letter overtyped' : 'letter'} id={activeLetterIndex === key && isWordActive? 'active-letter' : ''}>{letter}</div>
    ))}
    </div>  
      
    )
}

export default Word