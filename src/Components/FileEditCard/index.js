import React, { useContext, useState } from "react";
import "./fileEditCard.css";
import DataContext from "../DataContext";
import EditIcon from "../Utils/edit.png";
import {config} from '../../App';
import { Link } from "react-router-dom";
const FileEditCard = () => {
    const { project, setProject, selectedFile } = useContext(DataContext);
    const [updatedDescription, setUpdatedDescription] = useState(selectedFile.fileDescription);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleEdit = (e) => {
        setUpdatedDescription(e.target.value);
    }

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    }

    const handleDiscard = () => {
        setUpdatedDescription(selectedFile.fileDescription);
        setIsEditing(false);
    }

    const handleSaveAndExit = async() => {
        setLoading(true);
        const file = {
            fileDescription:updatedDescription
        }
        const url = `${config.endpoint}/${project._id}/files/${selectedFile._id}`;
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(file)
            });
    
            const responseData = await response.json();
            console.log('Response from backend:', responseData);
    
            if (response.ok) {
                setProject(prevState => ({
                    ...prevState,
                    files:responseData.files
                }));
            } else {
                console.error('Failed to create project:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
        setIsEditing(false);
    }

    return (
        <div className="edit-card-container">
            <div className="edit-card-header">
                <div className="edit-card-heading">Edit Description</div>
                {isEditing && (
                    <div className="card-btns">
                        <Link to="/project" className="project-container">
                            <div className="discard-btn" onClick={handleDiscard}>Discard</div>
                        </Link>
                        <Link to="/project" className="project-container">
                            <div className="btn" onClick={handleSaveAndExit}>Save & Exit</div>
                        </Link>
                        
                    </div>
                )}
            </div>
            <div className="edit-card-details">
                <textarea
                    className="edit-input"
                    value={updatedDescription}
                    onChange={handleEdit}
                    disabled={!isEditing}
                />
                <div className="edit-icon" onClick={toggleEditMode}>
                    <img src={EditIcon} alt="edit-icon" />
                    <div>Edit Mode</div>
                </div>
            </div>
        </div>
    )
}

export default FileEditCard;
