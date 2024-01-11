import React from 'react'

const Input = props =>{
    const {className, value, onChange, type} = props
    
    return(
        <input type={type} className={className} value={value} onChange={onChange}/>       
    )
}
export default Input