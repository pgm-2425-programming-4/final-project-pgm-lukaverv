import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProject } from "../../../services/api";

function AddProjectModal({ onClose }) {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const createProjectMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    createProjectMutation.mutate({ title });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <section className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">Add New Project</h2>
        <button className="modal__close" onClick={onClose}>
          X
        </button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <div className="modal__form-group">
            <label className="modal__label" htmlFor="project-title">
              Title:
            </label>
            <input
              id="project-title"
              className="modal__input input"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="modal__button main__button--add-task"
            disabled={createProjectMutation.isLoading}
          >
            {createProjectMutation.isLoading ? "Adding Project..." : "Add Project"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default AddProjectModal;
