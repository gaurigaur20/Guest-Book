import React, { useState } from "react";

import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

function Auth({ loggedInHandler }) {
  const [userLoggedInMessage, setUserLoggedInMessage] = useState(false);
  const [userName, SetuserName] = useState("");
  const [userEmail, SetuserEmail] = useState("");

  const logIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        const credential = result.credential;

        const token = credential.accessToken;

        const user = result.user;
        // console.log(user);
        if (user) {
          setUserLoggedInMessage(true);
          SetuserName(user.displayName);
          SetuserEmail(user.email);
          loggedInHandler(true, user.email);
        } else {
          setUserLoggedInMessage("User not loggedin ");
        }
        // ...
      })
      .catch((error) => {
        console.log(error);
      });
  };
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setUserLoggedInMessage(true);
      SetuserName(user.displayName);
      SetuserEmail(user.email);
      loggedInHandler(true, user.email);
    } else {
      console.log("no user signed in");
    }
  });
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        // console.log("sign out");
        loggedInHandler(false);
        setUserLoggedInMessage(false);
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  return (
    <div className="App">
      {userLoggedInMessage ? (
        <div>
          <h4>
            Welcome <small>{userName}</small>
          </h4>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={logIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}

export default Auth;
