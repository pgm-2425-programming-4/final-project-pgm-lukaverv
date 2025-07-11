import { useState } from "react";
import { getStatuses, updateTaskStatus, deleteTask } from "../../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function TaskDetailModal({ task, onClose }) {
  const { data: allStatuses } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  const statuses = allStatuses?.data || [];
  const originalStatus = task.task_status?.documentId;
  const [selectedStatus, setSelectedStatus] = useState(
    task.task_status.documentId,
  );
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: ({ taskId, statusId }) => updateTaskStatus(taskId, statusId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onClose();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (taskId) => deleteTask(taskId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      onClose();
    },
  });

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handleSave = () => {
    updateMutation.mutate({
      taskId: task.documentId,
      statusId: selectedStatus,
    });
  };

  if (!task) return null;

  return (
    <div className="modal-overlay modal-overlay--detail" onClick={onClose}>
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
              className="modal__status-select select"
            >
              {statuses.map((status) => (
                <option key={status.documentId} value={status.documentId}>
                  {status.title}
                </option>
              ))}
            </select>
            <div className="modal__buttons">
              {selectedStatus !== originalStatus && (
                <button
                  className="modal__button-save"
                  onClick={handleSave}
                  disabled={updateMutation.isLoading}
                >
                  {updateMutation.isLoading ? "Saving..." : "Save Status"}
                </button>
              )}
              <button
                className="modal__button-delete"
                onClick={() => deleteMutation.mutate(task.documentId)}
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete Task"}
              </button>
            </div>
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
