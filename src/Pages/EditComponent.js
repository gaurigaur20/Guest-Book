import React, { useState } from "react";

import firebase from "firebase/app";

import "firebase/database";

import Config from "../Config";

import "./EditComponent.css";

function EditComponent({
  messageToEdit,
  nameToEdit,
  userId,
  cancelEventHandler,
  submitEventHandler,
}) {
  const [editName, setEditName] = useState(nameToEdit);
  const [editMessage, setEditMessage] = useState(messageToEdit);

  function submitData() {
    const dbRef = firebase.database().ref();
    const userRef = dbRef.child(`users/${userId}`);
    alert("data updated succesfully");
    userRef.update({
      Message: editMessage,
      Name: editName,
    });
  }
  const submitEvent = () => {
    document.querySelector(".edit").style.display = "none";
    submitEventHandler(true, "");
    submitData();
  };

  const cancelStatement = () => {
    document.querySelector(".edit").style.display = "none";
    cancelEventHandler(true, "");
  };

  return (
    <>
      <div className="edit">
        <textarea
          rows="4"
          value={editMessage}
          onChange={(e) => setEditMessage(e.target.value)}
        ></textarea>
        <br />
        <input value={editName} onChange={(e) => setEditName(e.target.value)} />
        <br />
        <div>
          <button
            style={{
              border: "none",
              color: "#fff",
              padding: "6px 12px",
              borderColor: "#2e6da4",
              borderRadius: "5px",
              background: "#337ab7",
              cursor: "pointer",
            }}
            onClick={submitEvent}
          >
            Submit
          </button>
          <button
            style={{
              border: "none",
              color: "#fff",
              padding: "6px 12px",
              borderColor: "#2e6da4",
              borderRadius: "5px",
              background: "#337ab7",
              cursor: "pointer",
            }}
            onClick={cancelStatement}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default EditComponent;
