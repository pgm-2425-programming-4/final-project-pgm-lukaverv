import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTaskByStatus } from "../../services/api.js";
import TaskDetailModal from "./TaskDetailModal.jsx";

function TaskStatus({ statusTitle }) {
  const [selectedTask, setSelectedTask] = useState(null);
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks", statusTitle],
    queryFn: () => getTaskByStatus(statusTitle),
  });

  if (isLoading) return <p>Loading tasks...</p>;
  if (error)
    return (
      <p>
        Er is een fout opgetreden bij het ophalen van taken: {error.message}
      </p>
    );

  return (
    <article className="task-status">
      <h3 className="task-status__title">{statusTitle}</h3>
      <div className="task-status__tasks">
        {tasks.map((task) => (
          <div
            className="task"
            key={task.id}
            onClick={() => setSelectedTask(task)}
          >
            <p className="task__title">{task.title}</p>
            <div className="task__labels">
              {task.labels.map((label) => (
                <span className="task__label" key={label.id}>
                  {label.title}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </article>
  );
}

export default TaskStatus;
