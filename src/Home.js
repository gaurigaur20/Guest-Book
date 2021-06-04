import React, { useEffect, useState } from "react";

import firebase from "firebase/app";

import "firebase/database";

import Config from "./Config";
import EditComponent from "./EditComponent";
import Auth from "./Auth";
import Post from "./Post";

// const database = firebase.database();

async function fetchUsersData() {
  const dbRef = firebase.database().ref();
  const dbSnapshot = await dbRef.child("users").get();
  return dbSnapshot.val();
}

function Home() {
  const time = new Date().getTime();
  const currentTime = new Date().toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [editID, setEditID] = useState("");
  const [cancel, setCancel] = useState(false);
  const [submit, setsubmit] = useState(false);

  // console.log("original data: ", data);
  const data2 = Object.values(data);
  data2.sort((a, b) => parseFloat(b.Time) - parseFloat(a.Time));
  // console.log("sorted data:", data2);

  const updateUsers = () => {
    fetchUsersData().then((x) => {
      setData(x);
    });
  };

  useEffect(() => {
    updateUsers();
  }, [data]);

  const writeData = () => {
    const dbRef = firebase.database().ref("users");
    const dbchild = dbRef.push();
    const key = dbchild.getKey();

    const user = {
      Message: message,
      Name: name,
      Time: time,
      LogggedIn: loggedIn,
      Email: email,
      CurrentTime: currentTime,
      UserId: key,
    };
    if (message && name) {
      dbchild.set(user).then(() => updateUsers());
      setMessage("");
      setName("");
    } else {
      alert("fill the data ");
    }
  };

  const formOnSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div>
        <h1>Guest Book</h1>
        <Auth
          loggedInHandler={(isLoggedIn, Email) => {
            setLoggedIn(isLoggedIn);
            setEmail(Email);
          }}
        />
        <h3>
          Welcome to the guest book! Please leave a message, whether a joke, a
          favourite quote or lyric, or just a simple 'hello'!
        </h3>
        <div>
          <form onSubmit={formOnSubmit}>
            <label>
              <textarea
                rows="4"
                cols="40"
                name="message"
                placeholder="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={!loggedIn}
              ></textarea>
            </label>
            <br />
            <label>
              <input
                type="text"
                placeholder="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!loggedIn}
              />
            </label>

            <br />
            <button type="button" onClick={writeData} disabled={!loggedIn}>
              Post
            </button>
          </form>
          <h3>Previous Greetings:</h3>
          {Object.values(data2).map((e, index) => (
            <>
              <Post
                currentTime={e.CurrentTime}
                message={e.Message}
                name={e.Name}
              />
              {e.LogggedIn && loggedIn && e.Email === email ? (
                <>
                  <div key={email} style={{ display: "block" }}>
                    <button
                      type="button"
                      className="editBtn"
                      onClick={() => {
                        setEditID(index);
                      }}
                      style={{
                        display: editID === index ? "none" : "inline-block",
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const userRef = firebase
                          .database()
                          .ref(`users/${e.UserId}`);
                        alert("data removed successfully");
                        return userRef.remove();
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  {editID === index && (
                    <EditComponent
                      messageToEdit={e.Message}
                      nameToEdit={e.Name}
                      userId={e.UserId}
                      cancelEventHandler={(isCanceled, isEdited) => {
                        setCancel(isCanceled);
                        setEditID(isEdited);
                      }}
                      submitEventHandler={(isSubmitted, isEdited) => {
                        setsubmit(isSubmitted);
                        setEditID(isEdited);
                      }}
                    />
                  )}
                </>
              ) : (
                <div style={{ display: "none" }}>
                  <button type="button">Edit</button>
                  <button type="button">Delete</button>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
