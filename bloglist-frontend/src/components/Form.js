import React from 'react';
import Input from './Input';

const Form = ({ onSubmit, formName, inputs }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>{formName}</h2>
      {inputs.map((input) => (
        <Input
          key={input.name}
          label={input.label}
          type={input.type}
          value={Object.values(input.value)[0]}
          name={input.name}
          onChange={input.onChange}
        />
      ))}
      <button type='submit'>{formName}</button>
    </form>
  );
};

export default Form;
