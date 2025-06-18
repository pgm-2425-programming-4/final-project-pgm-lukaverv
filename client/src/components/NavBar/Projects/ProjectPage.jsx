import { useParams } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getProjectByDocumentId,
  getTasksByProjectDocumentId,
} from "../../../services/api";
import TaskStatus from "../../Tasks/TaskStatus";
import TaskToolBar from "../../TaskToolBar/TaskToolBar";

function ProjectPage() {
  const { projectId } = useParams({ strict: false });
  const [filteredTasks, setFilteredTasks] = useState([]);

  const handleFilterTasks = (selectedLabel) => {
    if (!selectedLabel || selectedLabel === "all") {
      setFilteredTasks(tasks.data);
    } else {
      const filtered = tasks.data.filter((task) =>
        task.labels.some((label) => label.title === selectedLabel),
      );
      setFilteredTasks(filtered);
    }
  };

  const handleSearchTasks = (searchInput) => {
    if (!searchInput.trim()) {
      setFilteredTasks(tasks.data);
    } else {
      const filtered = tasks.data.filter((task) =>
        task.title.toLowerCase().includes(searchInput.toLowerCase()),
      );
      setFilteredTasks(filtered);
    }
  };

  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByDocumentId(projectId),
  });

  const { data: tasks, isLoading: loadingTasks } = useQuery({
    queryKey: ["tasks", "project", projectId],
    queryFn: () => getTasksByProjectDocumentId(projectId),
  });

  useEffect(() => {
    if (tasks?.data) {
      setFilteredTasks(tasks.data);
    }
  }, [tasks]);

  const statuses = ["To Do", "In Progress", "Ready For Review", "Done"];

  if (loadingProject || loadingTasks) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <section className="project">
      <TaskToolBar
        projectTitle={project.data[0].title}
        onSearchTasks={handleSearchTasks}
        onFilterTasks={handleFilterTasks}
        projectId={projectId}
      />
      <div className="main__task-status">
        {statuses.map((status) => (
          <TaskStatus
            key={status}
            statusTitle={status}
            tasks={filteredTasks.filter(
              (task) => task.task_status.title === status,
            )}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectPage;
