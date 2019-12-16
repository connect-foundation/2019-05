/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import {
  SideBarActionCreator,
  SideBarContext,
} from '../../../contexts/SideBar';
import { UserContext, UserActionCreator } from '../../../contexts/User';
import barcaLogo from '../../../assets/images/fc-barcelona-logo.png';
import './index.scss';
import useAsync from '../../../hooks/useAsync';
import classNames from 'classnames';

const authenticateUser = async (token) => {
  if (!token) return null;
  const response = await axios(
    process.env.REACT_APP_API_SERVER_ADDRESS + '/user',
    {
      headers: { Authorization: token },
    }
  );
  return response.data.userInfo.playerId;
};

const SideBar = () => {
  const [cookies] = useCookies();
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const openState = sideBarState.activated ? 'side-bar--open' : '';
  const { userState, userDispatch } = useContext(UserContext);
  const [loginState] = useAsync(authenticateUser.bind(null, cookies.jwt), []);
  const { data: playerId } = loginState;

  const handleActivated = () => {
    sideBarDispatch(SideBarActionCreator.toggleActivated());
  };

  useEffect(() => {
    if (!playerId) return;
    userDispatch(UserActionCreator.login(playerId));
  }, [playerId]);
  const sideBarClass = classNames({
    'side-bar': true,
    'side-bar--open': sideBarState.activated,
    'side-bar__inner-layer--loggedin': playerId,
  });
  return (
    <nav className={sideBarClass}>
      <CloseBtn
        activated={sideBarState.activated}
        setActivated={handleActivated}
      />
      {playerId ? <InnerLayerWhenLoggedIn /> : <InnerLayerWhenLoggedOut />}
    </nav>
  );
};
const InnerLayerWhenLoggedIn = () => {
  return (
    <>
      <TeamInfo />
      <ContentButton>🚀예시 버튼</ContentButton>
      <Notifications />
      <EmptySpace />
      <LogoutButton />
    </>
  );
};

const InnerLayerWhenLoggedOut = () => {
  const message = '지금 바로 퀵킥의 멤버가 되어 보세요!';
  return (
    <div className="side-bar__inner-layer--loggedout">
      <h1>{message}</h1>
      <LoginButtons />
    </div>
  );
};

const LogoutButton = () => {
  const LOGOUT_ADDR = `${process.env.REACT_APP_API_SERVER_ADDRESS}/auth/logout`;
  return (
    <div className="auth-button">
      <a href={LOGOUT_ADDR}>
        <div className="auth-button--logout">로그아웃</div>
      </a>
    </div>
  );
};

const LoginButtons = () => {
  const NAVER_LOGIN_ADDR = `${process.env.REACT_APP_API_SERVER_ADDRESS}/auth/naver`;
  const KAKAO_LOGIN_ADDR = `${process.env.REACT_APP_API_SERVER_ADDRESS}/auth/kakao`;

  return (
    <div className="auth-button">
      <a href={NAVER_LOGIN_ADDR}>
        <AuthButton provider="naver" />
      </a>
      <a href={KAKAO_LOGIN_ADDR}>
        <AuthButton provider="kakao" />
      </a>
    </div>
  );
};

const Notifications = () => {
  const [open, setOpen] = useState(false);

  const matches = [
    { seq: 1, content: 'match 1' },
    { seq: 2, content: 'match 2' },
    { seq: 3, content: 'match 3' },
  ];
  const handleBtnClick = () => {
    setOpen(!open);
  };
  const btnClass = classNames({
    pressed: open,
  });
  return (
    <>
      <ContentButton className={btnClass} onClick={handleBtnClick}>
        🛎 알림 신청 내역 &nbsp;{' '}
        {open ? <span role="img">🙉</span> : <span role="img">🙈</span>}
        {open ? <NotiList matches={matches} /> : null}
      </ContentButton>
    </>
  );
};

const NotiList = ({ matches }) => (
  <ul>
    {matches.map((match) => (
      <li key={match.seq}>{match.content}</li>
    ))}
  </ul>
);

const CloseBtn = ({ activated, setActivated }) => (
  <div className="close-btn">
    <button type="button" onClick={() => setActivated(!activated)}>
      <FontAwesomeIcon icon={faTimesCircle} size="2x" />
    </button>
  </div>
);

const TeamInfo = () => (
  <div>
    <Emblem />
    <ContentButton>⚙️팀 페이지</ContentButton>
  </div>
);

const ContentButton = ({ className = '', children, onClick }) => {
  return (
    <div className={`${className} side-bar__content-button`} onClick={onClick}>
      {children}
    </div>
  );
};

const Emblem = () => {
  return (
    <>
      <div className="side-bar__emblem-wrapper">
        <div className="side-bar__emblem">
          <img src={barcaLogo} alt="" />
        </div>
      </div>
      <div className="side-bar__team-name-wrapper">
        <div className="side-bar__team-name">
          <h2>FC Barcelona</h2>
        </div>
      </div>
    </>
  );
};

const AuthButton = ({ provider }) => {
  const message = `${provider === 'naver' ? '네이버 ' : '카카오'} 로그인`;
  return (
    <>
      <div className={`new-auth-button new-auth-button--${provider}`}>
        <img className="auth-logo" src={`${provider}.svg`} alt="" />
        <span className="auth-message">{message}</span>
      </div>
    </>
  );
};

const EmptySpace = () => <div className="empty"></div>;

export default SideBar;
