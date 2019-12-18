/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import {
  SideBarActionCreator,
  SideBarContext,
} from '../../../contexts/SideBar';
import { UserContext } from '../../../contexts/User';
import './index.scss';

const SideBar = () => {
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const { userState } = useContext(UserContext);

  const handleActivated = () => {
    sideBarDispatch(SideBarActionCreator.toggleActivated());
  };

  const sideBarClass = classNames({
    'side-bar': true,
    'side-bar--open': sideBarState.activated,
    'side-bar__inner-layer--loggedin': !!userState.playerInfo,
  });

  return (
    <nav className={sideBarClass}>
      {/* <SMSButton /> */}
      <CloseBtn
        activated={sideBarState.activated}
        setActivated={handleActivated}
      />
      <InnerLayer />
    </nav>
  );
};

const NowInnerLayer = (id, team) => {
  if (!id) return <WhenLoggedOut />;
  if (!team) return <WhenLoggedInWithoutTeam />;
  return <WhenLoggedInWithTeam />;
};

const InnerLayer = () => {
  const { userState } = useContext(UserContext);
  const { playerInfo } = userState;
  const [id, setId] = useState(null);
  const [team, setTeam] = useState(null);

  useEffect(() => {
    if (!playerInfo) return;
    setId(playerInfo.playerId);
    setTeam(playerInfo.team);
  }, [playerInfo]);

  return <>{NowInnerLayer(id, team)}</>;
};

const WhenLoggedInWithTeam = () => {
  return (
    <>
      <NotiToggleButton />
      <TeamInfo />
      <ContentButton>
        <span role="img" aria-label="rocket">
          🚀
        </span>
        예시 버튼
      </ContentButton>
      <Notifications />
      <EmptySpace />
      <LogoutButton />
    </>
  );
};

const WhenLoggedInWithoutTeam = () => {
  return (
    <>
      <Link to="/mypage">
        <button>팀 정보 입력하러 가기 !!</button>
      </Link>
      <LogoutButton />
    </>
  );
};

const WhenLoggedOut = () => (
  <div className="side-bar__inner-layer--loggedout">
    <h1>
      지금 바로
      <br />
      퀵킥의 멤버가
      <br />
      되어 보세요!
    </h1>
    <LoginButtons />
  </div>
);

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
    {
      seq: 1,
      content: 'match 1',
      startTime: '08:00',
      endTime: '10:00',
      area: ['강동구', '강남구', '중구'],
    },
    {
      seq: 2,
      content: 'match 2',
      startTime: '12:00',
      endTime: '14:00',
      area: ['서대문구', '강남구', '중구', '종로구', '용산구'],
    },
    {
      seq: 3,
      content: 'match 3',
      startTime: '15:00',
      endTime: '17:00',
      area: ['서초구', '중구'],
    },
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
        <div className="noti-pane">
          {open ? (
            <span role="img" aria-label="monkey_with_open_eyes">
              🙉
            </span>
          ) : (
            <span role="img" aria-label="monkey_with_closed_eyes">
              🙈
            </span>
          )}
          내가 신청한 알림 &nbsp; {open ? <NotiList matches={matches} /> : null}
        </div>
      </ContentButton>
    </>
  );
};

const NotiList = ({ matches }) => {
  const handleCancelBtnClick = (e) => {
    e.stopPropagation();
    alert('알림을 취소하였습니다. ');
  };
  return (
    <ul>
      {matches.map((match) => (
        <>
          <li key={match.seq}>
            <hr />
            <div className="noti-item">
              <div>
                {match.startTime} - {match.endTime}
              </div>
              <div>@{`${match.area[0]} 외 ${match.area.length - 1}개 구`}</div>
              <button
                className="noti-item__cancel-btn"
                onClick={handleCancelBtnClick}
              >
                🔕
              </button>
            </div>
          </li>
        </>
      ))}
    </ul>
  );
};

const CloseBtn = ({ activated, setActivated }) => (
  <div className="close-btn">
    <button type="button" onClick={() => setActivated(!activated)}>
      <FontAwesomeIcon icon={faTimesCircle} size="2x" />
    </button>
  </div>
);

const NotiToggleButton = () => {
  const [toggle, setToggle] = useState(true);
  const toggleClass = classNames({
    'noti-toggle-btn': true,
    'noti-toggle-btn--on': toggle,
    'noti-toggle-btn--off': !toggle,
  });
  const handleClick = () => {
    setToggle(!toggle);
  };
  return (
    <div className={toggleClass} onClick={handleClick}>
      PUSH:&nbsp; {toggle ? 'ON' : 'OFF'}
    </div>
  );
};

const TeamInfo = () => {
  const { sideBarDispatch } = useContext(SideBarContext);
  const handleCloseSideBar = () => {
    sideBarDispatch(SideBarActionCreator.toggleActivated());
  };
  return (
    <div>
      <Emblem />
      <Link to="/myteam" onClick={handleCloseSideBar}>
        <ContentButton>
          <span role="img" aria-label="config">
            ⚙️팀 페이지
          </span>
        </ContentButton>
      </Link>
    </div>
  );
};

const ContentButton = ({ className = '', children, onClick }) => {
  return (
    <div className={`${className} side-bar__content-button`} onClick={onClick}>
      {children}
    </div>
  );
};

const Emblem = ({ playerInfo }) => {
  const logo = playerInfo && playerInfo.team ? playerInfo.team.logo : null;
  const teamName =
    playerInfo && playerInfo.team ? playerInfo.team.name : '팀 정보 없음';
  const logoSrc = logo
    ? `https://kr.object.ncloudstorage.com/quickkick-emblem/${logo}`
    : '/default_logo.png';
  return (
    <>
      <div className="side-bar__emblem-wrapper">
        <div className="side-bar__emblem">
          <img src={logoSrc} alt="" />
        </div>
      </div>
      <div className="side-bar__team-name-wrapper">
        <div className="side-bar__team-name">
          <h2>{teamName}</h2>
        </div>
      </div>
    </>
  );
};

const AuthButton = ({ provider }) => {
  const message = `${provider === 'naver' ? '네이버' : '카카오'} 로그인`;
  return (
    <>
      <div className={`new-auth-button new-auth-button--${provider}`}>
        <img className="auth-logo" src={`${provider}.svg`} alt="" />
        <span className="auth-message">{message}</span>
      </div>
    </>
  );
};

const EmptySpace = () => <div className="empty" />;

export default SideBar;
