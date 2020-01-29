import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders wrapper', () => {
  const { getByTestId } = render(<App />);
  const wrapperElement = getByTestId('wrapper');
  expect(wrapperElement).toBeInTheDocument();
});
