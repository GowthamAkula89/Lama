import React, { useContext, useState } from "react";
import "./fileEditCard.css";
import DataContext from "../DataContext";
import EditIcon from "../Utils/edit.png";

const FileEditCard = () => {
    const { selectedFile } = useContext(DataContext);
    const [updatedDescription, setUpdatedDescription] = useState(selectedFile.fileDescription);
    const [isEditing, setIsEditing] = useState(false);

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

    const handleSaveAndExit = () => {
        
        setIsEditing(false);
    }

    return (
        <div className="edit-card-container">
            <div className="edit-card-header">
                <div className="edit-card-heading">Edit Description</div>
                {isEditing && (
                    <div className="card-btns">
                        <div className="discard-btn" onClick={handleDiscard}>Discard</div>
                        <div className="btn" onClick={handleSaveAndExit}>Save & Exit</div>
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
