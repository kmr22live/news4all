import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthDetails from "../../services/Auth/AuthDetails";
import { removeUserData } from "../../services/storage/Storage.";

export default function Header() {
  const [isActive, setIsActive] = useState(false);

  const toggleNavbar = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };

  const closeNavbar = () => {
    setIsActive(false);
  };

  return (
    <header
      className={`header section ${isActive ? "active" : ""}`}
      data-header=""
    >
      <div className="container">
        <a href="" className="logo navbar-link">
          News4All
        </a>
        <button
          className={`nav-toggle-btn ${isActive ? "active" : ""}`}
          aria-label="toggle menu"
          data-nav-toggler=""
          onClick={toggleNavbar}
        >
          <span className="span one" />
          <span className="span two" />
          <span className="span three" />
        </button>
        <nav className={`navbar ${isActive ? "active" : ""}`} data-navbar="">
          <ul className="navbar-list">
            <li className="navbar-item">
              <Link
                to={"/home"}
                className="navbar-link hover:underline"
                data-nav-link=""
                onClick={closeNavbar}
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                to={"/favourite"}
                className="navbar-link hover:underline"
                data-nav-link=""
                onClick={closeNavbar}
              >
                Favourite News
              </Link>
            </li>
            <li className="navbar-item">
              <Link
                className="navbar-link hover:underline"
                onClick={() => removeUserData()}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
