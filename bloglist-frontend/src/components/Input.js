import React from 'react';

const Input = ({ label, type, value, name, onChange, id }) => {
  return (
    <div>
      {label}
      <input
        id={id}
        type={type}
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
