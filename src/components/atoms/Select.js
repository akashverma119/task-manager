import React from 'react'

const Select = (props) => {
  
  return (
    <select defaultValue={props?.defaultValue} onChange={(event)=>{props?.onChange(event,props?.parameters)}}>
      {
        props.options.map((option,index)=><option key={index}>{option}</option>)
      }
    </select>
  )
}

export default Select