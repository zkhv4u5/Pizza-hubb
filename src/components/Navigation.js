import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import './Navigation.css';
import logo from '../images/logo.png';
import { CartContext } from '../services/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function NavigationBar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { totalItems } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setLoggedIn(user ? true : false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link">
            Menu
          </Link>
        </li>
        {!loggedIn && (
        <>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/sign-up" className="nav-link">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
          <Link to="/about-us" className="nav-link">
            About Us
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/Locations" className="nav-link">
            Locations
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact-us" className="nav-link">
            Contact Us
          </Link>
        </li>
        </>
      )}
          <li>
          <Link to="/checkout" className="nav-link cart-link" style={{ marginLeft: "auto" }}>
            <div className="cart-count">{totalItems}</div>
              <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
