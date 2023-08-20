import React, { useState } from "react";
import axios from "axios";

import API from "../api";
import Alert from "../components/Alert";
import LoadingButton from "../components/LoadingButton";

const Dashboard = () => {
  const [ip, setIP] = useState("");
  const [status, setStatus] = useState({ status: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handlePingTest = (e) => {
    e.preventDefault();

    if (!ip) {
      setStatus({
        status: "error",
        message: "Please enter an IP/domain address",
      });
      return;
    }
    pingTest();
  };

  const handleIPchange = (e) => {
    setIP(e.target.value);
  };

  const pingTest = async () => {
    const URL = `${API}/ping`;
    setLoading(true);
    const { token } = JSON.parse(localStorage.getItem("pingApp"));
    try {
      const response = await axios.post(
        URL,
        { ip },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const { data } = await response;
      setStatus({ status: data.status, message: data.message });
    } catch (err) {
      console.error(err);
      const { data } = err.response;
      setStatus({ status: data.status, message: data.message });
    }
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="my-4 text-center">
        <h1 className="fs-4">Welcome to Ping Test</h1>
        <p className="fs-6">
          enter the ip/domain address and click the ping button to test the
          connectivity.
        </p>
      </div>
      <div className="card p-3 col-md-6 mx-auto">
        {status.status === "success" && (
          <Alert type="success" message={status.message} />
        )}
        {status.status === "error" && (
          <Alert type="danger" message={status.message} />
        )}
        <form autoComplete="off" onSubmit={handlePingTest}>
          <div className="mb-3">
            <label className="form-label">IP Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter IP Address"
              name="ip"
              value={ip}
              onChange={handleIPchange}
            />
          </div>
          <div className="mb-3">
            <LoadingButton type="submit" title="Ping" loading={loading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
