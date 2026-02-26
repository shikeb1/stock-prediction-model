import React from "react";

const Button = (props) => {
  return (
    <a
      className={`btn ${props.class}`}
      href={props.href ? props.href : "#"}
      onClick={props.onClick}
    >
      {props.text}
    </a>
  );
};

export default Button;