import React from "react";

const Input = (props) => {
  return (
    <input
      type={props?.type}
      placeholder={props?.placeholder}
      value={props?.value}
      onChange={(event) => {
        props?.onChange(event, props?.parameters);
      }}
    ></input>
  );
};

export default Input;
