import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import { DateTimeFilter } from '../../common';
import {
  SideBarContext,
  SideBarActionCreator,
} from '../../../contexts/SideBar';

const HomeQuickMatch = () => {
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const handleCloseSideBar = () => {
    if (sideBarState.activated)
      sideBarDispatch(SideBarActionCreator.toggleActivated());
  };

  return (
    <div className="home-quick-match">
      <div className="grid-container">
        <div className="home-wrapper">
          <div className="home--left">
            <div className="home__section-title">
              <h3>원하는 일정에 맞는 매치를 찾아보세요</h3>
            </div>
            <DateTimeFilter where="home" />
            <Link
              to="/match"
              className="go-match-btn"
              onClick={handleCloseSideBar}
            >
              <span>Quick Match!</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeQuickMatch;
