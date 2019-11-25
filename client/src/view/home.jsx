import React from 'react';
import { Header, Footer } from '../components/common';
import { HomeQuickMatch, HomeMatchStatus, HomeTeamRanking, HomeIntroduce } from '../components/home';

const home = () => (
  <div className="home">
    <Header />
    <HomeQuickMatch />
    <HomeMatchStatus />
    <HomeTeamRanking />
    <HomeIntroduce />
    <Footer />
  </div>
);

export default home;
