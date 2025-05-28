import TaskStatus from "./TaskStatus";

function TaskList() {
    return (
        <>
            <section className="main__task-status">
                <TaskStatus statusTitle="To Do" />
                <TaskStatus statusTitle="In Progress" />
                <TaskStatus statusTitle="Ready For Review" />
                <TaskStatus statusTitle="Done" />
            </section>
        </>
    );
}

export default TaskList;