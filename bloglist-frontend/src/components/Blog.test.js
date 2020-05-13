import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'react-testing-library',
    url: 'https://github.com/testing-library/react-testing-library',
    user: { username: 'Tester', name: 'React Tester' },
    likes: 0,
  };

  test('renders content', () => {
    const component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    );
  });
});
