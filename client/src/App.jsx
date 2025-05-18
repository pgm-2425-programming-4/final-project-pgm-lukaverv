import Backlog from "./components/PaginatedBacklog/Backlog"; 
import "./styles/app.css";

export const API_TOKEN = "5c4e2ed859f93e6657e9f7bd7879d1daadfc3c9ddcc352ca62e1a12b921bb0cb8b8d6f13f088db60fd21de701a6e32cfcc3f9eb0310c350ecaabe40c90e5b67d0d00c64350b956f6d249275a541da4916bce447ef9c7cdd04f1a076303242104f6fce671e3273e1949a75c41c8d0a5fce036c3466497daec06705c28fa9f4093"; 

function App() {
    return (
        <>
            <Backlog />
        </>
    );
}

export default App;
