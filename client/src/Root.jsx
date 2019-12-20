import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ProviderWrapper from './contexts/ProviderWrapper';
import { AuthContainer } from './container';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <CookiesProvider>
      <ProviderWrapper>
        <AuthContainer>
          <App />
        </AuthContainer>
      </ProviderWrapper>
    </CookiesProvider>
  </BrowserRouter>
);

export default Root;
