import React from 'react';
import { Header, SideBar } from '../../components/common';
import { HomeQuickMatch } from '../../components/home';

const home = () => (
  <div className="home">
    <SideBar />
    <Header />
    <HomeQuickMatch />
  </div>
);

export default home;
