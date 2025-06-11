import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  getProjectByDocumentId,
  getTasksByProjectDocumentId,
} from "../../../services/api";
import TaskStatus from "../../Tasks/TaskStatus";
import TaskToolBar from "../../TaskToolBar/TaskToolBar";

function ProjectPage() {
  const { projectId } = useParams({ strict: false });

  const { data: project, isLoading: loadingProject } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectByDocumentId(projectId),
  });

  const { data: tasks, isLoading: loadingTasks } = useQuery({
    queryKey: ["tasks", "project", projectId],
    queryFn: () => getTasksByProjectDocumentId(projectId),
  });

  const statuses = ["To Do", "In Progress", "Ready For Review", "Done"];

  if (loadingProject || loadingTasks) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  return (
    <section className="project">
      <h1 className="project__title">{project.title}</h1>
      <TaskToolBar projectId={projectId} />
      <div className="main__task-status">
        {statuses.map((status) => (
          <TaskStatus
            key={status}
            statusTitle={status}
            tasks={tasks.data.filter((task) => task.task_status.title === status)}
          />
        ))}
      </div>
    </section>
  );
}

export default ProjectPage;
