import React, { useState, useEffect } from "react";
import "./about.css";

const About = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails) {
            setUsername(userDetails.username);
            setEmail(userDetails.email);
            setIsLoggedIn(true);
        }
    }, []);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const saveChanges = () => {
        const userDetails = { username, email };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
    };

    const handleLogout = () => {
        localStorage.removeItem("userDetails");
        setIsLoggedIn(false);
    };

    return (
        <div className="about-container">
            <div className="card-heading">Account Settings</div>
            {isLoggedIn ? (
                <>
                <div className="accout-details">
                    <div className="form-group">
                        <label htmlFor="username" className="field-name">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="input-field-data"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email"  className="field-name">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input-field-data"
                            value={email}
                            disabled
                        />
                    </div>
                    
                </div>
                <div className="btns-container">
                <button onClick={saveChanges} className="save-btn">Save Changes</button>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                </>
            ) : (
                <div className="login-form">
                    {/* Your login form JSX goes here */}
                    <button>Login</button>
                </div>
            )}
        </div>
    );
};

export default About;
