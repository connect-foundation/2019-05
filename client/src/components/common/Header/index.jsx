import React from 'react';
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

const NavBar = () => (
  <nav className="nav-bar">
    <div className="nav-bar__button">Quick Match</div>
    <div className="nav-bar__button">Quick Team</div>
    <UserIcon className="nav-bar__userInfo" />
  </nav>
);

const UserIcon = (className) => <div className={className}>유저아이콘</div>;

export default Header;
