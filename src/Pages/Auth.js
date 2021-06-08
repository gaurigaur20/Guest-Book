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
          loggedInHandler(true, user.email, user.displayName);
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
      loggedInHandler(true, user.email, user.displayName);
    } else {
      // console.log("no user signed in");
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
          {/* <h4 style={{ fontWeight: "normal" }}>
            Welcome{" "}
            <small style={{ fontWeight: "bold", fontStyle: "italic" }}>
              {userName}
            </small>
          </h4> */}
          <button
            onClick={signOut}
            style={{
              border: "none",
              color: "#fff",
              padding: "6px 12px",
              borderColor: "#2e6da4",
              borderRadius: "5px",
              background: "#337ab7",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={logIn}
            style={{
              border: "none",
              color: "#fff",
              padding: "6px 12px",
              borderColor: "#2e6da4",
              borderRadius: "5px",
              background: "#337ab7",
              cursor: "pointer",
            }}
          >
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}

export default Auth;
