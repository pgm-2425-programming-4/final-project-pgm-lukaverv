import TaskStatus from "./TaskStatus";
import { useState, useEffect } from "react";
import { API_TOKEN, API_URL } from "../../constants/constant.js";

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/projects`, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            }
        })
        .then(res => res.json())
        .then(json => setTasks(json.data))
    }, []);
    return (
        <>
            <section className="main__task-status">
                <TaskStatus statusTitle="To Do" tasks={tasks} />
                <TaskStatus statusTitle="In Progress" tasks={tasks} />
                <TaskStatus statusTitle="Ready For Review" tasks={tasks} />
                <TaskStatus statusTitle="Done" tasks={tasks} />
            </section>
        </>
    );
}

export default TaskList;