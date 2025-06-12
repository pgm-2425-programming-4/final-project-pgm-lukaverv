import { getStatuses, updateTaskStatus } from "../../services/api";
import { useQuery, useMutation } from "@tanstack/react-query";

function TaskDetailModal({ task, onClose }) {
  const { data: allStatuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  const statuses = allStatuses.data || [];

  if (!task) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <h2 className="modal__title">{task.title}</h2>
        <div className="modal__info">
          <p className="modal__project">
            <strong>Project:</strong> {task.project?.title || "No project"}
          </p>
          <p className="modal__description">
            <strong>Description:</strong> {task.description || "No description"}
          </p>
          <p className="modal__status">
            <strong>Status:</strong> {task.task_status?.title || "Unknown"}
          </p>
          <div className="modal__labels">
            <strong>Labels:</strong>
            <ul className="modal__labels-list">
              {task.labels.map((label) => (
                <li className="modal__label" key={label.id}>
                  {label.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default TaskDetailModal;
