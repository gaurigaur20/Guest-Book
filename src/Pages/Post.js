import React from "react";

import "./Post.css";

function Post({ currentTime, message, name, date }) {
  return (
    <div>
      <div>
        <div>
          <p dir="ltr">
            <q>{message}</q>
            <br />
            <br />
            <span>- posted by &nbsp;'{name}'</span>
            <br />
            <small>
              ({date}&nbsp;{currentTime})
            </small>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Post;
