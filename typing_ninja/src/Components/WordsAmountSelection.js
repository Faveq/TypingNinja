import React from 'react'
import '../Styles/WordsAmountSelection.css'
import Button from './Button'
const WordsAmountSelection = (props) =>
{
    const buttonsValues = [5, 25, 50, 100]

    const {currentWordsAmount, passNewWordsAmount} = props

    const changeWordsAmount = (newWordsAmount) =>
    {
        passNewWordsAmount(newWordsAmount)
    }

    return(
        <div className="words-amount-selection">
             {buttonsValues.map((value, key)=>(
                <Button key={key} text={value} className={currentWordsAmount === value ? 'words-amount-option selected' : 'words-amount-option'} onClick={() => changeWordsAmount(value)}/>
                ))}
        </div>
    )
}

export default WordsAmountSelection