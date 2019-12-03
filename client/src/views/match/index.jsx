import React from 'react';
import {
  Header,
  Footer,
  ViewTitle,
  MatchFilter,
} from '../../components/common';
import { MatchList, MatchMap } from '../../components/match';
import './index.scss';

const match = () => (
  <div className="match">
    <Header />
    <div className="grid-container">
      <ViewTitle title="match" />
      <MatchFilter />
      <div className="match-container">
        <MatchList />
        <MatchMap />
      </div>
    </div>
    <Footer />
  </div>
);

export default match;