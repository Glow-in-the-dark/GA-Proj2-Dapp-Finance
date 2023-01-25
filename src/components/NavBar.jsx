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
              to="/wallet"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Web3 Wallet
            </NavLink>
          </li>
          <li>
            {/* <Link to="/page-three">Page Three</Link> */}
            <NavLink
              to="/watchlist"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              My WatchList
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
