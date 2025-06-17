import { useState } from "react";
import { Link } from "@tanstack/react-router";
import ProjectList from "./Projects/ProjectList.jsx";
import AddProjectModal from "./Projects/AddProjectModal.jsx";

function NavBar() {
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);

  const handleOpenModal = () => {
    setShowAddProjectModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProjectModal(false);
  };

  return (
    <>
      <header className="header">
        <nav className="header__navigation">
          <Link to={"/"} className="header__item">
            Home
          </Link>
          <h2 className="header__title">Projects</h2>
          <ProjectList />
          <h2 className="header__title">Info</h2>
          <Link to={"/about"} className="header__item">
            About
          </Link>
        </nav>
        <button
          className="header__button header__button--add-project"
          onClick={handleOpenModal}
        >
          New Project
        </button>
        {showAddProjectModal && <AddProjectModal onClose={handleCloseModal} />}
      </header>
    </>
  );
}

export default NavBar;
