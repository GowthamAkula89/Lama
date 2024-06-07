import React, { useContext, useState } from "react";
import DataContext from "../DataContext";
import { config } from "../../App";
import "./listItemCard.css";
export function ListItemCard({ item, projectId, isRequired }) {
    const { setProject } = useContext(DataContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleDeleteFile = async (fileId) => {
        setIsLoading(true);
        const url = `${config.endpoint}/${projectId}/files/${fileId}`;
        try {
            const response = await fetch(url, { method: 'DELETE' });
            if (response.ok) {
                setProject(prevProject => ({
                    ...prevProject,
                    files: prevProject.files.filter(file => file._id !== fileId)
                }));
            } else {
                console.error('Failed to delete the file');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear().toString().slice(-2);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${month} ${year} | ${hours}:${minutes}`;
    };
    return (
        <>
            <div className="item-card">
                <div className={`item-content name-container`} style={{ justifyContent: "start" }}>{item.fileName}</div>
                <div className="item-content">{formatDate(item.updatedAt)}</div>
                <div className="item-content">Done</div>
                <div className="item-content">
                    <div className="edit-btn">Edit</div>
                    <div className="delete-btn" onClick={() => handleDeleteFile(item._id)}>
                        {isLoading ? "Deleting..." : "Delete"}
                    </div>
                </div>
            </div>
            {isRequired && <hr style={{ maxWidth: "985px" }}></hr>}
        </>
    );
}
