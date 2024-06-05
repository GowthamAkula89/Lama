const catchAsync=require("../utils/catchAsync");
const projectsServices = require("../services/projects.service")
const getProject = catchAsync(async (req, res) => {
    const offerings = await projectsServices.getOfferings();
    res.json({offerings});
});
const addProject = catchAsync( async(req,res)=>{
    const offering = await projectsServices.addOffering(req.body);
    res.send(offering);

})
module.exports = {
    getProject,
    addProject
}