import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SideBarContext, SideBarActions } from '../../../contexts/SideBar';
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

export const HamburgerBtn = () => {
  const [openState, setOpenState] = useState('');
  const { sideBarDispatch } = useContext(SideBarContext);
  const hamClickHandler = () => {
    const newValue = openState === 'is-active' ? '' : 'is-active';
    setOpenState(newValue);
    sideBarDispatch({
      type: SideBarActions.TOGGLE_ACTIVATED,
    });
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
