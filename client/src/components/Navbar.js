import React from "react";
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo.png';

export default function Navbar(props) {
  
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <img className="navbar-brand" src={Logo} height="70px"/>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/books">Browse Books</NavLink>
            <NavLink className="nav-link" to="/mybooks">My Books</NavLink>
            <NavLink className="nav-link" to="/savedbooks">Saved Books</NavLink>
            <NavLink className="nav-link" to="/mymessages">My Messages</NavLink>
          </div>
        </div>
      </div>
    </nav>

  );
}

