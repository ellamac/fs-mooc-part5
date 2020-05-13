import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
  let component;
  let mockHandler = jest.fn();
  beforeEach(() => {
    component = render(<Button onClick={mockHandler} buttonText='click' />);
  });

  test('clicking the button calls event handler once', async () => {
    mockHandler.mockClear();
    const button = component.getByText('click');
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
  });

  test('clicking the button twice calls event handler twice', async () => {
    mockHandler.mockClear();
    const button = component.getByText('click');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
