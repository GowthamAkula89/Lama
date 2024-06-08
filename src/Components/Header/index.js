import React, { useEffect, useState } from "react";
import "./header.css";
import LogoImg from "../Utils/logo.png";
import Modal from "react-modal";
import { ImCancelCircle } from "react-icons/im";
import { Link } from "react-router-dom";

export function Logo() {
    return (
        <div className="header-logo">
            <img src={LogoImg} alt="img" className="logo-img" />
            <div className="logo-name">LAMA.</div>
        </div>
    );
}

const Header = () => {
    const [username, setUsername] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        email: ""
    });

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("userDetails") || "{}");
        setUsername(savedUser.username || "");
    }, []);

    const handleLogin = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        localStorage.setItem("userDetails", JSON.stringify(userData));
        setUsername(userData.username);
        setShowModal(false);
    };

    return (
        <>
            <div className="header">
                <div className="header-title">
                    <Link to="/" className="project-container">
                        <Logo />
                    </Link>
                    <div className="vertical-bar"></div>
                    <div className="header-text">Develop and acquire multiple profitable micro-SaaS products</div>
                </div>
                <div className="header-contact">
                    <div className="contact-number">1 888 263 2574</div>
                    {username === "" ? (
                        <button type="button" className="btn" onClick={handleLogin}>Login</button>
                    ) : (
                        <div className="user-name">{username}</div>
                    )}
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
                    <div className="close-btn" onClick={handleCancel}>
                        <ImCancelCircle style={{ width: "25px", height: "25px" }} />
                    </div>
                    <div className="modal-content">
                        <div className="modal-content-heading">Login</div>
                        <div className="modal-content-subheading">Enter details to login</div>
                        <input
                            className="content-input"
                            type="text"
                            name="username"
                            placeholder="Full Name*"
                            onChange={handleInputChange}
                        />
                        <input
                            className="content-input"
                            type="email"
                            name="email"
                            placeholder="Email*"
                            onChange={handleInputChange}
                        />
                        <button className="btn content-input" onClick={handleSubmit}>LOGIN</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Header;
