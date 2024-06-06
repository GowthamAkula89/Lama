const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,
        trim: true
    },
    files:[{
        fileName:{
            type: String,
            required: true,
            trim: true
        },
        fileDiscription: {
            type: String,
            required: true,
            trim: true
        }
    }],
    configuration:{
        general:{
            chatBotName:{
                type: String,
                required: true,
                trim: true
            },
            welcomeMessage:{
                type: String,
                required: true,
                trim: true
            },
            inputPlaceholder:{
                type: String,
                required: true,
                trim: true
            }
        },
        display:{
            primaryColor: String,
            fontColor: String,
            fontSize : Number,
            chatIconSize : String,
            positionScreen: String,
            distBottom: Number,
            horizontalDist: Number,
            chatBotImg: String
        }
    }
});
const ProjectssData = mongoose.model("ProjectssData", projectSchema);
module.exports = {
    ProjectssData
}
