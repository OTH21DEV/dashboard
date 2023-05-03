import React from "react";
import logo from "../../assets/logo.png";
import './header.css'

const Header = () => {



  return (
    <div className="header">
      <img src={logo} alt=""></img>
      <span>ThreatConnect</span>
      
    </div>
  );
};

export default Header;
