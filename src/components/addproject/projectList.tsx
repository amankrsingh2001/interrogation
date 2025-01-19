
import axios from "axios";
import ProjectCard from "../ui/project-Card";

const projects = [
  {
    name: "Task Manager App",
    description:
      "A full-stack application for managing daily tasks and projects.",
    liveLink: "https://task-manager.example.com",
    repoLink: "https://github.com/yourusername/task-manager",
    languages: ["React", "Node.js", "MongoDB"],
    createdAt: "2023-03-15",
  },
  {
    name: "Weather Forecast Widget",
    description:
      "A responsive widget that displays real-time weather information.",
    liveLink: "https://weather-widget.example.com",
    repoLink: "https://github.com/yourusername/weather-widget",
    languages: ["JavaScript", "CSS", "OpenWeatherMap API"],
    createdAt: "2023-04-22",
  },
  {
    name: "E-commerce Platform",
    description:
      "A scalable e-commerce solution with user authentication and payment integration.",
    liveLink: "https://shop.example.com",
    repoLink: "https://github.com/yourusername/ecommerce-platform",
    languages: ["Next.js", "Stripe", "PostgreSQL"],
    createdAt: "2023-05-10",
  },
];

export default async function ProjectList() {

 

  return (
    <div className="flex flex-wrap gap-4">
      {/* {projects.map((project, index) => (
        <ProjectCard
          key={index}
          name={project.name}
          description={project.description}
          liveLink={project.liveLink}
          repoLink={project.repoLink}
          languages={project.languages}
          createdAt={project.createdAt}
        />
      ))} */}
    </div>
  );
}
