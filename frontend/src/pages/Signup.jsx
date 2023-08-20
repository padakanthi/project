import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingButton from "../components/LoadingButton";
import API from "../api";
import Alert from "../components/Alert";

const Signup = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = state;
  const [status, setStatus] = useState({
    status: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSignupUser = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setStatus({
        status: "error",
        message: "All fields are required",
      });
      return;
    }
    if (password !== confirmPassword) {
      setStatus({
        status: "error",
        message: "Passwords do not match",
      });
      return;
    }

    signupUser();
  };

  const signupUser = async () => {
    setLoading(true);
    const URL = `${API}/user`;
    try {
      const response = await axios.post(URL, { name, email, password });
      const { data } = await response;
      setStatus({ status: data.status, message: data.message });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      const { data } = err.response;
      setStatus({ status: data.status, message: data.message });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="col-md-6 card mx-auto p-3">
        <h3 className="text-center mb-3">Signup.</h3>
        {status.status === "success" && (
          <Alert type="success" message={status.message} />
        )}
        {status.status === "error" && (
          <Alert type="danger" message={status.message} />
        )}
        <form onSubmit={handleSignupUser} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="enter your full name..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
              placeholder="enter your email address..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="enter your password..."
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="confirm your password..."
            />
          </div>
          <div className="mb-3">
            <LoadingButton type="submit" title="Signup" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
