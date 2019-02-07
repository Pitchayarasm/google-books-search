import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

function Nav() {
  return (
    <React.Fragment>
      <nav className="navbar">
        <ul className="nav google">
          <li style={{paddingTop : "4px"}}>Google Books</li>
          <li style={{paddingLeft : "35px"}} className="navbar-brand">
            <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
              Search
            </Link>
          </li>
          <li className="navbar-brand">
            <Link
              to="/saved"
              className={window.location.pathname === "/saved" ? "nav-link active" : "nav-link"}
            >
              Saved
            </Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  )};

export default Nav;