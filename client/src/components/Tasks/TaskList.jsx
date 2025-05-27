import TaskStatus from "./TaskStatus";

function TaskList() {
    return (
        <>
            <section className="main__task-status">
                <TaskStatus statusTitle="to_do" />
                <TaskStatus statusTitle="in_progress" />
                <TaskStatus statusTitle="ready_for_review" />
                <TaskStatus statusTitle="done" />
            </section>
        </>
    );
}

export default TaskList;