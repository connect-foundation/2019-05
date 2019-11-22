import React, { useState, useEffect } from 'react';
import './Header.scss';
import logo from '../../../assets/images/quickkick-logo.png';

const Header = () => (
  <div className="header">
    <div className="header__left">
      <ServiceLogo />
    </div>
    <div className="header__right">
      <NavBar />
    </div>
  </div>
);

const ServiceLogo = () => <img className="logo" src={logo} alt="퀵킥 로고" />;

const NavBar = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const cookie = document.cookie.split('=')[1];
    setIsLogin(cookie === 'true');
  }, []);

  return (
    <nav className="nav-bar">
      <div className="nav-bar__button">Quick Match</div>
      <div className="nav-bar__button">Quick Team</div>
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
