import React from 'react';
import './NavBar.css';
import logo from '../logo.svg';

const NavBar = (props) => {
  const text = props.isConnected ? `Connected to ${props.network}` : 'No connection';
  return (
    <nav className="navbar navbar-inverse NavBar">
      <div className="container">
          <a className="navbar-brand" href="#" onClick={(e) => props.setUrl('')}>
            <img className="NavBar-logo" alt="Brand" src={logo} />
          </a>
        <p className="navbar-text"><strong>{text}</strong></p>
      </div>
    </nav>
  )
}

export default NavBar;
