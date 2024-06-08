import React, { useState, useEffect, useContext } from "react";
import "./heroSection.css";
import HeroImg from "../Utils/hero.png";
import AddIcon from "../Utils/Vector.png";
import { Link } from "react-router-dom";
import { config } from "../../App";
import ProjectModal from "../ProjectModal";
import DataContext from "../DataContext";

export function projectCard(project) {
    return (
        <div className="project-card">
            <div className="project-title">{project.projectName.slice(0, 2).toUpperCase()}</div>
            <div className="project-details">
                <div>
                    <div className="project-name">{project.projectName}</div>
                    <div>{`${project.files.length} Files`}</div>
                </div>
                <div className="project-update">Last edited just now</div>
            </div>
        </div>
    );
}

const HeroSection = () => {
    const { projects, setProjects, setProject } = useContext(DataContext);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(config.endpoint);
                const data = await response.json();
                setProjects(data.projects);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Error fetching projects:', error);
                setLoading(false); // Set loading to false in case of error
            }
        };
        fetchData();
    }, [setProjects]); // Add setProjects as a dependency

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleProject = (data) => {
        setProject(data);
    };

    if (loading) {
        return <div className="loading-message">Loading...</div>; 
    }

    return (
        <>
            {projects.length === 0 ? (
                <div className="hero-container">
                    <div className="hero-heading">Create a New Project</div>
                    <img className="hero-img" src={HeroImg} alt="img" />
                    <div className="hero-content">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                    </div>
                    <div className="create-btn" onClick={handleShowModal}>
                        <img src={AddIcon} alt="add-icon" className="add-icon" />
                        <div className="create-btn-text">Create New Project</div>
                    </div>
                </div>
            ) : (
                <div className="projects-container">
                    <div className="projects-header">
                        <div className="project-heading">Projects</div>
                        <div className="create-btn" onClick={handleShowModal}>
                            <img src={AddIcon} alt="add-icon" className="add-icon2" />
                            <div className="create-btn-text2">Create New Project</div>
                        </div>
                    </div>
                    <div className="projects-list">
                        {projects.map((project) =>
                            <div key={project._id}>
                                <Link to="/project" className="project-container" onClick={() => handleProject(project)}>
                                    {projectCard(project)}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <ProjectModal showModal={showModal} setShowModal={setShowModal} setProjects={setProjects} />
        </>
    );
};

export default HeroSection;
