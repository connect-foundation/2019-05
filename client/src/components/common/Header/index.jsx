import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  SideBarContext,
  SideBarActionCreator,
} from '../../../contexts/SideBar';
import './Header.scss';
import './hamburger.css';

const Header = () => (
  <div className="header">
    <div className="header__left">
      <ServiceLogo />
    </div>
    <div className="header__right">
      <HamburgerBtn />
    </div>
  </div>
);

const ServiceLogo = () => {
  const { sideBarState, sideBarDispatch } = useContext(SideBarContext);
  const handleCloseSideBar = () => {
    if (sideBarState.activated)
      sideBarDispatch(SideBarActionCreator.toggleActivated());
  };
  return (
    <Link to="/" onClick={handleCloseSideBar}>
      <span className="pointChar">Q</span>uick
      <span className="pointChar">K</span>
      ick
    </Link>
  );
};

export const HamburgerBtn = () => {
  const [openState, setOpenState] = useState('');
  const { sideBarDispatch } = useContext(SideBarContext);
  const hamClickHandler = () => {
    const newValue = openState === 'is-active' ? '' : 'is-active';
    setOpenState(newValue);
    sideBarDispatch(SideBarActionCreator.toggleActivated());
  };
  return (
    <button
      onClick={hamClickHandler}
      className={`hamburger ${openState}`}
      type="button"
    >
      <span className="hamburger-box">
        <span className="hamburger-inner" />
      </span>
    </button>
  );
};

export default Header;
