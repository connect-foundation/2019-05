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
import { UserContext, UserActionCreator } from '../../../contexts/User';
import { UserInfoForm, TeamCodeForm, TeamCreationForm } from '../../sidebar';
import useAsync from '../../../hooks/useAsync';
import { updatePlayerInfo } from '../../../util/functions';
import './index.scss';
import { getNotiList, deleteNotification } from '../../../util/functions';
import { convertDistrictCode } from '../../../util/district';

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
      <CloseBtn
        activated={sideBarState.activated}
        setActivated={handleActivated}
      />
      <InnerLayer />
    </nav>
  );
};

const InnerLayer = () => {
  const { userState, userDispatch } = useContext(UserContext);
  const [playerId, setPlayerId] = useState(null);
  const [team, setTeam] = useState(null);
  const [name, setName] = useState(null);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    const { playerInfo } = userState;
    if (!playerInfo) return;
    setPlayerId(playerInfo.playerId);
    setTeam(playerInfo.team);
    setName(playerInfo.name);
  }, [userState]);

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    const fetchPlayerInfo = async () => {
      const newPlayerInfo = await updatePlayerInfo(playerId);
      userDispatch(UserActionCreator.updatePlayerInfo(newPlayerInfo));
    };
    fetchPlayerInfo();
  }, [userState.isUpdateTeamCode, userState.isUpdateUserInfo]);

  const NowInnerLayer = () => {
    if (!playerId) return <WhenLoggedOut />;
    if (!team || !name) return <WhenLoggedInWithoutInfo />;
    return <WhenLoggedInWithInfo />;
  };

  return <>{NowInnerLayer()}</>;
};

const WhenLoggedInWithInfo = () => {
  return (
    <>
      <TeamInfo />
      <div className="double-button">
        <GoToHomeBtn />
        <GoToTeamBtn />
      </div>
      <GoToMatchBtn />
      <Notifications />
      <EmptySpace />
      <LogoutButton />
    </>
  );
};

const WhenLoggedInWithoutInfo = () => {
  const { userState } = useContext(UserContext);
  const { name, team } = userState.playerInfo;

  const TeamLayer = () => {
    return (
      <>
        <TeamCreateLayer />
        <TeamCodeLayer />
      </>
    );
  };

  const TeamCreateLayer = () => {
    const [formToggle, setFormToggle] = useState(false);
    const handleOnClick = () => {
      setFormToggle(!formToggle);
    };
    const TeamCodeBtn = () => (
      <button type="button" className="btn form-btn" onClick={handleOnClick}>
        팀 생성하러 가기 !!
      </button>
    );

    return (
      <>
        {formToggle ? (
          <TeamCreationForm handleCancel={handleOnClick} />
        ) : (
          <TeamCodeBtn />
        )}
      </>
    );
  };

  const TeamCodeLayer = () => {
    const [formToggle, setFormToggle] = useState(false);
    const handleOnClick = () => {
      setFormToggle(!formToggle);
    };
    const TeamCodeBtn = () => (
      <button type="button" className="btn form-btn" onClick={handleOnClick}>
        팀 정보 입력하러 가기 !!
      </button>
    );

    return (
      <>
        {formToggle ? (
          <TeamCodeForm handleCancel={handleOnClick} />
        ) : (
          <TeamCodeBtn />
        )}
      </>
    );
  };

  const UserInfoLayer = () => {
    const [formToggle, setFormToggle] = useState(false);
    const handleOnClick = () => {
      setFormToggle(!formToggle);
    };
    const UserInfoBtn = () => (
      <button type="button" className="btn form-btn" onClick={handleOnClick}>
        유저 정보 입력하러 가기 !!
      </button>
    );

    return (
      <>
        {formToggle ? (
          <UserInfoForm handleCancel={handleOnClick} />
        ) : (
          <UserInfoBtn />
        )}
      </>
    );
  };

  return (
    <>
      {team ? <TeamInfo /> : <TeamLayer />}
      {!name && <UserInfoLayer />}
      <EmptySpace />
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
  const handleBtnClick = () => {
    setOpen(!open);
  };
  const btnClass = classNames({
    pressed: open,
  });

  return (
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
        내가 신청한 알림 &nbsp; {open ? <NotiList /> : null}
      </div>
    </ContentButton>
  );
};

const NotiList = () => {
  const { userState } = useContext(UserContext);
  const { seq } = userState.playerInfo;
  const [notiState, dispatch] = useAsync(getNotiList.bind(null, seq), [seq]);

  const handleCancelBtnClick = async (seq, e) => {
    e.stopPropagation();
    deleteNotification(seq).then((_) => dispatch());
  };

  if (!notiState.data) return <NotiLoading />;
  if (!notiState.data.length) return <NotiNotFound />;

  return (
    <ul>
      {notiState.data.map((noti) => (
        <li key={noti.seq}>
          <hr />
          <div className="noti-item">
            <div>
              {noti.startTime} - {noti.endTime}
            </div>
            <div>
              {`@${convertDistrictCode(noti.area[0])} 외 ${noti.area.length -
                1}개 구`}
            </div>
            <button
              className="noti-item__cancel-btn"
              onClick={handleCancelBtnClick.bind(null, noti.seq)}
            >
              🔕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

const NotiLoading = () => <div>로딩중...</div>;
const NotiNotFound = () => {
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const handleCloseSideBar = () => {
    if (sideBarState.activated)
      sideBarDispatch(SideBarActionCreator.toggleActivated());
  };

  return (
    <>
      <div>알림을 찾을 수 없습니다.</div>
      <div>
        <Link
          onClick={handleCloseSideBar}
          className="noti-pane__link"
          to="/match"
        >
          여기
        </Link>
        서 등록해 보세요!
      </div>
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

const NavButton = ({ className = '', to, title }) => {
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const handleCloseSideBar = () => {
    if (sideBarState.activated)
      sideBarDispatch(SideBarActionCreator.toggleActivated());
  };

  return (
    <Link className={className} to={to} onClick={handleCloseSideBar}>
      <ContentButton>{title}</ContentButton>
    </Link>
  );
};

const ContentButton = ({ className = '', children, onClick }) => (
  <div className={`${className} side-bar__content-button`} onClick={onClick}>
    {children}
  </div>
);

const GoToHomeBtn = () => (
  <NavButton className="btn__gotohome" to="/" title="🏠홈으로" />
);
const GoToMatchBtn = () => (
  <NavButton to="/match" title="⚽️매치 & 알림 신청" />
);
const GoToTeamBtn = () => (
  <NavButton className="btn__gototeam" to="/myteam" title="🏆나의 팀" />
);

const TeamInfo = () => {
  const { userState } = useContext(UserContext);
  const { playerInfo } = userState;
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
  const message = `${provider === 'naver' ? '네이버' : '카카오'}  로그인`;

  return (
    <div className={`new-auth-button new-auth-button--${provider}`}>
      <img className="auth-logo" src={`${provider}.svg`} alt="" />
      <span className="auth-message">{message}</span>
    </div>
  );
};

const EmptySpace = () => <div className="empty" />;

export default SideBar;
