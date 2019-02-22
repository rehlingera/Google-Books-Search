import React from "react";

export function Input(props) {
    return (
      <div className="input-field" style={{ textAlign:"center" }} >
        <input {...props} style={{ textAlign:"center", width: "100%" }} type="text" name="search" />
      </div>
    );
  }

export function SearchBtn(props) {
  return (
    <button {...props} style={{marginBottom:"25px"}} className="btn btn-success">
      <i className="material-icons">search</i>
    </button>
  );
}