import { useEffect, useState } from "react";
import { API_TOKEN, API_URL } from "../../constants/constant.js";

function TaskStatus({ statusTitle }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(
            `${API_URL}/tasks?filters[task_status][title][$eq]=${statusTitle}&populate=*`,
            {
                headers: {
                    Authorization: `Bearer ${API_TOKEN}`,
                },
            }
        )
            .then((res) => res.json())
            .then((json) => setTasks(json.data));
    }, [statusTitle]);

    return (
            <article className="task-status task-status--ready-for-review">
                <h3 className="task-status__title">Ready for review</h3>
                <div className="task-status__tasks">
                    {tasks.map((task) => (
                        <div className="task" key={task.id}>
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
        </article>
    );
}

export default TaskStatus;