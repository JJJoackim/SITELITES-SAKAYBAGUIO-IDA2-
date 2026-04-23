import React from "react";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Sakay Baguio.ph</div>

      <ul style={styles.navLinks}>
        <li><a href="#home" style={styles.link}>Home</a></li>
        <li><a href="#trips" style={styles.link}>Trips</a></li>
        <li><a href="#settings" style={styles.link}>Settings</a></li>
        <li><a href="#support" style={styles.link}>Support</a></li>
      </ul>

      <div>
        <button style={styles.button}>Login</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#333",
    color: "#fff",
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  navLinks: {
    listStyle: "none",
    display: "flex",
    gap: "1.5rem",
    margin: 0,
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ff9800",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    borderRadius: "4px",
  },
};

export default Navbar;
