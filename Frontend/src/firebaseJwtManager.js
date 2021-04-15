import firebase from "firebase";

const firebaseJwtManager = () => {
  // creates an object for managing the JWT in the entire frontend
  // reference: https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html
  let jwt = null;

  const getToken = () => jwt;

  const getTokenFromFirebase = async function () {
    // Get JWT for backend verification
    try {
      jwt = await firebase.auth().currentUser.getIdToken(true);
      console.log("JWT (firebase) successfully set");
    } catch (err) {
      jwt = undefined;
      console.log(err);
    }
    return jwt;
  };

  //   const setToken = (token) => {
  //     jwt = token;
  //     return true;
  //   };

  const eraseToken = () => {
    jwt = null;
    return true;
  };

  return {
    eraseToken,
    getToken,
    getTokenFromFirebase,
    // setToken,
  };
};

export default firebaseJwtManager();
