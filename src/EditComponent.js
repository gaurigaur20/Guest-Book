import React, { useState } from "react";

import firebase from "firebase/app";

import "firebase/database";

import Config from "./Config";

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
        <button onClick={submitEvent}>Submit</button>
        <button onClick={cancelStatement}>Cancel</button>
      </div>
    </>
  );
}

export default EditComponent;
