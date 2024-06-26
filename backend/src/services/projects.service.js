const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const mongoose = require("mongoose");
const {ProjectData} = require("../models/project.model")
const addProject = async(projectDetails)=>{
    try {
        const project = await ProjectData.create(projectDetails);
        return project;
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Validation error: " + error.message);
        } else if (error.code === 11000) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Website name already exists");
        } else {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred");
        }
    }
}
const getProjects = async() => {
    const project = await ProjectData.find({}).catch((error) => {
        if (mongoose.Error.ValidationError) {
          throw new ApiError(httpStatus.BAD_REQUEST, "Filed to fetch the data");
        }
    });
    return project;
}

const updateProjectFiles = async(projectId, projectFile) => {
    const project = await ProjectData.findOne({ _id: projectId });
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "No such project exists");
    // project.files = [...project.files, projectFile];
    const newFile = {
        ...projectFile,
        updatedAt: new Date()
    };

    project.files.push(newFile);
    await project.save();
    return project;
}

const updateConfiguration = async(projectId, projectConfig) => {
    const project = await ProjectData.findOne({ _id: projectId });
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "No such project exists");
    project.configuration = projectConfig
    await project.save();
    return project;
}

const updateFile = async (projectId, fileId, updateFileData) => {
    try {
        const project = await ProjectData.findOne({ _id: projectId });
        if (!project) {
            throw new ApiError(httpStatus.NOT_FOUND, "No such project exists");
        }

        const file = project.files.id(fileId);
        if (!file) {
            throw new ApiError(httpStatus.NOT_FOUND, "No such file exists in the project");
        }

        file.fileDescription = updateFileData.fileDescription || file.fileDescription;

        await project.save();

        return project;
    } catch (error) {
        console.error("Error updating file:", error);
        throw error;
    }

}
const deleteFile = async (projectId, fileId) => {
    const project = await ProjectData.findOne({ _id: projectId });
    if (!project) throw new ApiError(httpStatus.NOT_FOUND, "No such project exists");

    const fileIndex = project.files.findIndex(file => file._id.toString() === fileId);
    if (fileIndex === -1) throw new ApiError(httpStatus.NOT_FOUND, "File not found");

    project.files.splice(fileIndex, 1);
    await project.save();
    return project;
}

module.exports = {
    addProject,
    getProjects,
    updateProjectFiles,
    updateConfiguration,
    deleteFile,
    updateFile
}