import React, { useState } from "react";
import "./heroSection.css";
import HeroImg from "../Utils/hero.png";
import AddIcon from "../Utils/Vector.png";
import Modal from "react-modal";

const HeroSection = () => {
    const [showModal, setShowModal] = useState(false);
    const [projectName, setProjectName] = useState("");
    const handleShowmodal = () => {
        setShowModal(true);
    }
    const handleCancel = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleSubmit = () => {
        setShowModal(false);
    };
    return(
        <>
            <div className="hero-container">
                <div className="hero-heading">Create a New Project</div>
                <img className="hero-img" src={HeroImg} alt="img"></img>
                <div className="hero-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</div>
                <div className="create-btn" onClick={handleShowmodal}>
                        <img src={AddIcon} alt="add-icon" className="add-icon"/>
                        <div className="create-btn-text">Create New Project</div>
                </div>
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCancel}
                contentLabel="Login Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-container">
                    <div className="create-project-modal-content">
                        <div className="modal-content-heading">Create Project</div>
                        <div className="modal-content-subheading">Enter project Name:</div>
                        <input
                            className="content-input"
                            type="text"
                            name="projectName"
                            placeholder="Full Name*"
                            onChange={handleInputChange}
                        />
                        <button className="btn content-input" onClick={handleSubmit}>LOGIN</button>
                    </div>
                </div>
            </Modal>
        </>
    )
}
export default HeroSection;