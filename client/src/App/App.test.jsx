import React from 'react';

import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './index';

describe('<App /> component', () => {
  it('renders and navigates', () => {
    const { container, getByText, getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    // when Quick Match link exists
    expect(container.innerHTML).toMatch(/Match/i);

    // when Quick Match button is clicked
    fireEvent.click(getByText(/Match/));
    expect(getByRole('heading')).toHaveTextContent('match');

    // when Quick Team button is clicked
    fireEvent.click(getByText(/Team/));
    expect(container.innerHTML).toMatch(/랭킹/);
  });
});
