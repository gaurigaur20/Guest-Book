import React, { useState } from "react";

function EditComponent({ messageToEdit, nameToEdit, cancelEventHandler }) {
  const [editName, setEditName] = useState(nameToEdit);
  const [editMessage, setEditMessage] = useState(messageToEdit);

  console.log("name to edit", editName);
  console.log("message to edit", editMessage);

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
        <button>Submit</button>
        <button onClick={cancelStatement}>Cancel</button>
      </div>
    </>
  );
}

export default EditComponent;
