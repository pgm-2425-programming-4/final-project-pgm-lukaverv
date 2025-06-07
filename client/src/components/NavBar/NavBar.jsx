import Home from "./Home/Home.jsx";
import ProjectList from "./Projects/ProjectList.jsx";

function NavBar() {
  return (
    <>
      <header className="header">
        <nav className="header__navigation">
          <p className="header__item">Home</p>
          <h2 className="header__title">Projects</h2>
          <ProjectList />
          <h2 className="header__title">Info</h2>
          <p className="header__item">About</p>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
