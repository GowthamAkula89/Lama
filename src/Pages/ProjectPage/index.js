import React from "react";
import Header from "../../Components/Header";
import ProjectUploads from "../../Components/ProjectUploads";
import SideBar from "../../Components/SideBar";
import "./projectPage.css"
const ProjectPage = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-content">
                <SideBar isProjectsPage={isProjectsPage} isConfigurationPage={isConfigurationPage} isSettingsPage={isSettingsPage}/>
                <ProjectUploads/>
            </div>
            
        </div>
    )
}
export default ProjectPage;