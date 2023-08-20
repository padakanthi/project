import React from "react";

const Alert = ({ type, message }) => {
  return (
    <div className={`alert alert-sm alert-${type} text-center`}>{message}</div>
  );
};

export default Alert;
