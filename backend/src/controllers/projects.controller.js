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
const updateProjectFiles = catchAsync( async(req, res) => {
    const { projectId } = req.params;
    const project = await projectsServices.updateProjectFiles(projectId, req.body);
    res.send(project);
})

const updateConfiguration = catchAsync( async(req, res) => {
    const { projectId } = req.params;
    const project = await projectsServices.updateConfiguration(projectId, req.body);
    res.send(project);
})

const updateProjectFile =  catchAsync( async(req,res) => {
    const{projectId, fileId} = req.params;
    const project = await projectsServices.updateFile(projectId, fileId, req.body);
    res.send(project);
})
const deleteFile = catchAsync( async(req,res) => {
    const{projectId, fileId} = req.params;
    const project = await projectsServices.deleteFile(projectId, fileId);
    res.send(project);
})
module.exports = {
    getProjects,
    addProject,
    updateProjectFiles,
    updateConfiguration,
    deleteFile,
    updateProjectFile
}