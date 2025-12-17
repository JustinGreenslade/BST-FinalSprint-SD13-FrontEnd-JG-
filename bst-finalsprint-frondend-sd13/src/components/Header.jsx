import { NavLink } from 'react-router-dom';
import "../styles/header.css"

export default function Header() {
  return (
    <header className="header">
      <div className="nav-container">
        <h1 className="site-title">CodeBrew Tree Builder</h1>
        <nav className="nav-links">
          <NavLink to="/" className="nav-link" end>
            Home
          </NavLink>
          <NavLink to="/previous" className="nav-link">
            Previous Trees
          </NavLink>
        </nav>
      </div>
    </header>
  );
}