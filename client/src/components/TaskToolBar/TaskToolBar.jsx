import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getLabels } from "../../services/api";
import AddTaskBtn from "./Tasks/AddTaskBtn";
import BacklogBtn from "./Backlog/BacklogBtn";

function TaskToolBar({
  projectTitle,
  projectId,
  onFilterTasks,
  onSearchTasks,
}) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearchTasks(value);
  };

  const { data: allLabels } = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
  });

  const labels = allLabels?.data || [];

  return (
    <>
      <section className="main__project-options">
        <div className="main__filter">
          <select
            onChange={(e) => onFilterTasks(e.target.value)}
            className="main__filter-select select"
          >
            <option value="all">All</option>
            {labels.map((label) => (
              <option key={label.documentId} value={label.title}>
                {label.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="main__search-input input"
            placeholder="Search by title"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <div className="main__project-info">
          <p className="main__active-project">Active Project: {projectTitle}</p>
          <AddTaskBtn />
          <BacklogBtn projectId={projectId} />
        </div>
      </section>
    </>
  );
}

export default TaskToolBar;
