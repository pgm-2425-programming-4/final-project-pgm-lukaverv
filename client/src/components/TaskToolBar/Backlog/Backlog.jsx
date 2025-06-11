import { useNavigate } from "@tanstack/react-router";

function Backlog({ activeProjectId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (activeProjectId) {
      navigate({
        to: `/projects/${activeProjectId}/backlog`,
      });
    }
  };
  return (
    <button
      onClick={handleClick}
      className="main__button main__button--view-backlog"
    >
      Backlog
    </button>
  );
}

export default Backlog;
