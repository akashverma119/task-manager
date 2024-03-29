import React from "react";

const Button = (props) => {
  return (
    <button
      className={props?.className}
      onClick={() => props?.onClick(props?.parameters)}
    >
      {props.value}
    </button>
  );
};

export default Button;
