import { useEffect, useState } from "react";
import { API_TOKEN, API_URL } from "../../constants/constant.js";
import Pagination from "./Pagination";

function Backlog() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 2;
  const start = (currentPage - 1) * limit;

  useEffect(() => {
    fetch(
      `${API_URL}/tasks?filters[task_status][title][$eq]=Backlog&pagination[start]=${start}&pagination[limit]=${limit}&populate=*`,
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => {
        setTasks(json.data);
        setPagination(json.meta.pagination);
      });
  }, [start]);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  return (
    <div className="backlog">
      <h2>Backlog Taken</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
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
