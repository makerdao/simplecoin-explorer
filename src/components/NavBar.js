import React from 'react';
import logo from '../logo.svg';

const NavBar = (props) => {
  return (
    <nav className="navbar navbar-default">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand navbar-link" href="#" onClick={(e) => props.setUrl('')}><img src={logo} alt="Maker Logo" width="30" /></a>
          <button className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navcol-1"><span className="sr-only">Toggle navigation</span><span className="icon-bar"></span><span className="icon-bar"></span><span className="icon-bar"></span></button>
        </div>
        <div className="collapse navbar-collapse" id="navcol-1"></div>
      </div>
    </nav>
  )
}

export default NavBar;
