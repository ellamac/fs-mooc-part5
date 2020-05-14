import React from 'react';

const Button = ({ onClick, buttonText, type, className, id }) => {
  return (
    <button type={type} className={className} id={id} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default Button;
