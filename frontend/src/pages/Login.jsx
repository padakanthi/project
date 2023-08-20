import React, { useState } from "react";
import axios from "axios";
import API from "../api";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import LoadingButton from "../components/LoadingButton";
const Login = () => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState({
    message: "",
    status: "",
  });
  const [loading, setLoading] = useState(false);
  const { email, password } = state;

  const handleLoginUser = (e) => {
    e.preventDefault();
    if (!email && !password) {
      setStatus({ message: "All fields are required!!!", status: "error" });
      return;
    }
    loginUser();
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    setLoading(true);
    const URL = `${API}/user/login`;
    try {
      const response = await axios.post(URL, state);
      const { data } = await response;
      setStatus({ status: data.status, message: data.message });

      // save the token in local storage
      if (!localStorage.getItem("pingApp")) {
        localStorage.setItem(
          "pingApp",
          JSON.stringify({ token: data.token, user: data.user })
        );
      } else {
        localStorage.removeItem("pingApp");
        localStorage.setItem(
          "pingApp",
          JSON.stringify({ token: data.token, user: data.user })
        );
      }

      // navigating to app page
      if (data?.status === "success" && data?.token) navigate("/app");
    } catch (err) {
      console.error(err);
      const { data } = err.response;
      setStatus({ status: data.status, message: data.message });
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card p-3 col-md-6 mx-auto">
        <h3 className="text-dark text-center mb-3">Login.</h3>
        {status.status === "error" && (
          <Alert type="danger" message={status.message} />
        )}
        <form onSubmit={handleLoginUser} autoComplete="off">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address..."
              className="form-control"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="enter your password..."
              className="form-control"
              value={password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <LoadingButton type="submit" title="Login" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
