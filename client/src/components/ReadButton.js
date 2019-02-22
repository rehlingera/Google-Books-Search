import React from "react";

export function ReadButton(props) {
    return (
      <button {...props} style={{margin: "0px 5px 0px 5px" }} className="modal-close waves-effect waves-green btn">
        <i className="material-icons">book</i>
      </button>
    );
  }