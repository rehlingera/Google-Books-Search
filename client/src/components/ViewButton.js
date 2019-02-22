import React from "react";

export function ViewButton(props) {
    return (
      <a href="#modal1" {...props} style={{margin: "0px 5px 0px 5px", backgroundColor: "cornflowerblue" }} className="btn-success waves-effect waves-light btn modal-trigger">
        <i className="material-icons">visibility</i>
      </a>
    );
  }