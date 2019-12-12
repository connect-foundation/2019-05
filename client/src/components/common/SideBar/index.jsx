/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
  SideBarActionCreator,
  SideBarContext,
} from '../../../contexts/SideBar';
import { UserContext, UserActionCreator } from '../../../contexts/User';

import naverLoginPng from '../../../assets/images/naver_login_green_mid.PNG';
import naverLogoutPng from '../../../assets/images/naver_logout_green_mid.PNG';

import './index.scss';
import useAsync from '../../../hooks/useAsync';

const authenticateUser = async (token) => {
  if (!token) return null;
  const response = await axios('http://127.0.0.1:4000/user', {
    headers: { Authorization: token },
  });
  return response.data.userInfo.playerId;
};

const SideBar = () => {
  const [cookeis] = useCookies();
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const openState = sideBarState.activated ? 'side-bar--opening' : '';
  const { userState, userDispatch } = useContext(UserContext);
  const [loginState] = useAsync(authenticateUser.bind(null, cookeis.jwt), []);
  const { data: playerId } = loginState;

  const handleActivated = () => {
    sideBarDispatch(SideBarActionCreator.toggleActivated());
  };

  useEffect(() => {
    if (!playerId) return;
    userDispatch(UserActionCreator.login(playerId));
  }, [playerId]);

  return (
    <>
      <nav className={`side-bar ${openState}`}>
        <TeamInfo />
        <CloseBtn
          activated={sideBarState.activated}
          setActivated={handleActivated}
        />
        <LoginWithNaver isLoggedIn={!!userState.playerId} />
        <Notifications />
      </nav>
    </>
  );
};
const LoginWithNaver = ({ isLoggedIn }) => {
  return (
    <div className="auth-button">
      <a
        href={
          !isLoggedIn
            ? process.env.REACT_APP_DOMAIN + '/api/auth/naver'
            : process.env.REACT_APP_DOMAIN + '/api/auth/logout'
        }
      >
        <img
          className="auth-button__img"
          src={isLoggedIn ? naverLogoutPng : naverLoginPng}
          alt="login/logout btn"
        />
      </a>
    </div>
  );
};
const Notifications = () => {
  const matches = [
    { seq: 1, content: 'match 1' },
    { seq: 2, content: 'match 2' },
    { seq: 3, content: 'match 3' },
  ];
  return (
    <>
      <hr />
      <h2>알람 신청 목록</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.seq}>{match.content}</li>
        ))}
      </ul>
    </>
  );
};
const CloseBtn = ({ activated, setActivated }) => (
  <div className="close-btn">
    <button type="button" onClick={() => setActivated(!activated)}>
      <FontAwesomeIcon icon={faTimesCircle} size="2x" />
    </button>
  </div>
);
const TeamInfo = () => (
  <div>
    <h2>팀 정보</h2>
    <p>팀명: 킹동</p>
    <p>이름: 킹동</p>
    <button className="btn">팀 페이지</button>
  </div>
);
export default SideBar;
