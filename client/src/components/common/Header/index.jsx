import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import logo from '../../../assets/images/quickkick-logo.png';

const Header = () => (
  <div className="header">
    <div className="grid-container">
      <div className="header__left">
        <ServiceLogo />
      </div>
      <div className="header__right">
        <NavBar />
      </div>
    </div>
  </div>
);

const ServiceLogo = () => (
  <Link to="/">
    <img className="logo" src={logo} alt="퀵킥 로고" />
  </Link>
);

const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split('=')[1];
    setIsLogin(cookie === 'true');
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-bar__button">
        <Link to="/match">
          Quick Match
        </Link>
      </div>
      <div className="nav-bar__button">
        <Link to="/team">
          Quick Team
        </Link>
      </div>
      {isLogin ? <UserIcon /> : <LoginBtn />}
    </nav>
  );
};

const LoginBtn = () => (
  <div className="nav-bar__userInfo">
    <a href="http://127.0.0.1:4000/auth/naver">로그인</a>
  </div>
);

const UserIcon = () => <div className="nav-bar__userInfo">로그아웃</div>;

export default Header;
