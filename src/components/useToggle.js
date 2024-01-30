import { useState } from "react"; 

export const useToggle =(intialVal = false)=>{
  const [state,setState] = useState(intialVal);
  const toggle = () =>{
    setState((prev)=>!prev);
  }
  return [state,toggle];
}