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
          <div>
            <label className="modal__label">
              Title:
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>
          </div>
          <div>
            <label className="modal__label">
              Description:
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label className="modal__label">
              Project:
              <select
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
            </label>
          </div>
          <div>
            <label className="modal__label">
              Status:
              <select
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
            </label>
          </div>
          <div>
            <label className="modal__label">
              Labels:
              <select
                multiple
                value={labels}
                onChange={(e) =>
                  setLabels(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value,
                    ),
                  )
                }
              >
                {allLabels.map((label) => (
                  <option key={label.id} value={label.id}>
                    {label.title}
                  </option>
                ))}
              </select>
            </label>
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
