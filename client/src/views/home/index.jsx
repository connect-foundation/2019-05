import React from 'react';
import { Header, Footer } from '../../components/common';
import { HomeQuickMatch } from '../../components/home';
import { SideBar } from '../../components/common/';

const home = () => (
  <div className="home">
    <SideBar />
    <Header />
    <HomeQuickMatch />
  </div>
);

export default home;
