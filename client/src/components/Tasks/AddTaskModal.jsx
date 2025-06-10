import { useState } from "react";
import {
  getLabels,
  getStatuses,
  getProjects,
  createTask,
} from "../../services/api.js";
import { useQuery, useMutation } from "@tanstack/react-query";

function AddTaskModal({ onClose, onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [project, setProject] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [labels, setLabels] = useState([]);

  const { data: allProjects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  const { data: allStatuses = [] } = useQuery({
    queryKey: ["statuses"],
    queryFn: getStatuses,
  });

  const { data: allLabels = [] } = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
  });

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: (newTask) => {
      onTaskAdded?.(newTask);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title,
      description,
      project,
      task_status: taskStatus,
      labels,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Add New Task</h2>
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form-group">
            <label className="modal__label" htmlFor="task-title">
              Title:
            </label>
            <input
              id="task-title"
              className="modal__input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="modal__form-group">
            <label className="modal__label" htmlFor="task-project">
              Project:
            </label>
            <select
              id="task-project"
              className="modal__input"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              required
            >
              <option value="">Select a project</option>
              {allProjects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.title}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__form-group">
            <div>
              <label className="modal__label" htmlFor="task-status">
                Status:
              </label>
              <select
                id="task-status"
                className="modal__input"
                value={taskStatus}
                onChange={(e) => setTaskStatus(e.target.value)}
                required
              >
                <option value="">Select a status</option>
                {allStatuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="modal__label" htmlFor="task-labels">
                Labels:
              </label>
              <select
                id="task-labels"
                className="modal__input"
                multiple
                value={labels}
                onChange={(e) =>
                  setLabels(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                {allLabels.map((label) => (
                  <option key={label.id} value={label.id}>
                    {label.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal__form-group modal__form-group--description">
            <label className="modal__label" htmlFor="task-description">
              Description:
            </label>
            <textarea
              id="task-description"
              className="modal__input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="modal__button main__button--add-task"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Adding Task..." : "Add Task"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default AddTaskModal;
