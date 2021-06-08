import React, { useEffect, useState } from "react";

import firebase from "firebase/app";

import "firebase/database";

import Config from "../Config";
import EditComponent from "./EditComponent";
import Auth from "./Auth";
import Post from "./Post";

import "./Home.css";

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

  const today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate =
    today.getDate() +
    " " +
    monthNames[today.getMonth()] +
    "," +
    today.getFullYear();
  console.log(currentDate);

  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
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
      Date: currentDate,
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
      <div className="guest-book">
        <div className="input-panel">
          <h1>Guest Book</h1>

          <h3>
            Welcome <span style={{ fontWeight: "bold" }}>{userName}</span> to
            the guest book! Please leave a message, whether a joke, a favourite
            quote or lyric, or just a simple 'hello'!
          </h3>
          <Auth
            loggedInHandler={(isLoggedIn, Email, UserName) => {
              setLoggedIn(isLoggedIn);
              setEmail(Email);
              setUserName(UserName);
            }}
            className="auth"
          />
          <div className="form-input">
            <form onSubmit={formOnSubmit}>
              <label>
                <textarea
                  rows="4"
                  cols="40"
                  name="message"
                  placeholder="send your greetings, but first, you gotta sign in "
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={!loggedIn}
                  style={{
                    background: loggedIn ? "#fff" : "#eee",
                    cursor: loggedIn ? "text" : "not-allowed",
                  }}
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
                  style={{
                    background: loggedIn ? "#fff" : "#eee",
                    cursor: loggedIn ? "text" : "not-allowed",
                  }}
                />
              </label>

              <br />
              <button
                type="button"
                onClick={writeData}
                disabled={!loggedIn}
                style={{
                  opacity: loggedIn ? "1" : "0.5",
                  cursor: loggedIn ? "pointer" : "not-allowed",
                }}
              >
                Post
              </button>
            </form>
          </div>
          <h3>Previous Greetings:</h3>
          {Object.values(data2).map((e, index) => (
            <div className="post">
              <div className="post-greetings">
                <div className="greetings">
                  <Post
                    currentTime={e.CurrentTime}
                    message={e.Message}
                    name={e.Name}
                    date={e.Date}
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
                            border: "none",
                            color: "#fff",
                            padding: "6px 12px",
                            borderColor: "#2e6da4",
                            borderRadius: "5px",
                            background: "#337ab7",
                            cursor: "pointer",

                            display: editID === index ? "none" : "inline-block",
                          }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          style={{
                            border: "none",
                            color: "#fff",
                            padding: "6px 12px",
                            borderColor: "#2e6da4",
                            borderRadius: "5px",

                            background: "#337ab7",
                            cursor: "pointer",
                          }}
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
