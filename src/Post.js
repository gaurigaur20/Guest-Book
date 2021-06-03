import React from "react";

function Post({ currentTime, message, name }) {
  return (
    <>
      <div>
        <pre>
          <p>
            "{message}" - posted by {name}
            <br />
            <small>{currentTime}</small>
          </p>
        </pre>
      </div>
    </>
  );
}

export default Post;
