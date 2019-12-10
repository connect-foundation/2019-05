import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { SideBarContext } from '../../../contexts/SideBar/Context';
import { PlayerContext } from '../../../contexts/User/Context';
import { playerActions } from '../../../contexts/User/Reducer';
import useAsync from '../../../hooks/useAsync';
import naverLoginPng from '../../../assets/images/naver_login_green_mid.PNG';
import naverLogoutPng from '../../../assets/images/naver_logout_green_mid.PNG';
import './index.scss';

const getUserId = async () => {
  const response = await axios('http://127.0.0.1:4000/user', {
    withCredentials: true,
    mode: 'cors',
    credentials: 'include',
  });
  return response.data.userInfo.playerId;
};

const SideBar = () => {
  const [loginState] = useAsync(getUserId, []);
  const { activated, setActivated } = useContext(SideBarContext);
  const { playerState, dispatch } = useContext(PlayerContext);
  const { data: playerId, error } = loginState;

  useEffect(() => {
    if (!playerId) return;
    dispatch({ type: playerActions.LOGIN, payload: playerId });
  }, [loginState]);

  return activated ? (
    <>
      <nav className="side-bar">
        <TeamInfo />
        <CloseBtn activated={activated} setActivated={setActivated} />
        {error ? <span>error</span> : ''}
        <LoginWithNaver isLoggedIn={!!playerState.playerId} />
        <Notifications />
      </nav>
    </>
  ) : (
    <></>
  );
};

const LoginWithNaver = ({ isLoggedIn }) => {
  return (
    <div className="auth-button">
      <a href="http://127.0.0.1:4000/auth/naver">
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
  const matches = ['match 1', 'match 2', 'match 3'];
  return (
    <>
      <hr />
      <h2>알람 신청 목록</h2>

      <ul>
        {matches.map((match, idx) => (
          <li key={idx}>{match}</li>
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
    <button>팀 페이지로 이동</button>
  </div>
);

export default SideBar;
