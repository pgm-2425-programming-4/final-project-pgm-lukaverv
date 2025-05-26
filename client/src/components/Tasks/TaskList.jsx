import In_Progress from "./TaskStatus/In_Progress";
import Ready_For_Review from "./TaskStatus/Ready_For_Review";
import To_Do from "./TaskStatus/To_Do";

function TaskList() {
    return (
        <>
            <section className="main__task-status">
                <To_Do />
                <In_Progress />
                <Ready_For_Review />
            </section>
        </>
    );
}

export default TaskList;