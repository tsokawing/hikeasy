import firebase from "firebase";
import Cookies from "universal-cookie";

const firebaseJwtManager = () => {
  // creates an object for managing the JWT in the entire frontend
  // reference: https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html

  const setToken = (theJwt) => {
    const cookies = new Cookies();
    cookies.set("jwtToken", theJwt, { path: "/" });
    // already set cookie!
  };

  const getToken = () => {
    const cookies = new Cookies();
    let tempJwt = cookies.get("jwtToken");

    if (tempJwt == undefined) {
      return null;
    }

    return tempJwt;
  };

  const getTokenFromFirebase = async function () {
    // Get JWT for backend verification
    let jwt = null;
    try {
      jwt = await firebase.auth().currentUser.getIdToken(true);
      console.log("JWT (firebase) successfully set");
      setToken(jwt);
    } catch (err) {
      console.log(err);
      setToken("");
    }
    return jwt;
  };

  //   const setToken = (token) => {
  //     jwt = token;
  //     return true;
  //   };

  const eraseToken = () => {
    setToken("");
    console.log(getToken());
    return true;
  };

  // well, we cant expect the user to have maintained the valid jwt in the cookie
  // the cookie jwt could of timed out
  // use this to get the latest valid jwt from firebase, or have our local cookie jwt destroyed
  if (getToken() !== undefined) {
    getTokenFromFirebase();
  }

  return {
    eraseToken,
    getToken,
    getTokenFromFirebase,
    // setToken,
  };
};

export default firebaseJwtManager();
