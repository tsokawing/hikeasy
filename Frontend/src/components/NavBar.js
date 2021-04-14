import React, { useState, useEffect } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import firebase from "firebase";
import { auth, authUI } from "../firebase";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsLoggedIn(true);
        // firebase
        //   .auth()
        //   .currentUser.getIdToken(true)
        //   .then(function (idToken) {
        //     // Send token to backend via HTTPS
        //     console.log(idToken);
        //     console.log("HIIIII");
        //   })
        //   .catch(function (error) {
        //     // Handle error
        //     console.log(error);
        //   });
      } else {
        setIsLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            Hikeasy
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/trails"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Trails
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/events"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Events
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
          </ul>
          {button &&
            (isLoggedIn ? (
              <Link to="/" className="btn-mobile">
                <Button
                  buttonStyle="btn--outline"
                  onClick={() =>
                    auth
                      .signOut()
                      .then(() => {
                        // Sign-out successful.
                        showButton();
                      })
                      .catch((error) => {
                        // An error happened.
                        console.log(error);
                      })
                  }
                >
                  Logout
                </Button>
              </Link>
            ) : (
              <Link to="/login" className="btn-mobile btn-login">
                <Button buttonStyle="btn--outline">Login</Button>
              </Link>
            ))}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
