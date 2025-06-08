import NavBar from "./components/NavBar/NavBar";
import TaskList from "./components/Tasks/TaskList";
import TaskToolBar from "./components/TaskToolBar/TaskToolBar";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <TaskToolBar />
        <TaskList />
      </main>
    </>
  );
}

export default App;