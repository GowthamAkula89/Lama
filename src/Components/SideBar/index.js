import React from "react";
import "./sideBar.css";
import { Link } from "react-router-dom";
import SettingIcon from "../Utils/settingIcon.png";
const SideBar = ({isProjectsPage, isConfigurationPage, isSettingsPage}) => {
    return(
        <div className="side-bar">
            <div className="menu-list">
                <div className="menu-list-heading">Podcast Upload Flow</div>
                <Link to="/project" className="project-container">
                    <div className={`menu-item ${isProjectsPage?"projects":""}`}>
                        <div className="slno">1</div>
                        <div className="menu-item-name">Projects</div>
                    </div>
                </Link>
                <Link to="/configurations" className="project-container">
                    <div className={`menu-item ${isConfigurationPage?"configurations":""}`}>
                        <div  className="slno">2</div>
                        <div  className="menu-item-name">Widget Configurations</div>
                    </div>
                </Link>
            </div>
            <Link to="/settings" className="project-container">
                <div className={`menu-item ${isSettingsPage?"settings":""}`}>
                    <img src={SettingIcon} alt="setting-img"/>
                    <div className="menu-item-name">Settings</div>
                </div>
            </Link>
        </div>
    )
}
export default SideBar;