import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeRoute = (path) => {
    if (path === pathname) return true;
    else return false;
  };
  const handleLogoutUser = () => {
    localStorage.removeItem("pingApp");
    navigate("/login");
  };
  return (
    <nav className="navbar px-3">
      <h4 className="navbar-brand">Ping Test</h4>
      <ul className="nav mr-auto">
        {pathname === "/app" ? (
          <li className="nav-item">
            <button
              onClick={handleLogoutUser}
              className="btn btn-sm btn-outline-primary"
            >
              Logout
            </button>
          </li>
        ) : (
          <React.Fragment>
            <li className="nav-item">
              <Link
                className={"nav-link " + `${activeRoute("/") ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  "nav-link " + `${activeRoute("/login") ? "active" : ""}`
                }
                to="/login"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                className={
                  "nav-link " + `${activeRoute("/signup") ? "active" : ""}`
                }
                to="/signup"
              >
                Signup
              </Link>
            </li>
          </React.Fragment>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
