import React, { useContext, useState } from "react";
import "./uploads.css";
import DataContext from "../DataContext";
import youtubeImg from "../Utils/youtube.png";
import spotifyImg from "../Utils/spotify.png";
import rssImg from "../Utils/rss.png";
import UploadModal from "../UploadModal";
import { ListItemCard } from "../ListItemCard";

const uploadTypes = [
    { imgSrc: youtubeImg, name: "Youtube Video" },
    { imgSrc: spotifyImg, name: "Spotify Podcast" },
    { imgSrc: rssImg, name: "RSS Feed" }
];

export function VideoTypeCard({ item }) {
    return (
        <div className="upload-card">
            <img src={item.imgSrc} alt={item.name} />
            <div className="upload-details">
                <div>Upload</div>
                <div>{item.name}</div>
            </div>
        </div>
    );
}


const Uploads = () => {
    const { project } = useContext(DataContext);
    const [selectedType, setSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleUpload = (item) => {
        setShowModal(true);
        setSelectedType(item);
    };
    if(project){
        console.log("Files",project.files)
    }
    return (
        <>
            <div className="uploads-container">
                <div className="uploads-heading">Uploads</div>
                <div className="upload-types">
                    {uploadTypes && uploadTypes.map((item, index) => (
                        <div key={index} onClick={() => handleUpload(item)}>
                            <VideoTypeCard item={item} />
                        </div>
                    ))}
                </div>
                {project && project.files?.length !== 0 &&
                    <div className="uploads-list">
                        <div className="uploads-list-headings">
                            <div className={`item-container name-container`}>Name</div>
                            <div className="item-container">Upload Date & Time</div>
                            <div className="item-container">Status</div>
                            <div className="item-container">Actions</div>
                        </div>
                        <hr style={{ maxWidth: "985px" }}></hr>
                        {project.files.map((file, index) => (
                            <div key={index}>
                                <ListItemCard
                                    item={file}
                                    projectId={project._id}
                                    isRequired={index !== project.files.length - 1}
                                />
                            </div>
                        ))}
                    </div>
                }
            </div>
            {showModal && <UploadModal showModal={showModal} setShowModal={setShowModal} selectedType={selectedType} />}
        </>
    );
};

export default Uploads;
