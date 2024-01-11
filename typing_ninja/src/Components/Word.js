import React from 'react'

const Word = props =>{
    const {className, word} = props

    return(    
    <div className={className}>
    {word.split('').map((letter, key) =>( 
      <div key={key} className='letter'>{letter}</div>
    ))}
    </div>  
    
    )
}

export default Word