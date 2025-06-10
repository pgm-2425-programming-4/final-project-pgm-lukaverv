import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../../../services/api.js";

function ProjectList() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  if (isLoading) return <p>Loading Projects...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section className="header__projects">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.documentId}`}
          className="header__project header__item"
        >
          {project.title}
        </Link>
      ))}
    </section>
  );
}

export default ProjectList;
