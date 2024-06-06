const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName:{
        type: String,
        required: true,
        trim: true
    }
});
const ProjectssData = mongoose.model("ProjectssData", projectSchema);
module.exports = {
    ProjectssData
}
