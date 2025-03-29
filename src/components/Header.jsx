import { NavLink } from "react-router-dom";
import "../styles/components/Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="header__logo" src="../src/assets/img/DiceDND.webp" alt="DiceDND" />
        <h1 className="header__title">DND 5E</h1>
      </div>
      <nav className="header__nav">
        <ul className="header__list">
          <li className="header__item">
            <NavLink
              className="header__link"
              to={"/"}
            >
              Home
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
