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
module.exports = {
    addProject,
    getProjects
}