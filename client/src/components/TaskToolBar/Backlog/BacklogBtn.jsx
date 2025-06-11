import { useNavigate } from "@tanstack/react-router";

function BacklogBtn({ projectId }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (projectId) {
      navigate({
        to: `/projects/${projectId}/backlog`,
      });
    }
  };

  return (
    <button
      className="main__button main__button--view-backlog"
      onClick={handleClick}
      disabled={!projectId}
    >
      Backlog
    </button>
  );
}

export default BacklogBtn;
