import React from "react";
import Spinner from "./Spinner";

const LoadingButton = ({ type, title, loading }) => {
  return (
    <button
      type={type}
      className="btn btn-primary d-flex gap-2 align-items-center"
    >
      <span className="">{title}</span>
      {loading && <Spinner />}
    </button>
  );
};

export default LoadingButton;
