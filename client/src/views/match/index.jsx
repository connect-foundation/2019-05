import React from 'react';
import {
  Header,
  Footer,
  ViewTitle,
  MatchFilter,
} from '../../components/common';
import {
  MatchList,
  MatchMap,
  MatchRegist,
  MatchRegistModal,
} from '../../components/match';
import './index.scss';

const match = () => (
  <div className="match">
    <Header />
    <div className="grid-container">
      <ViewTitle title="match" />
      <MatchFilter />
      <div className="match-container">
        <div className="match-board">
          <MatchRegist />
          <MatchList />
        </div>
        <MatchMap />
      </div>
    </div>
    <Footer />
    <MatchRegistModal />
  </div>
);

export default match;
