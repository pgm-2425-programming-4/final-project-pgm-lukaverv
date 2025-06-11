import { useNavigate } from "@tanstack/react-router";

function Backlog({ projectId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Navigating to backlog for project:", projectId);
    if (projectId) {
      navigate({
        to: `/projects/${projectId}/backlog`,
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
