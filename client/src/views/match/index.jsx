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
        <ViewTitle title="match" />
        <DateTimeFilter where="match" />
        <div className="match-container">
          <div className="match-board">
            <MatchRegist />
            <MatchList />
          </div>
          <MatchMap />
        </div>
      </div>
      <MatchRegistModal />
      <MatchApplyModal />
    </div>
  </MatchProvider>
);

export default match;
