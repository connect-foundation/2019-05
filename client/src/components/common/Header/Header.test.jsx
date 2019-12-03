import React from 'react';
import { render } from '@testing-library/react';
import { FilterProvider } from '../../../contexts/Filter/Context';
import { BrowserRouter } from 'react-router-dom';
import Header from '.';

describe('Header component', () => {
  it('renders correctly with the context', () => {
    const { container } = render(
      <BrowserRouter>
        <FilterProvider>
          <Header />
        </FilterProvider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
