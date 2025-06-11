import Pagination from "./Pagination";
import { useState } from "react";
import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getBacklogTasksByProjectDocumentId } from "../../services/api.js";

function Backlog() {
  const { projectId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 2;
  const start = (currentPage - 1) * limit;

  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["backlogTasks", projectId, start, limit],
    queryFn: () => getBacklogTasksByProjectDocumentId(projectId, start, limit),
  });

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load tasks.</p>;

  const tasks = data?.data
  const pagination = data?.meta?.pagination

  return (
    <div className="backlog">
      <h2>Backlog Taken</h2>
      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => <li key={task.id}>{task.title}</li>)
        ) : (
          <li>No backlog tasks found.</li>
        )}
      </ul>

      {pagination && (
        <Pagination
          totalPages={Math.ceil(pagination.total / limit)}
          currentPage={currentPage}
          onPageChanged={handlePageChange}
        />
      )}
    </div>
  );
}

export default Backlog;
