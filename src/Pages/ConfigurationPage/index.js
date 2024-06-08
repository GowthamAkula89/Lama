import React from "react";
import Header from "../../Components/Header";

import SideBar from "../../Components/SideBar";
import ConfigurationSection from "../../Components/ConfigurationSection";
const ConfigurationPage = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div>
            <Header/>
            <div className="main-content">
                <SideBar isProjectsPage={isProjectsPage} isConfigurationPage={isConfigurationPage} isSettingsPage={isSettingsPage}/>
                <ConfigurationSection/>
            </div>
        </div>
    )
}
export default ConfigurationPage;