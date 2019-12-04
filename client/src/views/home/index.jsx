import React from 'react';
import { Header, Footer } from '../../components/common';
import { HomeQuickMatch } from '../../components/home';

const home = () => (
  <div className="home">
    <Header />
    <HomeQuickMatch />
    <Footer />
  </div>
);

export default home;
