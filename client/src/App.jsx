import NavBar from "./components/Navigationbar/NavBar";
import ProjectList from "./components/Projects/ProjectList";
import TaskList from "./components/Tasks/TaskList";
import "./App.css"

export const API_TOKEN = "b5abb911ff97819bc8afb63b49ef6c1c8a63e9d58c1e9c79cc9ff6de5badf73365d083bf7b1b340cd5c6d7e58019fb98d945e0fb697c0c7ab95ce40875152645deabecacaf16a763c4db4595d02c0f5c4e2984fbe281a6b4d36443223a7f6b2a7050ed76f4b2f463c6e7cab7df9f0f9bb12afed6da67947230d6e63d4a1bb5fa"

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
