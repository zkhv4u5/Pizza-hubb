import React, {useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../services/firebase';
import './Navigation.css';
import logo from '../images/logo.png';
import { CartContext } from '../services/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserButton } from "@clerk/clerk-react";

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
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
      <Link to="/pizza-hub" className="navbar-logo-link">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </Link>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/pizza-hub" className="nav-link">
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
            <Link to="/admin" className="nav-link">
              Sign In
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/order-online" className="nav-link">
              Order Online
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/locations" className="nav-link">
            Locations
            </Link>
        </li>
          <li className="nav-item">
          <Link to="/our-story" className="nav-link">
            Our Story
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
        <UserButton />
      </ul>
    </nav>
  );
}

export default NavigationBar;

// return (
//   <nav className="navbar">
//     <Link to="/" className="navbar-logo-link">
//       <img src={logo} alt="Logo" className="navbar-logo" />
//     </Link>
//     <ul className="navbar-nav">
//       <li className="nav-item">
//         <Link to="/" className="nav-link">
//           Home
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/menu" className="nav-link">
//           Menu
//         </Link>
//       </li>
//       {!loggedIn && (
//       <>
//         <li className="nav-item">
//           <Link to="/sign-in" className="nav-link">
//             Sign In
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/order-online" className="nav-link">
//             Order Online
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/locations" className="nav-link">
//           Locations
//           </Link>
//       </li>
//         <li className="nav-item">
//         <Link to="/our-story" className="nav-link">
//           Our Story
//         </Link>
//       </li>
//       <li className="nav-item">
//         <Link to="/contact-us" className="nav-link">
//           Contact Us
//         </Link>
//       </li>
//       </>
//     )}
//         <li>
//         <Link to="/checkout" className="nav-link cart-link" style={{ marginLeft: "auto" }}>
//           <div className="cart-count">{totalItems}</div>
//             <FontAwesomeIcon icon={faShoppingCart} />
//         </Link>
//       </li>
//     </ul>
//   </nav>
// );
// }

// export default NavigationBar;
