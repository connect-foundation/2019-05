import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import Footer from '.';
describe('Footer component', () => {
  it('renders without crashing', () => {
    // given
    const { getByText } = render(<Footer />);
    const footer = getByText(/^Copy/);

    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('footer');
    expect(footer).toHaveTextContent(
      'Copyright 2019. team Underdoggs. All rights reserved.'
    );
  });
});
