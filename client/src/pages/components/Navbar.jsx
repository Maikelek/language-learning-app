import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Navbar = () => {
  const nav = useNavigate();
  const {logout} = useAuth();
  const [isNavActive, setIsNavActive] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const navbar = document.getElementById("navbar");
    if (navbar && navbar.classList.contains("active")) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  }, [isNavActive]);

  const toggleNav = () => {
    setIsNavActive(!isNavActive);
    document.body.style.overflow = isNavActive ? 'visible' : 'hidden';
  };

  const handleLogout = async (e) => {
    await logout();
    nav("/");
  };

  return (
    <nav
      style={{ position: location.pathname === '/' ? 'fixed' : 'static' }}
      id="navbar"
      className={`navbar ${isNavActive ? 'active' : ''}`}
    >

      <div className="logo">
        <Link to="/" className="logo-link">
          VerboLingo
        </Link>
      </div>

      <ul className={`menu ${isNavActive ? 'active' : ''}`}>

        <li>
          <Link
            to="/decks"
            className={`nav-link ${location.pathname === '/decks' ? 'nav-used' : ''}`}
          >
            Decks
          </Link>
        </li>

        <li>
          <Link onClick={handleLogout} className="nav-link">
            Log out
          </Link>
        </li>

      </ul>

      <div className={`burger ${isNavActive ? 'active' : ''}`} onClick={toggleNav}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>

    </nav>
  );
};

export default Navbar;
