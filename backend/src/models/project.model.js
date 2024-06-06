const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {
        type: String,
        required: true,
        trim: true
    },
    files: [{
        fileName: {
            type: String,
            trim: true
        },
        fileDescription: {
            type: String,
            trim: true
        }
    }],
    configuration: {
        general: {
            chatBotName: {
                type: String,
                trim: true,
                default: ""
            },
            welcomeMessage: {
                type: String,
                trim: true,
                default: ""
            },
            inputPlaceholder: {
                type: String,
                trim: true,
                default: ""
            }
        },
        display: {
            primaryColor: {
                type: String,
                trim: true,
                default: ""
            },
            fontColor: {
                type: String,
                trim: true,
                default: ""
            },
            fontSize: {
                type: Number,
                default: 0
            },
            chatIconSize: {
                type: String,
                trim: true,
                default: ""
            },
            positionScreen: {
                type: String,
                trim: true,
                default: ""
            },
            distBottom: {
                type: Number,
                default: 0
            },
            horizontalDist: {
                type: Number,
                default: 0
            },
            chatBotImg: {
                type: String,
                trim: true,
                default: ""
            }
        }
    }
});

const ProjectData = mongoose.model("ProjectData", projectSchema); 

module.exports = {
    ProjectData 
};
