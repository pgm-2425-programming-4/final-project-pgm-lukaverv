import NavBar from "./components/Navigationbar/NavBar";
import ProjectList from "./components/Projects/ProjectList";
import TaskList from "./components/Tasks/TaskList";
import "./App.css"


function App() {
    return (
        <>
            <ProjectList />
            <main className="main">
                <NavBar/>
                <TaskList />
            </main>
        </>
    );
}

export default App;
