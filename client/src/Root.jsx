import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import ProviderWrapper from './contexts/ProviderWrapper';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <CookiesProvider>
      <ProviderWrapper>
        <App />
      </ProviderWrapper>
    </CookiesProvider>
  </BrowserRouter>
);

export default Root;
