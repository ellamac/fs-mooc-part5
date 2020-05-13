import React from 'react';

const Button = ({ onClick, buttonText }) => {
  return <button onClick={onClick}>{buttonText}</button>;
};

export default Button;
