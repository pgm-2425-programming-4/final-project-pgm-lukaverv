import { useState } from "react";
import TaskDetailModal from "./TaskDetailModal.jsx";

function TaskStatus({ statusTitle, tasks }) {
  const [selectedTask, setSelectedTask] = useState(null);

  if (!tasks) return <p>Loading tasks...</p>;

  return (
    <article className="task-status">
      <h3 className="task-status__title">{statusTitle}</h3>
      <div className="task-status__tasks">
        {tasks.length === 0 ? (
          <p className="task-status__empty">No tasks in this status.</p>
        ) : (
          tasks.map((task) => (
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
          ))
        )}
      </div>
      <TaskDetailModal
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
      />
    </article>
  );
}

export default TaskStatus;
