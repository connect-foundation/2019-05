import React from 'react';
import './Header.scss';
import NavBar from "../NavBar";

const Header = ({children}) => {
  return (
    <div className="header">
      <NavBar/>
    </div>
  )
};

export default Header;