import * as firebase from "firebase";

const UserSignedIn = (props) => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      console.log("Signed In");
    } else {
      // No user is signed in.
      console.log("No User Logged In");
    }
  });
};
export default UserSignedIn;
