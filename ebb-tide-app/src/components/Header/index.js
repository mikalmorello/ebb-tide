import React from "react";
import SearchIcon from '../../svg/SearchIcon';
import EbbtideLogoThin from '../../svg/EbbtideLogoThin';
import MenuIcon from '../../svg/MenuIcon';
import "./header.scss";


function Header(){
  return(
    <header className="header">
      <div className="header__container">
        <div className="header__menu"><MenuIcon /></div>
        <div className="header__logo"><EbbtideLogoThin /></div>
        <div className="header__search"><SearchIcon /></div>
      </div>
    </header>
  )
}

export default Header;