import NavBar from "./components/NavBar/NavBar";
import { Outlet } from "@tanstack/react-router";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="main">
        <Outlet />
      </main>
    </>
  );
}

export default App;