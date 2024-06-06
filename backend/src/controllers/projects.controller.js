const catchAsync=require("../utils/catchAsync");
const projectsServices = require("../services/projects.service")
const getProjects = catchAsync(async (req, res) => {
    const projects = await projectsServices.getProjects();
    res.json({projects});
});
const addProject = catchAsync( async(req,res)=>{
    const project = await projectsServices.addProject(req.body);
    res.send(project);

})
module.exports = {
    getProjects,
    addProject
}