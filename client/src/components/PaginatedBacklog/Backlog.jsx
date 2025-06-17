import Pagination from "./Pagination";
import { useState } from "react";
import { useParams, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getBacklogTasksByProjectDocumentId,
  getProjectByDocumentId,
} from "../../services/api.js";

function Backlog() {
  const params = useParams({ strict: false });
  const projectId = params.projectId;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const start = (currentPage - 1) * limit;

  const { data: projectData, isLoading: loadingProject } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByDocumentId(projectId),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["backlogTasks", projectId, start, limit],
    queryFn: () => getBacklogTasksByProjectDocumentId(projectId, start, limit),
  });

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  if (loadingProject || isLoading)
    return <p className="backlog__loading">Loading...</p>;
  if (error) return <p className="backlog__error">Failed to load tasks.</p>;

  const project = projectData?.data[0];
  const tasks = data?.data || [];
  const pagination = data?.meta.pagination;

  return (
    <div className="backlog">
      <button
        className="backlog__back button"
        onClick={() => navigate({ to: `/projects/${projectId}` })}
      >
        Go Back
      </button>
      <h2 className="backlog__title">Backlog for {project.title}</h2>
      <ul className="backlog__list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li className="backlog__item" key={task.id}>
              <span className="backlog__task-title">{task.title}</span>
            </li>
          ))
        ) : (
          <li className="backlog__item backlog__item--empty">
            No backlog tasks found.
          </li>
        )}
      </ul>
      <div className="backlog__limit">
        <select
          className="backlog__select select"
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))} 
        >
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </select>
      </div>
      {pagination && (
        <div className="backlog__pagination">
          <Pagination
            totalPages={Math.ceil(pagination.total / limit)}
            currentPage={currentPage}
            onPageChanged={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default Backlog;
