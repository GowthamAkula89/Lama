import React from "react";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import "./fileEditPage.css"
import FileEditCard from "../../Components/FileEditCard";
const FileEditPage = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-content">
                <SideBar isProjectsPage={isProjectsPage} isConfigurationPage={isConfigurationPage} isSettingsPage={isSettingsPage}/>
                <FileEditCard/>
            </div>
            
        </div>
    )
}
export default FileEditPage;