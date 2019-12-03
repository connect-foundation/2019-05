import React from 'react';
import { render } from '@testing-library/react';
import Footer from '.';

describe('Footer component', () => {
  it('matches with the snapshot', () => {
    const { getByText } = render(<Footer />);
    const footer = getByText(/^Copy/);
    expect(footer).toMatchSnapshot();
  });
});
