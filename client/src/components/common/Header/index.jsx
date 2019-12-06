import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons';
import { FilterContext } from '../../../contexts/Filter/Context';
import './Header.scss';
import './hamburger.css';

const Header = () => (
  <div className="header">
    <div className="grid-container">
      <div className="header__left">
        <ServiceLogo />
      </div>
      <div className="header__right">
        <HamburgerBtn />
      </div>
    </div>
  </div>
);

const ServiceLogo = () => (
  <Link to="/">
    <span className="pointChar">Q</span>uick<span className="pointChar">K</span>
    ick
  </Link>
);

const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { dispatch } = useContext(FilterContext);

  const handleOnClick = () => dispatch({ type: 'INITIALIZE_STATE' });

  useEffect(() => {
    const cookie = document.cookie.split('=')[1];
    setIsLogin(cookie === 'true');
  }, []);

  return (
    <nav className="nav-bar">
      <Link to="/match">
        <div className="nav-bar__button" onClick={handleOnClick}>
          매치 검색
        </div>
      </Link>
      {isLogin ? <UserIcon /> : <LoginBtn />}
    </nav>
  );
};

const HamburgerBtn = () => {
  const [openState, setOpenState] = useState('');
  const hamClickHandler = () => {
    const newValue = openState === 'is-active' ? '' : 'is-active';
    setOpenState(newValue);
  };
  return (
    <button
      onClick={() => hamClickHandler()}
      className={`hamburger hamburger--spin ${openState}`}
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
};

const LoginBtn = () => (
  <div className="nav-bar__login">
    <a href="http://127.0.0.1:4000/auth/naver">로그인</a>
  </div>
);

const UserIcon = () => (
  <div className="nav-bar__user-info">
    <FontAwesomeIcon icon={faUserCircle} size="2x" />
    <div className="nav-bar__user-detail">
      <ul>
        <li>
          <a href="http://127.0.0.1:4000/auth/logout">로그아웃</a>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
