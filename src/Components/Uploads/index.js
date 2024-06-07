import React, { useContext, useState } from "react";
import "./uploads.css";
import DataContext from "../DataContext";
import youtubeImg from "../Utils/youtube.png";
import spotifyImg from "../Utils/spotify.png";
import rssImg from "../Utils/rss.png";
import UploadModal from "../UploadModal";

const uploadTypes = [
    {
        imgSrc: youtubeImg, name: "Youtube Video"
    },
    {
        imgSrc: spotifyImg, name: "Spotify Podcast"
    },
    {
        imgSrc: rssImg, name: "RSS Feed"
    }
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
export function ItemCard({item, isRequried}) {
    return(
        <>
        <div className="item-card">
            <div className={`item-content name-container`} style={{justifyContent:"start"}}>{item.fileName}</div>
            <div className="item-content">12 Jun 24| 15:47</div>
            <div className="item-content">Done</div>
            <div className="item-content">
                <div className="edit-btn">Edit</div>
                <div className="delete-btn">Delete</div>
            </div>
        </div>
        {isRequried &&<hr style={{maxWidth: "985px"}}></hr>}
        </>
    )
}
const Uploads = () => {
    const { project } = useContext(DataContext);
    const [selectedType, setSelectedType] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const handleUpload = (item) => {
        setShowModal(true)
        setSelectedType(item);
    }
    return (
        <>
            <div className="uploads-container">
                <div className="uploads-heading">Uploads</div>
                <div className="upload-types">
                    {uploadTypes.map((item, index) => 
                        <div key={index} onClick={() => handleUpload(item)}>
                            <VideoTypeCard item={item} />
                        </div>
                    )}
                </div>
                {project && project.files.length !== 0 &&
                    <div className="uploads-list">
                        <div className="uploads-list-headings">
                            <div className={`item-container name-container`}>Name</div>
                            <div className="item-container">Upload Date & Time</div>
                            <div className="item-container">Status</div>
                            <div className="item-container">Actions</div>
                        </div>
                        <hr style={{maxWidth: "985px"}}></hr>
                        {project.files.map((file,index) => (
                            <div key={index}>{<ItemCard item={file} isRequried={index=== project.files.length-1 ? false: true}/>}</div>
                        ))}
                    </div>
                }
            </div>
            {showModal && <UploadModal showModal={showModal} setShowModal={setShowModal} selectedType={selectedType}/>}
        </>
    );
};

export default Uploads;
