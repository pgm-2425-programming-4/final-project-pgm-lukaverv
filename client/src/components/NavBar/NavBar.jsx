import { Link } from "@tanstack/react-router";

function NavBar() {
  return (
    <>
      <header className="header">
        <nav className="header__navigation">
          <Link to={"/"} className="header__item">
            Home
          </Link>
          <h2 className="header__title">Info</h2>
          <Link to={"/about"} className="header__item">
            About
          </Link>
        </nav>
      </header>
    </>
  );
}

export default NavBar;