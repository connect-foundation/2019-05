import React from 'react';
import './Header.scss';
import logo from "../../../assets/images/quickkick-logo.png";

const Header = () => {
  return (
    <div className="header">
      <div className="header__left">
        <ServiceLogo/>
      </div>
      <div className="header__right">
        <NavBar/>
      </div>
    </div>
  );
};

const ServiceLogo = () => {
  return (
    <img className="logo" src={logo} alt="퀵킥 로고"/>
  );
};

const NavBar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-bar__button">Quick Match</div>
      <div className="nav-bar__button">Quick Team</div>
      <UserIcon className="nav-bar__userInfo"/>
    </nav>
  );
};

const UserIcon = (className) => {
  return (
    <div className={className}>
      유저아이콘
    </div>
  );
};

export default Header;