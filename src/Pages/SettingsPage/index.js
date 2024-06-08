import React from "react";
import Header from "../../Components/Header";
import SideBar from "../../Components/SideBar";
import "./settingsPage.css"
import About from "../../Components/About";



const SettingsPage = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-content">
                <SideBar isProjectsPage={isProjectsPage} isConfigurationPage={isConfigurationPage} isSettingsPage={isSettingsPage}/>
                <About/>
            </div>
            
        </div>
    )
}
export default SettingsPage;