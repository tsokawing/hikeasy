/**
 * Login Page
 * For visiter/user to register or login.
 */

import { useState, Fragment, useEffect } from "react";
import { Redirect } from "react-router";

import { Card, Menu, Form, Button } from "semantic-ui-react";
import { auth, authUI } from "../services/firebase";
import NewUserForm from "../components/NewUserForm";
import "./LoginPage.css";

import firebase from "firebase";
import firebaseJwtManager from "../services/firebaseJwtManager";

// authenticate a firebase account with password and email
async function authenticateUser(email, password, isLogin) {
  try {
    const user = isLogin
      ? auth
          .signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            firebaseJwtManager.getTokenFromFirebase();
            console.log("Signed in");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          })
      : auth
          .createUserWithEmailAndPassword(email, password)
          .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            // ...
            firebaseJwtManager.getTokenFromFirebase();
            console.log("Signed in (new user)");
          })
          .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
  } catch (err) {
    console.log(err);
  }
}

// re-redner webpage after login
function renderLoggedIn() {
  // check if the signed-in account is new user or not
  let isNewUser =
    firebase.auth().currentUser.metadata.creationTime ===
    firebase.auth().currentUser.metadata.lastSignInTime;

  // for new user, show new user info form
  // else, redirect user to home page
  if (isNewUser) {
    return <NewUserForm />;
  }
  return <Redirect to="/" />;
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  auth.onAuthStateChanged((user) => setUser(user));

  // firebase login function
  useEffect(() => {
    if (!user) {
      authUI.start(".google-login", {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: "redirect",
        callbacks: {
          signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            // Us/er successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.

            firebaseJwtManager.getTokenFromFirebase();
            console.log("GOOGLE successfully signed in");
            return true;
          },
        },
      });
    }
  }, [user]);

  return (
    <div className="auth-form-wrapper">
      <Card className="auth-form-card">
        <Card.Content>
          {user ? (
            renderLoggedIn()
          ) : (
            <Fragment>
              <Card.Header className="auth-form-header">Auth Form</Card.Header>
              <Menu compact secondary>
                <Menu.Item
                  name="Login"
                  onClick={() => setIsLogin(true)}
                  active={isLogin}
                ></Menu.Item>
                <Menu.Item
                  name="Sign up"
                  onClick={() => setIsLogin(false)}
                  active={!isLogin}
                ></Menu.Item>
              </Menu>
              {isLogin ? (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email Address:</label>
                      <input
                        placeholder="Email Address"
                        name="loginEmail"
                        type="email"
                        value={loginEmail || ""}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password:</label>
                      <input
                        placeholder="Password"
                        name="loginPassword"
                        type="password"
                        value={loginPassword || ""}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      onClick={() =>
                        authenticateUser(loginEmail, loginPassword, true)
                      }
                      className="auth-form-buttons"
                      color="blue"
                    >
                      Click to Login
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              ) : (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email Address:</label>
                      <input
                        placeholder="Email Address"
                        name="signUpEmail"
                        type="email"
                        value={signupEmail || ""}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password:</label>
                      <input
                        placeholder="Password"
                        name="signUpPassword"
                        type="password"
                        value={signupPassword || ""}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      className="auth-form-buttons"
                      color="green"
                      onClick={() =>
                        authenticateUser(signupEmail, signupPassword, false)
                      }
                    >
                      Register an account for HikEasy
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              )}
            </Fragment>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}

export default AuthForm;
