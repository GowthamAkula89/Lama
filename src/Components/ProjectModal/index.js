import React, {useState} from "react";
import "./projectModal.css";
import Modal from "react-modal";
import { config } from "../../App";
const ProjectModal = ({showModal, setShowModal, setProjects}) => {
    const [projectName, setProjectName] = useState("");
    const [loading, setLoading] = useState(false);
    const handleCancel = () => {
        setShowModal(false);
        setProjectName(""); 
    };

    const handleInputChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const response = await fetch(config.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ projectName })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Project created:', data);
                setProjects(prevProjects => [...prevProjects, data]);
                setShowModal(false);
                setProjectName("");
            } else {
                console.error('Failed to create project:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    return(
        <div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCancel}
                contentLabel="Create Project Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <div className="modal-container">
                    <div className="create-project-modal-content">
                        <div className="modal-content-heading">Create Project</div>
                        <div className="modal-content-subheading">Enter project name:</div>
                        <input
                            className="create-project-content-input"
                            type="text"
                            name="projectName"
                            placeholder="Type here"
                            value={projectName}
                            onChange={handleInputChange}
                        />
                        <div className="btns">
                            <div className="cancel-btn" onClick={handleCancel}>Cancel</div>
                            <button className="btn" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Loading...' : 'CREATE'}
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
export default ProjectModal;