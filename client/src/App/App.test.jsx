import React from 'react';
import { createMemoryHistory } from 'history';
import App from './index';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';

describe('<App /> component', () => {
  it('renders and navigates', () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    // when Quick Match link exists
    expect(container.innerHTML).toMatch(/Match/i);

    // when Quick Match button is clicked
    fireEvent.click(getByText(/Match/));
    expect(container.innerHTML).toMatch(/매치매치/);

    // when Quick Team button is clicked
    fireEvent.click(getByText(/Team/));
    expect(container.innerHTML).toMatch(/팀팀/);
  });
});
