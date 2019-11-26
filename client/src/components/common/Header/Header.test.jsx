import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '.';

describe('Header component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const quickMatch = getByText('Quick Match');
    expect(quickMatch).toBeInTheDocument();
  });
});
