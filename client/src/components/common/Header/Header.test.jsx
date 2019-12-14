import React from 'react';
import { render } from '@testing-library/react';
import Header from '.';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ProviderWrapper from '../../../contexts/ProviderWrapper';

describe('Header component', () => {
  it('renders correctly with the context', () => {
    const { container } = render(
      <BrowserRouter>
        <CookiesProvider>
          <ProviderWrapper>
            <Header />
          </ProviderWrapper>
        </CookiesProvider>
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
