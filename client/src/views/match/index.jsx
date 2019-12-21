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

const FILTER_MSG = '날짜와 시간, 지역을 선택하여 원하는 경기를 찾아보세요!';

const match = () => (
  <MatchProvider>
    <SideBar />
    <div className="match">
      <Header />
      <div className="grid-container">
        <div className="match-container">
          <div className="match-board__container">
            <MatchRegist />
            <MatchList />
          </div>
          <div className="match-filter__container">
            <ViewTitle title={FILTER_MSG} />
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
