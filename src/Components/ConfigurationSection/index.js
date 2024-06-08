import React, { useContext, useState, useEffect } from "react";
import "./configurationSection.css";
import { config } from "../../App";
import DataContext from "../DataContext";
import { ChromePicker } from 'react-color';

const ConfigurationSection = () => {
    const { project, setProject } = useContext(DataContext);
    const [activeHeading, setActiveHeading] = useState("General");
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        general: {
            chatBotName: "",
            welcomeMessage: "",
            inputPlaceholder: ""
        },
        display: {
            primaryColor: "",
            fontColor: "",
            fontSize: 0,
            chatIconSize: "",
            positionScreen: "",
            distBottom: 0,
            horizontalDist: 0,
            chatBotImg: null
        }
    });
    console.log(formData)
    const [showPrimaryColorPicker, setShowPrimaryColorPicker] = useState(false);
    const [showFontColorPicker, setShowFontColorPicker] = useState(false);

    useEffect(() => {
        if (project && project.configuration) {
            setFormData(project.configuration);
        }
    }, [project]);

    const handleHeadingClick = (heading) => {
        setActiveHeading(heading);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [activeHeading.toLowerCase()]: {
                ...prevData[activeHeading.toLowerCase()],
                [name]: value
            }
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        const url = `${config.endpoint}/${project._id}/configuration`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const responseData = await response.json();
            console.log('Response from backend:', responseData);

            if (response.ok) {
                setProject((prevState) => ({
                    ...prevState,
                    configuration: formData
                }));
            } else {
                console.error('Failed to update project:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevData) => ({
            ...prevData,
            [activeHeading.toLowerCase()]: {
                ...prevData[activeHeading.toLowerCase()],
                chatBotImg: file
            }
        }));
    };

    const handleColorPickerClick = (colorType) => {
        if (colorType === 'primaryColor') {
            setShowPrimaryColorPicker(!showPrimaryColorPicker);
            setShowFontColorPicker(false);
        } else if (colorType === 'fontColor') {
            setShowFontColorPicker(!showFontColorPicker);
            setShowPrimaryColorPicker(false);
        }
    };

    const handleColorChange = (color, colorType) => {
        setFormData((prevData) => ({
            ...prevData,
            display: {
                ...prevData.display,
                [colorType]: color.hex
            }
        }));
        if (colorType === 'primaryColor') {
            setShowPrimaryColorPicker(false);
        } else if (colorType === 'fontColor') {
            setShowFontColorPicker(false);
        }
    };
    const renderForm = () => {
        if (activeHeading === "General") {
            return (
                <form className="general-configuration-form">
                    <div className="form-group">
                        <label htmlFor="chatBotName" className="configuration-name">Chatbot Name</label>
                        <input
                            type="text"
                            id="chatBotName"
                            className="input-field"
                            name="chatBotName"
                            value={formData.general.chatBotName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="welcomeMessage" className="configuration-name">Welcome Message</label>
                        <textarea
                            id="welcomeMessage"
                            name="welcomeMessage"
                            className="input-field"
                            value={formData.general.welcomeMessage}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputPlaceholder" className="configuration-name">Input Placeholder</label>
                        <input
                            type="text"
                            id="inputPlaceholder"
                            className="input-field"
                            name="inputPlaceholder"
                            value={formData.general.inputPlaceholder}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="save-btn" onClick={handleSave}>
                        {loading ? "Saving..." : "Save"}
                    </div>
                </form>
            );
        } else if (activeHeading === "Display") {
            return (
                <form className="display-configuration-form">
                    <div className="form-group">
                        <label htmlFor="primaryColor" className="configuration-name">Primary Color</label>
                        <div className="color-picker-container">
                            <input
                                type="text"
                                id="primaryColor"
                                className="input-field"
                                name="primaryColor"
                                value={formData.display.primaryColor}
                                onChange={handleInputChange}
                                onClick={() => handleColorPickerClick('primaryColor')}
                            />
                            {showPrimaryColorPicker && (
                                <div className="color-picker">
                                    <ChromePicker
                                        color={formData.display.primaryColor}
                                        onChange={(color) => handleColorChange(color, 'primaryColor')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fontColor" className="configuration-name">Font Color</label>
                        <div className="color-picker-container">
                            <input
                                type="text"
                                id="fontColor"
                                className="input-field"
                                name="fontColor"
                                value={formData.display.fontColor}
                                onChange={handleInputChange}
                                onClick={() => handleColorPickerClick('fontColor')}
                            />
                            {showFontColorPicker && (
                                <div className="color-picker">
                                    <ChromePicker
                                        color={formData.display.fontColor}
                                        onChange={(color) => handleColorChange(color, 'fontColor')}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="fontSize" className="configuration-name">Font Size</label>
                        <input
                            type="number"
                            id="fontSize"
                            className="input-field"
                            name="fontSize"
                            value={formData.display.fontSize}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chatIconSize" className="configuration-name">Chat Icon Size</label>
                        <input
                            type="text"
                            id="chatIconSize"
                            className="input-field"
                            name="chatIconSize"
                            value={formData.display.chatIconSize}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="positionScreen" className="configuration-name">Position on Screen</label>
                        <input
                            type="text"
                            id="positionScreen"
                            className="input-field"
                            name="positionScreen"
                            value={formData.display.positionScreen}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="distBottom" className="configuration-name">Distance from Bottom</label>
                        <input
                            type="number"
                            id="distBottom"
                            className="input-field"
                            name="distBottom"
                            value={formData.display.distBottom}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="horizontalDist" className="configuration-name">Horizontal Distance</label>
                        <input
                            type="number"
                            id="horizontalDist"
                            className="input-field"
                            name="horizontalDist"
                            value={formData.display.horizontalDist}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="chatBotImg" className="configuration-name">
                            Chatbot Image
                        </label>
                        <input
                            type="file"
                            id="chatBotImg"
                            name="chatBotImg"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="save-btn" onClick={handleSave}>
                        {loading ? "Saving..." : "Save"}
                    </div>
                </form>
            );
        }
    };

    return (
        <div className="configurations-container">
            <div className="configuration-title">Configuration</div>
            <div>
                <div className="configuration-details">
                    <div
                        className={`configuration-heading ${activeHeading === "General" ? "active" : ""}`}
                        onClick={() => handleHeadingClick("General")}
                    >
                        General
                    </div>
                    <div
                        className={`configuration-heading ${activeHeading === "Display" ? "active" : ""}`}
                        onClick={() => handleHeadingClick("Display")}
                    >
                        Display
                    </div>
                </div>
                <hr />
            </div>
            {renderForm()}
        </div>
    );
};

export default ConfigurationSection;
