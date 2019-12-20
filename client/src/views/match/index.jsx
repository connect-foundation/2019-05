import React from 'react';
import {
  Header,
  ViewTitle,
  DateTimeFilter,
  SideBar,
} from '../../components/common';
import {
  MatchList,
  MatchMap,
  MatchRegist,
  MatchRegistModal,
  MatchApplyModal,
} from '../../components/match';
import { MatchProvider } from '../../contexts/Match';
import './index.scss';

const match = () => (
  <MatchProvider>
    <SideBar />
    <div className="match">
      <Header />
      <div className="grid-container">
        <div className="match-container">
          <div className="match-board">
            <MatchRegist />
            <MatchList />
          </div>
          <div className="match-filter__container">
            <DateTimeFilter where="match" />
            <MatchMap />
          </div>
        </div>
      </div>
      <MatchRegistModal />
      <MatchApplyModal />
    </div>
  </MatchProvider>
);

export default match;
