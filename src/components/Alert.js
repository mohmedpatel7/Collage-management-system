import React from "react";
import "./style/style.css";

export default function Alert(props) {
  return (
    <div
      style={{ position: "fixed", top: "77px", width: "100%", zIndex: "1000" }}
      className="my-4"
    >
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          {props.alert.msg}
        </div>
      )}
    </div>
  );
}
