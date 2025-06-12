import { useState } from "react";
import { getStatuses, updateTaskStatus } from "../../services/api";
import { useQuery, useMutation } from "@tanstack/react-query";

function TaskDetailModal({ task, onClose }) {
  console.log("TaskDetailModal rendered with task:", task);

  const { data: allStatuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  const statuses = allStatuses?.data || [];

  if (statuses.length > 0) {
    console.log("Fetched statuses:", statuses);
  }

  const [selectedStatus, setSelectedStatus] = useState(task.task_status.documentId);

  const mutation = useMutation({
    mutationFn: ({ taskId, statusId }) => updateTaskStatus(taskId, statusId),
  });

  const handleStatusChange = (e) => {
    const newStatusId = e.target.value;
    console.log("Changing status to:", newStatusId);
    setSelectedStatus(newStatusId);
    mutation.mutate({ taskId: task.documentId, statusId: newStatusId });
  };

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
          <div className="modal__status">
            <strong>Status:</strong>{" "}
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              disabled={mutation.isLoading}
              className="modal__status-select"
            >
              {statuses.map((status) => (
                <option key={status.documentId} value={status.documentId}>
                  {status.title}
                </option>
              ))}
            </select>
            {mutation.isLoading && (
              <span className="modal__status-loading">Updating...</span>
            )}
          </div>
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
