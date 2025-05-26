import In_Progress from "./TaskStatus/In_Progress";
import To_Do from "./TaskStatus/To_Do";

function TaskList() {
    return (
        <>
            <section className="main__task-status">
                <To_Do />
                <In_Progress />
            </section>
        </>
    );
}

export default TaskList;