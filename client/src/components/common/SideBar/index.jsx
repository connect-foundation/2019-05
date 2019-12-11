import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { SideBarContext } from '../../../contexts/SideBar/Context';
import './index.scss';
import naver_login from '../../../../src/assets/images/naver_login_green_mid.PNG';
import naver_logout from '../../../../src/assets/images/naver_logout_green_mid.PNG';

const SideBar = () => {
  const { activated, setActivated } = useContext(SideBarContext);
  const [isLoggedIn, setLogIn] = useState(false);
  const openState = activated ? 'side-bar--opening' : '';
  return (
    <>
      <nav className={`side-bar ${openState}`}>
        <TeamInfo />
        <CloseBtn activated={activated} setActivated={setActivated} />
        <LoginWithNaver isLoggedIn={isLoggedIn} setLogIn={setLogIn} />
        <Notifications />
      </nav>
    </>
  );
};

const LoginWithNaver = ({ isLoggedIn, setLogIn }) => {
  const handleClick = (e) => {
    setLogIn(!isLoggedIn);
  };
  return (
    <div className="auth-button" onClick={handleClick}>
      <a href="http://127.0.0.1:4000/auth/naver">
        <img
          className="auth-button__img"
          src={isLoggedIn ? naver_logout : naver_login}
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
    <button className="btn">팀 페이지</button>
  </div>
);

export default SideBar;
