import React from 'react';
import { Header, Footer } from '../../components/common';

const error = () => (
  <div className="error">
    <Header />
    <div className="grid-container">
      <h1>잘못 들어오셨어요. 나가주세요.</h1>
    </div>
    <Footer />
  </div>
);

export default error;
