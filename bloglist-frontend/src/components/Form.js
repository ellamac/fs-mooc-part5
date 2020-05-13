import React from 'react';
import Input from './Input';

const Form = ({ onSubmit, formName, inputs }) => {
  return (
    <div className='formDiv'>
      <h2>{formName}</h2>
      <form onSubmit={onSubmit}>
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
        <button type='submit' className='formButton'>
          {formName}
        </button>
      </form>
    </div>
  );
};

export default Form;
