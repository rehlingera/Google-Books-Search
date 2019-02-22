import React from "react";

export function AddButton(props) {
    return (
      <button {...props} style={{ margin: "0px 5px 0px 5px", backgroundColor: "green" }} className="modal-close waves-effect waves-green btn">
        <i className="material-icons">add_box</i>
      </button>
    );
  }