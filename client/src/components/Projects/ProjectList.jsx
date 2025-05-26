import { useEffect, useState } from "react";
import { API_TOKEN } from "../../App";

function ProjectList() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch("http://localhost:1337/api/projects", {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        })
        .then((res) => res.json())
        .then((json) => {
            setProjects(json.data);
        });
    }, []);
    return (
    <>
        <header className="header">
        <nav className="header__navigation">
            <h2 className="header__title">Projects</h2>
            <section className="header__projects">
                {projects.map((project) => (
                    <p key={project.id} className="header__project">{project.title}</p>
                ))}
            </section>
        </nav>
        </header>
    </>
    )
}

export default ProjectList
