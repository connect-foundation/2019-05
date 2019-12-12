import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ProviderWrapper from './contexts/ProviderWrapper';
import App from './App';

const Root = () => (
  <BrowserRouter>
    <ProviderWrapper>
      <App />
    </ProviderWrapper>
  </BrowserRouter>
);

export default Root;
