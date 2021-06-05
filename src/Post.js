import React from "react";

import "./Post.css";

function Post({ currentTime, message, name }) {
  return (
    <div>
      <div>
        <div>
          <p>
            "{message}"<br />
            <br />
            <span>- posted by &nbsp;'{name}'</span>
            <br />
            <small>{currentTime}</small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
