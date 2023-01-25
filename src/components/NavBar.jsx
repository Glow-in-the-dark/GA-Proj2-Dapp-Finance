import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBar = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            {/* <Link to="/page-two">Page Two</Link> */}
            <NavLink
              to="/page-two"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Page Two
            </NavLink>
          </li>
          <li>
            {/* <Link to="/page-three">Page Three</Link> */}
            <NavLink
              to="/page-three"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Page Three
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
