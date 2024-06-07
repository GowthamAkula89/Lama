    import React, {useContext, useState} from "react";
    import "./uploadModal.css";
    import Modal from "react-modal";
    import { config } from "../../App";
    import DataContext from "../DataContext";
    const UploadModal = ({showModal, setShowModal, selectedType}) => {
        const {project, setProject} = useContext(DataContext);
        const [name, setName] = useState("");
        const [description, setDescription] = useState("");
        const [loading, setLoading] = useState(false);
        const handleCancel = () => {
            setShowModal(false);
            setName(""); 
        };

        const handleNameChange = (e) => {
            setName(e.target.value);
        };
        const handleDiscriptionChange = (e) => {
            setDescription(e.target.value);
        }
        const handleSubmit = async () => {
            setLoading(true);
            const file = {
                fileName: name,
                fileDescription: description
            };
            console.log("File to be uploaded:", file);
            const url = `${config.endpoint}/${project._id}/files`;
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
                    setShowModal(false);
                    setName("");
                    setDescription("");
                } else {
                    console.error('Failed to create project:', response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        

        console.log("Updated",project);
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
                            <div className="modal-heading">
                                <img src={selectedType.imgSrc} alt="img" className="selected-type-img"/>
                                <div>{`Upload from ${selectedType.name}`}</div>
                            </div>
                            <div className="modal-content-subheading">Name:</div>
                            <input
                                className="create-project-content-input"
                                type="text"
                                name="name"
                                placeholder="Type here"
                                value={name}
                                onChange={handleNameChange}
                            />
                            <div className="modal-content-subheading">Discription:</div>
                            <input
                                className="create-project-content-input"
                                type="text"
                                name="discription"
                                placeholder="Type here"
                                value={description}
                                onChange={handleDiscriptionChange}
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
    export default UploadModal;