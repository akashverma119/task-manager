import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";

const activePending = ({ isActive, isPending }) => {
  return isPending ? "pending" : isActive ? "active" : "";
};

const Navbar = () => {
  return (
    <>
      <ul className="navbar-list">
        <li>
          <NavLink className={activePending} to="/create">
            Create
          </NavLink>
        </li>
        <li>
          <NavLink className={activePending} to="/">
            Task Manager App
          </NavLink>
        </li>
        <li className="profile">
          <NavLink className={activePending} to="/Profile">
            Profile
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
