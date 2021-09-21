import React from 'react';
import ReactDOM from 'react-dom';

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders main page', () => {
  render(<App />);
  const linkElement = screen.getByText(/North Station Terminal Information/i);
  expect(linkElement).toBeInTheDocument();
});

 it('renders without crashing', () => {
   const div = document.createElement('div');
   ReactDOM.render(<App />, div);
 });

