import AddTaskBtn from "./Tasks/AddTaskBtn";
import BacklogBtn from "./Backlog/BacklogBtn";

function TaskToolBar({ projectTitle, projectId }) {
  return (
    <>
      <section className="main__project-options">
        <div className="main__filter">
          <select id="filter" className="main__filter-select select">
            <option value="all">All</option>
            <option value="back-end">Back-End</option>
            <option value="front-end">Front-End</option>
            <option value="documentation">Documentation</option>
            <option value="infra">Infra</option>
          </select>
          <input
            type="text"
            className="main__search-input input"
            placeholder="Search by description"
          />
        </div>
        <div className="main__project-info">
          <p className="main__active-project">Active Project: {projectTitle}</p>
          <AddTaskBtn />
          <BacklogBtn projectId={projectId} />
        </div>
      </section>
    </>
  );
}

export default TaskToolBar;
