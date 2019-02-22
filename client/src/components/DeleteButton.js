import React from "react";

export function DeleteButton(props) {
    return (
      <button {...props} style={{ margin: "0px 5px 0px 5px", backgroundColor: "firebrick" }}>
        <i className="material-icons">delete</i>
      </button>
    );
  }