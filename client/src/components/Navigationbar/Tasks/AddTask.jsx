function AddTask() {
    const handleClick = () => {
        // Logic to handle adding a task
        console.log("Add Task button clicked");
    }
    return (
        <button onClick={handleClick} className="main__button main__button--add-task">Add Task</button>
    );
}

export default AddTask;

