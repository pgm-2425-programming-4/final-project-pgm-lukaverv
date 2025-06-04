import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../services/api.js";

function ProjectList() {
    const { data: projects, isLoading, error } = useQuery({
        queryKey: ["projects"],
        queryFn: getProjects,
    });

    if (isLoading) return <p>Loading Projects...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
    <>
        <header className="header">
            <nav className="header__navigation">
                <h2 className="header__title">Projects</h2>
                <section className="header__projects">
                    {projects.map((project) => (
                        <p
                            key={project.id}
                            className="header__project"
                            >{project.title}
                        </p>
                    ))}
                </section>
            </nav>
        </header>
    </>
    )
}

export default ProjectList