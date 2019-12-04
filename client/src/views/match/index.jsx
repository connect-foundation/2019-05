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
import { MatchProvider } from '../../contexts/Match/Context';

import './index.scss';

const match = () => (
  <MatchProvider>
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
  </MatchProvider>
);

export default match;
