import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Form from './Form';

test('<Form /> updates parent state and calls onSubmit', () => {
  const onSubmit = jest.fn();

  const component = render(
    <Form
      onSubmit={onSubmit}
      formName='formName'
      inputs={[
        {
          label: 'input',
          type: 'text',
          value: '',
          name: 'Input',
        },
      ]}
    />
  );

  const form = component.container.querySelector('form');

  fireEvent.submit(form);

  expect(onSubmit.mock.calls).toHaveLength(1);
});
