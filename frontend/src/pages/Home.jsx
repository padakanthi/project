import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center">
      <h3>Welcome to Ping Test</h3>
      <p>A utility tool to test the connectivity of an ip/domain address..</p>
      <div className="mt-2">
        <p>
          Are you a new user? <Link to="/login">login</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
