function NavBar() {
  return (
    <>
      <header className="header">
        <nav className="header__navigation">
          <Link to={"/"} className="header__item">
            Home
          </Link>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
