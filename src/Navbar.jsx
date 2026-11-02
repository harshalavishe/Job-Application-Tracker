import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <>
    <nav className="navbar">

      <h2 className="logo"> Job<span>Tracker</span></h2>

      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>

        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>

    </nav>
    </>
  );
}