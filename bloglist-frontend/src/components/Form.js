import React from 'react';
import Input from './Input';
import Button from './Button';

const Form = ({ onSubmit, formName, inputs, id }) => {
  return (
    <div className='formDiv'>
      <h2>{formName}</h2>
      <form onSubmit={onSubmit} id='id'>
        {inputs.map((input) => (
          <Input
            key={input.id}
            id={input.id}
            label={input.label}
            type={input.type}
            value={Object.values(input.value)[0]}
            name={input.name}
            onChange={input.onChange}
          />
        ))}
        <Button
          type='submit'
          className='formButton'
          id={`${id}-button`}
          buttonText={formName}
        />
      </form>
    </div>
  );
};

export default Form;
