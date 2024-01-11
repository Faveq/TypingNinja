import React, { useState } from 'react'
import Word from './Word'

import '../Styles/Word.css'
import '../Styles/TypingArea.css'
import '../Styles/Input.css'
import Input from './Input'



const TypingArea = props => {

     const [input, setInput] = useState("")

    let words = ["word1", "word2", "word3", "word2", "word3", "word2", "word3", "word2", "word3", "word2", "word3", "word2", "word3"]

    const ChangeHandler = (event) =>
    {       
        console.log(input)  
        setInput(event.target.value)          
    }

    return(
    <div className="typing-area">
        {words.map((word,key) =>(
            <Word key={key} word={word} className="word"/>
        ))}

        <Input type="text" className="letter-input" value={input} onChange={ChangeHandler} />

       
    </div>
   )
}

export default TypingArea